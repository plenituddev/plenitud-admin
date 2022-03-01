<template>
  <div v-if="userData" class="bg-p-con">
    <client-only>
      <template v-if="navegacionUsuario.usuariosLoad">
        <UsuarioTop></UsuarioTop>
        <div id="configuracion" class="pb-20">
          <Tabs></Tabs>
          <div class="content">
            <div class="container mx-auto">
              <transition name="p-fade">
                <div>
                  <div class="p-wrapper">
                    <NuxtChild />
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </template>

      <transition name="p-fade" tag="div">
        <div
          v-if="!navegacionUsuario.usuariosLoad"
          class="min-h-screen flex justify-center items-center text-center"
        >
          <div>
            <h3 class="mb-2 text-xl uppercase tracking-wide">Iniciando</h3>
            <Loader></Loader>
          </div>
        </div>
      </transition>
    </client-only>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
  middleware: 'auth',
  methods: {},
}
</script>
<style lang="postcss">
.btn-p {
  @apply px-5 py-2;
}
.p-wrapper {
  @apply shadow-lg border border-p-blue3 rounded-xl py-8 px-6 bg-p-nav;
}
</style>