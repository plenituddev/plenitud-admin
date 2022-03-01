<template>
  <div class="navbar bg-p-blue text-p-cream">
    <nuxt-link to="/" class="flex-1 px-2 mx-2">
      <img src="~assets/images/logo.png" alt="Plenitud Empresas" />
    </nuxt-link>

    <div class="flex-none pr-4">
      <div v-if="isLoggedIn" class="mx-6">
        <div class="dropdown dropdown-end">
          <div tabindex="0" class="m-1 p-mennav">
            Gestionar cuenta <i class="ml-4 text-xl fal fa-cog font-thin"></i>
          </div>
          <ul tabindex="0" class="pdrop pdrop-men">
            <li>
              <nuxt-link v-scroll-to="'#configuracion'" to="/empresas/usuarios"
                >Gestionar usuarios</nuxt-link
              >
              <ul class="text-sm">
                <li>
                  <nuxt-link
                    v-scroll-to="{ el: '#configuracion' }"
                    :to="{ path: '/empresas/usuarios/subir' }"
                    class="flex justify-between"
                    >Subir usuarios por archivo
                    <i class="fal fa-arrow-right"></i
                  ></nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    v-scroll-to="{ el: '#configuracion' }"
                    :to="{ path: '/empresas/usuarios/agregar' }"
                    class="flex justify-between"
                    >Inscribir un usuario <i class="fal fa-arrow-right"></i
                  ></nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <nuxt-link v-scroll-to="'#configuracion'" to="/empresas/perfil"
                >Gestionar perfil</nuxt-link
              >
            </li>
            <li>
              <nuxt-link v-scroll-to="'#configuracion'" to="/empresas/pagos"
                >Gestionar pagos</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- <div v-if="!isLoggedIn" class="dropdown dropdown-end">
        <div tabindex="0" class="p-btn p-btn-secondary uppercase">
          Ingresar <i class="ml-4 text-xl fal fa-sign-in font-thin"></i>
        </div>

        <div tabindex="0" class="pdrop">
          <client-only>
            <FormLogin></FormLogin>
          </client-only>
        </div>
      </div>
      <div
        v-else
        tabindex="0"
        class="p-btn p-btn-secondary uppercase"
        @click="logout"
      >
        Salir <i class="ml-4 text-xl fal fa-sign-out font-thin"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
  data() {
    return {
      open: false,
      logged: this.$fire.auth.currentUser,
    }
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="postcss">
.pdrop {
  @apply mt-4 px-8 py-8 shadow menu dropdown-content bg-p-blue text-p-cream rounded-box w-96;
  &-men {
    @apply px-2 py-2;
    li {
      @apply border-b border-indigo-400;
    }
  }
}
.login {
  .form-control {
    @apply mb-6;
    label {
      @apply mb-1;
      span {
        @apply text-p-cream mb-2;
      }
    }
    input {
      @apply text-lg;
    }
  }
}
.p-mennav {
  @apply flex items-center border-b border-transparent hover:text-p-orang hover:border-p-orang transition-all;
}
</style>