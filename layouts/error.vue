<template>
  <div
    class="
      flex
      items-center
      justify-center
      min-h-screen
      bg-p-blue bg-fixed bg-cover bg-bottom
      error-bg
    "
  >
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
          <div class="relative">
            <span class="text-gray-300 font-semibold">Oops!</span>
            <h1
              class="
                relative
                text-9xl
                tracking-tighter-less
                text-shadow
                font-sans font-bold
              "
            >
              <template v-if="error.statusCode === 404">
                <span>4</span><span>0</span><span>4</span>
              </template>
              <template v-if="error.statusCode === 500">
                <span>5</span><span>0</span><span>0</span>
              </template>
            </h1>
          </div>

          <h5
            v-if="error.statusCode === 404"
            class="text-gray-300 font-semibold -mr-10 mt-3 text-4xl"
          >
            Página no encontrada
          </h5>
          <h5 v-else class="text-gray-300 font-semibold -mr-10 mt-3 text-4xl">
            Ocurrió un error
          </h5>

          <p class="text-gray-100 mt-2 mb-6">
            Encontramos un problema al acceder a esta página
          </p>
          <p v-if="error.message" class="text-xs my-8 text-xs text-indigo-100">
            {{ error.message }}
          </p>
          <nuxt-link
            to="/"
            class="
              bg-green-400
              px-5
              py-3
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              text-gray-50
              rounded-full
              hover:shadow-lg
            "
          >
            Regresar al inicio
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page
}
</script>
<style lang="postcss">
.error-bg {
  background-image: url('~assets/images/bkg_ini.jpg') !important;
}
.tracking-tighter-less {
  letter-spacing: -0.75rem;
}
.text-shadow {
  text-shadow: -8px 0 0 #eec972;
}
</style>