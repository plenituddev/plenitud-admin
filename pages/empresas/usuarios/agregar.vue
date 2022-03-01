<template>
  <div>
    <Header titulo="Agregar un nuevo usuario"></Header>
    <FormAgregar></FormAgregar>
  </div>
</template>

<script>
import FormAgregar from '~/components/usuarios/FormAgregar.vue'
export default {
  components: {
    FormAgregar,
  },
}
</script>

<style>
</style>