<template>
  <div class="content">
    <div class="container mx-auto">
      <div class="p-wrapper">
        <h2>Información de convenios de empresas</h2>
        <div class="search-bar">
          <div class="relative w-full">
            <input
              v-model="convenio_search"
              type="text"
              placeholder="Ingresa el código del convenio de empresa a buscar"
            />
            <button class="icon" @click="buscarConvenio">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div class="info">
          <div v-if="convenioInfo" class="info-convenio">
            <ConvenioEFormAgregar
              v-if="convenioInfo"
              :lectura="true"
              :convenioInfo="convenioInfo"
            ></ConvenioEFormAgregar>
          </div>
          <div v-if="tieneEmpresas" class="info-empresa">
            <h2>Empresas registrados con este convenio</h2>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Nit</th>
                    <th>Usuarios registrados</th>
                    <th>Pagos registrados</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(empresa, index) in empresasInfo" :key="index">
                    <td>{{ empresa.nombre }}</td>
                    <td>{{ empresa.nit }}</td>
                    <td>
                      <template v-if="empresa.usuarios.length > 0">{{
                        empresa.usuarios.length
                      }}</template>
                      <template v-else>
                        Esta empresa no tiene usuarios registrados
                      </template>
                    </td>
                    <td v-if="empresa.pagos">
                      <template v-if="empresa.pagos.length > 0">
                        <ul>
                          <li
                            v-for="(pago, indexp) in empresa.pagos"
                            :key="indexp"
                          >
                            <template v-if="pago.estado == 'APPROVED'">
                              <span class="text-green-500">
                                {{ pago.estado }} - {{ pago.valor }} |
                                {{ $moment(pago.creado).format('YYYY-MM-DD') }}
                              </span>
                            </template>
                            <template v-else>
                              {{ pago.estado }} - {{ pago.valor }} |
                              {{ $moment(pago.creado).format('YYYY-MM-DD') }}
                            </template>
                          </li>
                        </ul>
                      </template>
                      <template v-else>
                        Esta empresa no tiene pagos registrados
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
      empresasInfo: null,
      tieneEmpresas: false,
      usuariosInfo: {},
    }
  },
  mounted() {},
  methods: {
    async buscarConvenio() {
      if (this.convenio_search) {
        console.log(this.convenio_search)
        const convenioRes = await this.getConvenioE(this.convenio_search)
        if (!convenioRes.error) {
          console.log('CONVENIO: ', convenioRes)
          this.convenioInfo = convenioRes
          this.buscarEmpresas(this.convenioInfo.id)
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
    async buscarEmpresas(id) {
      const empresasRes = await this.getEmpresasConvenioE(id)
      if (!empresasRes.error) {
        console.log('EMPRESAS: ', empresasRes.info)
        this.tieneEmpresas = true
        this.empresasInfo = empresasRes.info
        // this.empresasInfo.forEach(async (empresa) => {
        //   const usuariosRef = await this.getEmpresasUsuario(empresa.id)
        //   if (!usuariosRef.error) {
        //     this.usuariosInfo[empresa.id] = usuariosRef.info
        //     console.log('USUARIOS: ', usuariosRef.info)
        //     empresa.usuarios = usuariosRef.info
        //   }
        // })
        // console.log('USUARIOS info: ', this.usuariosInfo)
      }
    },
  },
}
</script>

<style lang="postcss">
.content {
  @apply py-20;
  .p-wrapper {
    @apply shadow-lg border border-p-blue3 rounded-xl py-8 px-6 bg-p-nav;
    h2 {
      @apply text-2xl text-center text-orange-500 mb-8;
    }
  }
  .search-bar {
    @apply flex mb-8 w-full md:w-6/12 mx-auto justify-center items-center px-4 sm:px-6 lg:px-8;
    input {
      @apply text-indigo-700 pt-4 pb-3 w-full pr-8 pl-5 rounded-lg z-0 focus:shadow focus:outline-none;
    }
    .icon {
      @apply absolute top-4 right-3;
      i {
        @apply text-indigo-400 z-20 hover:text-indigo-500;
      }
    }
  }
}
.info {
  .info-convenio {
    @apply shadow-lg border border-indigo-300 rounded-xl py-8 px-6 mb-8;
  }
  .info-empresa {
    @apply shadow-lg border border-indigo-300 rounded-xl py-8 px-6 mb-8;
    table {
      @apply table w-full;
      th {
        @apply text-indigo-500;
      }
      td {
        background: transparent !important;
        @apply text-indigo-100  border border-indigo-600;
      }
    }
  }
}
</style>