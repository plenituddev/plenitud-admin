<template>
  <div v-if="form.planes" class="form_wrap" :class="lectura ? `lectura` : ``">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form novalidate @submit.stop.prevent="handleSubmit(submitConvenio)">
        <div class="form_columns">
          <div class="wrap_form_col row-span-3">
            <h3 class="text-xl mb-4 text-cream-50 font-light">Plan</h3>

            <!-- CLASICO -->
            <div v-if="form.planes.clasico" class="p-6 card bordered">
              <div class="form-control">
                <label class="cursor-pointer label">
                  <span class="label-text text-indigo-50 text-xl"
                    >Plan Clásico</span
                  >
                  <input
                    v-model="form.planes.clasico.activo"
                    type="checkbox"
                    checked="checked"
                    class="checkbox checkbox-accent"
                    :disabled="lectura"
                  />
                </label>
              </div>
              <div v-if="form.planes.clasico.activo">
                <div class="flex space-x-4">
                  <div class="w-1/2">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="plan"
                      :rules="form.planes.clasico.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="plan" class="p-label"> Beneficiarios</label>
                        <select
                          v-model="form.planes.clasico.beneficiarios"
                          name="plan"
                          class="select p-select select-bordered w-full"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
                        >
                          <option v-for="i in 6" :key="i" :value="i">
                            {{ i }}
                          </option>
                        </select>

                        <span class="p-error">
                          {{ validationContext.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="w-1/2">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="plan"
                      :rules="form.planes.clasico.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="plan" class="p-label"> Mascotas</label>
                        <select
                          v-model="form.planes.clasico.mascotas.mascotas"
                          name="plan"
                          class="select p-select select-bordered w-full"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
                        >
                          <option v-for="i in 4" :key="i" :value="i - 1">
                            {{ i - 1 }}
                          </option>
                        </select>

                        <span class="p-error">
                          {{ validationContext.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="w-full">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="valor mensual"
                      :rules="form.planes.clasico.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="empresa" class="p-label">
                          Valor mensual
                        </label>
                        <input
                          v-model="form.planes.clasico.tipo.valor"
                          name="valor"
                          class="p-input"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
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
              </div>
            </div>

            <!-- CLASICO -->

            <!-- MASCOTAS -->
            <div v-if="form.planes.mascotas" class="p-6 card bordered">
              <div class="form-control">
                <label class="cursor-pointer label">
                  <span class="label-text text-indigo-50 text-xl"
                    >Plan Mascotas</span
                  >
                  <input
                    v-model="form.planes.mascotas.activo"
                    type="checkbox"
                    checked="checked"
                    class="checkbox checkbox-accent"
                    :disabled="lectura"
                  />
                </label>
              </div>
              <div v-if="form.planes.mascotas.activo">
                <div class="flex space-x-4">
                  <div class="w-1/2">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="plan"
                      :rules="form.planes.mascotas.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="plan" class="p-label"> Beneficiarios</label>
                        <select
                          v-model="form.planes.mascotas.beneficiarios"
                          name="plan"
                          class="select p-select select-bordered w-full"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
                        >
                          <option v-for="i in 6" :key="i" :value="i">
                            {{ i }}
                          </option>
                        </select>

                        <span class="p-error">
                          {{ validationContext.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="w-1/2">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="plan"
                      :rules="form.planes.mascotas.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="plan" class="p-label"> Mascotas</label>
                        <select
                          v-model="form.planes.mascotas.mascotas.mascotas"
                          name="plan"
                          class="select p-select select-bordered w-full"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
                        >
                          <option v-for="i in 4" :key="i" :value="i">
                            {{ i }}
                          </option>
                        </select>

                        <span class="p-error">
                          {{ validationContext.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="w-full">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="valor mensual"
                      :rules="form.planes.mascotas.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="empresa" class="p-label">
                          Valor mensual
                        </label>
                        <input
                          v-model="form.planes.mascotas.tipo.valor"
                          name="valor"
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
                </div>
              </div>
            </div>

            <!-- MASCOTAS -->

            <!-- SUPERIOR -->
            <div v-if="form.planes.superior" class="p-6 card bordered">
              <div class="form-control">
                <label class="cursor-pointer label">
                  <span class="label-text text-indigo-50 text-xl"
                    >Plan Superior</span
                  >
                  <input
                    v-model="form.planes.superior.activo"
                    type="checkbox"
                    checked="checked"
                    class="checkbox checkbox-accent"
                    :disabled="lectura"
                  />
                </label>
              </div>
              <div v-if="form.planes.superior.activo">
                <div class="flex space-x-4">
                  <div class="w-1/2">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="plan"
                      :rules="form.planes.superior.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="plan" class="p-label"> Beneficiarios</label>
                        <select
                          v-model="form.planes.superior.beneficiarios"
                          name="plan"
                          class="select p-select select-bordered w-full"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
                        >
                          <option v-for="i in 6" :key="i" :value="i">
                            {{ i }}
                          </option>
                        </select>

                        <span class="p-error">
                          {{ validationContext.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="w-1/2">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="plan"
                      :rules="form.planes.superior.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="plan" class="p-label"> Mascotas</label>
                        <select
                          v-model="form.planes.superior.mascotas.mascotas"
                          name="plan"
                          class="select p-select select-bordered w-full"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
                        >
                          <option v-for="i in 4" :key="i" :value="i - 1">
                            {{ i - 1 }}
                          </option>
                        </select>

                        <span class="p-error">
                          {{ validationContext.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="w-full">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="valor mensual"
                      :rules="form.planes.superior.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="empresa" class="p-label">
                          Valor mensual
                        </label>
                        <input
                          v-model="form.planes.superior.tipo.valor"
                          name="valor"
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
                </div>
              </div>
            </div>

            <!-- SUPERIOR -->

            <!-- ELITE -->
            <div v-if="form.planes.elite" class="p-6 card bordered">
              <div class="form-control">
                <label class="cursor-pointer label">
                  <span class="label-text text-indigo-50 text-xl"
                    >Plan Élite</span
                  >
                  <input
                    v-model="form.planes.elite.activo"
                    type="checkbox"
                    checked="checked"
                    class="checkbox checkbox-accent"
                    :disabled="lectura"
                  />
                </label>
              </div>
              <div v-if="form.planes.elite.activo">
                <div class="flex space-x-4">
                  <div class="w-1/2">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="plan"
                      :rules="form.planes.elite.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="plan" class="p-label"> Beneficiarios</label>
                        <select
                          v-model="form.planes.elite.beneficiarios"
                          name="plan"
                          class="select p-select select-bordered w-full"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
                        >
                          <option v-for="i in 6" :key="i" :value="i">
                            {{ i }}
                          </option>
                        </select>

                        <span class="p-error">
                          {{ validationContext.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="w-1/2">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="plan"
                      :rules="form.planes.elite.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="plan" class="p-label"> Mascotas</label>
                        <select
                          v-model="form.planes.elite.mascotas.mascotas"
                          name="plan"
                          class="select p-select select-bordered w-full"
                          :class="lectura ? `disabled showd` : ``"
                          :disabled="lectura"
                        >
                          <option v-for="i in 4" :key="i" :value="i - 1">
                            {{ i - 1 }}
                          </option>
                        </select>

                        <span class="p-error">
                          {{ validationContext.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="w-full">
                    <ValidationProvider
                      v-slot="validationContext"
                      name="valor mensual"
                      :rules="form.planes.elite.activo ? `required` : ``"
                    >
                      <div class="p-form-control">
                        <label for="empresa" class="p-label">
                          Valor mensual
                        </label>
                        <input
                          v-model="form.planes.elite.tipo.valor"
                          name="valor"
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
                </div>
              </div>
            </div>

            <!-- SUPERIOR -->
          </div>

          <div class="wrap_form_col row-span-2">
            <h3 class="text-xl mb-4 text-cream-50 font-light">
              Información del convenio
            </h3>
            <div class="form-control mb-4">
              <label class="cursor-pointer label">
                <span class="label-text text-indigo-50">Convenio activo</span>
                <input
                  v-model="form.activo"
                  type="checkbox"
                  checked="checked"
                  class="checkbox checkbox-accent"
                  :disabled="lectura"
                />
              </label>
            </div>
            <div class="form-control mb-4">
              <label class="cursor-pointer label">
                <span class="label-text text-indigo-50"
                  >Es de un único uso</span
                >
                <input
                  v-model="form.unico"
                  type="checkbox"
                  checked="checked"
                  class="checkbox checkbox-accent"
                  :disabled="lectura"
                />
              </label>
            </div>

            <ValidationProvider
              v-slot="validationContext"
              name="nombre"
              :rules="{ required: true }"
            >
              <div class="p-form-control">
                <label for="nombre" class="p-label">Nombre del convenio </label>
                <input
                  v-model="form.nombre"
                  name="nombre"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura || edicion"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              v-slot="validationContext"
              name="id"
              :rules="{ required: true }"
            >
              <div class="p-form-control">
                <label for="id" class="p-label">Código del convenio </label>
                <input
                  v-model="form.id"
                  name="id"
                  class="p-input"
                  :class="lectura ? `disabled showd` : ``"
                  :disabled="lectura || edicion"
                  :state="getValidationState(validationContext)"
                />
                <span class="p-error">
                  {{ validationContext.errors[0] }}
                </span>
              </div>
            </ValidationProvider>
            <div v-if="lectura || edicion" class="p-form-control">
              <label for="id" class="p-label">Bitly </label>
              <input
                v-model="form.bitly"
                name="id"
                class="p-input"
                :class="lectura ? `disabled showd` : ``"
                :disabled="true"
              />
            </div>
          </div>
        </div>

        <div v-if="!lectura" class="w-full flex justify-end m-4 p-8">
          <transition name="p-fade">
            <div v-if="habilitarBoton">
              <button class="p-btn" type="submit">
                <template v-if="edicion"> Actualizar convenio</template>
                <template v-else> Guardar convenio</template>
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
    convenioInfo: {
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

      listo: null,
      nombre: null,
      form: this.$p_structure('convenioE'),
    }
  },

  mounted() {
    if (this.convenioInfo) {
      console.info('FormAgregar convenioInfo', this.convenioInfo)
      this.form = this.convenioInfo
    }
    // this.setFechas()
  },

  methods: {
    verificarArchivo() {
      if (this.$refs.archivo.files.length > 0) {
        this.listo = true
        this.nombre = this.$refs.archivo.files[0].name
      } else {
        this.listo = false
        this.nombre = null
      }
    },
    uploadFile() {
      const file = this.$refs.archivo.files[0]
      const name = +new Date() + '-' + this.form.id
      const metadata = { contentType: file.type }

      const task = this.$fire.storage
        .ref()
        .child('convenios/' + name)
        .put(file, metadata)

      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          this.$noty.success('Archivo cargado con éxito', {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          console.log(url)
          this.form.logo = url
        })
        .catch((error) => {
          this.$noty.success('Ocurrió un error al cargar el archivo', {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
          console.error(error)
        })
    },
    async submitConvenio() {
      try {
        this.habilitarBoton = false

        this.form.planes.clasico.tipo.valor = parseInt(
          this.form.planes.clasico.tipo.valor
        )
        this.form.planes.mascotas.tipo.valor = parseInt(
          this.form.planes.mascotas.tipo.valor
        )
        this.form.planes.superior.tipo.valor = parseInt(
          this.form.planes.superior.tipo.valor
        )
        this.form.planes.elite.tipo.valor = parseInt(
          this.form.planes.elite.tipo.valor
        )

        const resultadoRegistro = !this.edicion
          ? await this.guardarConvenioE(this.form)
          : await this.editarConvenioE(this.form)
        // console.log(this.$options.name, 'agregarUsuario ', resultadoRegistro)

        if (resultadoRegistro.error === false) {
          if (!this.edicion) {
            this.form = this.$p_structure('convenio')
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
.card {
  @apply border-indigo-400 mb-8;
}
.vbga-results {
  @apply absolute z-10 bg-indigo-100 text-indigo-400 p-4 border rounded-xl shadow;

  li {
    width: 280px;
    @apply text-sm font-light border-b border-indigo-500 py-2 px-1 cursor-pointer;
  }
}
</style>