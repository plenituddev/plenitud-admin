<template>
  <div class="content">
    <div class="container mx-auto">
      <div class="search-bar">
        <div class="relative">
          <input
            v-model="convenio_search"
            type="text"
            placeholder="Ingresa el código del convenio a"
          />
          <button class="icon" @click="buscarConvenio">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div v-if="convenioInfo">
        <ConvenioEFormAgregar
          v-if="convenioInfo"
          :lectura="true"
          :convenioInfo="convenioInfo"
        ></ConvenioEFormAgregar>
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
      convenio_search: null,
      convenioInfo: null,
    }
  },
  mounted() {},
  methods: {
    async buscarConvenio() {
      if (this.convenio_search) {
        console.log(this.convenio_search)
        const convenioRes = await this.getConvenioE(this.convenio_search)
        if (!convenioRes.error) {
          console.log(convenioRes)
          this.convenioInfo = convenioRes
          //   this.$noty.success(convenioRes.mensaje, {
          //     theme: 'bootstrap-v4',
          //     layout: 'topCenter',
          //   })
        } else {
          this.habilitarBoton = true
          this.$noty.error(convenioRes.mensaje, {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          })
        }
      }
    },
  },
}
</script>

<style lang="postcss">
.content {
  @apply py-20;
  .search-bar {
    @apply flex mb-8 justify-center items-center px-4 sm:px-6 lg:px-8;
    input {
      @apply text-indigo-700 pt-4 pb-3 w-96 pr-8 pl-5 rounded-lg z-0 focus:shadow focus:outline-none;
    }
    .icon {
      @apply absolute top-4 right-3;
      i {
        @apply text-indigo-400 z-20 hover:text-indigo-500;
      }
    }
  }
}
</style>