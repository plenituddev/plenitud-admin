<template>
  <!-- TABLA NEW -->
  <div class="controles">
    <div class="controles-nav">
      <div class="controles-nav-btn">
        <div class="flex items-center">
          <div>Acciones</div>
          <nuxt-link
            v-scroll-to="{ el: '#configuracion' }"
            :to="{ path: '/admin/convenios/agregar' }"
            class="btn-con-nav"
            aria-label="Agregar convenio"
            role="button"
          >
            <i class="fal fa-handshake"></i>
          </nuxt-link>
        </div>
      </div>

      <div class="controles-info">
        <div class="dropdown dropdown-end">
          <div tabindex="0" class="m-1 p-btn p-btn-small p-btn-secondary">
            Ver {{ tabUsuarioCant }} convenios
          </div>
          <ul
            tabindex="0"
            class="
              px-1
              py-0
              shadow
              menu
              dropdown-content
              text-indigo-500
              bg-indigo-100
              rounded-box
              w-52
            "
          >
            <li>
              <a @click="tabUsuarioCant = 10">10</a>
            </li>
            <li>
              <a @click="tabUsuarioCant = 25">25</a>
            </li>
            <li>
              <a @click="tabUsuarioCant = 50">50</a>
            </li>
            <li>
              <a @click="tabUsuarioCant = 75">75</a>
            </li>
            <li>
              <a @click="tabUsuarioCant = 100">100</a>
            </li>
          </ul>
        </div>
        <div class="controles-info-wrap">
          <p id="page-view" class="text-base text-yellow-100">
            Viendo
            {{
              convenios.length > navegacionUsuario.tabUsuarioCant
                ? navegacionUsuario.tabUsuarioCant
                : convenios.length
            }}
            de {{ convenios.length }} convenios
          </p>
          <button
            v-if="convenios.length > navegacionUsuario.tabUsuarioCant"
            class="btn-pager"
            aria-label="Anterior "
            role="button"
            @click="tabUsuarioPage != 0 ? tabUsuarioPage-- : 0"
          >
            <i class="fal fa-arrow-left"></i>
          </button>
          <button
            v-if="convenios.length > navegacionUsuario.tabUsuarioCant"
            class="btn-pager"
            aria-label="Siguiente "
            role="button"
            @click="
              tabUsuarioPage <
              Math.floor(convenios.length > navegacionUsuario.tabUsuarioCant)
                ? tabUsuarioPage++
                : 0
            "
          >
            <i class="fal fa-arrow-right"></i>
          </button>
        </div>

        <div class="lg:ml-6 flex items-center">
          <button role="button" aria-label="ver como tabla" class="btn-accion">
            <i class="fas fa-table"></i>
          </button>
          <button role="button" aria-label="ver como grid" class="btn-accion">
            <i class="fas fa-th-large"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Table New -->
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
}
</script>

<style lang="postcss">
.controles {
  @apply mx-auto rounded;
  &-nav {
    @apply flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full;
    &-btns {
      @apply w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center space-x-8;
    }
  }

  &-info {
    @apply w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end;
    &-wrap {
      @apply flex items-center lg:border-l lg:border-r border-gray-300 py-3 lg:py-0 lg:px-6;
    }
  }
  .btn-pager {
    @apply text-indigo-200 ml-2 border-transparent border cursor-pointer rounded focus:outline-none focus:ring-0;
  }
}
</style>