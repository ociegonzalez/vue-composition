import { defineComponent, ref, watch, watchEffect } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { createUpdateProductAction, getProductByIdAction } from '@/modules/products/actions'
import { useFieldArray, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue'
import { useToast } from 'vue-toastification'

const ValidationShcema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
})

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },

  props: {
    productId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter()
    const toast = useToast()

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductByIdAction(props.productId),
      retry: false,
    })

    const {
      mutate,
      isPending,
      isSuccess: isUpdatedSuccess,
      data: updatedProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    })

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema: ValidationShcema,
      initialValues: product.value,
    })
    const [title, titleAttrs] = defineField('title')
    const [slug, slugAttrs] = defineField('slug')
    const [description, descriptionAttrs] = defineField('description')
    const [price, priceAttrs] = defineField('price')
    const [stock, stockAttrs] = defineField('stock')
    const [gender, genderAttrs] = defineField('gender')

    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes')

    const { fields: images } = useFieldArray<string>('images')
    const imageFiles = ref<File[]>([])

    const onSubmit = handleSubmit(async (values) => {
      // const product = await createUpdateProductAction(values)
      // console.log(product)

      const formValues = {
        ...values,
        images: [...values.images!, ...imageFiles.value],

      }

      mutate(formValues)
    })

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value)

      if (currentSizes.includes(size)) {
        removeSize(currentSizes.indexOf(size))
      } else {
        pushSize(size)
      }
    }

    const hasSize = (size: string): boolean => {
      const currentSizes = sizes.value.map((s) => s.value)
      return currentSizes.includes(size)
    }

    const onFileChange = (event: Event) => {
      const fileInput = event.target as HTMLInputElement
      const fileList = fileInput.files

      if (!fileList) return
      if (fileList.length === 0) return

      imageFiles.value = Array.from(fileList)
    }

    const temporalUrl = (file: File) => {
      return URL.createObjectURL(file)
    }

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products')
      }
    })

    watch(
      product,
      () => {
        if (!product) return
        resetForm({ values: product.value })
      },
      {
        deep: true,
        immediate: true,
      },
    )

    watch(isUpdatedSuccess, (value) => {
      if (!value) return

      console.log(updatedProduct.value)

      toast.success('Product updated successfully')
      router.replace(`/admin/products/${updatedProduct.value!.id}`)

      resetForm({
        values: updatedProduct.value!,
      })
      imageFiles.value = []
    })

    watch(
      () => props.productId,
      () => {
        refetch()
      },
    )

    return {
      //props
      values,
      errors,
      meta,
      isPending,

      imageFiles,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs: descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      images,
      sizes,

      //getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //actions
      onSubmit,
      toggleSize,
      hasSize,
      onFileChange,
      temporalUrl,
    }
  },
})
