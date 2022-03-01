<template>
  <TabPagos></TabPagos>
</template>

<script>
import AuthMixin from '~/mixins/auth.js'
export default {
  mixins: [AuthMixin],
  mounted() {
    this.tabs = 2
  },
}
</script>
<style>
</style>