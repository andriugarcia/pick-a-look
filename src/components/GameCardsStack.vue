<template lang="pug">
  .cardsheight
    .ma-4(v-if="loading")
      v-skeleton-loader(transition="scale-transition", type="image")
      v-skeleton-loader(transition="scale-transition", type="card")
    GameCard.cards(
      v-else,
      v-for="(card, index) in cards",
      :key="index",
      :card="card",
      :is-current="index === 0",
      @cardAccepted="$emit('cardAccepted');",
      @cardRejected="$emit('cardRejected');",
      @cardSkipped="$emit('cardSkipped');",
      @hideCard="$emit('hideCard');")
</template>

<script>
import GameCard from './GameCard.vue';

export default {
  components: {
    GameCard,
  },

  computed: {
    loading() {
      return this.$store.state.stack.cards.length == 0;
    }
  },

  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.cards {
  // position: relative;
  // display: flex;
  margin: 16px;
  width: calc(100% - 32px);
}

.cardsheight {
  // height: calc(100vh - 300px);
  height: 70%;
}
</style>
