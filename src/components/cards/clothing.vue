<template lang="pug">
  #Clothing(style="height: 100%; border-radius: 12px;")
    section(style="height: 80%;")
      carousel(:src="card.pictures", :srcsets="card.srcsets")
      //- v-img(:src="card.pictures[0]", style="height: 100%; border-radius: 6px")
    div(ref="infosection", style="position: absolute; bottom: 0; width: 100%;")
      v-fade-transition
        v-btn.mb-1.px-4.text-capitalize.font-weight-bold(v-show="!expanded", rounded, depressed, x-small, style="border: 2px solid black") Ver Más Info
      div(style="width: 100%")
        .triangle
      v-card.pt-n4.text-left.section(flat, tile, :ripple="false", style="background-color: #f50057", @click="expand", :class="{'collapsed': !expanded, 'expanded': expanded}")
        v-layout.pl-4(justify-space-between)
          .mr-2
            h3 {{card.brand}}
            p {{card.name | truncate}}
          .mb-5.mt-4.py-3.px-4(v-if="card.price != '0€'", style="background-color: black; border-radius: 50px 0 0 50px;", align-center)
            h3.white--text {{card.price}}
        .px-4.mt-4
          .font-weight-bold Descripción
          div {{ card.description }}
      
</template>

<script lang="ts">
import Vue from 'vue';
import Carousel from '@/components/carousel.vue';

export default Vue.extend({
  data: () => ({
    expanded: false,
  }),
  filters: {
    truncate(value) {
      const str = value.toString();
      if (str.length >= 60) return `${str.substr(0, 60)}...`;
      return str;
    },
  },

  methods: {
    expand() {
      console.log("Expand");
      if (typeof this.card.description !== 'undefined') {
        this.expanded = !this.expanded
      }
      else {
        this.expanded = false
      }
    }
  },

  components: {
    Carousel,
  },

  // async beforeMount() {
  //   console.log(this.card.code);
  //   const data = await this.$store.dispatch('stack/getProduct', this.card.code);
  //   this.card.description = data.description;
  //   this.card.pictures = data.pictures;
  //   this.card.price = data.price;
  //   console.log(this.card);
  // },

  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },
});
</script>

<style lang="scss" scoped>
  .section {
    height:600px;
    overflow:hidden;
    transition:max-height 0.15s ease-out; // note that we're transitioning max-height, not height!
  }

  .collapsed {
    max-height:100px; // still have to hard-code a value!
  }

  .expanded {
    max-height:460px;
  }

  .triangle {
    width: 0;
    height: 0;
    border-bottom: 30px solid #f50057;
    border-right: 90vw solid transparent;
  }
</style>
