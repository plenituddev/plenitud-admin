<template>
  <div>
    <Header titulo="Pagos"></Header>
    <Pagos></Pagos>
  </div>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'

import Pagos from '~/components/pagos/Pagos.vue'

export default {
  components: {
    Pagos,
  },
  mixins: [AuthMixin],
}
</script>

<style>
</style>