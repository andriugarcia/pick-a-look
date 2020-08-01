<template lang="pug">
  v-app#app
    .mt-4
      v-layout.px-6(v-if="!$vuetify.breakpoint.mdAndUp", :justify-space-between="logged", :justify-center="!logged", align-center)
        v-btn(icon, large, @click="drawer = !drawer", v-if="logged")
          v-icon(color="black") fas fa-bars
        v-btn(icon, @click="$router.push({name: 'Home'})")
          img.ml-4(src="./assets/LogoSquare.svg", style="height: 40px")
        v-menu(offset-y, v-if="email")
          template(v-slot:activator="{on}")
            div(style="border: 3px solid #1c1c1c; border-radius: 50%", v-on="on")
              v-avatar(color="#f50057", :size="36", v-ripple)
                .font-weight-bold {{email[0].toUpperCase()}}
          v-list
            v-list-item(@click="logout")
              div $t("logout")
            v-list-item(@click="downloadApp")
              v-icon.hookle--text fas fa-arrow-circle-down
              .ml-2.hookle--text $t("downloadApp")
    v-content
      v-layout
        v-flex(xs3, v-if="$vuetify.breakpoint.mdAndUp")
          sidebar
        v-flex(xs12, md9)
          router-view
    v-navigation-drawer(v-if="!$vuetify.breakpoint.mdAndUp", v-model="drawer", width="300", absolute, style="z-index: 20")
      sidebar

</template>

<script lang="ts">
import Vue from 'vue';
import Sidebar from '@/layouts/sidebar.vue';
import Cookies from '@/services/cookies';

export default Vue.extend({
  name: 'App',

  components: {
    Sidebar,
  },

  metaInfo() {
      return { 
          title: "Pick a Look",
          meta: [
              { name: 'description', content:  'Encuentra prendas de tu estilo que todavia no conoces y al mejor precio'},
              { property: 'og:title', content: "Pick a Look"},
              { property: 'og:site_name', content: 'Pick a Look'},
              {property: 'og:type', content: 'website'},    
          ]
      }
  },

  data: () => ({
    drawer: false,
  }),

  computed: {
    logged() {
      return this.$store.state.auth.logged;
    },
    email() {
      return this.$store.state.auth.user.email
    },
  },

  async mounted() {
    console.log(Cookies.getCookie("country"))
    if (Cookies.getCookie("country") == "") {
      let response = await fetch('https://ipapi.co/json/')
      let data = await response.json();
      Cookies.setCookie("country", data.country, 365)
    }

    this.$store.commit('auth/setCountry', Cookies.getCookie("country"))
    
    await this.$store.dispatch('auth/checkLogged')

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.$store.state.deferredPrompt = e;
      this.$store.state.appNotInstalled = true;
    });
    window.addEventListener('appinstalled', (evt) => {
      this.$store.state.appNotInstalled = false;
    });
  },

  methods: {

    logout() : void {
      this.$store.dispatch('auth/logout');
      this.$router.push({name: 'Home'})
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

<style lang="scss">
  @import "./styles/mixins.scss";
  @import "./styles/typography.scss";
  @import "./styles/index.scss";

  #app {
    text-align: center;
  }

  .pointer {
    cursor: pointer;
  }
</style>
