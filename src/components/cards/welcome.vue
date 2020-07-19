<template lang="pug">
  #Welcome(style="height: 100%")
    v-sheet(color="hookle", style="height: 100%")
      .text-left.ml-6.pt-6
        div(style="font-size: 3.2em; font-weight: 900; line-height: 60px; letter-spacing: -4px") DESCUBRE<br/>TU PROPIO<br/>ESTILO
      .mt-2.mx-6.text-left
        strong(style="display: inline-block; letter-spacing: -1px") 1. <b>Vota</b> las prendas dependiendo de si te gustan más o menos
        strong(style="display: inline-block; letter-spacing: -1px") 2. Aprenderemos de ti y te ofreceremos cada vez prendas que te <b>gusten más</b>
        strong(style="display: inline-block; letter-spacing: -1px") 3. <b>Compra o guarda</b> aquellas que más te gusten!
      //- v-layout.mb-4(justify-center)  
        img(src="@/assets/tutorial.png", style="width: 100%")
      v-layout.pa-6.text-center(column, align-center, justify-center, style="height: 100%")
        .mt-4.px-6(style="position: absolute; bottom: 32px")
          v-btn.hookle--text.font-weight-bold(color="black", large, rounded, block, @click="discard") ¡Quiero descubrirlas!
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
