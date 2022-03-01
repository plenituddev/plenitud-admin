<template>
  <div v-if="navegacionUsuario.usuariosLoad">
    <TopPagos @iniciarPago="iniciarPago"></TopPagos>
    <div v-if="!pagar" class="mt-8">
      <div v-if="pagos.length > 0">
        <h3>Pagos registrados</h3>
        <ItemPago v-for="(pago, i) in pagos" :key="i" :pago="pago"></ItemPago>
      </div>
      <div v-else>
        <p class="text-center text-4xl">
          <i
            class="text-yellow-400 fa fa-exclamation-circle"
            aria-hidden="true"
          ></i>
          No hay pagos en el historial de {{ userData.nombre }}
        </p>
      </div>
    </div>
    <div v-else class="mt-8">
      <!-- INICIO DE PAGO  -->

      <div v-if="usuariosPendientes.length > 0" class="medio_pago py-4">
        <hr class="border-indigo-200" />
        <h4
          class="
            mt-12
            pb-2
            px-2
            text-center text-2xl
            mb-4
            uppercase
            text-indigo-200
          "
        >
          Escoge la forma de pago
        </h4>
        <div class="flex justify-around mx-auto lg:w-6/12">
          <div :class="'medio ' + (medio_pago == 'TC' ? ' active' : '')">
            <button class="p-btn" @click="cambiarMedio('TC')">
              <i class="fas fa-credit-card ml-1 mr-2"></i>
              <span class="ml-0">Tarjeta de crédito</span>
            </button>
          </div>
          <div :class="'medio ' + (medio_pago == 'PSE' ? ' active' : '')">
            <button class="p-btn" @click="cambiarMedio('PSE')">
              <i class="fas fa-money-bill ml-1 mr-2"></i>
              <span class="ml-0">PSE </span>
            </button>
          </div>
          <div
            :class="'hidden medio ' + (medio_pago == 'BALOTO' ? ' active' : '')"
          >
            <button class="p-btn" @click="cambiarMedio('BALOTO')">
              <i class="fas fa-money-bill ml-1 mr-2"></i>
              <span class="ml-0">Efectivo </span>
            </button>
          </div>
        </div>
        <FormCC v-if="medio_pago == 'TC'"></FormCC>
        <FormPse v-if="medio_pago == 'PSE'"></FormPse>
      </div>

      <!-- FIN DE PAGO -->
    </div>
  </div>
</template>

<script>
import TopPagos from '~/components/pagos/TopPagos.vue'
import ItemPago from '~/components/pagos/ItemPago.vue'
import FormPse from '~/components/pagos/FormPse.vue'
import FormCC from '~/components/pagos/FormCC.vue'
import AuthMixin from '~/mixins/auth.js'
export default {
  components: {
    TopPagos,
    FormPse,
    FormCC,
    ItemPago,
  },
  mixins: [AuthMixin],
  data() {
    return {
      pagar: false,
      medio_pago: 'TC',
    }
  },

  methods: {
    cambiarMedio(est) {
      this.medio_pago = est
    },
    iniciarPago() {
      this.pagar = true
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
  },
}
</script>

<style lang="postcss">
.medio {
  button {
    @apply text-white bg-p-blue3  hover:bg-p-blue4;
  }
  &.active {
    button {
      @apply text-white bg-p-orang  hover:bg-p-pink2;
    }
  }
}
</style>