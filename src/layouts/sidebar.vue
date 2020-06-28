<template lang="pug">
  v-list.text-left(style="position: relative; height: 100%")
    v-card.ml-6.mt-4(flat, @click="$router.push({path: '/'})")
      img(src="../assets/LogoText.svg", style="width: 220px")
    .overline.mt-8.pl-6 TUS ACCIONES
    v-divider.my-4
    v-list-item(@click="toList('Likes')")
      v-list-item-avatar(color="tgreen")
        v-icon.white--text(small) fas fa-thumbs-up
      v-list-item-content
        v-list-item-title Prendas que te han gustado
    v-list-item(@click="toList('Dislikes')")
      v-list-item-avatar(color="tred")
        v-icon.white--text(small) fas fa-thumbs-down
      v-list-item-content
        v-list-item-title Prendas que no te han gustado
    v-list-item(@click="toList('Favorites')")
      v-list-item-avatar(color="tyellow")
        v-icon.white--text(small) fas fa-star
      v-list-item-content
        v-list-item-title Tus prendas favoritas
    v-list-item(@click="toList('Bought')")
      v-list-item-avatar(color="tblue")
        v-icon.white--text(small) fas fa-shopping-cart
      v-list-item-content
        v-list-item-title Prendas que has comprado
    .skew(style="width: 100%", :class="{'bottomMobile': !$vuetify.breakpoint.mdAndUp, 'bottomDesktop': $vuetify.breakpoint.mdAndUp}")
      v-layout.wrapper.pb-2(justify-center, align-center, style="font-family: 'Jost', 'Avenir', Helvetica, Arial, sans-serif")
        i.white--text.font-weight-bold Done with
        v-icon.mx-2.white--text fas fa-fire-alt
        i.white--text.font-weight-bold by
        v-chip.ml-2(color="white", @click="toTwitter")
          div.hookle--text @VersyCreate
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    toList(r) : void {
      this.$router.push({
        name: r,
      });
    },
    toTwitter() : void {
      window.open('https://twitter.com/VersyCreate');
    },
  },
});

</script>

<style>
  .strok {
    -webkit-text-stroke: 2px black;
  }
  .strokIcon {
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
  }
  .skew {
    width: 100%;
    margin-top: 50px;
    background-color: #f50057;
    -webkit-transform: skewY(-5deg);
    -moz-transform: skewY(-5deg);
    -ms-transform: skewY(-5deg);
    -o-transform: skewY(-5deg);
    transform: skewY(-5deg);
  }
  .skew > .wrapper {
    margin: 80px 0;
    -webkit-transform: skewY(5deg);
    -moz-transform: skewY(5deg);
    -ms-transform: skewY(5deg);
    -o-transform: skewY(5deg);
    transform: skewY(5deg);
  }
  .bottomMobile {
    position: absolute;
    bottom: 0;
  }
  .bottomDesktop {
    position: fixed;
    bottom: 0;
  }
</style>
