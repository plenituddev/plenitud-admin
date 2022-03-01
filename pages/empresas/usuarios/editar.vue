<template>
  <div>
    <div class="headp flex justify-between items-center">
      <Header
        v-if="usuarioinfo"
        :titulo="`Editar usuario: ${usuarioinfo.personales.nombre_completo}`"
      ></Header>
      <div v-if="usuarioinfo">
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{
            path: `/empresas/usuarios/ver/?uid=${usuarioinfo.uid}`,
          }"
          class="btn-con-nav"
          aria-label="Ver usuario"
          role="button"
        >
          <i class="fal fa-eye"></i
        ></nuxt-link>
      </div>
    </div>

    <FormAgregar
      v-if="usuarioinfo"
      :edicion="true"
      :usuarioinfo="usuarioinfo"
    ></FormAgregar>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
import FormAgregar from '~/components/usuarios/FormAgregar.vue'
export default {
  components: {
    FormAgregar,
  },
  mixins: [AuthMixin],
  data() {
    return {
      usuarioinfo: null,
    }
  },
  async fetch() {
    this.usuarioinfo = await this.getUsuario(this.$route.query.uid)
  },
}
</script>

<style>
</style>