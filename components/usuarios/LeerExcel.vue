<template>
  <div class="task-list">
    <div v-if="err !== ''" class="alert alert-error">
      <div class="flex-1">
        <i class="mx-2 fas fa-exclamation-circle"></i>
        <label>{{ err }}</label>
      </div>
    </div>
    <transition-group name="p-fade" tag="div">
      <div v-if="usuariosToUp" key="ut1" class="p-cuenta-int">
        <div class="p-cuenta-wrap">
          <div class="p-cuenta-cont sm:w-8/12">
            <div class="p-cuenta-cont-info">
              <h4 class="mb-2 mt-5 text-lg leading-none">
                Usuarios a registrar en la empresa
              </h4>

              <div class="p-cuenta-cont-info-w">
                <h5 class="font-black w-min-32 text-center">
                  <span class="block text-7xl text-p-orang">{{
                    usuariosToUp.length
                  }}</span>
                  <span class="block text-lg text-red-500 font-light">
                    {{
                      usuariosPlanesErrorUp[0] +
                      usuariosPlanesErrorUp[1] +
                      usuariosPlanesErrorUp[2]
                    }}
                    <i class="far fa-user font-light"></i> con errores
                  </span>
                </h5>
                <ul>
                  <li>
                    Plan Clásico
                    <b
                      >{{ usuariosPlanesUp[0] }}
                      <i class="far fa-user font-light"></i>
                      <template v-if="usuariosPlanesUp[0] > 0">
                        | total:
                        {{ usuariosValoresUp[0] | currency }}
                      </template></b
                    >

                    <b v-if="usuariosPlanesErrorUp[0] > 0" class="text-red-600"
                      >| <i class="ml-4 text-red-600 fas fa-times-circle"></i>
                      {{ usuariosPlanesErrorUp[0] }}

                      <template v-if="usuariosPlanesUp[0] > 0">
                        | total:
                        {{ usuariosValoresErrorUp[0] | currency }}
                      </template></b
                    >
                  </li>
                  <li>
                    Plan Superior
                    <b
                      >{{ usuariosPlanesUp[1] }}
                      <i class="far fa-user font-light"></i>
                      <template v-if="usuariosPlanesUp[1] > 0">
                        | total:
                        {{ usuariosValoresUp[1] | currency }}
                      </template></b
                    >
                    <b v-if="usuariosPlanesErrorUp[1] > 0" class="text-red-600"
                      >| <i class="ml-4 text-red-600 fas fa-times-circle"></i>
                      {{ usuariosPlanesErrorUp[1] }}

                      <template v-if="usuariosPlanesUp[0] > 0">
                        | total:
                        {{ usuariosValoresErrorUp[1] | currency }}
                      </template></b
                    >
                  </li>
                  <li>
                    Plan Élite
                    <b
                      >{{ usuariosPlanesUp[2] }}
                      <i class="far fa-user font-light"></i>
                      <template v-if="usuariosPlanesUp[2] > 0">
                        | total:
                        {{ usuariosValoresUp[2] | currency }}
                      </template></b
                    >
                    <b v-if="usuariosPlanesErrorUp[2] > 0" class="text-red-600"
                      >| <i class="ml-4 text-red-600 fas fa-times-circle"></i>
                      {{ usuariosPlanesErrorUp[2] }}

                      <template v-if="usuariosPlanesUp[0] > 0">
                        | total:
                        {{ usuariosValoresErrorUp[2] | currency }}
                      </template></b
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="p-cuenta-cont sm:w-4/12">
            <h4 class="mb-6 mt-5 text-lg leading-none">Pago mensual</h4>
            <h5
              class="lg:text-5xl md:text-4xl text-5xl text-p-yellow font-black"
            >
              + {{ valorTotalUp | currency }}
            </h5>

            <button
              v-scroll-to="{ el: '#configuracion' }"
              class="
                mt-2
                block
                btn-usuarios
                p-btn p-btn-full p-btn-secondary p-btn-sm
              "
              @click="regresar"
            >
              <i class="fal fa-arrow-left"></i> Volver a cargar
            </button>

            <button
              v-if="!registrando"
              v-scroll-to="{ el: '#configuracion' }"
              class="
                animate-pulse
                mt-2
                block
                btn-usuarios
                p-btn p-btn-full p-btn-primary
              "
              @click="cargarUsuarios"
            >
              Guardar usuarios
              <i class="fas fa-users-medical"></i>
            </button>
          </div>
        </div>
      </div>
    </transition-group>

    <div v-if="usuariosToUp" class="overflow-x-auto py-4">
      <table class="table-excel table w-full table-compact">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>PLAN</th>
            <th>Valor</th>
            <th>Nombres</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Teléfono celular</th>
            <th>Género</th>
            <th>Fecha de nacimiento</th>
            <th>Departamento - municipio</th>
            <th>Dirección</th>
          </tr>
        </thead>

        <transition-group name="p-fade" tag="tbody">
          <tr v-if="usuariosToUp.length == 0" :key="'init_top'">
            <td colspan="12">
              Espera un momento mientras analizamos el archivo
            </td>
          </tr>
          <template v-for="(row, i) in usuariosToUp">
            <tr
              :key="i"
              :class="
                (row.error ? 'error error-first' : '') +
                '' +
                (cargado > 0 && usuariosTempResult[i]
                  ? usuariosTempResult[i]
                    ? 'up-ok'
                    : 'up-error'
                  : '') +
                '' +
                (usuariosTemp[i] == 'sending' ? 'up-send' : '')
              "
            >
              <td>
                <template v-if="cargado > 0 && !row.error">
                  <template v-if="!usuariosTemp[i]">
                    <i class="text-lg fal fa-ellipsis-h"></i>
                  </template>
                  <template v-else>
                    <i
                      v-if="usuariosTemp[i] == 'sending'"
                      class="
                        text-lg
                        fas
                        animate-spin
                        fa-circle-notch
                        text-yellow-400
                      "
                    ></i>
                    <template v-else>
                      <i
                        v-if="usuariosTemp[i].error"
                        class="text-lg fas fa-exclamation-circle text-red-500"
                      ></i>
                      <i
                        v-if="!usuariosTemp[i].error"
                        class="text-lg fas fa-check-circle text-green-500"
                      ></i>
                    </template>
                  </template>
                </template>
                <i v-else class="text-lg fal fa-ellipsis-h"></i>
              </td>
              <td>
                <template v-if="row.error">
                  <i class="fas fa-exclamation-circle text-red-500"></i>
                </template>
                <template v-else>
                  <i class="fas fa-check-circle text-green-500"></i>
                </template>
              </td>
              <td>
                <template v-if="row.planes.tipo.tipo">
                  {{ row.planes.tipo.tipo }}
                </template>
                <b v-else> Sin plan </b>
              </td>
              <td>
                <template v-if="row.planes.tipo.valor">
                  {{ row.planes.tipo.valor | currency }}
                </template>
                <b v-else> Sin plan </b>
              </td>
              <td>
                <template
                  v-if="
                    row.personales.nombre_completo &&
                    row.personales.apellido_completo
                  "
                >
                  {{ row.personales.nombre_completo }}
                  {{ row.personales.apellido_completo }}</template
                >
                <b v-else> Sin nombres </b>
              </td>
              <td>
                <template v-if="row.personales.tipo && row.documento"
                  >{{ row.personales.tipo }}: {{ row.documento }}</template
                >
                <b v-else> Sin documento </b>
              </td>
              <td>
                <template v-if="row.contacto.email">{{
                  row.contacto.email
                }}</template
                ><b v-else> Sin documento </b>
              </td>
              <td>
                <template v-if="row.contacto.celular">{{
                  row.contacto.celular
                }}</template
                ><b v-else> Sin celular </b>
              </td>
              <td>{{ row.personales.sexo }}</td>
              <td>
                <template v-if="row.personales.fecha">
                  {{
                    $moment(row.personales.fecha).format('YYYY-MM-DD')
                  }} </template
                ><b v-else> Fecha incorrecta </b>
              </td>
              <td>
                <template
                  v-if="
                    row.contacto.departamento && row.contacto.municipio.nombre
                  "
                >
                  {{ row.contacto.departamento }} -
                  {{ row.contacto.municipio.nombre }}
                </template>
                <b v-else> Error en departamento o municipio </b>
              </td>
              <td>
                <template v-if="row.contacto.direccion">
                  {{ row.contacto.direccion }}
                </template>
                <b v-else> Sin dirección </b>
              </td>
              <!-- <td v-for="item in row" :key="item.id">{{ item }}</td> -->
            </tr>
            <tr
              v-if="row.error"
              :key="`j${i}`"
              :class="row.error ? 'error' : ''"
            >
              <td colspan="12" class="text-center">
                <span v-for="(errorm, j) in row.error" :key="`e${j}`">
                  <i class="ml-4 text-red-600 fas fa-times-circle"></i>
                  {{ errorm }}
                </span>
              </td>
            </tr>
          </template>
        </transition-group>
        <tfoot>
          <tr>
            <th colspan="3">Valor total:</th>
            <th colspan="9">{{ valorTotalUp | currency }}</th>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Used to display errors -->
  </div>
