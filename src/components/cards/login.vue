<template lang="pug">
  #login
    v-sheet.pb-12#login(style="height: 100%", color="tblue")
      h1.pt-4.white--text Inicia Sesión
      v-text-field.mt-4.mx-6(solo, placeholder="Email", v-model="email")
      v-text-field.mx-6(solo, placeholder="Contraseña", v-model="password", type="password", @keydown.enter="signin")
      section.mx-6
        v-btn(color="white", block, light, :loading="loading", @click="signin") Iniciar Sesión
      .text-center.mt-4.white--text O inicia a través de
      v-layout.mx-6(justify-center)
        .mx-2
          v-btn(icon, large)
            v-icon(large).white--text fab fa-google
          .white--text Google
        .mx-2
          v-btn(icon, large)
            v-icon(large).white--text fab fa-instagram
          .white--text Instagram
        .mx-2
          v-btn(icon, large)
            v-icon(large).white--text fab fa-twitter
          .white--text Twitter
        .mx-2
          v-btn(icon, large)
            v-icon(large).white--text fab fa-facebook
          .white--text Facebook
    v-sheet(v-if="flap", style="position: absolute; bottom: 0; left: 0; right: 0", color="tyellow")
      h1.my-3 O Regístrate
      section.mx-6.mb-6
        v-btn(color="black", block, dark, :loading="loading", @click="toSignup") Registrate

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
    async signin() {
      console.log('Button clicked');
      this.loading = true;
      const result = await this.$store.dispatch('auth/signin', {
        email: this.email, password: this.password,
      });
      this.loading = false;
      if (result) {
        this.$emit('discard');
      }
    },

    toSignup() {
      this.$store.commit('stack/updateCards', [{
        type: 'signup',
      }]);
      setTimeout(() => {
        this.$emit('discard');
      }, 50);
    },
  },
});
</script>
