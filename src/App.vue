<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from '@/modules/auth/store/auth.store.ts'
import { EAuthStatus } from '@/modules/auth/interfaces'
import { useRoute, useRouter } from 'vue-router'
import FullScreenLoader from '@/modules/common/components/FullScreenLoader.vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

authStore.$subscribe((_, state) => {
  if (state.autStatus === EAuthStatus.Checking) {
    authStore.checkAuthStatus()
    return
  }

  if (route.path.includes('/auth') && state.autStatus === EAuthStatus.Authenticated) {
    router.replace({name: 'home'})
  }

  console.log(state.autStatus)

}, {
  immediate: true,
})

</script>

<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<style scoped></style>
