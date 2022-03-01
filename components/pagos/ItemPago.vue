<template>
  <div class="u-ite">
    <div class="u-item" :data-id="pago.uid">
      <div class="u-item-elem">
        <b>Creado:</b>
        <span>
          {{ $moment(pago.creado.toDate()).format('YYYY-MM-DD hh:mm') }}
        </span>
      </div>

      <div class="u-item-elem">
        <b>Vigencia del pago:</b>
        <span>
          {{ $moment(pago.vigencia.toDate()).format('YYYY-MM-DD hh:mm') }}
        </span>
      </div>

      <div class="u-item-elem">
        <b>Estado:</b>
        <span
          v-if="
            pago.estado.toUpperCase() == 'CREADA' ||
            pago.estado.toUpperCase() == 'PENDIENTE'
          "
          class="
            rounded-md
            px-2
            pb-1
            pt-2
            leading-none
            text-lg
            bg-yellow-500
            text-white
          "
          >{{ pago.estado }}</span
        >
        <span
          v-if="pago.estado.toUpperCase() == 'ERROR'"
          class="
            rounded-md
            px-2
            pb-1
            pt-2
            leading-none
            text-lg
            bg-red-500
            text-white
          "
          >{{ pago.estado }}</span
        >

        <span
          v-if="pago.estado.toUpperCase() == 'APPROVED'"
          class="
            rounded-md
            px-2
            pb-1
            pt-2
            leading-none
            text-lg
            bg-green-500
            text-white
          "
          >APROBADA</span
        >
      </div>
      <div class="u-item-elem">
        <b>Pago activo:</b>

        <span
          v-if="pago.ok"
          class="
            rounded-md
            px-2
            pb-1
            pt-2
            leading-none
            text-xs
            bg-green-500
            text-white
          "
        >
          Activo</span
        >
        <span
          v-else
          class="
            rounded-md
            px-2
            pb-1
            pt-2
            leading-none
            text-xs
            bg-red-500
            text-white
          "
        >
          No Activo</span
        >
      </div>
      <div class="u-item-elem">
        <b>Tipo:</b>
        <span class="font-bold text-indigo-100">{{ pago.tipo }}</span>
      </div>
      <div class="u-item-elem">
        <b>Valor:</b>
        <span
          class="
            bg-orange-500
            text-white text-lg
            rounded-md
            px-2
            py-1
            leading-none
          "
          >{{ pago.valor | currency }}</span
        >
      </div>
      <div class="u-item-elem">
        <b>Meses de vigencia:</b>
        <span> {{ pago.meses }} mes</span>
      </div>
      <div class="u-item-elem">
        <b>Usuarios:</b>
        <span> {{ pago.usuarios.length }}</span>
      </div>

      <div class="u-item-elem">
        <div class="flex">
          <a
            v-if="pago.url && pago.estado.toUpperCase() != 'APPROVED'"
            :href="pago.url"
            target="_blank"
            class="btn-accion"
          >
            <i class="fad fa-external-link-alt"></i>
          </a>
          <button
            v-if="pago.estado.toUpperCase() != 'APPROVED'"
            v-scroll-to="{ el: '#configuracion' }"
            class="btn-accion"
            @click="eliminarPago(pago.uid)"
          >
            <i class="far fa-trash-alt"></i>
          </button>
          <!--<nuxt-link
            v-scroll-to="{ el: '#configuracion' }"
            :to="{ path: `/empresas/usuarios/ver/` }"
            class="hidden"
          >
            <i class="fal fa-trash-alt"></i>
          </nuxt-link> -->
          <div
            v-if="pago.proximo"
            class="
              rounded-md
              px-2
              pb-1
              pt-2
              leading-none
              text-xs
              bg-yellow-700
              text-white
            "
          >
            Próximo a vencerse
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
  props: {
    pago: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    async eliminarPago(uid) {
      const respuesta = await this.elimPago(uid)
      if (!respuesta.error) {
        this.$noty.success(respuesta.mensaje, {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
      } else {
        this.$noty.error(respuesta.mensaje, {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
      }
    },
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
      @apply self-center flex items-start content-between flex-col w-full text-left;
      b {
        @apply font-light text-indigo-300 text-sm mb-1;
      }
      span {
      }
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