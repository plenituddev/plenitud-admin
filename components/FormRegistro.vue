<template>
  <div class="form_wrap">
    <div class="mx-auto max-w-md">
      <h1 class="text-3xl mb-8 text-p-yellow">
        ¿Estás interesado en una cuenta empresarial?
      </h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form novalidate @submit.stop.prevent="handleSubmit(setEmail)">
          <ValidationProvider
            v-slot="validationContext"
            name="email"
            :rules="{ email: true, required: true }"
          >
            <div class="p-form-control">
              <label for="" class="p-label"> Email </label>
              <input
                v-model="form.email"
                class="p-input"
                type="email"
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
                v-model="form.nombre"
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
            name="empresa"
            :rules="`required`"
          >
            <div class="p-form-control">
              <label for="empresa" class="p-label"> Empresa </label>
              <input
                v-model="form.empresa"
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
            name="celular"
            :rules="`required`"
          >
            <div class="p-form-control">
              <label for="celular" class="p-label"> Celular </label>
              <input
                v-model="form.celular"
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

          <ValidationProvider
            v-slot="validationContext"
            name="contraseña"
            :rules="{ required: true, regex: /(?=.*[0-9a-zA-Z]).{6,}/ }"
          >
            <div class="p-form-control">
              <label for="password" class="p-label"> Contraseña </label>
              <div class="relative">
                <input
                  v-model="form.password"
                  name="password"
                  class="p-input"
                  :state="getValidationState(validationContext)"
                  :type="showPass ? 'text' : 'password'"
                />
                <div class="p-icon leading-5" @click="showPass = !showPass">
                  <i v-if="showPass" class="fal fa-eye-slash"></i>
                  <i v-else class="fal fa-eye"></i>
                </div>
              </div>

              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>

              <div class="p-validate">
                <ul>
                  <li>
                    <i
                      v-if="form.password.length > 5"
                      class="fas fa-check-circle"
                    ></i>
                    <i v-else class="fas fa-circle"></i>
                    <span> La contraseña debe tener más de 6 caracteres</span>
                  </li>
                  <li>
                    <i
                      v-if="/(?=.*[0-9a-zA-Z]).{6,}/.test(form.password)"
                      class="fas fa-check-circle"
                    ></i>
                    <i v-else class="fas fa-circle"></i>
                    <span>
                      Se permiten mayúsculas, minúsculas, números, espacios y
                      caracteres especiales</span
                    >
                  </li>
                </ul>
              </div>
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
                v-model="form.nit"
                name="nit"
                class="p-input"
                :state="getValidationState(validationContext)"
              />
              <span class="p-error">
                {{ validationContext.errors[0] }}
              </span>
              <div class="p-validate text-xs">
                Ingresa el NIT sin dígito de verificación, sin espacios ni
                puntos
              </div>
            </div>
          </ValidationProvider>

          <div class="p-form-control">
            <div class="py-3 px-6 card">
              <ValidationProvider
                v-slot="validationContext"
                name="terminos y condiciones"
                :rules="`required`"
              >
                <div class="form-control">
                  <label
                    class="
                      label
                      flex flex-row flex-wrap
                      w-100
                      justify-between
                      w-full
                    "
                  >
                    <span class="label-text text-white"
                      >Acepto los
                      <a
                        href="http://grupoplenitud.com/CO/terminos"
                        target="_blank"
                        >Términos y condiciones</a
                      ></span
                    >
                    <input
                      v-model="form.terminos"
                      name="terminos"
                      type="checkbox"
                      class="checkbox checkbox-secondary flex-none"
                      :state="getValidationState(validationContext)"
                    />
                    <span class="p-error">
                      {{ validationContext.errors[0] }}
                    </span>
                  </label>
                </div>
              </ValidationProvider>
              <ValidationProvider
                v-slot="validationContext"
                name="politicas"
                :rules="`required`"
              >
                <div class="form-control">
                  <label
                    class="
                      label
                      flex flex-row flex-wrap
                      w-100
                      justify-between
                      w-full
                    "
                  >
                    <span class="label-text text-white"
                      >Acepto las
                      <a
                        href="https://grupoplenitud.com/CO/politicas"
                        target="_blank"
                        >Políticas de privacidad</a
                      ></span
                    >
                    <input
                      v-model="form.politicas"
                      type="checkbox"
                      name="politicas"
                      class="checkbox checkbox-secondary"
                      :state="getValidationState(validationContext)"
                    />
                    <span class="p-error">
                      {{ validationContext.errors[0] }}
                    </span>
                  </label>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <transition name="p-fade">
            <div v-if="habilitarBoton" class="p-form-control">
              <button class="p-btn p-btn-full" type="submit">
                Registrarme <i class="fal fa-sign-in"></i>
              </button>
              <!-- <nuxt-link to="/empresas" class="p-submit">
              Registrarme
              <i class="fal fa-sign-in"></i>
            </nuxt-link> -->
            </div>
          </transition>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { extend } from 'vee-validate'
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
  data() {
    return {
      isExist: false,
      showPass: false,
      habilitarBoton: true,
      form: this.$p_structure('userData'),
    }
  },
  mounted() {
    extend('uniqueEmail', {
      validate: this.isEmailUnique,
      message: 'Ya existe una persona registrada con este email',
    })
  },
  methods: {
    async setEmail() {
      try {
        if (this.isLoggedIn === false) {
          this.habilitarBoton = false
          const resultadoRegistro = await this.registrarUsuario(this.form)
          console.log(
            this.$options.name,
            'resultadoRegistro ',
            resultadoRegistro
          )
          if (resultadoRegistro.error === false) {
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
          // this.createUserData(getUser.uid)
        }
      } catch (e) {}
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

<style>
</style>