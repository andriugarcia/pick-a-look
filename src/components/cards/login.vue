<template lang="pug">
  #login(style="position: relative")
    v-sheet.pb-12#login(style="height: 100%", color="tblue")
      h2.pt-4.white--text Inicia Sesión
      v-text-field.mt-4.mx-6(solo, placeholder="Email", v-model="email")
      v-text-field.mx-6(solo, placeholder="Contraseña", v-model="password", type="password", @keydown.enter="signin")
      section.mx-6
        v-btn(color="white", block, light, :loading="loading", @click="signin") Iniciar Sesión
      .text-center.mt-6.white--text O entra a través de
      v-layout.mx-6(justify-center, wrap)
        v-btn.pl-1.mt-2(rounded, style="letter-spacing: 0", v-google-signin-button="clientId")
          v-avatar(color="blue", size="30")
            v-icon.white--text(small) fab fa-google
          .text-capitalize.ml-2 Google
        v-btn.pl-1.mt-2.ml-2(rounded, style="letter-spacing: 0")
          v-avatar(color="black", size="30")
            v-icon.white--text(small) fab fa-apple
          .text-capitalize.ml-2 Apple
        v-btn.pl-1.mt-2.ml-2(rounded, style="letter-spacing: 0")
          v-avatar(color="pink", size="30")
            v-icon.white--text(small) fab fa-instagram
          .text-capitalize.ml-2 Instagram
    v-sheet.pb-4(v-if="flap", color="tyellow")
      section.mx-6.mt-2
        v-layout(justify-center, column)
          h2.mt-2 O Regístrate
          v-btn(color="black", block, dark, @click="toSignup") Registrate

</template>

<script lang="ts">
import Vue from 'vue';
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default Vue.extend({
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    email: '',
    password: '',
    loading: false,
    clientId: '774180793403-9h849s9h8it86b949hjb83e7gm722oop.apps.googleusercontent.com'
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
    OnGoogleAuthSuccess (idToken) {
      const result = this.$store.dispatch('auth/signinGoogle', idToken)
      if (result) {
        this.$emit('discard');
      }
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    },
  },
});
</script>
