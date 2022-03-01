<template>
  <div>
    <div class="flex justify-between items-center">
      <Header
        v-if="usuarioinfo"
        :titulo="`Ver usuario: ${usuarioinfo.personales.nombre_completo}`"
      ></Header>
      <div v-if="usuarioinfo">
        <nuxt-link
          v-scroll-to="{ el: '#configuracion' }"
          :to="{
            path: `/empresas/usuarios/editar/?uid=${usuarioinfo.uid}`,
          }"
          class="btn-con-nav"
          aria-label="Agregar usuario"
          role="button"
        >
          <i class="fal fa-edit"></i
        ></nuxt-link>
      </div>
    </div>

    <FormAgregar
      v-if="usuarioinfo"
      :lectura="true"
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