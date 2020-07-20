<template lang="pug">
  v-layout#signup(style="background-color: #2196F3;", :style="!$vuetify.breakpoint.mdAndUp ? 'height: 100%;' : ''", column, justify-space-between)
    v-sheet(color="tyellow", style="padding-bottom: 84px;")
      h1.pt-6 Registrate
      v-text-field.mt-6.mx-6(solo, placeholder="Email", v-model="email")
      v-text-field.mx-6(solo, placeholder="Contraseña", v-model="password", type="password", @keydown.enter="signup")
      section.mx-6.pb-4
        v-btn(color="black", block, dark, :loading="loading", @click="signup") Registrate
    v-sheet(v-if="flap", color="tblue")
      v-layout.ma-6(column, justify-center)
        .white--text ¿Tienes ya una cuenta?
        v-btn.mt-3(color="white", block, light, @click="toSignup") Iniciar Sesión

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    email: '',
    password: '',
    loading: false,
  }),

  props: {
    flap: {
      type: Boolean,
      default: true,
    }
  },

  methods: {
    async signup() {
      this.loading = true;
      const result = await this.$store.dispatch('auth/signup', {
        email: this.email, password: this.password,
      });
      this.loading = false;
      if (result) {
        this.$emit('discard');
      }
    },

    toSignup() {
      this.$store.commit('stack/updateCards', [{
        type: 'login',
      }]);
      setTimeout(() => {
        this.$emit('discard');
      }, 50);
    },
  },
});
</script>
