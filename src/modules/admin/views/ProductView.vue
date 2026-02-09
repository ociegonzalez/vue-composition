<script src="./ProductView.ts" lang="ts"></script>

<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Producto: <small class="text-blue-500">{{ title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
        <!--        <input v-model="title" v-bind="titleAttrs" type="text" id="title" :class="['form-control', {-->
        <!--          'border-red-500' : errors.title,-->
        <!--        }]" />-->
        <!--        <span v-if="errors.title" class="text-red-500">{{ errors.title }}</span>-->
      </div>

      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <!--        <input v-model="slug" v-bind="slugAttrs" type="text" id="slug" class="form-control" />-->
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Descripción</label>
        <CustomTextArea
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
        />
        <!--        <textarea-->
        <!--          v-model="description"-->
        <!--          v-bind="descriptionAttrs"-->
        <!--          id="description"-->
        <!--          class="shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"-->
        <!--        ></textarea>-->
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4 flex-1">
          <label for="price" class="form-label">Precio</label>
          <CustomInput v-model.number="price" v-bind="priceAttrs" :error="errors.price" />
          <!--          <input-->
          <!--            v-model="price"-->
          <!--            v-bind="priceAttrs"-->
          <!--            type="number"-->
          <!--            id="price"-->
          <!--            class="form-control"-->
          <!--          />-->
        </div>

        <div class="mb-4 flex-1">
          <label for="stock" class="form-label">Inventario</label>
          <CustomInput v-model.number="stock" v-bind="stockAttrs" :error="errors.stock" />
          <!--          <input-->
          <!--            v-model="stock"-->
          <!--            v-bind="stockAttrs"-->
          <!--            type="number"-->
          <!--            id="stock"-->
          <!--            class="form-control"-->
          <!--          />-->
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Tallas</label>
        <div class="flex">
          <button
            v-for="size in allSizes"
            :key="size"
            @click="toggleSize(size)"
            type="button"
            :class="[
              'bg-blue-100 p-2 rounded w-14 mr-2 flex-1',
              {
                'bg-blue-500': hasSize(size),
              },
            ]"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-66.25 bg-gray-200 rounded">
        <div v-for="image in images" :key="image.value" class="shrink-0">
          <img :src="image.value" :alt="title" class="w-62.5 h-62.5" />
        </div>

        <div v-for="image in imageFiles" :key="image.name" class="shrink-0">
          <img :src="temporalUrl(image)" :alt="title" class="w-62.5 h-62.5" />
        </div>
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>

        <input @change="onFileChange" multiple type="file" id="image" class="form-control" accept="image/*" />
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select v-model="gender" v-bind="genderAttrs" class="form-control">
          <option value="">Seleccione</option>
          <option value="kid">Niño</option>
          <option value="women">Mujer</option>
          <option value="men">Hombre</option>
        </select>
        <span v-show="errors.gender" class="text-red-500">{{ errors.gender }}</span>
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          :disabled="isPending"
          type="submit"
          class="disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  </form>

<!--  <div class="grid grid-cols-2">-->
<!--    <pre class="bg-green-300 p-2">-->
<!--      {{ JSON.stringify(values, null, 2) }}-->
<!--    </pre>-->
<!--    <pre class="bg-red-200 p-2">-->
<!--      {{ JSON.stringify(errors, null, 2) }}-->
<!--    </pre>-->
<!--    <pre class="bg-blue-400 p-2 col-span-2">-->
<!--      {{ JSON.stringify(meta, null, 2) }}-->
<!--    </pre>-->
<!--  </div>-->
</template>

<style scoped>
@reference "tailwindcss";

.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
