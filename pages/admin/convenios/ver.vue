<template>
  <div>
    <div class="flex justify-between items-center">
      <Header
        v-if="convenioInfo"
        :titulo="`Ver convenio: ${convenioInfo.nombre}`"
      ></Header>
      <div v-if="convenioInfo">
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{
            path: `/admin/convenios/editar/?uid=${convenioInfo.id}`,
          }"
          class="btn-con-nav"
          aria-label="Agregar usuario"
          role="button"
        >
          <i class="fal fa-edit"></i
        ></nuxt-link>
      </div>
    </div>

    <ConvenioFormAgregar
      v-if="convenioInfo"
      :lectura="true"
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