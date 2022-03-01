<template>
  <div class="my-4 pb-4 mx-auto lg:w-6/12">
    <div v-if="result_pse.id == null" class="ml-0 pl-0">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form novalidate @submit.stop.prevent="handleSubmit(inciarPagoPSE)">
          <ValidationProvider
            v-slot="validationContext"
            name="banco"
            :rules="{ required: true }"
          >
            <div class="p-form-control">
              <label for="banco" class="p-label"> Banco </label>
              <select
                v-model="form_pse.banco"
                name="banco"
                class="select p-select select-bordered w-full"
              >
                <option
                  v-for="(banco, b) in bancos"
                  :key="b"
                  :value="banco.value"
                >
                  {{ banco.text }}
                </option>
              </select>

              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="validationContext"
            name="tipo_cliente"
            :rules="{ required: true }"
          >
            <div class="p-form-control">
              <label for="tipo_cliente" class="p-label">
                Tipo de cliente
              </label>
              <select
                v-model="form_pse.tipo_cliente"
                name="tipo_cliente"
                class="select p-select select-bordered w-full"
              >
                <option v-for="(cl, t) in cliente" :key="t" :value="cl.value">
                  {{ cl.text }}
                </option>
              </select>

              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="validationContext"
            name="tipo_documento"
            :rules="{ required: true }"
          >
            <div class="p-form-control">
              <label for="tipo_documento" class="p-label">
                Tipo de documento
              </label>
              <select
                v-model="form_pse.tipo_documento"
                name="tipo_documento"
                class="select p-select select-bordered w-full"
              >
                <option v-for="(tp, p) in tipo" :key="p" :value="tp.value">
                  {{ tp.text }}
                </option>
              </select>

              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="validationContext"
            name="documento"
            :rules="{ required: true }"
          >
            <div class="p-form-control">
              <label for="documento" class="p-label">
                Documento del titular de la cuenta
              </label>
              <input
                v-model="form_pse.documento"
                name="documento"
                class="p-input"
                :state="getValidationState(validationContext)"
              />
              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="validationContext"
            name="nombre del titular"
            :rules="{ required: true }"
          >
            <div class="p-form-control">
              <label for="titular" class="p-label">
                Nombre del titular de la cuenta
              </label>
              <input
                v-model="form_pse.nombre_titular"
                name="titular"
                class="p-input"
                :state="getValidationState(validationContext)"
              />
              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
            </div>
          </ValidationProvider>

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
                v-model="form_pse.email"
                name="email"
                class="p-input"
                :state="getValidationState(validationContext)"
              />
              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
            </div>
          </ValidationProvider>

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
                v-model="form_pse.telefono"
                name="celular"
                class="p-input"
                :state="getValidationState(validationContext)"
              />
              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
            </div>
          </ValidationProvider>

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
              Pagar con PSE <i class="fas fa-users-medical"></i>
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <div v-if="result_pse.id != null" class="ir_pago ml-0 py-4">
      <h4>Ir a pagar con PSE</h4>

      <div class="d-flex justify-content-center">
        <a
          :href="result_pse.info.transactionResponse.extraParameters.BANK_URL"
          target="_blank"
          class="
            animate-pulse
            mt-2
            block
            btn-usuarios
            p-btn p-btn-full p-btn-primary
          "
        >
          Ir a PSE <i class="fas fa-external-link-alt"></i>
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
      form_pse: this.$p_structure('form_pse'),
      bancos: null,
      habilitarBoton: true,
      tipo: [
        { text: 'Seleccione', value: null },
        { text: 'Cédula de ciudadanía.', value: 'CE' },
        { text: 'Cédula de extranjería.', value: 'CE' },
        { text: 'Número de Identificación Tributario.', value: 'NIT' },
        { text: 'Tarjeta de Identidad.', value: 'TI' },
        { text: 'Pasaporte.', value: 'PP' },
        { text: 'Registro civil de nacimiento.', value: 'RC' },
        { text: 'Documento de identificación extranjero.', value: 'DE' },
      ],
      cliente: [
        { text: 'Seleccione', value: null },
        { text: 'Persona natural', value: 'N' },
        { text: 'Persona jurídica', value: 'J' },
      ],
      efectivo: [
        { text: 'BALOTO', value: 'BALOTO' },
        { text: 'EFECTY', value: 'EFECTY' },
      ],
      result_pse: {
        id: null,
        info: null,
      },
    }
  },
  async fetch() {
    const bancos = await this.$axios.get('/payu/bancos/')
    if (bancos.data.code === 'SUCCESS') {
      console.log('BANCOS información ->>', bancos.data.banks)

      this.bancos = bancos.data.banks.map((bank, index, array) => {
        let val = bank.pseCode
        if (index === 0) {
          val = null
        }
        return {
          text: bank.description,
          value: val,
        }
      })
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async inciarPagoPSE() {
      try {
        if (this.isLoggedIn) {
          this.habilitarBoton = false
          console.info('** PAYU Pagos PSE INIT')
          this.form_pse.usuarios = this.usuariosPendientesIds
          this.form_pse.valor = this.usuariosPendientesValor
          const resultadoRegistro = await this.realizarPagoPSE(this.form_pse)

          if (resultadoRegistro.error === false) {
            this.habilitarBoton = false
            this.result_pse.id = resultadoRegistro.data.id
            this.result_pse.info = resultadoRegistro.data.info

            this.$noty.success(resultadoRegistro.mensaje, {
              theme: 'bootstrap-v4',
              layout: 'topCenter',
            })
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