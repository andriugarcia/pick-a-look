<template lang="pug">
  #Welcome(style="height: 100%")
    v-sheet.pb-12#login(style="height: 100%", color="hookle")
      v-layout.pa-6.text-center(column, align-center, justify-center, style="height: 100%")
        div
          h1 Pick a Look
          div Encuentra tu propia moda
        .mt-6.text-left
          strong(style="display: inline-block") 1. Vota las prendas dependiendo de si te gustan más o menos
          strong(style="display: inline-block") 2. Aprenderemos de ti y te ofreceremos cada vez mejores prendas
          strong(style="display: inline-block") 3. Puedes comprar o guardar aquellas que más te gusten!
        v-layout.mb-4(justify-center)  
          img(src="@/assets/tutorial.png", style="width: 100%")
        .px-6(style="position: absolute; bottom: 32px; width: 100%;")
          v-btn.hookle--text.font-weight-bold(color="black", large, rounded, block, @click="discard") Siguiente
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    discard() {
      this.$emit('discard');
    }
  }
})

</script>
