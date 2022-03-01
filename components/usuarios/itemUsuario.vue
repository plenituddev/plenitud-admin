<template>
  <div class="u-ite">
    <div class="u-item">
      <div class="u-item-elem lg:w-2/12 md:w-12/12">
        <span class="pl-2 font-bold text-indigo-100">{{
          usuario.planes.tipo.tipo
        }}</span>
      </div>
      <div class="u-item-elem lg:w-1/12">
        <span
          class="
            bg-orange-500
            text-white text-lg
            rounded-md
            px-2
            py-1
            leading-none
          "
          >{{ usuario.planes.tipo.valor | currency }}</span
        >
      </div>
      <div class="u-item-elem lg:w-3/12">
        {{ usuario.personales.nombre_completo }}
        {{ usuario.personales.apellido_completo }}
      </div>
      <div class="u-item-elem lg:w-1/12">
        {{ usuario.personales.tipo }}: {{ usuario.documento }}
      </div>
      <div class="u-item-elem lg:w-2/12">
        <span
          v-if="usuario.empresaporpagar"
          class="bg-yellow-400 text-yellow-900 rounded-md px-2 py-1"
          >Pendiente de pago</span
        >
        <span
          v-if="!usuario.empresaporpagar"
          class="bg-green-400 text-gray-50 rounded-md px-2 py-1"
          >Activo</span
        >
      </div>
      <div class="u-item-elem lg:w-2/12">
        {{ $moment(usuario.creado.toDate()).format('YYYY-MM-DD hh:mm') }}
      </div>
      <div class="u-item-elem lg:w-1/12">
        <div class="flex">
          <nuxt-link
            v-scroll-to="{ el: '#configuracion' }"
            :to="{ path: `/empresas/usuarios/ver/?uid=${usuario.uid}` }"
            class="btn-accion"
          >
            <i class="fad fa-eye"></i>
          </nuxt-link>
          <nuxt-link
            v-scroll-to="{ el: '#configuracion' }"
            :to="{ path: `/empresas/usuarios/editar/?uid=${usuario.uid}` }"
            class="btn-accion"
          >
            <i class="fal fa-edit"></i>
          </nuxt-link>
          <nuxt-link
            v-scroll-to="{ el: '#configuracion' }"
            :to="{ path: `/empresas/usuarios/ver/?uid=${usuario.uid}` }"
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
        space-x-8 space-y-2
        lg:w-full
        items-center
        justify-between
      "
    >
      <div>
        <template v-if="usuario.contacto.email">
          <i class="fa fa-envelope" aria-hidden="true"></i>
          {{ usuario.contacto.email }}</template
        ><b v-else> Sin email </b>
      </div>
      <div>
        <template v-if="usuario.contacto.celular">
          <i class="fa fa-mobile" aria-hidden="true"></i>
          {{ usuario.contacto.celular }}</template
        ><b v-else> Sin celular </b>
      </div>
      <div>
        <i class="fa fa-genderless" aria-hidden="true"></i>
        {{ usuario.personales.sexo }}
      </div>
      <div>
        <template v-if="usuario.personales.fecha">
          <i class="fa fa-calendar" aria-hidden="true"></i>
          {{
            $moment(usuario.personales.fecha).format('YYYY-MM-DD')
          }} </template
        ><b v-else> Fecha incorrecta </b>
      </div>
      <div>
        <template
          v-if="
            usuario.contacto.departamento && usuario.contacto.municipio.nombre
          "
        >
          <i class="fa fa-location-arrow" aria-hidden="true"></i>
          {{ usuario.contacto.departamento }} -
          {{ usuario.contacto.municipio.nombre }}
        </template>
        <b v-else> Error en departamento o municipio </b>
      </div>
      <div>
        <template v-if="usuario.contacto.direccion">
          <i class="fas fa-map-pin"></i>
          {{ usuario.contacto.direccion }}
        </template>
        <b v-else> Sin dirección </b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    usuario: {
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