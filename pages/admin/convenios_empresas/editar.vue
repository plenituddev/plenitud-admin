<template>
  <div>
    <div class="headp flex justify-between items-center">
      <Header
        v-if="convenioInfo"
        :titulo="`Editar convenio empresa: ${convenioInfo.nombre}`"
      ></Header>
      <div v-if="convenioInfo">
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{
            path: `/admin/convenios_empresas/ver/?uid=${convenioInfo.id}`,
          }"
          class="btn-con-nav"
          aria-label="Ver convenio empresa"
          role="button"
        >
          <i class="fal fa-eye"></i
        ></nuxt-link>
      </div>
    </div>

    <ConvenioEFormAgregar
      v-if="convenioInfo"
      :edicion="true"
      :convenioInfo="convenioInfo"
    ></ConvenioEFormAgregar>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'

export default {
  mixins: [AuthMixin],
  data() {
    return {
      convenioInfo: null,
    }
  },
  async fetch() {
    this.convenioInfo = await this.getConvenioE(this.$route.query.uid)
  },
}
</script>

<style>
</style>