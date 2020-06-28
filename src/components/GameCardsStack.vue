<template lang="pug">
  div(style="height: 64vh")
    GameCard.cards(
      v-for="(card, index) in cards",
      :key="card",
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
</style>
