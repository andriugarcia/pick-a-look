<template lang="pug">
  #GameCard.card(v-if="isShowing", ref="interactElement",
    :class="{isAnimating: isInteractAnimating, isCurrent: isCurrent}",
    :style="{ transform: transformString }")

      v-overlay(absolute, :value="rejected", :opacity=".8", color="tred")
        v-icon(x-large) far fa-thumbs-down
      v-overlay(absolute, :value="accepted", :opacity=".8", color="tgreen")
        v-icon(x-large) far fa-thumbs-up
      v-sheet(color="tyellow", style="height: 100%; width: 100%")
        component(:is="cardRenderer", :card="card", @discard="hideCard")
</template>

<script>
import interact from 'interact.js';

const ACCEPT_CARD = 'cardAccepted';
const REJECT_CARD = 'cardRejected';

export default {
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100,
  },

  props: {
    card: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },

      accepted: false,
      rejected: false,
    };
  },

  computed: {
    cardRenderer() {
      if (this.card.type === 'welcome') {
        return () => import('@/components/cards/welcome.vue');
      }

      if (this.card.type === 'login') {
        return () => import('@/components/cards/login.vue');
      }

      if (this.card.type === 'signup') {
        return () => import('@/components/cards/signup.vue');
      }

      if (this.card.type === 'clothing') {
        return () => import('@/components/cards/clothing.vue');
      }

      return () => {};
    },
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    },
  },

  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit('hideCard', this.card);
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  display: flex;
  // max-height: 350px;
  border-radius: 12px;
  margin: auto;
  color: $c-white;
  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  // height: 100vw;
  height: 64vh;
  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>
