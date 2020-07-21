<template lang="pug">
  #List
    v-subheader.mt-6.hookle--text(style="font-size: 1.2em") {{ getHeader() }}
    v-layout.mt-2(v-if="$route.name == 'Historial'", align-center, wrap)
      v-flex(xs12, lg-3)
        v-subheader Ordenar por
      v-flex(xs12, lg-9)
        v-overflow-btn(label="Ordenar por", :items="historicalOrderList", v-model="historicalOrder", color="hookle", item-color="hookle")
    v-layout(justify-center, v-if="clothes.length == 0")
      v-progress-circular.mt-12(indeterminate, color="hookle", size="56")
    masonry(v-else, :cols="{default: 4, 1000: 3, 700: 2, 400: 1}")
      v-card.elevation-6.ma-2.mb-4(v-for="(clothing, i) in clothes", :key="i", hover, @click="buy(clothing)", flat)
        img(v-for="(picture, i) in clothing.pictures", style="width: 100%", :src="picture", :srcset="clothing.srcsets[i]")
        v-card.text-left.smallcard(style="height: 100%; position: relative", flat, color="#f50057", tile)
          div(style="overflow: hidden; position: absolute; top: -24px; left: 0; width: 100%")
            .triangle
          v-layout.pl-4(justify-space-between)
            .mr-2
              strong(style="font-size: .8em") {{clothing.brand | truncate(40)}}
              div(style="font-size: .8em") {{clothing.name | truncate(40)}}
            .mb-5.mt-4.py-1.px-2(v-if="clothing.price != '0€'", style="background-color: black; max-height: 36px; border-radius: 50px 0 0 50px;", align-center)
              b.white--text(style="font-size: .8em") {{clothing.price}}
          v-btn.mt-2(v-if="$route.name == 'Favorites'", tile, depressed, block, color="tyellow", @click.stop="")
            v-icon(small) fas fa-star
            .ml-2.text-capitalize(style="letter-spacing: 0") Quitar de Favoritos
          v-btn.mt-2(v-else, tile, depressed, block, color="tblue")
            v-icon(small) fas fa-shopping-cart
            .ml-2.text-capitalize(style="letter-spacing: 0") Comprar
</template>

<script lang="ts">
import Vue from 'vue';

enum Icon {
  Historial = 'fas fa-shirt-up',
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
    historicalOrder: 'Últimas que votaste',
    historicalOrderList: ['Últimas que votaste', 'Primeras que votaste', 'Te han gustado más', 'Te han gustado menos'],
  }),
  watch: {
    '$route.name': async function (value) {
      console.log('Change Route');
      this.clothes = [];
      this.clothes = await this.getClothes(value);
    },
    historicalOrder: async function (value) {
      this.clothes = [];
      switch (value) {
        case 'Últimas que votaste':
          this.clothes = await this.$store.dispatch('list/historial', 'historicalDesc');
          break;
        case 'Primeras que votaste':
          this.clothes = await this.$store.dispatch('list/historial', 'historicalAsc');
          break;
        case 'Te han gustado más':
          this.clothes = await this.$store.dispatch('list/historial', 'ratingsAsc');
          break;
        case 'Te han gustado menos':
          this.clothes = await this.$store.dispatch('list/historial', 'ratingsDesc');
          break;
      }

    }
  },

  async mounted() {
    this.clothes = [];
    this.clothes = await this.getClothes(this.$route.name);
  },
  methods: {
    getHeader() : string {
      switch (this.$route.name) {
        case 'Historial':
          return 'Prendas que has votado';
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
      window.open(`https://www.amazon.es/dp/${card.code}/ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=pickalook-21&linkId=3256bb71ff80b01ea14cb534e7758283&language=es_ES`);
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
      console.log(route)
      switch (route) {
        case 'Historial':
          return this.$store.dispatch('list/historial', 'historicalDesc');
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
  .triangle {
    width: 0;
    height: 0;
    border-bottom: 24px solid #f50057;
    border-right: 50vw solid transparent;
  }
</style>
