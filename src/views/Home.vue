<template lang="pug">
  #Home
    #desktop(v-if="$vuetify.breakpoint.mdAndUp")
      v-layout(v-if="logged")
        div(style="width: 60%")
          img.ma-4(style="height: 80vh; max-width: 100%; object-fit: cover;", :src="cards[0].pictures[pictureSelected]", :srcset="cards[0].srcsets[pictureSelected]")
          v-layout
            img.ma-4(v-for="(picture, i) in cards[0].pictures", :key="i", @mouseover="pictureSelected = i", style="width: 80px; height: 80px; object-fit: cover;", :class="{'hookleborder': i == pictureSelected}", :src="picture", :srcset="cards[0].srcsets[i]")
        v-flex.text-left.pa-6(md5, style="position: relative")
          v-layout(align-center)
            h1 {{ cards[0].brand }}
            v-spacer
            .py-3.px-4(v-if="cards[0].price != '0€'", style="background-color: black; border-radius: 25px 0 0 25px;", align-center)
              h3.white--text {{cards[0].price}}
          h3.mt-4 {{ cards[0].name }}
          .mt-4 {{ cards[0].description }}
          div(style="position: absolute; bottom: 24px")  
            v-layout.mt-8.py-4(justify-center, align-center)
              v-flex.mr-1(xs6)
                v-btn(large, block, rounded, color="tblue", :disabled="buttonsDisabled", @click="buy")
                  v-icon.white--text(small) fas fa-shopping-cart
                  .ml-2.text-capitalize.white--text.font-weight-bold Comprar
              v-flex.ml-1(xs6)
                v-btn(large, block, rounded, color="tyellow", :disabled="buttonsDisabled", @click="fav")
                  v-icon(small) {{ favorite ? 'fas' : 'far' }} fa-star
                  .ml-2.text-capitalize.font-weight-bold Favorito
            v-card.mt-4(color="grey lighten-3", flat, style="border-radius: 40px")
              v-layout(style="cursor: pointer", justify-center)
                .py-1.px-3(style="font-size: 1.8em", :class="{'selected-left': select == -3, 'disabled': buttonsDisabled}", @mouseup="vote(2)", @mousedown="select = -3", @mousemove="select = -3", @touchmove="select = -3") 😭
                .py-1.px-3(style="font-size: 1.8em", :class="{'selected-left': select == -2, 'between': select < -2, 'disabled': buttonsDisabled}", @mouseup="vote(3)", @mousedown="select = -2", @mousemove="select = -2", @touchmove="select = -2") ️️😢
                .py-1.px-3(style="font-size: 1.8em", :class="{'selected-left': select == -1, 'between': select < -1, 'disabled': buttonsDisabled}", @mouseup="vote(4)", @mousedown="select = -1", @mousemove="select = -1", @touchmove="select = -1") ☹️
                .py-1.px-2(style="font-size: 1.8em", :class="{'selected-right': select < 0, 'selected-left': select > 0, 'center-notselected': select == 0, 'disabled': buttonsDisabled}", @mouseup="vote(5)", @mousedown="select = 0", @mousemove="select = 0", @touchemove="select = 0") 😐
                .py-1.px-3(style="font-size: 1.8em", :class="{'selected-right': select == 1, 'between': select > 1, 'disabled': buttonsDisabled}", @mouseup="vote(6)", @mousedown="select = 1", @mousemove="select = 1", @touchemove="select = 1") 😊
                .py-1.px-3(style="font-size: 1.8em", :class="{'selected-right': select == 2, 'between': select > 2, 'disabled': buttonsDisabled}", @mouseup="vote(7)", @mousedown="select = 2", @mousemove="select = 2", @touchemove="select = 2") 😁
                .py-1.px-3(style="font-size: 1.8em", :class="{'selected-right': select == 3, 'disabled': buttonsDisabled}", @mouseup="vote(8)", @mousedown="select = 3", @mousemove="select = 3") 😍
      div(v-else)
        v-layout.ma-12
          v-flex(xs7).text-left
            .font-weight-bold(style="font-size: 2em;") Descubre tu Propio Estilo
            strong(style="display: inline-block") 1. Vota las prendas dependiendo de si te gustan más o menos
            strong(style="display: inline-block") 2. Aprenderemos de ti y te ofreceremos cada vez mejores prendas
            strong(style="display: inline-block") 3. Compra o guarda aquellas que más te gusten!
          v-flex(xs5)
            login(:flap="false")
            signup.mt-2(:flap="false")
    #mobile(v-else)
      GameCardsStack(:cards="cards",
                      @cardAccepted="handleCardAccepted",
                      @cardRejected="handleCardRejected",
                      @cardSkipped="handleCardSkipped",
                      @hideCard="removeCardFromDeck")
      v-layout(align-center, column, style="position: fixed; bottom: 12px; width: 100%;")
        v-layout.mt-8.mx-8.py-4(justify-center, align-center)
          v-flex.pr-2(xs6)
            v-btn(rounded, color="tblue", :disabled="buttonsDisabled", block, @click="buy")
              v-icon(small) fas fa-shopping-cart
              .ml-2.text-capitalize.font-weight-bold Comprar
          v-flex.pl-2(xs6)
            v-btn(rounded, color="tyellow", :disabled="buttonsDisabled", block, @click="fav")
              v-icon(small) {{ favorite ? 'fas' : 'far' }} fa-star
              .ml-2.text-capitalize.font-weight-bold Favorito
        v-layout(justify-center)
          v-btn-toggle.votebuttons(rounded)
            v-btn(@mouseup="vote(-3)", style="font-size: 1.4em") 😭
            v-btn(@mouseup="vote(-2)", style="font-size: 1.4em") ️️😢
            v-btn(@mouseup="vote(-1)", style="font-size: 1.4em") ☹️
            v-btn(@mouseup="vote(0)", style="font-size: 1.4em") 😐
            v-btn(@mouseup="vote(1)", style="font-size: 1.4em") 😊
            v-btn(@mouseup="vote(2)", style="font-size: 1.4em") 😁
            v-btn(@mouseup="vote(3)", style="font-size: 1.4em") 😍
    v-snackbar(:timeout="1000", :value="favorite", absolute, bottom, color="tyellow", dark, text) 
      .black--text Guardada en Favoritos
