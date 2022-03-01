<template>
  <div class="content">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row justify-between py-8">
        <div class="w-12/12 px-4 lg:px-0">
          <h3 class="text-2xl text-p-bluet uppercase mb-8">Admin plenitud</h3>
          <div class="grid grid-cols-4 gap-8 mb-8 ml-8">
            <div class="servicios">
              <dt>
                <div class="icono">
                  <i class="fal fa-flower-daffodil"></i>
                </div>
              </dt>
              <dd>
                <h4>Convenios</h4>
                <ul>
                  <li>
                    Permite generar convenios para el sitio web de personas
                  </li>
                </ul>
              </dd>
              <nuxt-link
                to="admin/convenios"
                class="w-full block p-btn p-btn-full"
              >
                Ingresar <i class="fal fa-sign-in"></i>
              </nuxt-link>
            </div>

            <div class="servicios">
              <dt>
                <div class="icono">
                  <i class="fal fa-heartbeat"></i>
                </div>
              </dt>
              <dd>
                <h4>Convenios empresas</h4>
                <ul>
                  <li>Convenios de código para empresas</li>
                </ul>
              </dd>
              <nuxt-link
                to="admin/convenios_empresas"
                class="w-full block p-btn p-btn-full"
              >
                Ingresar <i class="fal fa-sign-in"></i>
              </nuxt-link>
            </div>
            <!--
            <div class="servicios">
              <dt>
                <div class="icono">
                  <i class="fal fa-hospitals"></i>
                </div>
              </dt>
              <dd>
                <h4>Seguros</h4>
                <ul>
                  <li>Servicios contra accidentes y de vida.</li>
                </ul>
              </dd>
            </div>

            <div class="servicios">
              <dt>
                <div class="icono">
                  <i class="far fa-cat"></i>
                </div>
              </dt>
              <dd>
                <h4>Protección de mascotas</h4>
                <ul>
                  <li>Cobertura en todo el país.</li>
                  <li>Si vienes de otra entidad, respetamos tu antigüedad.</li>
                </ul>
              </dd>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'

import 'swiper/css/swiper.css'

export default {
  components: {},

  mixins: [AuthMixin],
  data() {
    return {
      numberOfSlides: 4,
    }
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {
      console.log('slide change')
    },
  },
}
</script>

<style lang="postcss">
.content {
  @apply bg-p-con;
}
.servicios {
  @apply relative bg-p-blue3 px-5 py-2 rounded-xl shadow space-y-2 transition-shadow duration-200 hover:shadow-lg;
  h4 {
    @apply text-p-bluet mb-4 text-xl mt-8;
  }
  ul {
    li {
      @apply mb-2 text-sm;
    }
  }
  .icono {
    @apply absolute flex items-center justify-center h-12 w-12 text-2xl rounded-full bg-p-yellow text-p-blue -top-6 -left-6;
  }
}
.planes {
  @apply mb-8;
  .plan_info {
    @apply text-center w-full;
    &_wrap {
      @apply mx-4;
      &_header {
        @apply px-4 pt-4 py-2 rounded-t-lg;
        h4 {
          @apply text-sm text-white;
        }
      }
      &_content {
        @apply pt-4 pb-4 px-0 bg-p-cream1 text-p-cof rounded-b-lg;
        ul {
          li {
            @apply mb-2 border-b border-p-tex px-4 pt-1 pb-1 font-light;
          }
        }
      }
    }
  }
  .swiper-button-next {
    right: 0px;
    @apply rounded-full h-8 w-8 bg-p-orang leading-none pt-0 pl-1 text-center hover:bg-p-blue6 hover:scale-95  transition-all;
    &::after {
      @apply text-white text-lg;
    }
  }
  .swiper-button-prev {
    left: 0px;
    @apply rounded-full h-8 w-8 bg-p-orang leading-none pt-0 pr-1 text-center hover:bg-p-blue6 hover:scale-95 transition-all;
    &::after {
      @apply text-white text-lg;
    }
  }
}
.btn-mod {
  @apply text-indigo-500;
}
</style>