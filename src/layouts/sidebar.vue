<template lang="pug">
  v-list.text-left(style="position: sticky; top: 0; left: 0; height: 100vh")
    v-layout(justify-space-between, align-center)
      v-card.ml-6.mt-4(flat, @click="$router.push({path: '/'})")
        img(src="../assets/LogoText.svg", style="width: 140px")
      v-menu(offset-y, v-if="email && $vuetify.breakpoint.mdAndUp")
        template(v-slot:activator="{on}")
          div(style="border: 3px solid #1c1c1c; border-radius: 50%", v-on="on")
            v-avatar.pointer(color="#f50057", :size="36", v-ripple)
              .font-weight-bold {{email[0].toUpperCase()}}
        v-list
          v-list-item(@click="logout")
            div Cerrar Sesión
    v-alert.mt-4(v-if="!logged", color="info", text) Necesitas iniciar sesión para ver tu historial
    div(v-else)
      .overline.mt-4.pl-6 TUS ACCIONES
      v-divider.my-3
      v-list-item(@click="toList('Historial')")
        v-list-item-avatar(color="tgreen")
          v-icon.white--text(small) fas fa-tshirt
        v-list-item-content
          v-list-item-title Prendas que has votado
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
      .overline.mt-6.pl-6 FILTROS
      v-divider.my-4
      v-layout(justify-center)
        v-btn-toggle.mx-4(borderless, group, v-model="genre", @change="uploadGenre", color="hookle accent-3")
          v-btn(value="men", small)
            span Hombre
          v-btn(value="women", small)
            span Mujer
          v-btn(value="all", small)
            span Todo
      v-autocomplete.mt-3.mx-6(solo, item-color="hookle", placeholder="Añadir Filtro", @change="uploadFilters", color="hookle", chips, cache-items, multiple, :items="filterList", v-model="userFilters", item-text="name", item-value="name")
        template(v-slot:selection="data")
          v-chip(v-bind="data.attrs", small, label, dark, color="hookle", :input-value="data.selected", @click="data.select") {{data.item.name | toSpanish}}
        template(v-slot:item="data")
          template(v-if="typeof data.item !== 'object'")
            v-list-item-content(v-text="data.item")
          template(v-else)
            v-list-item-content {{data.item.name | toSpanish}}
    .bottom
      .triangle
      .footer(style="width: 100%")
        v-layout.wrapper(justify-center, align-center, style="font-family: 'Jost', 'Avenir', Helvetica, Arial, sans-serif")
          i.white--text.font-weight-bold Done with
          v-icon.mx-2.white--text fas fa-fire-alt
          i.white--text.font-weight-bold by
          v-chip.ml-2.mb-2(color="white", @click="toTwitter")
            div.hookle--text @VersyCreate
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    logged() {
      return this.$store.state.auth.logged;
    },
    email() {
      return this.$store.state.auth.user.email
    },
    userFilters: {
      get() {
        return this.$store.state.auth.user.filters
      },
      set(value) {
        this.$store.commit('auth/setFilters', value)
      }
    },
    genre: {
      get() {
        return this.$store.state.auth.user.genre
      },
      set(value) {
        this.$store.commit('auth/setGenre', value)
      }
    }
  },
  data: () => ({
    filterList: [
      { header: 'Categoría' },
      { divider: true },
      { name: 'dress', group: 'Categoría'},
      { name: 'accessories', group: 'Categoría'},
      { name: 'hat', group: 'Categoría'},
      { name: 'sweatshirt', group: 'Categoría'},
      { name: 'scarf', group: 'Categoría'},
      { name: 't-shirt', group: 'Categoría'},
      { name: 'shirt', group: 'Categoría'},
    ]
  }),

  filters: {
    toSpanish(value) {
      const str = value.toString();
      switch (str) {
        case 'men':
          return 'Hombre';
        case 'women':
          return 'Mujer';
        case 'dress':
          return 'Vestido';
        case 'accessories':
          return 'Accesorios';
        case 'hat':
          return 'Sombreros';
        case 'sweatshirt':
          return 'Sudaderas';
        case 'scarf':
          return 'Bufandas';
        case 't-shirt':
          return 'Camisetas';
        case 'shirt':
          return 'Camisas';
        default:
          return 'Otros';
      }
    }
  },
  methods: {
    async uploadFilters() {
      console.log('Uploading filters');
      await this.$store.dispatch('list/updateFilters', this.userFilters);
      this.$store.commit('stack/clear');
      await this.$store.dispatch('stack/fetch');
    },
    async uploadGenre() {
      console.log('Uploading genre');
      await this.$store.dispatch('list/updateGenre', this.genre);
      this.$store.commit('stack/clear');
      await this.$store.dispatch('stack/fetch');
    },
    toList(r) : void {
      this.$router.push({
        name: r,
      });
    },
    logout() : void {
      this.$store.dispatch('auth/logout');
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
  .triangle {
    width: 0;
    height: 0;
    border-bottom: 30px solid #f50057;
    border-right: 600px solid transparent;
  }
  .footer {
    width: 100%;
    background-color: #f50057;
    padding-top: 8px;
    padding-bottom: 24px;
  }
  .bottom {
    overflow: hidden;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

</style>
