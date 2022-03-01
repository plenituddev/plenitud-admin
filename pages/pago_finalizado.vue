<template>
  <transition name="p-fade">
    <div v-if="pago != null" class="container mx-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="w-3/5 bg-indigo-500 rounded-xl shadow-lg p-8">
          <div class="flex justify-between p-4 items-end">
            <div>
              <h1 class="mb-8">
                <img src="~assets/images/logo.png" alt="Plenitud Empresas" />
              </h1>
            </div>
          </div>
          <hr class="border-indigo-400 mb-4" />
          <div class="w-full mb-4 bg-indigo-500 flex">
            <h6 class="mx-4">
              <i class="fas fa-calendar-alt text-orange-500"></i> Fecha de pago:

              <span v-if="pago.creado.toDate" class="text-sm font-medium">
                {{ $moment(pago.creado.toDate()).format('YYYY-MM-DD hh:mm') }}
              </span>
            </h6>

            <h6 class="mx-4">
              <i class="fas fa-calendar-alt text-orange-500"></i> Vigencia del
              pago:

              <span v-if="pago.vigencia.toDate" class="text-sm font-medium">
                {{ $moment(pago.vigencia.toDate()).format('YYYY-MM-DD hh:mm') }}
              </span>
            </h6>
            <h6 class="mx-4">
              <i class="fas fa-file-invoice text-orange-500"></i> Número de
              orden:
              <span class="text-sm font-medium"> {{ pago.id }}</span>
            </h6>
          </div>
          <hr class="border-indigo-400 mb-4" />
          <div class="w-full p-4">
            <div class="text-sm">
              <h5 class="w-full font-bold text-xl text-orange-500 mb-4">
                Datos de la comprador :
              </h5>
              <ul class="flex space-x-8">
                <li>
                  Nombre:
                  {{ pago.empresa_info.nombre }}
                </li>
                <li>
                  Nit:
                  {{ pago.empresa_info.nit }}
                </li>
                <li>
                  Email:
                  {{ pago.empresa_info.email }}
                </li>
                <li v-if="pago.empresa_info.razon_social">
                  Razón social:
                  {{ pago.empresa_info.razon_social }}
                </li>
              </ul>
            </div>
          </div>
          <hr class="border-indigo-400 mb-4" />
          <div v-if="pago_info" class="w-full p-4">
            <div class="text-sm">
              <h5 class="w-full font-bold text-xl text-orange-500 mb-4">
                Información del pago :
              </h5>
              <ul class="flex space-x-8 space-y-4 items-end">
                <li v-if="pago_info.message">
                  <span class="block mb-2 text-xs">Estado:</span>
                  <b
                    v-if="pago_info.message == 'Aprobada'"
                    class="block py-1 px-2 bg-green-600 text-white rounded-xl"
                  >
                    {{ pago_info.message }}
                  </b>
                  <b
                    v-else
                    class="block py-1 px-2 bg-yellow-600 text-white rounded-xl"
                  >
                    {{ pago_info.message }}
                  </b>
                </li>
                <li v-if="pago_info.buyerEmail">
                  <span class="block mb-2 text-xs">Email del pagador:</span>
                  {{ pago_info.buyerEmail }}
                </li>
                <li v-if="pago_info.pseBank">
                  <span class="block mb-2 text-xs">Banco:</span>
                  {{ pago_info.pseBank }}
                </li>
                <li v-if="pago_info.lapPaymentMethod">
                  <span class="block mb-2 text-xs"> Tipo de pago:</span>
                  {{ pago_info.lapPaymentMethod }}
                </li>
              </ul>
            </div>
          </div>
          <hr class="border-indigo-400 mb-4" />
          <div class="w-full flex justify-center p-4">
            <div class="w-full text-white bg-indigo-700 shadow p-8 rounded-xl">
              <table class="w-full">
                <thead class="bg-indigo-700 text-orange-500">
                  <tr>
                    <th
                      class="
                        px-4
                        py-2
                        text-lg text-left
                        border-b border-indigo-200
                      "
                    >
                      Pago de suscripción
                    </th>
                    <th
                      class="
                        px-4
                        py-2
                        text-lg text-left
                        border-b border-indigo-200
                      "
                    >
                      Cantidad de usuarios
                    </th>
                    <th
                      class="
                        px-4
                        py-2
                        text-lg text-left
                        border-b border-indigo-200
                      "
                    >
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-indigo-700 text-white">
                  <tr class="whitespace-nowrap">
                    <td class="px-6 py-4 text-left border-b border-indigo-200">
                      Plenitud empresas
                    </td>
                    <td class="px-6 py-4 text-left border-b border-indigo-200">
                      {{ pago.usuarios.length }}
                    </td>
                    <td class="px-6 py-4 text-left border-b border-indigo-200">
                      {{ pago.valor | currency }}
                    </td>
                  </tr>
                  <!--end tr-->
                  <tr class="text-white bg-indigo-600 font-bold text-base">
                    <th class="px-6 py-2"></th>
                    <td class="px-6 py-2 text-left">Total</td>
                    <td class="px-6 py-2 text-left">
                      {{ pago.valor | currency }}
                    </td>
                  </tr>
                  <!--end tr-->
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex justify-between p-4">
            <div>
              <h3 class="text-xl">Terms And Condition :</h3>
              <ul class="text-xs list-disc list-inside">
                <li>
                  All accounts are to be paid within 7 days from receipt of
                  invoice.
                </li>
                <li>
                  To be paid by cheque or credit card or direct payment online.
                </li>
                <li>
                  If account is not paid within 7 days the credits details
                  supplied.
                </li>
              </ul>
            </div>
          </div>
          <div class="p-4">
            <div
              class="
                flex
                items-center
                justify-center
                text-center text-2xl text-indigo-100
              "
            >
              Gracias por confiar en Plenitud.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="min-h-screen flex justify-center items-center text-center"
    >
      <div>
        <h3 class="mb-2 text-xl uppercase tracking-wide">Un momento</h3>
        <Loader></Loader>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      pago: null,
      pago_info: null,
    }
  },
  async fetch() {
    if (this.$route.query.referenceCode) {
      const pago = await this.getPago(this.$route.query.referenceCode)

      if (pago.error) {
        return this.$nuxt.error({
          statusCode: 404,
          message: 'Referencia de pago no existe',
        })
      } else {
        this.pago = {
          id: pago.pago.id,
          ...pago.pago.data,
        }
        if (this.pago_info.message === 'Aprobada') {
          this.actualizarEstadoUsuario(this.pago.usuarios)
        }
        console.log('PAGO ->', this.pago)
      }
    }
  },
  beforeMount() {
    console.log('PARAMS', this.$route.query.referenceCode)
    if (!this.$route.query.referenceCode) {
      return this.$nuxt.error({
        statusCode: 404,
        message: 'Referencia de pago no existe',
      })
    } else {
      this.pago_info = this.$route.query
      if (this.pago_info.message === 'Aprobada') {
        this.aprobarPago(this.$route.query.referenceCode)
      }
      console.log('PAGO INFO->', this.pago_info)
    }
  },
  methods: {
    ...mapActions({
      getPago: 'getPago',
      aprobarPago: 'aprobarPago',
      actualizarEstadoUsuario: 'actualizarEstadoUsuario',
    }),
  },
}
</script>

<style>
</style>