<template lang="pug">
  #List
    v-layout.pa-6(align-center, justify-center)
      v-card.pa-4(rounded, flat, style="border-radius: 24px; border: 2px solid #1c1c1c;")
        v-layout
          v-icon {{ getIcon() }}
          h3.ml-4 {{ getHeader() }}
    masonry(:cols="{default: 4, 1000: 3, 700: 2, 400: 1}")
      v-card.ma-2.mb-4(v-for="(clothing, i) in clothes", :key="i", hover, @click="buy(clothing)", flat, style="border: 2px solid #1c1c1c;")
        img(v-for="(picture, i) in clothing.pictures", style="width: 100%", :src="picture", :srcset="clothing.srcsets[i]")
        v-card.px-3.smallcard(style="height: 100%", flat, color="#f50057", tile)
          strong(style="font-size: .8em") {{clothing.name | truncate(60)}}
          div(style="font-size: .8em") {{clothing.brand | truncate(60)}}
</template>

<script lang="ts">
import Vue from 'vue';

enum Icon {
  Like = 'fas fa-thumbs-up',
  Dislike = 'fas fa-thumbs-down',
  Favorite = 'fas fa-star',
  Buy = 'fas fa-shopping-list'
}

export default Vue.extend({
  filters: {
    truncate(text, stop, clamp) {
      return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '');
    },
  },
  data: () => ({
    clothes: [],
    selected: 2,
  }),
  watch: {
    '$route.name': async function (value) {
      console.log('Change Route');
      this.clothes = await this.getClothes(value);
    },
  },

  async mounted() {
    this.clothes = await this.getClothes(this.$route.name);
  },
  methods: {
    getHeader() : string {
      switch (this.$route.name) {
        case 'Likes':
          return 'Prendas que te han gustado';
        case 'Dislikes':
          return 'Prendas que no te han gustado';
        case 'Favorites':
          return 'Prendas Favoritas';
        case 'Bought':
          return 'Prendas que has comprado';
        default:
          return '';
      }
    },

    buy(card) {
      console.log(card)
      this.$store.dispatch('stack/bought', card.code);
      window.open(`https://www.amazon.es${card.url}&linkCode=ll1&tag=mouo-21&linkId=c7cee5388cfffae3e66db9880a2dab3f&language=es_ES`);
    },

    getIcon() : string {
      switch (this.$route.name) {
        case 'Likes':
          return Icon.Like;
        case 'Dislikes':
          return Icon.Dislike;
        case 'Favorites':
          return Icon.Favorite;
        case 'Bought':
          return Icon.Buy;
        default:
          return '';
      }
    },

    getClothes(route) {
      switch (route) {
        case 'Likes':
          console.log('Likes');
          return this.$store.dispatch('list/likes');
        case 'Dislikes':
          return this.$store.dispatch('list/dislikes');
        case 'Favorites':
          return this.$store.dispatch('list/favorites');
        case 'Bought':
          return this.$store.dispatch('list/bought');
        default:
          return [];
      }
    },
  },
});
</script>

<style>
  .smallcard {
    transition: width 1s, height 1s;
  }
</style>
