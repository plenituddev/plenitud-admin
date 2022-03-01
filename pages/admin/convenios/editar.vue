<template>
  <div>
    <div class="headp flex justify-between items-center">
      <Header
        v-if="convenioInfo"
        :titulo="`Editar convenio: ${convenioInfo.nombre}`"
      ></Header>
      <div v-if="convenioInfo">
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{
            path: `/admin/convenios/ver/?uid=${convenioInfo.id}`,
          }"
          class="btn-con-nav"
          aria-label="Ver usuario"
          role="button"
        >
          <i class="fal fa-eye"></i
        ></nuxt-link>
      </div>
    </div>

    <ConvenioFormAgregar
      v-if="convenioInfo"
      :edicion="true"
      :convenioInfo="convenioInfo"
    ></ConvenioFormAgregar>
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
    this.convenioInfo = await this.getConvenio(this.$route.query.uid)
  },
}
</script>

<style>
</style>