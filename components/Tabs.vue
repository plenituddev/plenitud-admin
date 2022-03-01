<template>
  <div class="content">
    <div class="container mx-auto">
      <div class="tabs">
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{ path: '/admin/convenios' }"
          class="tab tab-lifted"
          :class="tabs == 0 ? 'tab-active' : ''"
          >Convenios <i class="fal fa-users"></i
        ></nuxt-link>
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{ path: '/admin/convenios_empresas' }"
          class="tab tab-lifted"
          :class="tabs == 2 ? 'tab-active' : ''"
          >Convenios empresas <i class="fas fa-building"></i
        ></nuxt-link>
        <!--  <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{ path: '/admin/pagos' }"
          class="tab tab-lifted"
          :class="tabs == 2 ? 'tab-active' : ''"
          >Pagos <i class="fal fa-money-check-alt"></i
        ></nuxt-link> -->
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
.tab-lifted {
  @apply bg-p-nav text-white mx-2 border-none transition-all hover:bg-indigo-900;
  i {
    @apply font-bold pt-1 ml-4 text-sm rounded-full w-8 h-8 bg-orange-500 text-white;
  }
  &.tab-active {
    @apply bg-p-orang text-white mx-2 border-none;
    &::after {
      background-image: radial-gradient(
        circle at 100% 0%,
        rgba(0, 0, 0, 0) calc(68% - 1px),
        #e26e58 calc(68% - 0.7px),
        #e26e58 68%,
        #e26e58 calc(68% + 0.3px)
      );
    }
    &::before {
      background-image: radial-gradient(
        circle at 0% 0%,
        rgba(0, 0, 0, 0) calc(68% - 1px),
        #e26e58 calc(68% - 0.7px),
        #e26e58 68%,
        #e26e58 calc(68% + 0.3px)
      );
    }
  }
}
</style>