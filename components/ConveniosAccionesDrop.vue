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
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{ path: '/admin/convenios/agregar' }"
          >Agregar convenio <i class="fal fa-arrow-right"></i
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