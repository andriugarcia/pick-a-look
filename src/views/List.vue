<template lang="pug">
  #List
    v-layout.pa-6(align-center, justify-center)
      v-card.pa-4(rounded, flat, style="border-radius: 24px; border: 2px solid #1c1c1c;")
        v-layout
          v-icon {{ getIcon() }}
          h3.ml-4 {{ getHeader() }}
    masonry(:cols="{default: 4, 1000: 3, 700: 2, 400: 1}")
      v-card.ma-2.mb-4(v-for="(clothing, i) in clothes", :key="i", hover, flat, style="border: 2px solid #1c1c1c;")
        v-img(:src="clothing.pictures[0]")
        v-card.px-3.smallcard(style="height: 100%", flat)
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
        case 'Favorite':
          return 'Prendas Favoritas';
        case 'Bought':
          return 'Prendas que has comprado';
        default:
          return '';
      }
    },

    getIcon() : string {
      switch (this.$route.name) {
        case 'Likes':
          return Icon.Like;
        case 'Dislikes':
          return Icon.Dislike;
        case 'Favorites':
          return Icon.Favorites;
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
        case 'Favorite':
          return this.$store.dispatch('list/favorites');
        case 'Bought':
          return this.$store.dispatch('list/bought');
        default:
          return [];
      }
    },
  },

  async beforeRouteUpdate(to, next) {
    console.log('updating', to);
    // this.clothes = await this.getClothes();
    next();
  },
});
</script>

<style>
  .smallcard {
    transition: width 1s, height 1s;
  }
</style>
