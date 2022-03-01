<template>
  <div>
    <div v-if="usuariosPendientes.length > 0">
      <div key="ut1" class="p-cuenta-int">
        <div class="p-cuenta-wrap">
          <h3
            class="
              text-2xl text-indigo-100
              font-bold
              border-r border-indigo-300
              pr-10
            "
          >
            Tienes pagos pendientes
          </h3>
          <div class="p-cuenta-cont sm:w-8/12">
            <div class="p-cuenta-cont-info">
              <h4 class="mb-2 mt-5 text-lg leading-none">
                Usuarios a registrar en la empresa
              </h4>
              <div class="p-cuenta-cont-info-w">
                <h5 class="font-black w-min-32 text-center">
                  <span class="block text-7xl text-p-orang">{{
                    usuariosPendientes.length
                  }}</span>
                </h5>
                <ul>
                  <li>
                    Plan Clásico
                    <b
                      >{{ usuariosPendientesPlanes[0].length }}
                      <i class="far fa-user font-light"></i>
                      <template v-if="usuariosPendientesPlanes[0].length > 0">
                        | total:
                        {{ usuariosPendientesValores[0] | currency }}
                      </template></b
                    >
                  </li>
                  <li>
                    Plan Superior
                    <b
                      >{{ usuariosPendientesPlanes[1].length }}
                      <i class="far fa-user font-light"></i>
                      <template v-if="usuariosPendientesPlanes[1].length > 0">
                        | total:
                        {{ usuariosPendientesValores[1] | currency }}
                      </template></b
                    >
                  </li>
                  <li>
                    Plan Élite
                    <b
                      >{{ usuariosPendientesPlanes[2].length }}
                      <i class="far fa-user font-light"></i>
                      <template v-if="usuariosPendientesPlanes[2].length > 0">
                        | total:
                        {{ usuariosPendientesValores[2] | currency }}
                      </template></b
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="p-cuenta-cont sm:w-4/12">
            <h4 class="mb-6 mt-5 text-lg leading-none">A pagar</h4>
            <h5
              class="lg:text-5xl md:text-4xl text-5xl text-p-yellow font-black"
            >
              {{ usuariosPendientesValor | currency }}
            </h5>

            <button
              v-scroll-to="{ el: '#configuracion' }"
              class="
                animate-pulse
                mt-2
                block
                btn-usuarios
                p-btn p-btn-full p-btn-primary
              "
              @click="iniciarPagoMedios"
            >
              Pagar
              <i class="fas fa-users-medical"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex py-8 justify-center items-center">
        <div class="w-3/4 flex items-center justify-around space-x-8">
          <div class="w-full lg:w-1/2 lg:mb-5">
            <p
              class="
                leading-tight
                text-xl
                lg:text-xl
                text-orange-400
                lg:border-r
                border-indigo-100
                lg:pr-11
                mb-2
              "
            >
              No tienes usuarios usuarios pendientes para agregar en
              <b class="text-indigo-100">{{ userData.empresa }}</b>
            </p>
          </div>
          <div class="w-full lg:w-1/2">
            <DropAcciones :half="true"></DropAcciones>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropAcciones from '~/components/usuarios/DropAcciones.vue'
import AuthMixin from '~/mixins/auth.js'
export default {
  components: {
    DropAcciones,
  },
  mixins: [AuthMixin],
  methods: {
    iniciarPagoMedios() {
      this.$emit('iniciarPago')
    },
  },
}
</script>

<style>
</style>