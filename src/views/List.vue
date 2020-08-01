<template lang="pug">
  #List
    v-subheader.mt-6.hookle--text(style="font-size: 1.2em") {{ getHeader() }}
    v-layout.mt-2(v-if="$route.name == 'Historial'", align-center, wrap)
      v-flex(xs12, lg-3)
        v-subheader Ordenar por
      v-flex(xs12, lg-9)
        v-overflow-btn(label="Ordenar por", :items="historicalOrderList", @change="changeHistoricalOrder", v-model="historicalOrder", color="hookle", item-color="hookle")
          template(v-slot:selection="data")
            v-chip.ml-4(v-bind="data.attrs", small, label, dark, color="hookle", :input-value="data.selected", @click="data.select") {{data.item | categorieTitle}}
          template(v-slot:item="data")
            v-list-item-content {{data.item | categorieTitle}}
    v-layout(justify-center, v-if="clothes.length == 0")
      v-progress-circular.mt-12(indeterminate, color="hookle", size="56")
    div(v-else)
      v-card.ma-4.pa-12(v-if="emptyClothes", flat, tile, color="#f5005740", style="border: 1px solid #f50057")
        v-layout(justify-center, align-center)
          v-icon(x-large, color="black") fa fa-sad-tear
          b.ml-4 Todavía no hay ninguna prenda
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
            v-btn.mt-2(v-if="$route.name == 'Favorites'", tile, depressed, block, color="tyellow", @click.stop="unfav(i)")
              v-icon(small) fas fa-star
              .ml-2.text-capitalize(style="letter-spacing: 0") Quitar de Favoritos
            v-btn.mt-2(v-else, tile, depressed, block, color="tblue")
              v-icon(small) fas fa-shopping-cart
              .ml-2.text-capitalize(style="letter-spacing: 0") Comprar
    v-progress-circular.my-12(v-if="paginationLoading",indeterminate, color="hookle", size="56")
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
  data: () => ({
    clothes: [],
    paginationLoading: false,
    selected: 2,
    page: 0,
    emptyClothes: true,
    fullClothes: false,
    historicalOrder: 'historicalDesc',
    historicalOrderList: ['historicalDesc', 'historicalAsc', 'ratingAsc', 'ratingDesc'],
  }),
  watch: {
    '$route.name': async function (value) {
      console.log('Change Route');
      this.clothes = [];
      this.page = 0;
      this.emptyClothes = false;
      this.fullClothes = false;
      this.clothes = await this.getClothes(value);
      if (this.clothes.length == 0) this.emptyClothes = true;
    },

  },

  async mounted() {
    this.clothes = [];
    this.clothes = await this.getClothes(this.$route.name);

    window.onscroll = async() => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 320 && !this.paginationLoading && !this.fullClothes) {
        this.paginationLoading = true
        this.page += 1;
        console.log(this.page)
        const nextPageClothes = await this.getClothes(this.$route.name);
        this.clothes = [
          ...this.clothes, 
          ...nextPageClothes,
        ]
        if (nextPageClothes.length == 0) this.fullClothes = true
        this.paginationLoading = false
      }
    }

  },
  filters: {
    categorieTitle(value) {
      switch (value) {
        case 'historicalDesc':
          return 'Últimas que votaste'
        case 'historicalAsc':
          return 'Primeras que votaste'
        case 'ratingDesc':
          return 'Te han gustado más'
        case 'ratingAsc':
          return 'Te han gustado menos'
        default:
          return 'Últimas que votaste'

      }
    },
    truncate(text, stop, clamp) {
      return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '');
    },
  },
  computed: {
    logged() {
      return this.$store.state.auth.logged;
    }
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

    async changeHistoricalOrder() {
      this.clothes = []
      this.clothes = await this.getClothes(this.$route.name);
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

    unfav(i) {
      this.$store.dispatch('stack/unfav', this.clothes[i].code);
      this.clothes.splice(i, 1);
    },

    getClothes(route) {
      console.log(route)
      switch (route) {
        case 'Historial':
          return this.$store.dispatch('list/historial', {order: this.historicalOrder, page: this.page});
        case 'Likes':
          console.log('Likes');
          return this.$store.dispatch('list/likes');
        case 'Dislikes':
          return this.$store.dispatch('list/dislikes');
        case 'Favorites':
          return this.$store.dispatch('list/favorites', this.page);
        case 'Bought':
          return this.$store.dispatch('list/bought', this.page);
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
