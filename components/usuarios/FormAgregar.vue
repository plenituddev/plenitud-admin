<template>
  <div v-if="isLoggedIn" class="form_wrap" :class="lectura ? `lectura` : ``">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(submitUsuario)">
        <div class="form_columns">
          <div class="wrap_form_col row-span-3">
            <h3 class="text-xl mb-4 text-cream-50 font-light">Plan</h3>

            <ValidationProvider
              v-slot="validationContext"
              name="plan"
              :rules="`required`"
            >
              <div class="p-form-control">
                <label for="plan" class="p-label"> Plan Plenitud </label>
                <select
                  v-model="form.planes"
                  name="plan"
                  class="select p-select select-bordered w-full"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura || edicion"
                >
                  <option :value="planes.clasico">
                    PLENITUD CLÁSICO -
                    {{ planes.clasico.tipo.valor | currency }}
                  </option>
                  <option :value="planes.superior">
                    PLENITUD SUPERIOR -
                    {{ planes.superior.tipo.valor | currency }}
                  </option>
                  <option :value="planes.elite">
                    PLENITUD ÉLITE - {{ planes.elite.tipo.valor | currency }}
                  </option>
                </select>

                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>

            <h3 class="text-xl mb-4 text-cream-50 font-light">
              Información personal
            </h3>

            <ValidationProvider
              v-slot="validationContext"
              name="primer nombre"
              :rules="`required`"
            >
              <div class="p-form-control">
                <label for="empresa" class="p-label"> Primer nombre </label>
                <input
                  v-model="form.personales.nombres[0]"
                  name="primer_nombre"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="validationContext"
              name="segundo nombre"
            >
              <div class="p-form-control">
                <label for="empresa" class="p-label"> Segundo nombre </label>
                <input
                  v-model="form.personales.nombres[1]"
                  name="primer_nombre"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                  :state="getValidationState(validationContext)"
                />
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="validationContext"
              name="primer apellido"
              :rules="{ required: true }"
            >
              <div class="p-form-control">
                <label for="primer_apellido" class="p-label">
                  Primer apellido
                </label>
                <input
                  v-model="form.personales.apellidos[0]"
                  name="primer_apellido"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="validationContext"
              name="primer apellido"
            >
              <div class="p-form-control">
                <label for="segundo_apellido" class="p-label">
                  Segundo apellido
                </label>
                <input
                  v-model="form.personales.apellidos[1]"
                  name="segundo_apellido"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                  :state="getValidationState(validationContext)"
                />
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="validationContext"
              name="género"
              :rules="`required`"
            >
              <div class="p-form-control">
                <label for="genero" class="p-label"> Género </label>

                <select
                  v-model="form.personales.sexo"
                  name="genero"
                  class="select p-select select-bordered w-full"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                >
                  <option :value="null" disabled="disabled" selected="selected">
                    Selecciona
                  </option>
                  <option value="Mujer">Mujer</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Otro">Otro</option>
                </select>

                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="validationContext"
              name="fecha"
              :rules="{ required: true }"
            >
              <div class="p-form-control">
                <label for="fecha" class="p-label"> Fecha de nacimiento </label>
                <input
                  v-model="form.fecha"
                  name="fecha"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                  :state="getValidationState(validationContext)"
                  type="date"
                  :min="minDateS"
                  :max="maxDateS"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>

          <div class="wrap_form_col">
            <h3 class="text-xl mb-4 text-cream-50 font-light">
              Información de contácto
            </h3>
            <ValidationProvider
              v-slot="validationContext"
              name="email"
              :rules="{ email: true, required: true }"
            >
              <div class="p-form-control">
                <label for="" class="p-label"> Email </label>
                <input
                  v-model="form.contacto.email"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura || edicion"
                  type="email"
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
              :rules="{ required: true }"
            >
              <div class="p-form-control">
                <label for="celular" class="p-label"> Teléfono celular </label>
                <input
                  v-model="form.contacto.celular"
                  name="celular"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="validationContext"
              name="departamento"
              :rules="`required`"
            >
              <div class="p-form-control">
                <label for="departamento" class="p-label"> Departamento </label>

                <select
                  v-model="form.contacto.departamento"
                  name="departamento"
                  class="select p-select select-bordered w-full"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                  @change="cambiarDepartamento"
                >
                  <option :value="null" disabled="disabled" selected="selected">
                    Selecciona un departamento
                  </option>
                  <option
                    v-for="(departamento, i) in departamentos"
                    :key="i"
                    :value="departamento.value"
                    class="uppercase"
                  >
                    {{ departamento.text }}
                  </option>
                </select>

                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="validationContext"
              name="municipio"
              :rules="`required`"
            >
              <div class="p-form-control">
                <label for="municipio" class="p-label"> Municipio </label>

                <select
                  v-model="form.contacto.municipio"
                  class="select p-select select-bordered w-full"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                >
                  <template v-if="usuarioinfo && lectura">
                    <option
                      :value="usuarioinfo.contacto.municipio"
                      name="municipio"
                      disabled="disabled"
                      selected="selected"
                    >
                      {{ usuarioinfo.contacto.municipio.nombre }}
                    </option>
                  </template>
                  <template v-else>
                    <option
                      v-if="municipios == null"
                      :value="null"
                      name="municipio"
                      disabled="disabled"
                      selected="selected"
                    >
                      Selecciona un departamento primero
                    </option>
                    <option
                      v-for="(municipio, j) in municipios"
                      :key="j"
                      :value="municipio.value"
                      :selected="j == 0"
                      class="uppercase"
                    >
                      {{ municipio.text }}
                    </option>
                  </template>
                </select>

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
                <label for="direccion" class="p-label"> Dirección </label>
                <input
                  v-model="form.contacto.direccion"
                  name="direccion"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>

          <div class="wrap_form_col row-span-2">
            <h3 class="text-xl mb-4 text-cream-50 font-light">Documento</h3>
            <ValidationProvider
              v-slot="validationContext"
              name="tipo de documento"
              :rules="`required`"
            >
              <div class="p-form-control">
                <label for="tipo_documento" class="p-label">
                  Tipo de documento
                </label>

                <select
                  v-model="form.personales.tipo"
                  name="tipo_documento"
                  class="select p-select select-bordered w-full"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura || edicion"
                >
                  <option :value="null" disabled="disabled" selected="selected">
                    Selecciona
                  </option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="PAS">Pasaporte</option>
                  <option value="CE">Cédula de extranjería</option>
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
                <label for="documento" class="p-label"
                  >Número de documento
                </label>
                <input
                  v-model="form.documento"
                  name="documento"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura || edicion"
                  :state="getValidationState(validationContext)"
                  @keypress="NumbersOnly"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
        </div>

        <div v-if="!lectura" class="w-full flex justify-end m-4 p-8">
          <transition name="p-fade">
            <div v-if="habilitarBoton">
              <button class="p-btn" type="submit">
                <template v-if="edicion"> Actualizar usuario</template>
                <template v-else> Guardar usuario</template>
                <i class="fal fa-sign-in"></i>
              </button>
            </div>
          </transition>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { extend } from 'vee-validate'
