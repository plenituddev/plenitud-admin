<template>
  <div v-if="convenios">
    <div class="usuarios-tab">
      <div class="usuarios-tab-wrap">
        <div class="usuarios-tab-wrap-int">
          <div class="user-table">
            <div class="user-table-top1">
              <div class="lg:w-1/12">Estado</div>
              <div class="lg:w-2/12">Nombre</div>
              <div class="lg:w-1/12">Id</div>
              <div class="lg:w-3/12">Usado</div>
              <div class="lg:w-2/12">Bitly</div>
              <div class="lg:w-2/12">Creado</div>
              <div class="lg:w-1/12">Acciones</div>
              <div class="lg:w-1/12">Ver más</div>
            </div>

            <div>
              <template v-for="(convenio, i) in conveniosE">
                <ConvenioEItem
                  v-if="Math.floor(i / tabUsuarioCant) == tabUsuarioPage"
                  :key="i"
                  :convenio="convenio"
                ></ConvenioEItem
              ></template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <nav class="paginador" aria-label="Pagination">
        <button
          href="#"
          class="btn_pag btn_left"
          @click="tabUsuarioPage != 0 ? tabUsuarioPage-- : 0"
        >
          <span class="sr-only">Anterior</span>
          <!-- Heroicon name: solid/chevron-left -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
        <button
          v-for="i in Math.floor(
            conveniosE.length > navegacionUsuario.tabUsuarioCant
          ) + 1"
          :key="i"
          href="#"
          class="btn_pag"
          :class="i - 1 == tabUsuarioPage ? 'active' : ''"
          @click="tabUsuarioPage = i - 1"
        >
          {{ i }}
        </button>
        <button
          href="#"
          class="btn_pag btn_right"
          @click="
            tabUsuarioPage <
            Math.floor(conveniosE.length > navegacionUsuario.tabUsuarioCant)
              ? tabUsuarioPage++
              : 0
          "
        >
          <span class="sr-only">Siguiente</span>
          <!-- Heroicon name: solid/chevron-right -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
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
.usuarios-tab {
  @apply flex items-center justify-center w-full;
  &-wrap {
    @apply col-span-12 w-full;
    &-int {
      @apply overflow-auto lg:overflow-visible;
    }
    .user-table {
      border-spacing: 0 15px;
      @apply w-full table text-p-tex border-separate space-y-6 text-sm;
      &-top1 {
        @apply w-full hidden md:flex mb-4;
        div {
          @apply px-3 py-1 text-xl text-left text-indigo-100 border-b border-indigo-300;
        }
      }
    }
  }
}
.paginador {
  @apply relative z-0 inline-flex rounded-md shadow-sm -space-x-px;
  .btn_pag {
    @apply relative w-8 text-center items-center inline-flex justify-center  px-2 py-2  border border-indigo-200 bg-indigo-700 text-sm font-medium text-indigo-50 hover:bg-indigo-800;
    &.btn_left {
      @apply rounded-l-md;
    }
    &.btn_right {
      @apply rounded-r-md;
    }
    &.active {
      @apply bg-indigo-800;
    }
  }
}
</style>