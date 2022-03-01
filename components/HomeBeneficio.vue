<template>
  <div class="beneficio">
    <h3 class="b_title">{{ titulo }}</h3>
    <div class="number">
      {{ numero }}
      <i class="fas fa-circle absolute text-xs text-p-orang mt-3 -ml-2"></i>
    </div>
    <p>{{ texto }}</p>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      type: String,
      default: null,
    },
    numero: {
      type: String,
      default: null,
    },
    texto: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="postcss">
.beneficio {
  @apply text-center lg:w-full lg:mr-8 mx-auto mb-4 lg:mb-2;
  h3 {
    @apply text-sm mb-1 text-p-blue6;
  }
  .number {
    @apply text-5xl font-bold text-p-cream1 my-2 whitespace-nowrap;
  }
  p {
    @apply text-p-blue6 text-sm mx-8;
  }
}
</style>