<template>
  <div v-if="conveniosE" class="p-usuarios-wrap">
    <div
      v-if="conveniosE.length == 0"
      class="flex h-96 justify-center items-center"
    >
      <div class="w-3/4 flex items-center justify-around space-x-8">
        <div class="w-full lg:w-1/2 lg:mb-5">
          <p
            class="
              leading-tight
              text-3xl
              lg:text-5xl
              text-orange-400
              lg:border-r
              border-indigo-100
              lg:pr-11
              mb-2
            "
          >
            No tienes convenios de empresas registrados
          </p>
        </div>
        <div class="w-full lg:w-1/2">
          <ConveniosEAcciones :half="true"></ConveniosEAcciones>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- USUARIOs -->
      <div class="header">
        <h1 class="text-3xl font-light text-orange-500">
          Convenios registrados
        </h1>
        <ConveniosEAccionesDrop></ConveniosEAccionesDrop>
      </div>
      <ConveniosEControles></ConveniosEControles>
      <ConveniosETabla></ConveniosETabla>
      <!-- USUARIOs -->
    </div>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'

export default {
  mixins: [AuthMixin],
  mounted() {
    this.getConveniosE()
  },
}
</script>


<style lang="postcss">
.p-usuarios {
  @apply pb-16 pt-8 mx-4 sm:mx-0;
}
.header {
  @apply mb-4 flex lg:flex-row flex-col space-x-0 sm:space-x-8 justify-between items-end;
}
</style>