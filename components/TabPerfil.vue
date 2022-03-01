<template>
  <div class="p-perfil">
    <div class="w-full">
      <FormActualizar></FormActualizar>
    </div>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'

import FormActualizar from '~/components/perfil/FormActualizar.vue'
export default {
  components: {
    FormActualizar,
  },
  mixins: [AuthMixin],
}
</script>

<style>
</style>