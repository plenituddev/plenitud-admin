<template>
  <div class="bg-p-con pt-16">
    <client-only>
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