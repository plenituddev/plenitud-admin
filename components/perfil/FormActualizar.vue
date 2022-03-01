<template>
  <div v-if="isLoggedIn" class="form_wrap">
    <Header titulo="Perfil de la empresa"></Header>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form
          novalidate
          @submit.stop.prevent="handleSubmit(actualizarPerfilForm)"
        >
          <div class="form_columns">
            <div class="wrap_form_col row-span-3">
              <h3 class="text-xl mb-4 text-cream-50 font-light">
                Información de la empresa
              </h3>

              <ValidationProvider
                v-slot="validationContext"
                name="empresa"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label for="empresa" class="p-label"> Empresa </label>
                  <input
                    v-model="p_empresa"
                    name="empresa"
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
                name="nit"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label for="nit" class="p-label"> NIT </label>
                  <input
                    v-model="p_nit"
                    name="nit"
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
                name="Razón social"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label for="razon_social" class="p-label">
                    Razón social
                  </label>
                  <input
                    v-model="p_razon_social"
                    name="nit"
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
                name="Celular de la empresa"
              >
                <div class="p-form-control">
                  <label for="razon_social" class="p-label"
                    >Celular de la empresa
                  </label>
                  <input
                    v-model="p_empresa_celular"
                    name="empresa_celular"
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
                name="teléfono de la empresa"
              >
                <div class="p-form-control">
                  <label for="empresa_celular" class="p-label"
                    >Teléfono de la empresa
                  </label>
                  <input
                    v-model="p_empresa_telefono"
                    name="empresa_celular"
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
                name="email de la empresa"
                :rules="{ email: true }"
              >
                <div class="p-form-control">
                  <label for="email_celular" class="p-label"
                    >Email de la empresa
                  </label>
                  <input
                    v-model="p_empresa_email"
                    name="email_celular"
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
                name="dirección"
                :rules="{ required: true }"
              >
                <div class="p-form-control">
                  <label for="direccion" class="p-label"
                    >Dirección de la empresa
                  </label>
                  <input
                    v-model="p_empresa_direccion"
                    name="direccion"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
              <div class="p-form-control">
                <google-places-autocomplete
                  :place="p_direccion.info"
                  :value="p_direccion.dir_completa"
                  @resultChanged="cambioDireccion"
                >
                  <div slot="input" slot-scope="{ context, events, actions }">
                    <label for="departamento" class="p-label"
                      >Departamento y municipio
                    </label>
                    <input
                      id="locationInput"
                      v-model="context.input"
                      name="departamento"
                      class="p-input"
                      type="search"
                      @focus="events.inputHasReceivedFocus"
                      @input="events.inputHasChanged"
                      @keydown.enter.prevent="actions.selectItemFromList"
                      @keydown.down.prevent="actions.shiftResultsSelection"
                      @keydown.up.prevent="actions.unshiftResultsSelection"
                    />
                  </div>

                  ></google-places-autocomplete
                >
                <div
                  id="direccion-feedback"
                  :class="'invalid-feedback ' + (error_mapa ? 'd-block' : '')"
                >
                  {{ mensaje_mapa }}
                </div>
              </div>
            </div>

            <div class="wrap_form_col">
              <h3 class="text-xl mb-4 text-cream-50 font-light">
                Información del representante
              </h3>
              <ValidationProvider
                v-slot="validationContext"
                name="email"
                :rules="{ email: true, required: true }"
              >
                <div class="p-form-control">
                  <label for="" class="p-label"> Email </label>
                  <input
                    v-model="userData.email"
                    class="p-input"
                    type="email"
                    disabled
                    required
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="validationContext"
                name="usuario"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label for="nombre" class="p-label"> Tu nombre </label>
                  <input
                    v-model="p_nombre"
                    name="nombre"
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
                name="celular"
                :rules="`required`"
              >
                <div class="p-form-control">
                  <label for="celular" class="p-label"> Celular </label>
                  <input
                    v-model="p_celular"
                    name="celular"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                    @keypress="NumbersOnly"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>

            <div class="wrap_form_col row-span-2">
              <h3 class="text-xl mb-4 text-cream-50 font-light">
                Información de contacto
              </h3>
              <ValidationProvider v-slot="validationContext" name="empresa">
                <div class="p-form-control">
                  <label for="p_contacto_telefono" class="p-label">
                    Nombre
                  </label>
                  <input
                    v-model="p_contacto_nombre"
                    name="p_contacto_telefono"
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
                name="email"
                :rules="{ email: true }"
              >
                <div class="p-form-control">
                  <label for="p_contacto_email" class="p-label"> Email </label>
                  <input
                    v-model="p_contacto_email"
                    name="p_contacto_email"
                    class="p-input"
                    :state="getValidationState(validationContext)"
                  />
                  <span class="p-error">
                    {{ validationContext.errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
              <ValidationProvider v-slot="validationContext" name="teléfono">
                <div class="p-form-control">
                  <label for="p_contacto_telefono" class="p-label">
                    Teléfono
                  </label>
                  <input
                    v-model="p_contacto_telefono"
                    name="p_contacto_telefono"
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

          <div class="w-full flex justify-end m-4 p-8">
            <transition name="p-fade">
              <div v-if="habilitarBoton">
                <button class="p-btn" type="submit">
                  Actualizar <i class="fal fa-sign-in"></i>
                </button>
              </div>
            </transition>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { extend } from 'vee-validate'
import { GooglePlacesAutocomplete } from 'vue-better-google-places-autocomplete'

import AuthMixin from '~/mixins/auth.js'
extend('username', {
  validate(value, args) {
    console.log(args.val)
    return args.val === 'false'
  },
  params: ['val'],
  message: 'This username is already taken',
})

export default {
  components: {
    'google-places-autocomplete': GooglePlacesAutocomplete,
  },
  mixins: [AuthMixin],
  data() {
    return {
      isExist: false,
      showPass: false,
      habilitarBoton: true,
      autocomplete: null,
      places: null,
      map: null,
      error_mapa: false,
      mensaje_mapa: '',
    }
  },

  computed: {
    p_nombre: {
      get() {
        return this.userData.nombre
      },
      set(value) {
        this.setUserDataField({
          field: 'nombre',
          value,
        })
      },
    },
    p_empresa: {
      get() {
        return this.userData.empresa
      },
      set(value) {
        this.setUserDataField({
          field: 'empresa',
          value,
        })
      },
    },
    p_celular: {
      get() {
        return this.userData.celular
      },
      set(value) {
        this.setUserDataField({
          field: 'celular',
          value,
        })
      },
    },
    p_nit: {
      get() {
        return this.userData.nit
      },
      set(value) {
        this.setUserDataField({
          field: 'nit',
          value,
        })
      },
    },
    p_razon_social: {
      get() {
        return this.userData.razon_social
      },
      set(value) {
        this.setUserDataField({
          field: 'razon_social',
          value,
        })
      },
    },
    p_direccion: {
      get() {
        return this.userData.direccion
      },
      set(value) {
        this.setUserDataField({
          field: 'direccion',
          value,
        })
      },
    },
    p_empresa_direccion: {
      get() {
        return this.userData.empresa_direccion
      },
      set(value) {
        this.setUserDataField({
          field: 'empresa_direccion',
          value,
        })
      },
    },

    p_empresa_telefono: {
      get() {
        return this.userData.empresa_telefono
      },
      set(value) {
        this.setUserDataField({
          field: 'empresa_telefono',
          value,
        })
      },
    },

    p_empresa_celular: {
      get() {
        return this.userData.empresa_celular
      },
      set(value) {
        this.setUserDataField({
          field: 'empresa_celular',
          value,
        })
      },
    },
    p_empresa_email: {
      get() {
        return this.userData.empresa_email
      },
      set(value) {
        this.setUserDataField({
          field: 'empresa_email',
          value,
        })
      },
    },
    p_contacto_nombre: {
      get() {
        return this.userData.contacto_nombre
      },
      set(value) {
        this.setUserDataField({
          field: 'contacto_nombre',
          value,
        })
      },
    },
    p_contacto_telefono: {
      get() {
        return this.userData.contacto_telefono
      },
      set(value) {
        this.setUserDataField({
          field: 'contacto_telefono',
          value,
        })
      },
    },

    p_contacto_email: {
      get() {
        return this.userData.contacto_email
      },
      set(value) {
        this.setUserDataField({
          field: 'contacto_email',
          value,
        })
      },
    },
  },
  mounted() {
    extend('uniqueEmail', {
      validate: this.isEmailUnique,
      message: 'Ya existe una persona registrada con este email',
    })
    // this.$nuxt.error({ statusCode: 403 })
  },
  methods: {
    cambioDireccion(place) {
      console.log('Ubicación', place)
      this.p_direccion = {}
      this.p_direccion.dir_completa = place.formatted_address
      this.p_direccion.dir_corta = place.name
      this.p_direccion.info = JSON.parse(JSON.stringify(place))

      this.p_direccion.latitude = place.geometry.location.lat()
      this.p_direccion.longitude = place.geometry.location.lng()
      this.error_mapa = false
      let municipio = false
      let pais = false
      for (let i = 0; i < place.address_components.length; i++) {
        for (let j = 0; j < place.address_components[i].types.length; j++) {
          if (place.address_components[i].types[j].includes('locality')) {
            municipio = true
            this.p_direccion.municipio = place.address_components[i].long_name
          }
          if (place.address_components[i].types[j] === 'postal_code') {
            this.p_direccion.postal = place.address_components[i].long_name
          }
          if (
            place.address_components[i].types[j].includes(
              'administrative_area_level_1'
            )
          ) {
            this.p_direccion.departamento =
              place.address_components[i].long_name
          }
          if (place.address_components[i].types[j].includes('country')) {
            if (place.address_components[i].short_name === 'CO') {
              pais = true
            }
          }
        }
      }
      if (municipio === false) {
        this.error_mapa = true
        this.mensaje_mapa = 'Debes ingresar un municipio'
      }
      if (pais === false) {
        this.error_mapa = true
        this.mensaje_mapa = 'Debes ingresar una dirección en Colombia'
      }
      console.log('DIRECCION ', this.p_direccion)
    },
    async actualizarPerfilForm() {
      try {
        if (this.isLoggedIn) {
          this.habilitarBoton = false
          const resultadoRegistro = await this.actualizarPerfil({})
          console.log(
            this.$options.name,
            'resultadoRegistro ',
            resultadoRegistro
          )
          if (resultadoRegistro.error === false) {
            this.habilitarBoton = true
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
        console.error(e)
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async isEmailUnique() {
      try {
        const usuarioRef = await this.$fire.auth.getUserByEmail(this.form.email)
        console.log('Usuario email: ', usuarioRef)

        return false
      } catch (err) {
        console.log('Usuario email error:', err)
        return true
      }
    },
  },
}
</script>

<style lang="postcss">
.form_columns {
  @apply w-full grid grid-cols-1 lg:grid-cols-2 gap-4;

  .wrap_form_col {
    @apply border border-indigo-400 rounded-xl p-8 transition-all transition duration-500 mb-4;
    &:focus-within {
      @apply shadow-lg bg-indigo-600;
    }
  }
}
.vbga-results {
  @apply absolute z-10 bg-indigo-100 text-indigo-400 p-4 border rounded-xl shadow;

  li {
    width: 280px;
    @apply text-sm font-light border-b border-indigo-500 py-2 px-1 cursor-pointer;
  }
}
</style>