</template>

<script lang="ts">
import Vue from 'vue';
import GameCardsStack from '@/components/GameCardsStack.vue';

export default Vue.extend({
  components: {
    GameCardsStack,
    login: () => import('@/components/cards/login.vue'),
    signup: () => import('@/components/cards/signup.vue'),
  },

  data: () => ({
    favorite: false,
    satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
    slider: 50,
    select: 0,
    pictureSelected: 0
  }),

  computed: {
    cards: {
      get() {
        return this.$store.state.stack.cards;
      },
      set(value) {
        this.$store.commit('stack/setCards', value);
      },
    },

    buttonsDisabled() {
      if (this.cards.length !== 0) {
        return this.cards[0].type !== 'clothing';
      }
      return false;
    },

    logged() {
      return this.$store.state.auth.logged;
    },
  },

  methods: {
    acceptAndPop() {
      this.handleCardAccepted();
      this.removeCardFromDeck();
    },
    rejectAndPop() {
      this.handleCardRejected();
      this.removeCardFromDeck();
    },
    vote(rating) {
      if (this.buttonsDisabled) return;
      this.$store.dispatch('stack/vote', { code: this.cards[0].code, rating: rating });
      this.removeCardFromDeck();
      this.slider = 0;
      console.log('Vote');
    },
    handleCardAccepted() {
      // this.$store.dispatch('stack/like', this.cards[0].code);
      console.log('handleCardAccepted');
    },
    handleCardRejected() {
      // this.$store.dispatch('stack/dislike', this.cards[0].code);
      console.log('handleCardRejected');
    },
    handleCardSkipped() {
      console.log('handleCardSkipped');
    },
    removeCardFromDeck() {
      this.$store.commit('stack/shift');
      if (this.$store.state.stack.cards.length <= 5 && this.$store.state.auth.logged) {
        console.log('Reload Stack');
        this.$store.dispatch('stack/fetch');
      }
      this.favorite = false;
      this.pictureSelected.picture = this.$store.state.stack.cards[0].pictures[0]
      this.pictureSelected.srcset = this.$store.state.stack.cards[0].srcsets[0]
      this.pictureSelected.value = 0
    },
    buy() {
      this.$store.dispatch('stack/bought', this.cards[0].code);
      window.open(`https://www.amazon.es${this.cards[0].url}&linkCode=ll1&tag=mouo-21&linkId=c7cee5388cfffae3e66db9880a2dab3f&language=es_ES`);
    },
    fav() {
      this.$store.dispatch('stack/vote', { code: this.cards[0].code, rating: 10 });
      this.$store.dispatch('stack/fav', this.cards[0].code);
      this.favorite = true;
    },
  },

});
</script>

<style lang="scss">
  .input {
    width: 100%;
  }

  .selected-right {
    background-color: #D0D0D0;
    border-radius: 6px 40px 40px 6px; 
  }

  .selected-left {
    background-color: #D0D0D0;
    border-radius: 40px 6px 6px 40px; 
  }

  .center-notselected {
    background-color: #D0D0D0;
    border-radius: 50%;
  }

  .notselected {
    background-color: transparent;
  }

  .between {
    background-color: #D0D0D0;
  }

  .disabled {
    color: #00000045;
    background-color: transparent !important;
  }

.votebuttons {
  transform: scale(.8);
}

.hookleborder {
  border: 4px solid #f50057;
}

@media only screen and (min-width: 310px) {
  .votebuttons {
    transform: scale(.8);
  }

}
@media only screen and (max-width: 310px) {
  .votebuttons {
    transform: scale(1);
  }

}

</style>
