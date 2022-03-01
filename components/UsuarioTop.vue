<template>
  <div class="top">
    <div class="container mx-auto">
      <h1 class="mt-10 text-4xl text-p-yellow mb-8 w-full lg:w-10/12">
        <i
          class="
            fas
            fa-building
            font-light
            -mt-2
            py-2
            px-4
            h-12
            w-12
            rounded-full
            bg-p-yellow
            text-p-blue text-xl
          "
        ></i>
        HOLA
        <b>{{ userData.nombre }}</b>
      </h1>
      <div
        class="
          flex flex-col
          lg:flex-row
          justify-between
          items-start
          mr-4
          sm:mr-0
        "
      >
        <div class="w-full lg:w-4/12 mr-4">
          <h3 class="leading-tight lg:w-10/12 text-2xl mb-2 ml-16 text-p-bluet">
            Información de la cuenta
          </h3>
          <div class="p-cuenta mb-8 py-4 px-8 relative">
            <div class="icono">
              <i class="fal fa-info"></i>
            </div>
            <div class="p-cuenta-wrap">
              <div class="w-full">
                <ul class="p-cuenta-cont p-cuenta-cont-full w-full">
                  <li><b>Nombre:</b> {{ userData.nombre }}</li>
                  <li><b>Correo electrónico:</b> {{ userData.email }}</li>
                  <li><b>Celular:</b> {{ userData.celular }}</li>
                  <li><b>Empresa:</b> {{ userData.empresa }}</li>
                  <li><b>Razón social:</b> {{ userData.razon_social }}</li>
                  <li><b>NIT:</b> {{ userData.nit }}</li>
                </ul>
                <nuxt-link
                  v-scroll-to="'#configuracion'"
                  :to="{ path: '/empresas/perfil' }"
                  class="block p-btn p-btn-full p-btn-secondary"
                >
                  <template v-if="userData.razon_social !== ''">
                    Modificar el perfil de la empresa
                  </template>
                  <template v-else> Completar datos </template>
                  <i class="fal fa-arrow-right"></i>
                </nuxt-link>
              </div>
              <!-- <ul class="p-cuenta-cont">
                <li><b>Nombre:</b> {{ userData.empresa }}</li>
                <li><b>Correo electrónico:</b> xxx@xxx.com</li>
                <li><b>Celular:</b> xxxxxxxxx</li>
                <li><b>Empresa:</b> xxxxxxxxxxxxx</li>
              </ul> -->
            </div>
          </div>
        </div>
        <div class="w-full lg:w-8/12 mb-4">
          <h3 class="leading-tight lg:w-10/12 text-2xl mb-2 ml-16 text-p-bluet">
            Información de los usuarios
          </h3>
          <div class="p-cuenta mb-8 py-4 px-8 relative">
            <div class="icono">
              <i class="fal fa-users"></i>
            </div>
            <div class="p-cuenta-wrap">
              <div class="p-cuenta-cont">
                <div class="p-cuenta-cont-info">
                  <h4
                    v-if="usuarios.length > 0"
                    class="mb-2 mt-5 text-lg leading-none"
                  >
                    Usuarios registrados en la empresa
                  </h4>
                  <h4
                    v-else
                    class="mb-2 mt-5 text-2lg mb-4 text-orange-300 leading-none"
                  >
                    No tienes usuarios registrados en tu cuenta
                  </h4>

                  <div v-if="usuarios.length > 0" class="p-cuenta-cont-info-w">
                    <h5 class="text-7xl text-p-orang font-black w-min-32">
                      {{ usuarios.length }}
                    </h5>
                    <ul>
                      <li>
                        Plan Clásico
                        <b
                          >{{ usuariosPlanes[0].length }}
                          <i class="far fa-user font-light"></i>
                          <template v-if="usuariosPlanes[0].length > 0">
                            | total:
                            {{ usuariosValores[0] | currency }}
                          </template></b
                        >
                      </li>
                      <li>
                        Plan Superior
                        <b
                          >{{ usuariosPlanes[1].length }}
                          <i class="far fa-user font-light"></i>
                          <template v-if="usuariosPlanes[1].length > 0">
                            | total:
                            {{ usuariosValores[1] | currency }}
                          </template></b
                        >
                      </li>
                      <li>
                        Plan Élite
                        <b
                          >{{ usuariosPlanes[2].length }}
                          <i class="far fa-user font-light"></i>
                          <template v-if="usuariosPlanes[2].length > 0">
                            | total:
                            {{ usuariosValores[2] | currency }}
                          </template></b
                        >
                      </li>
                    </ul>
                  </div>
                  <nuxt-link
                    v-scroll-to="'#configuracion'"
                    :to="{ path: '/empresas/usuarios' }"
                    class="block btn-usuarios p-btn p-btn-full p-btn-secondary"
                  >
                    Gestionar usuarios <i class="fal fa-arrow-right"></i>
                  </nuxt-link>
                </div>
              </div>
              <div class="p-cuenta-cont">
                <template v-if="usuarios.length > 0">
                  <h4 class="mb-6 mt-5 text-lg leading-none">Pago mensual</h4>
                  <h5
                    class="
                      lg:text-5xl
                      md:text-4xl
                      text-5xl text-p-yellow
                      font-black
                    "
                  >
                    {{ valorTotal | currency }}
                  </h5>
                  <nuxt-link
                    v-if="!pagoOkProx.ok || pagoOkProx.proximo"
                    v-scroll-to="'#configuracion'"
                    :to="{ path: '/empresas/pagos' }"
                    class="block p-btn p-btn-full mt-4"
                  >
                    Pagar <i class="fal fa-arrow-right"></i>
                  </nuxt-link>
                </template>
                <template v-else>
                  <h4 class="mb-6 mt-5 text-lg leading-none">Pagos</h4>
                  <h5 class="mb-6 mt-5 text-lg leading-none text-indigo-200">
                    ¡NO tienes pagos registrados en tu cuenta! Agrega un usuario
                  </h5>
                </template>
              </div>
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
}
</script>

<style lang="postcss">
.top {
  background-image: url('~assets/images/bkg_ini.jpg') !important;
  background-size: cover;
  background-position: center bottom;
  @apply bg-p-blue py-8;
}
.beneficios {
  @apply mt-16 flex flex-col lg:flex-row items-start justify-between;
}
.p-cuenta {
  @apply rounded-lg border border-p-blue3 bg-p-blue2 text-lg ml-8 shadow-lg;
  .p-cuenta-wrap {
    @apply flex justify-between sm:flex-row flex-col space-x-0 sm:space-x-7 items-center;
    .p-cuenta-cont {
      @apply sm:w-5/12 w-full pr-0 sm:pr-4 items-center;
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
      &:first-child:not(.p-cuenta-cont-full) {
        @apply sm:w-7/12 sm:border-r sm:border-p-bluet;
      }
    }
  }
  .icono {
    @apply absolute flex items-center justify-center h-12 w-12 text-2xl rounded-full bg-p-yellow text-p-blue -top-6 -left-6;
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
.btn-usuarios {
  margin-left: 0 !important;
}
</style>