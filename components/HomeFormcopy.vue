<!-- Code on GiHub: https://github.com/vitalikda/form-floating-labels-tailwindcss -->

<template>
  <div class="form_wrap">
    <div class="mx-auto max-w-md">
      <h1 class="text-3xl mb-8 text-p-yellow">
        ¿Estás interesado en una cuenta empresarial?
      </h1>

      <form novalidate @submit.prevent="validateBeforeSubmit">
        <ValidationProvider
          name="Id"
          rules="required|min:5"
          immediate
          v-slot="{ errors }"
        >
          <input
            type="text"
            id="id"
            v-model="form.id"
            placeholder="Enter id"
          ></input>
          <span v-show="errors.length > 0" class="is-invalid">{{
            errors[0]
          }}</span>
        </ValidationProvider>

        <!-- <validation-provider name="Nombre" :rules="{ required: true }">
          <div id="input-nombre" class="p-form-control">
            <label for="nombre" class="p-label">Nombre</label>
            <input
              id="nombre"
              v-model="form.usuario"
              type="text"
              name="usuario"
              placeholder=" "
              required
              class="p-input"
            />
            <span v-show="errors.has('nombre')" class="p-error">{{
              errors[0]
            }}</span>
          </div>
        </validation-provider> -->
        <!-- <validation-provider
            v-slot="validationContext"
            name="Correo electrónico"
            :rules="{ email: true, required: true }"
          >
            <div id="input-email" class="p-form-control">
              <label for="email" class="p-label">Email</label>
              <input
                v-model="form.email"
                :state="getValidationState(validationContext)"
                type="email"
                name="email"
                placeholder=" "
                required
                class="p-input"
                aria-describedby="email-feedback"
              />
              <span
                v-if="validationContext.errors"
                id="email-feedback"
                class="p-error"
                >{{ validationContext.errors[0] }}</span
              >
            </div>
          </validation-provider> -->

        <!-- <div class="p-form-control">isEmailUnique
            <label for="email" class="p-label">Enter email</label>
            <input
              type="password"
              name="password"
              placeholder=" "
              required
              class="p-input"
            />
            <span class="p-error">Name is required</span>
          </div>

          <fieldset class="relative z-0 w-full p-px mb-5">
            <legend
              class="absolute text-gray-500 transform scale-75 -top-3 origin-0"
            >
              Choose an option
            </legend>
            <div class="block pt-3 pb-2 space-x-4">
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="1"
                  class="
                    mr-2
                    text-black
                    border-2 border-gray-300
                    focus:border-gray-300
                    focus:ring-black
                  "
                />
                Option 1
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="2"
                  class="
                    mr-2
                    text-black
                    border-2 border-gray-300
                    focus:border-gray-300
                    focus:ring-black
                  "
                />
                Option 2
              </label>
            </div>
            <span class="text-sm text-red-600 hidden" id="error"
              >Option has to be selected</span
            >
          </fieldset>

          <div class="p-form-control">
            <select
              name="select"
              value=""
              onclick="this.setAttribute('value', this.value);"
              class="p-input"
            >
              <option value="" selected disabled hidden></option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
              <option value="4">Option 4</option>
              <option value="5">Option 5</option>
            </select>
            <label
              for="select"
              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >Select an option</label
            >
            <span class="text-sm text-red-600 hidden" id="error"
              >Option has to be selected</span
            >
          </div>

          <div class="flex flex-row space-x-4">
            <div class="relative z-0 w-full mb-5">
              <input
                type="text"
                name="date"
                placeholder=" "
                onclick="this.setAttribute('type', 'date');"
                class="
                  pt-3
                  pb-2
                  block
                  w-full
                  px-0
                  mt-0
                  bg-transparent
                  border-0 border-b-2
                  appearance-none
                  focus:outline-none
                  focus:ring-0
                  focus:border-black
                  border-gray-200
                "
              />
              <label
                for="date"
                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                >Date</label
              >
              <span class="text-sm text-red-600 hidden" id="error"
                >Date is required</span
              >
            </div>
            <div class="relative z-0 w-full">
              <input
                type="text"
                name="time"
                placeholder=" "
                onclick="this.setAttribute('type', 'time');"
                class="
                  pt-3
                  pb-2
                  block
                  w-full
                  px-0
                  mt-0
                  bg-transparent
                  border-0 border-b-2
                  appearance-none
                  focus:outline-none
                  focus:ring-0
                  focus:border-black
                  border-gray-200
                "
              />
              <label
                for="time"
                class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                >Time</label
              >
              <span class="text-sm text-red-600 hidden" id="error"
                >Time is required</span
              >
            </div>
          </div>

          <div class="relative z-0 w-full mb-5">
            <input
              type="number"
              name="money"
              placeholder=" "
              class="
                pt-3
                pb-2
                pl-5
                block
                w-full
                px-0
                mt-0
                bg-transparent
                border-0 border-b-2
                appearance-none
                focus:outline-none
                focus:ring-0
                focus:border-black
                border-gray-200
              "
            />
            <div class="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
            <label
              for="money"
              class="
                absolute
                duration-300
                top-3
                left-5
                -z-1
                origin-0
                text-gray-500
              "
              >Amount</label
            >
            <span class="text-sm text-red-600 hidden" id="error"
              >Amount is required</span
            >
          </div>

          <div class="relative z-0 w-full mb-5">
            <input
              type="text"
              name="duration"
              placeholder=" "
              class="
                pt-3
                pb-2
                pr-12
                block
                w-full
                px-0
                mt-0
                bg-transparent
                border-0 border-b-2
                appearance-none
                focus:outline-none
                focus:ring-0
                focus:border-black
                border-gray-200
              "
            />
            <div class="absolute top-0 right-0 mt-3 mr-4 text-gray-400">
              min
            </div>
            <label
              for="duration"
              class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >Duration</label
            >
            <span class="text-sm text-red-600 hidden" id="error"
              >Duration is required</span
            >
          </div>

          <button
            id="button"
            type="button"
            class="
              w-full
              px-6
              py-3
              mt-3
              text-lg text-white
              transition-all
              duration-150
              ease-linear
              rounded-lg
              shadow
              outline-none
              bg-pink-500
              hover:bg-pink-600
              hover:shadow-lg
              focus:outline-none
            "
          >
            Toggle Error
          </button> -->
      </form>
    </div>
  </div>
