<template lang="pug">
  #Home
    //- #desktop(v-if="$vuetify.breakpoint.mdAndUp")
      v-layout(v-if="cards.length != 0")
        v-flex(md4)
          v-img.mx-2(:src="cards[0].pictures[0]", style="height: 100vh")
        v-flex(md3)
          v-img.ml-2.mb-2(:src="cards[0].pictures[1]", style="height: 50vh")
          v-img.ml-2.mt-2(:src="cards[0].pictures[2]", style="height: 50vh")
        v-flex.text-left.pa-6(md5, style="position: relative")
          v-layout(align-center)
            h1 {{ cards[0].brand }}
            v-spacer
            v-btn.mx-3.mr-4(icon, color="tyellow",:disabled="buttonsDisabled", @click="fav")
              v-icon {{favorite ? 'fas' : 'far'}} fa-star
            .py-3.px-4(v-if="cards[0].price != '0€'", style="background-color: black; border-radius: 25px 0 0 25px;", align-center)
              h3.white--text {{cards[0].price}}
          h3.mt-4 {{ cards[0].name }}
          .mt-4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          v-btn.mt-4(rounded, color="tblue", @click="buy", large, dark, block, depressed, style="height: 60px")
            v-icon.mr-2 fas fa-shopping-cart
            .text-capitalize Ver en Amazon
          v-layout.pr-12(style="position: absolute; bottom: 48px; width: 100%")
            v-flex(xs6)
              v-btn(outlined, color="tred", @click="rejectAndPop", style="border: 4px solid #F44336; width: 100%; height: 60px; border-radius: 40px 0 0 40px")
                v-icon far fa-thumbs-down
            v-flex(xs6)
              v-btn(outlined, color="tgreen", @click="acceptAndPop", style="border: 4px solid #4CAF50; width: 100%; height: 60px; border-radius: 0 40px 40px 0")
                v-icon far fa-thumbs-up
      v-else
        //- v-layout
          v-flex(xs6)
            .font-weight-bold(style="font-size: 4em;") Descubre tu Propio Estilo
    #mobile
      GameCardsStack(:cards="cards",
                      @cardAccepted="handleCardAccepted",
                      @cardRejected="handleCardRejected",
                      @cardSkipped="handleCardSkipped",
                      @hideCard="removeCardFromDeck")
      v-layout.mt-12.pt-6(justify-center, align-center)
        v-btn.mx-3(large, fab, icon, :disabled="buttonsDisabled", @click="buy")
          v-icon(color="tblue") fas fa-shopping-cart
        v-slider.input(v-model="slider", min="10", max="90", :thumb-size="42", :loader-height="32", color="#f50057", @end="vote")
          template(style="font-size: 32px;", v-slot:thumb-label="{ value }")
            div(:style="`font-size: ${Math.abs(slider - 50) + 10}px`") {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 9)] }}
        v-btn.mx-3(large, fab, icon, :color="favorite ? 'tyellow' : ''", :disabled="buttonsDisabled", @click="fav")
          v-icon(:color="!favorite ? 'tyellow' : 'white'") {{favorite ? 'fas' : 'far'}} fa-star
</template>

<script lang="ts">
import Vue from 'vue';
import GameCardsStack from '@/components/GameCardsStack.vue';

export default Vue.extend({
  components: {
    GameCardsStack,
  },

  data: () => ({
    favorite: false,
    satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
    slider: 50,
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
    vote() {
      this.$store.dispatch('stack/vote', { code: this.cards[0].code, rating: this.slider / 10 });
      this.removeCardFromDeck();
      this.slider = 50;
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
    },
    buy() {
      this.$store.dispatch('stack/bought', this.cards[0].code);
      window.open(`https://www.amazon.es${this.cards[0].url}&linkCode=ll1&tag=mouo-21&linkId=c7cee5388cfffae3e66db9880a2dab3f&language=es_ES`);
    },
    fav() {
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
</style>
