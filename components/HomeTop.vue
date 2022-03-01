<template>
  <div class="top">
    <div class="container mx-auto">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <div class="w-12/12 mx-4 lg:mx-0">
          <h1 class="text-3xl text-p-yellow mb-8">Admin Plenitud</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss">
.top {
  background-image: url('~assets/images/bkg_ini.jpg') !important;
  background-size: cover;
  background-position: center bottom;
  @apply bg-p-blue py-8;
}
.beneficios {
  @apply mt-16 flex flex-col lg:flex-row items-start lg:justify-between justify-center;
}
</style>