</template>

<script>
import { extend } from 'vee-validate'

export default {
  data() {
    return {
      error: null,
      errors: [],
      form: {
        email: null,
        usuario: null,
      },
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      submitted: false,
    }
  },
  mounted() {
    extend('uniqueEmail', {
      validate: this.isEmailUnique,
      message: 'Ya existe una persona registrada con este email',
    })
    extend('unique', {
      validate: this.isUsernameUnique,
      message: 'Ya existe una persona registrada con ese documento',
    })

    // document
    //   .getElementById('button')
    //   .addEventListener('click', this.toggleError)
  },
  methods: {
    async isUsernameUnique() {
      try {
        const docs = await this.$axios.get(
          '/usuario/documento/' + this.form.personales.documento
        )
        const cantidad = docs.data
        return cantidad === 0
      } catch (err) {
        return true
      }
    },
    async isEmailUnique() {
      try {
        const usuarioRef = await this.$fire.auth.getUserByEmail(
          this.form.contacto.email
        )

        console.log('Usuario email: ', usuarioRef)

        return false
      } catch (err) {
        console.log('Usuario email error:', err)
        return true
      }
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    toggleError() {
      // Show error message
      //   this.errMessages.forEach((el) => {
      //     el.classList.toggle('hidden')
      //   })
      //   // Highlight input and label with red
      //   const allBorders = document.querySelectorAll('.border-gray-200')
      //   const allTexts = document.querySelectorAll('.text-gray-500')
      //   allBorders.forEach((el) => {
      //     el.classList.toggle('border-red-600')
      //   })
      //   allTexts.forEach((el) => {
      //     el.classList.toggle('text-red-600')
      //   })
    },
    setEmail() {
      console.log('Email init')
      this.form_email = false
    },

    resetForm() {
      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    },

    validateBeforeSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }

        alert('Form has been submitted!')

        // Wait until the models are updated in the UI
        this.$nextTick(() => {
          this.$refs.form.reset()
        })
      })
    },
  },
}
</script>


<style lang="postcss">
</style>