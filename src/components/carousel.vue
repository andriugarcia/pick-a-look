<template lang="pug">
  //- Dada una lista de imagenes, permite mostrarlas verticalmente en scroll
  //- Usada en la página de prenda en la versión móvil
  #carousel
    #slider(style="", ref="scroll")
      #content(ref="content")
        img.img(v-for="(img, i) in src", :key="i", :src="img", :srcset="srcsets[i]", alt="Prenda")
        //- v-img.img(v-for="(img, i) in src", :key="i", :src="img", :srcset="srcsets[i]", contain, alt="Prenda")
    v-layout.ml-3.mt-5(v-if="src.length > 1", column, align-center, style="position: absolute; top: 32%; left: 0px")
      .mb-1(v-for="i in src.length", :key="i")
        .dotSelected(v-if="index == i - 1")
        .dot(v-else)


</template>

<script>
export default {
  props: {
    src: {
      type: Array,
      default: () => [],
    },
    srcsets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      index: 0,
    };
  },

  mounted() {
    const { scroll } = this.$refs;
    scroll.addEventListener('touchstart', this.handleTouchStart, false);
    scroll.addEventListener('touchmove', this.handleTouchMove, false);
  },

  methods: {
    getTouches(evt) {
      return evt.touches || evt.originalEvent.touches;
    },

    handleTouchStart(evt) {
      this.$emit('touch');
      const firstTouch = this.getTouches(evt)[0];
      this.xDown = firstTouch.clientX;
      this.yDown = firstTouch.clientY;
    },

    handleTouchMove(evt) {
      evt.preventDefault();
      if (!this.xDown || !this.yDown) {
        return;
      }

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;

      const xDiff = this.xDown - xUp;
      const yDiff = this.yDown - yUp;

      if (Math.abs(xDiff) <= Math.abs(yDiff)) {
        /* most significant */
        const { content } = this.$refs;
        const height = -1 * (content.offsetHeight / this.src.length);
        if (yDiff > 10) {
          if (this.index >= this.src.length - 1) {
            this.$emit('expand');
          }
          this.index = this.index < this.src.length - 1 ? this.index + 1 : this.index;
        } else if (yDiff < -10) {
          /* down swipe */
          this.index = this.index > 0 ? this.index - 1 : this.index;
        }

        content.style.transform = `translate(0, ${height * this.index}px)`;
      }
      /* reset values */
      this.xDown = null;
      this.yDown = null;
    },

    slide(dir) {
      const { content } = this.$refs;
      const height = -1 * (content.offsetHeight / this.src.length);
      if (dir === 1) {
        if (this.index >= this.src.length - 1) {
          this.$emit('expand');
        }
        this.index = this.index < this.src.length - 1 ? this.index + 1 : this.index;
      } else {
        this.index = this.index > 0 ? this.index - 1 : this.index;
      }

      content.style.transform = `translate(0, ${height * this.index}px)`;
    },
  },
};
</script>

<style lang="scss" scoped>
#slider::-webkit-scrollbar {
  width: 0 !important;
}
#slider {
  overflow: -moz-scrollbars-none;
}
#slider {
  -ms-overflow-style: none;
}

#slider {
  overflow-y: hidden;
  width: 100%;
  height: 64vh;
  background-color: white;
  // scroll-snap-type: y mandatory;
}

.img {
  height: 52vh;
  //object-fit: contain;
}

#content {
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}

.dot {
  border-radius: 50%;
  background-color: #00000065;
  border: 2px solid black;
  opacity: 0.6;
  width: 8px;
  height: 8px;
}

.dotSelected {
  border-radius: 8px;
  background-color: #1c1c1c;
  width: 6px;
  height: 16px;
  opacity: 1;
}
</style>
