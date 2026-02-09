<script setup lang="ts">
import TopMenu from '@/modules/shop/components/TopMenu.vue'
import CustomFooter from '@/modules/shop/components/CustomFooter.vue'
</script>

<template>
  <!-- component -->
  <!-- Create By Joker Banny -->
  <!-- Header Navbar -->
  <TopMenu />


  <!-- Title -->
  <div class="pt-32  bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
  </div>

  <RouterView />

  <!-- Footer -->
  <CustomFooter />

</template>

<style scoped></style>
