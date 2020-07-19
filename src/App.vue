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
              div Cerrar Sesión
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

export default Vue.extend({
  name: 'App',

  components: {
    Sidebar,
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
    await this.$store.dispatch('auth/checkLogged');
  },

  methods: {

    logout() : void {
      this.$store.dispatch('auth/logout');
    },

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
