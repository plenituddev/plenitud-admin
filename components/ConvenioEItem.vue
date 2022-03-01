<template>
  <div class="u-ite">
    <div class="u-item">
      <div class="u-item-elem lg:w-1/12">
        <div class="u-item-elem lg:w-full">
          <span
            v-if="convenio.estado"
            class="bg-yellow-400 text-yellow-900 rounded-md px-2 py-1"
            >Inactivo</span
          >
          <span
            v-if="!convenio.estado"
            class="bg-green-400 text-gray-50 rounded-md px-2 py-1"
            >Activo</span
          >
        </div>
      </div>

      <div class="u-item-elem lg:w-2/12">
        {{ convenio.nombre }}
      </div>
      <div class="u-item-elem lg:w-1/12">
        {{ convenio.id }}
      </div>
      <div class="u-item-elem lg:w-3/12">
        <div class="u-item-elem lg:w-full">
          <span
            v-if="!convenio.usado"
            class="bg-yellow-400 text-yellow-900 rounded-md px-2 py-1"
            >No usado</span
          >
          <span
            v-if="convenio.usado"
            class="bg-green-400 text-gray-50 rounded-md px-2 py-1"
            >Usado</span
          >
        </div>
      </div>
      <div class="u-item-elem lg:w-2/12">
        {{ convenio.bitly }}
      </div>

      <div class="u-item-elem lg:w-2/12">
        {{ $moment(convenio.creado).format('YYYY-MM-DD hh:mm') }}
      </div>
      <div class="u-item-elem lg:w-1/12">
        <div class="flex">
          <nuxt-link
            v-scroll-to="{ el: '#configuracion' }"
            :to="{ path: `/admin/convenios_empresas/ver/?uid=${convenio.id}` }"
            class="btn-accion"
          >
            <i class="fad fa-eye"></i>
          </nuxt-link>
          <nuxt-link
            v-scroll-to="{ el: '#configuracion' }"
            :to="{
              path: `/admin/convenios_empresas/editar/?uid=${convenio.id}`,
            }"
            class="btn-accion"
          >
            <i class="fal fa-edit"></i>
          </nuxt-link>
          <nuxt-link
            v-scroll-to="{ el: '#configuracion' }"
            :to="{ path: `/admin/convenios_empresas/ver/?uid=${convenio.id}` }"
            class="hidden"
          >
            <i class="fal fa-trash-alt"></i>
          </nuxt-link>
        </div>
      </div>
      <div class="u-item-elem lg:w-1/12">
        <button class="btn-accion" @click="show = !show">
          <i v-if="show == false" class="fa fa-caret-up" aria-hidden="true"></i>
          <i v-else class="fa fa-caret-down" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div
      v-if="show"
      class="
        u-item-elem
        flex
        u-item-elem-more
        space-x-2 space-y-2
        lg:w-full
        items-center
        justify-between
      "
    >
      <div
        v-if="convenio.planes.clasico.activo"
        class="py-1 grid grid-cols-4 space-x-1 items-center"
      >
        <span>CLÁSICO</span>
        <span
          v-if="!convenio.planes.clasico.activo"
          class="bg-yellow-400 text-yellow-900 rounded-md px-2 py-1 text-xs"
          >Inactivo</span
        >
        <span
          v-if="convenio.planes.clasico.activo"
          class="bg-green-400 text-gray-50 rounded-md px-2 py-1 text-xs"
          >Activo</span
        >
        <span
          v-if="convenio.planes.clasico.activo"
          class="
            bg-orange-500
            text-white text-sm
            rounded-md
            px-2
            py-1
            leading-none
          "
        >
          {{ convenio.planes.clasico.tipo.valor | currency }}
        </span>
        <span v-if="convenio.planes.clasico.activo" class="flex space-x-1">
          -
          <i class="fal fa-user"></i>
          {{ convenio.planes.clasico.beneficiarios }} -
          <i class="fal fa-cat"></i>
          {{ convenio.planes.clasico.mascotas.mascotas }}
        </span>
      </div>
      <div
        v-if="convenio.planes.mascotas.activo"
        class="py-1 grid grid-cols-4 space-x-1 items-center"
      >
        <span>MASCOTAS</span>
        <span
          v-if="!convenio.planes.mascotas.activo"
          class="bg-yellow-400 text-yellow-900 rounded-md px-2 py-1 text-xs"
          >Inactivo</span
        >
        <span
          v-if="convenio.planes.mascotas.activo"
          class="bg-green-400 text-gray-50 rounded-md px-2 py-1 text-xs"
          >Activo</span
        >
        <span
          v-if="convenio.planes.mascotas.activo"
          class="
            bg-orange-500
            text-white text-sm
            rounded-md
            px-2
            py-1
            leading-none
          "
        >
          {{ convenio.planes.mascotas.tipo.valor | currency }}
        </span>
        <span v-if="convenio.planes.mascotas.activo" class="flex space-x-1">
          -
          <i class="fal fa-user"></i>
          {{ convenio.planes.clasico.beneficiarios }} -
          <i class="fal fa-cat"></i>
          {{ convenio.planes.clasico.mascotas.mascotas }}
        </span>
      </div>
      <div
        v-if="convenio.planes.superior.activo"
        class="py-1 grid grid-cols-4 space-x-1 items-center"
      >
        <span>SUPERIOR</span>
        <span
          v-if="!convenio.planes.superior.activo"
          class="bg-yellow-400 text-yellow-900 rounded-md px-2 py-1 text-xs"
          >Inactivo</span
        >
        <span
          v-if="convenio.planes.superior.activo"
          class="bg-green-400 text-gray-50 rounded-md px-2 py-1 text-xs"
          >Activo</span
        >
        <span
          v-if="convenio.planes.superior.activo"
          class="
            bg-orange-500
            text-white text-sm
            rounded-md
            px-2
            py-1
            leading-none
          "
        >
          {{ convenio.planes.superior.tipo.valor | currency }}
        </span>
        <span v-if="convenio.planes.superior.activo" class="flex space-x-1">
          -
          <i class="fal fa-user"></i>
          {{ convenio.planes.superior.beneficiarios }} -
          <i class="fal fa-cat"></i>
          {{ convenio.planes.superior.mascotas.mascotas }}
        </span>
      </div>

      <div
        v-if="convenio.planes.superior.activo"
        class="py-1 grid grid-cols-4 space-x-1 items-center"
      >
        <span>ÉLITE</span>
        <span
          v-if="!convenio.planes.elite.activo"
          class="bg-yellow-400 text-yellow-900 rounded-md px-2 py-1 text-xs"
          >Inactivo</span
        >
        <span
          v-if="convenio.planes.elite.activo"
          class="bg-green-400 text-gray-50 rounded-md px-2 py-1 text-xs"
          >Activo</span
        >
        <span
          v-if="convenio.planes.elite.activo"
          class="
            bg-orange-500
            text-white text-sm
            rounded-md
            px-2
            py-1
            leading-none
          "
        >
          {{ convenio.planes.elite.tipo.valor | currency }}
        </span>
        <span v-if="convenio.planes.elite.activo" class="flex space-x-1">
          -
          <i class="fal fa-user"></i>
          {{ convenio.planes.elite.beneficiarios }} -
          <i class="fal fa-cat"></i>
          {{ convenio.planes.elite.mascotas.mascotas }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    convenio: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      show: false,
    }
  },
}
</script>

<style lang="postcss" scoped>
.u-ite {
  @apply shadow-lg border-p-blue3 p-3;
  &m {
    /* grid grid-cols-2 sm:grid-rows-2 sm:grid-cols-8 gap-4 */
    @apply w-full flex  place-content-center  my-2;
    &-elem {
      @apply self-center flex-grow;
      i {
        font-size: 1rem !important;
      }
      &:nth-child(1) {
        border-radius: 0.625rem 0 0 0.625rem;
      }
      &:nth-child(n + 7) {
        border-radius: 0 0.625rem 0.625rem 0;
      }
      .btn-accion {
        @apply text-indigo-100 hover:text-orange-500 mr-2;
      }
      &-more {
        @apply border-t border-indigo-600 pt-2 px-3;
        div {
          @apply border-l border-indigo-300 pl-8;
          i {
            @apply text-orange-400 mr-1;
          }
        }
      }
    }
  }
}
</style>