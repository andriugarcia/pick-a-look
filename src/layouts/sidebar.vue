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
            div {{$t("logout")}}
          v-list-item(@click="downloadApp")
            v-icon.hookle--text fas fa-arrow-circle-down
            .ml-2.hookle--text {{$t("downloadApp")}}
    v-alert.mt-4(v-if="!logged", color="info", text) {{$t("needSignin")}}
    div(v-else)
      .overline.mt-4.pl-6 {{$t("yourActions")}}
      v-divider.my-3
      v-list-item(@click="toList('Historial')")
        v-list-item-avatar(color="tgreen")
          v-icon.white--text(small) fas fa-tshirt
        v-list-item-content
          v-list-item-title {{$t("votedClothes")}}
      v-list-item(@click="toList('Favorites')")
        v-list-item-avatar(color="tyellow")
          v-icon.white--text(small) fas fa-star
        v-list-item-content
          v-list-item-title {{$t("favoriteClothes")}}
      v-list-item(@click="toList('Bought')")
        v-list-item-avatar(color="tblue")
          v-icon.white--text(small) fas fa-shopping-cart
        v-list-item-content
          v-list-item-title {{$t("boughtClothes")}}
      .overline.mt-6.pl-6 {{$t("filters")}}
      v-divider.my-4
      v-layout(justify-center)
        v-btn-toggle.mx-4(borderless, group, v-model="genre", @change="uploadGenre", color="hookle accent-3")
          v-btn(value="men", small)
            span {{$t("men")}}
          v-btn(value="women", small)
            span {{$t("women")}}
          v-btn(value="all", small)
            span {{$t("all")}}
      v-autocomplete.mt-3.mx-6(solo, item-color="hookle", :placeholder="$t('addFilter')", @change="uploadFilters", color="hookle", chips, cache-items, multiple, :items="filterList", v-model="userFilters", item-text="name", item-value="name")
        template(v-slot:selection="data")
          v-chip(v-bind="data.attrs", small, label, dark, color="hookle", :input-value="data.selected", @click="data.select") {{toSpanish(data.item.name)}}
        template(v-slot:item="data")
          template(v-if="typeof data.item !== 'object'")
            v-list-item-content(v-text="data.item")
          template(v-else)
            v-list-item-content {{toSpanish(data.item.name)}}
    .bottom
      v-layout(justify-center)
        v-btn.mb-4(text, color="hookle", large)
          v-icon fas fa-arrow-circle-down
          .ml-2 {{$t('downloadApp')}}
      .triangle
      .footer(style="width: 100%")
        v-layout.wrapper(justify-center, align-center, style="font-family: 'Jost', 'Avenir', Helvetica, Arial, sans-serif")
          i.white--text.font-weight-bold {{$t("doneWith")}}
          v-icon.mx-2.white--text fas fa-fire-alt
          i.white--text.font-weight-bold {{$t("by")}}
          v-chip.ml-2.mb-2(color="white", @click="toTwitter")
            div.hookle--text @VersyCreate
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  computed: {
    logged() {
      return this.$store.state.auth.logged;
    },
    email() {
      return this.$store.state.auth.user.email
    },
    genre: {
      get() {
        return this.$store.state.auth.user.genre
      },
      set(value) {
        this.$store.commit('auth/setGenre', value)
      }
    },
    userFilters: {
      get() {
        return this.$store.state.auth.user.filters
      },
      set(value) {
        this.$store.commit('auth/setFilters', value)
      }
    },
  },
  data: (context) => ({
    filterList: [
      { header: context.$t("categorie") },
      { divider: true },
      { name: 'dress', group: context.$t("categorie")},
      { name: 'accessories', group: context.$t("categorie")},
      { name: 'hat', group: context.$t("categorie")},
      { name: 'sweatshirt', group: context.$t("categorie")},
      { name: 'scarf', group: context.$t("categorie")},
      { name: 't-shirt', group: context.$t("categorie")},
      { name: 'shirt', group: context.$t("categorie")},
    ]
  }),

  methods: {
    toSpanish(value) {
      const str = value.toString();
      console.log(this);
      switch (str) {
        case 'men':
          return this.$t('men');
        case 'women':
          return this.$t('women');
        case 'dress':
          return this.$t('dress');
        case 'accessories':
          return this.$t('accessories');
        case 'hat':
          return this.$t('hat');
        case 'sweatshirt':
          return this.$t('sweatshirt');
        case 'scarf':
          return this.$t('scarf');
        case 't-shirt':
          return this.$t('t-shirt');
        case 'shirt':
          return this.$t('shirt');
        default:
          return this.$t('other');
      }
    },
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
    toList(r) {
      this.$router.push({
        name: r,
      });
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push({name: 'Home'})
    },
    toTwitter() {
      window.open('https://twitter.com/VersyCreate');
    },
    downloadApp() {
      this.$store.state.deferredPrompt.prompt();
      this.$store.state.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.$store.state.appNotInstalled = false;
        } else {
          this.$store.state.appNotInstalled = true;
        }
      });
    }
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
