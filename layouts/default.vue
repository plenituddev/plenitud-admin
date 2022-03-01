<template>
  <div>
    <header class="sticky top-0 z-50 shadow-lg">
      <client-only>
        <Nav></Nav>
      </client-only>
    </header>
    <transition name="page"><Nuxt></Nuxt></transition>
    <client-only>
      <Footer></Footer>
    </client-only>
  </div>
</template>
<style lang="postcss">
body {
  @apply text-p-tex;
}
</style>