<template>
  <div>
    <button
      v-scroll-to="{ el: '#configuracion' }"
      class="mr-12 mb-4 text-xs text-indigo-100"
      @click="$router.go(-1)"
    >
      <i class="fal fa-arrow-left"></i>
      Regresar
    </button>
    <h1 class="text-3xl mb-8 font-light text-orange-500">
      {{ titulo }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
</style>