</template>

<script>
import departamentos from '~/static/departamentos.json'
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
  props: {
    url: {
      type: String,
      default:
        'localhost:9199/v0/b/plenitud-web-v2.appspot.com/o/empresas%2F1633622571604-Ln2KcehHSVrOFBSfzk9WOTY7CNQ4?alt=media&token=e74a1f3b-f3d8-46a9-a705-49c6a84cc73e',
    },
    rows: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      registrando: false,
      departamentos,
      content: '',
      err: '',
      cargado: 0,
      usuariosTemp: [],
      usuariosTempResult: [],
      usuariosToUp: [],
      planes: this.$p_structure('planes'),
      valorTotalUp: 0,
      valorTotalErrorUp: 0,
      usuariosPlanesUp: [0, 0, 0],
      usuariosPlanesErrorUp: [0, 0, 0],
      usuariosValoresUp: [0, 0, 0],
      usuariosValoresErrorUp: [0, 0, 0],
    }
  },
  mounted() {
    // console.log('DEPARTAMENTOS', departamentos)
    console.log(Object.keys(this.departamentos).join(','))
    this.content = this.rows.slice(1)
    this.content.forEach((usuario) => {
      this.setupUsuario(usuario)
    })
  },
  methods: {
    regresar() {
      this.$emit('recargar')
    },
    ExcelDateToJSDate(serial) {
      const utcDays = Math.floor(serial - 25569)
      const utcValue = utcDays * 86400
      const dateInfo = new Date(utcValue * 1000)

      return new Date(
        dateInfo.getFullYear(),
        dateInfo.getMonth(),
        dateInfo.getDate()
      )
    },
    async setupUsuario(usuario) {
      try {
        this.err = ''
        const usuarioPlan = this.$p_structure('usuarioForm')
        usuarioPlan.error = []
        if (usuario[0] === 'CLÁSICO') {
          usuarioPlan.planes = this.planes.clasico
        } else if (usuario[0] === 'SUPERIOR') {
          usuarioPlan.planes = this.planes.superior
        } else if (usuario[0] === 'ÉLITE') {
          usuarioPlan.planes = this.planes.elite
        } else {
          usuarioPlan.error.push(
            `No se encontró un plan asociado al plan ${usuario[0]}`
          )
        }
        usuarioPlan.personales.fecha = null
        if (typeof usuario[10].getMonth === 'function')
          usuarioPlan.personales.fecha = usuario[10]
        else usuarioPlan.error.push(`La fecha ${usuario[0]}, no es válida`)

        const nombres = [usuario[1], usuario[2] != null ? usuario[2] : '']
        const apellidos = [usuario[3], usuario[4] != null ? usuario[4] : '']
        usuarioPlan.empresaref = this.authUser.uid
        usuarioPlan.personales.nombre_completo = nombres.join(' ')
        usuarioPlan.personales.nombres = nombres
        usuarioPlan.personales.apellido_completo = apellidos.join(' ')
        usuarioPlan.personales.apellidos = apellidos

        const docs = await this.$axios.get(
          `/usuario/documento/check/${usuario[6]}`
        )
        if (docs.data.encontrado) {
          usuarioPlan.error.push(
            'Ya existe un usuario con este número de docuento'
          )
        }
        usuarioPlan.excel = this.url
        usuarioPlan.documento = `${usuario[6]}`
        usuarioPlan.personales.documento = usuario[6]
        usuarioPlan.personales.tipo = usuario[5]
        usuarioPlan.personales.sexo = usuario[9] === 'H' ? 'Hombre' : 'Mujer'

        if (!this.validateEmail(usuario[7])) {
          usuarioPlan.error.push('El email es inválido')
        } else {
          const email = await this.$axios.get(`/usuario/email/${usuario[7]}`)
          if (email.data.encontrado === true) {
            usuarioPlan.error.push(
              'El email ya está siendo usado por un usuario'
            )
          }
        }

        usuarioPlan.contacto.email = usuario[7]
        usuarioPlan.contacto.celular = usuario[8]
        usuarioPlan.contacto.direccion = usuario[13]

        usuarioPlan.password = usuario[6]
        usuarioPlan.password2 = usuario[6]

        let highSim = 0
        let municipios = null
        let departamentoName = null
        Object.keys(this.departamentos).forEach((departamento) => {
          const sim = this.similarity(departamento, usuario[11])
          if (sim > 0.5) {
            if (sim > highSim) {
              highSim = sim
              departamentoName = departamento
              municipios = this.departamentos[departamento].municipios
            }
          }
        })

        highSim = 0
        let municipioValue = null
        if (municipios) {
          municipios.forEach((municipio) => {
            const sim = this.similarity(municipio.value.nombre, usuario[12])
            if (sim > 0.5) {
              if (sim > highSim) {
                highSim = sim
                municipioValue = municipio.value
              }
            }
          })
        }
        if (departamentoName === null || municipioValue === null) {
          usuarioPlan.error = []
          if (departamentoName === null) {
            usuarioPlan.error.push(
              'No existe un departamento que coincida con el de este usuario'
            )
          }

          if (municipioValue === null) {
            usuarioPlan.error.push(
              'No existe un municipio que coincida con el de este usuario'
            )
          }
        } else {
          usuarioPlan.contacto.departamento = departamentoName
          usuarioPlan.contacto.municipio = municipioValue
        }
        // console.info('USUARIO:', usuario, usuarioPlan)
        if (usuarioPlan.error.length === 0) {
          delete usuarioPlan.error
          this.valorTotalUp += usuarioPlan.planes.tipo.valor
          if (usuario[0] === 'CLÁSICO') {
            this.usuariosPlanesUp[0]++
            this.usuariosValoresUp[0] += usuarioPlan.planes.tipo.valor
          } else if (usuario[0] === 'SUPERIOR') {
            this.usuariosPlanesUp[1]++
            this.usuariosValoresUp[1] += usuarioPlan.planes.tipo.valor
          } else if (usuario[0] === 'ÉLITE') {
            this.usuariosPlanesUp[2]++
            this.usuariosValoresUp[2] += usuarioPlan.planes.tipo.valor
          }
        } else {
          this.err = 'Encontramos algunos errores en los usuarios'
          if (usuario[0] === 'CLÁSICO') {
            this.usuariosPlanesErrorUp[0]++
            this.usuariosValoresErrorUp[0] += usuarioPlan.planes.tipo.valor
          } else if (usuario[0] === 'SUPERIOR') {
            this.usuariosPlanesErrorUp[1]++
            this.usuariosValoresErrorUp[1] += usuarioPlan.planes.tipo.valor
          } else if (usuario[0] === 'ÉLITE') {
            this.usuariosPlanesErrorUp[2]++
            this.usuariosValoresErrorUp[2] += usuarioPlan.planes.tipo.valor
          }
          this.valorTotalErrorUp += usuarioPlan.planes.tipo.valor
        }
        this.usuariosToUp.push(usuarioPlan)
      } catch (e) {
        this.err =
          'Ocurrió un error al cargar el archivo. Por favor verifica los valores y cargalo nuevamente ' +
          e
      }
    },
    cargarUsuarios() {
      this.registrando = true
      this.usuariosTemp = Array(this.usuariosToUp.length).fill('sending')
      for (let index = 0; index < this.usuariosToUp.length; index++) {
        if (!this.usuariosToUp[index].error) {
          console.info('Usuario a cargar', this.usuariosToUp[index])

          this.agregarUsuario(this.usuariosToUp[index])
            .then((response) => {
              this.updateEstado(index, response)
            })
            .catch((error) => {
              this.updateEstado(index, error)
            })
        }
      }
      setTimeout(() => {
        this.getUsuarios()
        this.registrando = false
        this.$noty.success(
          'Los usuarios se han cargado, por favor verifica el estado de la carga',
          {
            theme: 'bootstrap-v4',
            layout: 'topCenter',
          }
        )
      }, this.usuariosToUp.length * 200)
    },
    async updateEstado(index, value) {
      this.cargado++
      console.log(
        '✅ -> Usuario ingresado ->',
        index,
        value,
        this.usuariosTemp[index]
      )
      this.usuariosTemp[index] = value
      this.usuariosTempResult[index] = !value.error

      await this.$nextTick()
    },
    similarity(s1, s2) {
      let longer = s1
      let shorter = s2
      if (s1.length < s2.length) {
        longer = s2
        shorter = s1
      }
      const longerLength = longer.length
      if (longerLength === 0) {
        return 1.0
      }
      return (
        (longerLength - this.editDistance(longer, shorter)) /
        parseFloat(longerLength)
      )
    },
    editDistance(s1, s2) {
      s1 = s1.toLowerCase()
      s2 = s2.toLowerCase()

      const costs = []
      for (let i = 0; i <= s1.length; i++) {
        let lastValue = i
        for (let j = 0; j <= s2.length; j++) {
          if (i === 0) costs[j] = j
          else if (j > 0) {
            let newValue = costs[j - 1]
            if (s1.charAt(i - 1) !== s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
            costs[j - 1] = lastValue
            lastValue = newValue
          }
        }
        if (i > 0) costs[s2.length] = lastValue
      }
      return costs[s2.length]
    },
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
  },
}
</script>
<style lang="postcss">
.tooltip {
  &::before {
    @apply bg-indigo-600 text-indigo-100;
  }
}
.table-excel {
  thead,
  tfoot {
    tr {
      th {
        background: transparent;
      }
    }
  }
  tbody {
    tr {
      td {
        background: transparent;
        @apply bg-transparent text-2xs border-b border-indigo-300 transition-all;
      }
      &.error {
        td {
          background: #4f4a51;
          @apply border-orange-400;
        }
        &-first {
          td {
            @apply border-none;
          }
        }
      }
      &.up-ok {
        td {
          background: #0b663c;
        }
      }
      &.up-send {
        td {
          background: #73622275;
        }
      }
      &.up-error {
        td {
          background: #db202075;
        }
      }
    }
  }
}
.p-cuenta-int {
  @apply rounded-lg border border-p-blue3 bg-p-blue2 text-lg shadow-lg;
  .p-cuenta-wrap {
    @apply flex p-8 justify-between sm:flex-row flex-col space-x-0 sm:space-x-7 items-center;
    .p-cuenta-cont {
      @apply pr-0 sm:pr-4 items-center;
      &.p-cuenta-cont-full {
        @apply sm:w-full w-full pr-4;
        &:first-child {
          @apply border-none;
        }
      }
      li {
        @apply mb-2 pb-1 text-sm  font-light flex justify-between space-x-4 items-center border-b border-p-cream1 border-opacity-25;
        b {
          @apply text-p-cof ml-1;
        }
      }
      &:first-child {
        @apply sm:border-r sm:border-p-bluet;
      }
    }
  }
  .p-cuenta-cont-info {
    @apply flex flex-col space-x-8;
  }
  .p-cuenta-cont-info-w {
    margin-left: 0 !important;
    @apply pt-5 ml-0 pl-0 flex space-x-8 flex-row items-center w-full;
    ul {
      @apply flex-grow ml-0;
      li {
        @apply text-sm;
      }
    }
  }
}
.alert-error {
  @apply bg-red-200 text-red-600 mb-3;
}
</style>