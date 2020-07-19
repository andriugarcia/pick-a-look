<template lang="pug">
  #signup(style="background-color: #2196F3")
    v-sheet(style="height: 100%", color="tyellow")
      h1.pt-6 Registrate
      v-text-field.mt-6.mx-6(solo, placeholder="Email", v-model="email")
      v-text-field.mx-6(solo, placeholder="Contraseña", v-model="password", type="password", @keydown.enter="signup")
      section.mx-6.pb-4
        v-btn(color="black", block, dark, :loading="loading", @click="signup") Registrate
    v-sheet(v-if="flap", color="tblue", style="position: absolute; bottom: 0; left: 0; right: 0")
      section.ma-6
        v-btn(color="white", block, light, :loading="loading", @click="toSignup") Iniciar Sesión

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
