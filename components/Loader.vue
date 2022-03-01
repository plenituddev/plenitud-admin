<template>
  <div class="flex space-x-8">
    <div class="blue-circle"></div>
    <div class="green-circle"></div>
    <div class="red-circle"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" >
.blue-circle {
  animation-delay: 0.1s !important;
  @apply bg-green-400 p-2 w-4 h-4 rounded-full animate-bounce mx-1;
}
.green-circle {
  animation-delay: 0.2s !important;
  @apply bg-cream-400 p-2 w-4 h-4 rounded-full animate-bounce  mx-1;
}
.red-circle {
  animation-delay: 0.3s !important;
  @apply bg-orange-400 p-2 w-4 h-4 rounded-full animate-bounce  mx-1;
}
</style>