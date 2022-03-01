<template>
  <div class="m-0" :class="!half ? 'dropdown dropdown-end' : ''">
    <div
      v-if="!half"
      tabindex="0"
      class="p-btn p-btn-secondary uppercase cursor-pointer"
    >
      Acciones <i class="far fa-plus-circle"></i>
    </div>
    <ul tabindex="0" class="p-drops">
      <li>
        <a
          href="https://firebasestorage.googleapis.com/v0/b/plenitud-web-v2.appspot.com/o/EMPRESAS%20Plenitud%20-%20plantilla.xlsx?alt=media&token=42653c8f-090b-4b63-be1b-4fdd76f6b3da"
          target="_blank"
          >Descargar excel de muestra <i class="fas fa-file-download"></i
        ></a>
      </li>
      <li>
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{ path: '/empresas/usuarios/subir' }"
          >Subir usuarios por archivo <i class="fal fa-arrow-right"></i
        ></nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{ path: '/empresas/usuarios/agregar' }"
          >Inscribir un usuario <i class="fal fa-arrow-right"></i
        ></nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    half: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss">
.p-drops {
  @apply shadow menu bg-indigo-100 dropdown-content rounded-box w-96;
  li {
    @apply border-b border-indigo-400;
    a {
      @apply flex justify-between text-indigo-500 active:rounded-none;
      i {
        @apply text-orange-500;
      }
    }
  }
}
</style>