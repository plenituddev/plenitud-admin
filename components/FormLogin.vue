<template>
  <div class="form_wrap">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.stop.prevent="handleSubmit(login)">
        <ValidationProvider
          v-slot="validationContext"
          name="email"
          :rules="`required`"
        >
          <div class="p-form-control">
            <label for="" class="p-label"> Email </label>
            <input
              v-model="form.email"
              class="p-input"
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
          name="contraseña"
          :rules="`required`"
        >
          <div class="p-form-control">
            <label for="" class="p-label"> Contraseña </label>
            <div class="relative">
              <input
                v-model="form.password"
                class="p-input"
                required
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
          </div>
        </ValidationProvider>

        <transition name="p-fade">
          <div v-if="habilitarBoton" class="p-form-control">
            <button class="p-btn p-btn-full" type="submit">
              Ingresar <i class="fal fa-sign-in"></i>
            </button>
          </div>
        </transition>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
  data() {
    return {
      isExist: false,
      habilitarBoton: true,
      form: {
        email:
          process.env.NODE_ENV !== 'production'
            ? `test@melborp.co`
            : '',
        password: process.env.NODE_ENV !== 'production' ? `Problem4321` : '',
      },
      showPass: false,
    }
  },
  methods: {
    async login() {
      if (this.isLoggedIn === false) {
        this.habilitarBoton = false
        const resultadoLogins = await this.loginUsuario(this.form)
        console.log(this.$options.name, 'resultadoLogins ', resultadoLogins)
        if (resultadoLogins.error === false) {
          this.$noty.success(resultadoLogins.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        } else {
          this.habilitarBoton = true
          this.$noty.error(resultadoLogins.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
  },
}
</script>

<style>
</style>