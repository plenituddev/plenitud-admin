<template>
  <TabPerfil></TabPerfil>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
  mounted() {
    this.tabs = 1
  },
}
</script>
<style>
</style>