import departamentos from '~/static/departamentos.json'
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
  mixins: [AuthMixin],
  props: {
    lectura: {
      type: Boolean,
      default: false,
    },
    edicion: {
      type: Boolean,
      default: false,
    },
    usuarioinfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      departamentos,
      municipios: null,
      isExist: false,
      showPass: false,
      habilitarBoton: true,
      autocomplete: null,
      places: null,
      map: null,
      error_mapa: false,
      mensaje_mapa: '',
      minDateS: null,
      maxDateS: null,
      form: this.$p_structure('usuarioForm'),
      planes: this.$p_structure('planes'),
    }
  },

  mounted() {
    extend('uniqueEmail', {
      validate: this.isEmailUnique,
      message: 'Ya existe una persona registrada con este email',
    })
    if (this.usuarioinfo) {
      console.info('FormAgregar usuarioinfo', this.usuarioinfo)
      this.form = this.usuarioinfo
      if (this.usuarioinfo.planes.tipo.codigo === 'CLASICOE') {
        this.form.planes = this.planes.clasico
      }
      if (this.usuarioinfo.planes.tipo.codigo === 'SUPERIORE') {
        this.form.planes = this.planes.superior
      }
      if (this.usuarioinfo.planes.tipo.codigo === 'ELITEE') {
        this.form.planes = this.planes.elite
      }
      this.municipios =
        this.departamentos[this.usuarioinfo.contacto.departamento].municipios
    } else {
      this.form.empresaref = this.authUser.uid
      this.form.planes = this.planes.clasico
    }

    this.setFechas()
  },

  methods: {
    setFechas() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const minDate = new Date(today)
      minDate.setYear(minDate.getFullYear() - 65)
      const maxDate = new Date(today)
      maxDate.setYear(maxDate.getFullYear() - 18)
      this.maxDateS = this.$moment(maxDate).format('YYYY-MM-DD')
      this.minDateS = this.$moment(minDate).format('YYYY-MM-DD')
    },

    cambiarDepartamento(evt) {
      this.municipios =
        this.departamentos[this.form.contacto.departamento].municipios

      this.form.contacto.municipio = this.municipios[0].value

      console.log(
        'Departamento',
        this.form.contacto.departamento,
        this.municipios
      )
    },

    async submitUsuario() {
      try {
        if (this.isLoggedIn) {
          this.habilitarBoton = false

          const resultadoRegistro = !this.edicion
            ? await this.agregarUsuario(this.form)
            : await this.editarUsuario(this.form)
          // console.log(this.$options.name, 'agregarUsuario ', resultadoRegistro)

          if (resultadoRegistro.error === false) {
            if (!this.edicion) {
              this.form = this.$p_structure('usuarioForm')
              this.form.empresaref = this.authUser.uid
              this.form.planes = this.planes.clasico
            }

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
        this.habilitarBoton = true
        this.$noty.error('Ocurrió un error al agregar el usuario', {
          theme: 'bootstrap-v4',
          layout: 'topCenter',
        })
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
    h3 {
      @apply border-b border-yellow-400 pb-2;
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