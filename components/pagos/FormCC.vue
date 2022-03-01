<template>
  <div class="my-4 pb-4 mx-auto lg:w-6/12">
    <div v-if="!exito" class="ml-0 pl-0">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form novalidate @submit.stop.prevent="handleSubmit(inciarPagoTC)">
          <div class="mt-8 mb-4 flex space-x-8">
            <div class="md:w-8/12">
              <ValidationProvider
                v-slot="validationContext"
                name="número de tarjeta"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="numero_tarjeta" class="p-label">
                    Número de la tarjeta de crédito
                  </label>
                  <div
                    class="
                      mt-6
                      text-xl
                      absolute
                      inset-y-0
                      left-0
                      pl-3
                      flex
                      items-center
                      pointer-events-none
                    "
                  >
                    <i class="text-indigo-600" :class="cardBrandClass"></i>
                  </div>
                  <input
                    v-model="form.tarjeta.cardNumber"
                    v-cardformat:formatCardNumber
                    name="numero_tarjeta"
                    class="p-input icon"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="md:w-4/12">
              <ValidationProvider
                v-slot="validationContext"
                name="fecha de expiración"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="expiracion" class="p-label">
                    Fecha de expiración
                  </label>
                  <input
                    v-model="form.tarjeta.cardExpiry"
                    v-cardformat:formatCardExpiry
                    name="expiracion"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="mb-4 flex space-x-8">
            <div class="md:w-6/12">
              <ValidationProvider
                v-slot="validationContext"
                name="nombre en la tarjeta"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="codigo" class="p-label">
                    Código de seguridad (CVV)
                  </label>
                  <input
                    v-model="form.tarjeta.cardCvv"
                    name="codigo"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="md:w-6/12">
              <ValidationProvider
                v-slot="validationContext"
                name="nombre en la tarjeta"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="nombre_tarjeta" class="p-label">
                    Nombre en la tarjeta
                  </label>
                  <input
                    v-model="form.tarjeta.cardNombre"
                    name="nombre_tarjeta"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider
            v-slot="validationContext"
            name="documento del titular"
            :rules="{ required: true }"
          >
            <div class="p-form-control">
              <label for="documento" class="p-label">
                Documento del titular de la tarjeta
              </label>
              <input
                v-model="form.tarjeta.cedula"
                name="documento"
                class="p-input"
                :state="getValidationState(validationContext)"
              />
              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
            </div>
          </ValidationProvider>

          <div class="mb-4 flex space-x-8">
            <div class="md:w-6/12">
              <ValidationProvider
                v-slot="validationContext"
                name="nombre del titular"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="nombre_titular" class="p-label">
                    Nombre del titular de la tarjeta
                  </label>
                  <input
                    v-model="form.tarjeta.nombres"
                    name="nombre_titular"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="md:w-6/12">
              <ValidationProvider
                v-slot="validationContext"
                name="apellidos del titular"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="apellidos_titular" class="p-label">
                    Apellidos del titular de la tarjeta
                  </label>
                  <input
                    v-model="form.tarjeta.apellidos"
                    name="apellidos_titular"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="mb-4 flex space-x-8">
            <div class="md:w-6/12">
              <ValidationProvider
                v-slot="validationContext"
                name="email del titular"
                :rules="{ email: true, required: true }"
              >
                <div class="p-form-control">
                  <label for="email" class="p-label">
                    Email del titular de la cuenta
                  </label>
                  <input
                    v-model="form.tarjeta.email"
                    name="email"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="md:w-6/12">
              <ValidationProvider
                v-slot="validationContext"
                name="celular del titular"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="celular" class="p-label">
                    Celular del titular de la cuenta
                  </label>
                  <input
                    v-model="form.tarjeta.celular"
                    name="celular"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
          </div>

          <div v-if="true" class="d-flex justify-content-center">
            <button
              v-if="habilitarBoton == true"
              type="submit"
              class="
                animate-pulse
                mt-2
                block
                btn-usuarios
                p-btn p-btn-full p-btn-primary
              "
            >
              Pagar con Tarjeta de crédito <i class="fas fa-users-medical"></i>
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <div v-if="exito" class="ir_pago ml-0 py-4">
      <h4>Pago realizado con éxito</h4>
      <div class="d-flex justify-content-center">
        <a
          :href="'/pago_finalizado?referenceCode=' + id_transaccion"
          target="_blank"
          class="
            animate-pulse
            mt-2
            block
            btn-usuarios
            p-btn p-btn-full p-btn-primary
          "
        >
          Ver detalle de la transacción <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
  data() {
    return {
      form: this.$p_structure('form_tc'),
      bancos: null,
      habilitarBoton: true,
      exito: false,
      id_transaccion: null,
      result_pse: {
        id: null,
        info: null,
      },
      cardBrand: null,
    }
  },
  computed: {
    cardBrandClass() {
      console.log(this.cardBrand)
      return this.getBrandClass(this.cardBrand)
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    getBrandClass(brand) {
      let icon = ''
      brand = brand || 'unknown'
      const cardBrandToClass = {
        visa: 'fab fa-cc-visa',
        mastercard: 'fab fa-cc-mastercard',
        amex: 'fab fa-cc-amex',
        discover: 'fab fa-cc-discover',
        diners: 'fab fa-cc-diners-club',
        jcb: 'fab fa-cc-jcb',
        unknown: 'fa fa-credit-card',
      }
      const cardtipo = {
        visa: 'VISA',
        mastercard: 'MASTERCARD',
        amex: 'AMEX',
      }
      if (cardBrandToClass[brand]) {
        icon = cardBrandToClass[brand]
        this.form.tarjeta.tipo = cardtipo[brand]
      }
      console.log('icon', icon, this.form.tarjeta.tipo)
      return icon
    },
    async inciarPagoTC() {
      try {
        if (this.isLoggedIn) {
          this.habilitarBoton = false
          console.info('** PAYU Pagos TC INIT')
          this.form.usuarios = this.usuariosPendientesIds
          this.form.valor = this.usuariosPendientesValor
          const resultadoRegistro = await this.realizarPagoTC(this.form)

          if (resultadoRegistro.error === false) {
            this.habilitarBoton = false
            console.log('ID de pago:', resultadoRegistro.data.id)
            this.exito = true
            this.id_transaccion = resultadoRegistro.data.id
            this.$noty.success(resultadoRegistro.mensaje, {
              theme: 'bootstrap-v4',
              layout: 'topCenter',
            })
            this.actualizarEstadoUsuario(this.usuariosPendientesIds)
            setTimeout(this.getUsuarios, 2000)
          } else {
            this.habilitarBoton = true
            this.$noty.error(resultadoRegistro.mensaje, {
              theme: 'bootstrap-v4',
              layout: 'topCenter',
            })
          }
        } else {
          this.$router.push({
            path: '/',
            query: { logout: 1 },
          })
        }
      } catch (e) {
        this.habilitarBoton = true
        this.$noty.error('Ocurrió un error al agregar el usuario', {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
        console.error(e)
      }
    },
  },
}
</script>

<style>
</style>