<template lang="pug">
  #login(style="position: relative")
    v-sheet.pb-12#login(style="height: 100%", color="tblue")
      h2.pt-4.white--text {{$t("signin")}}
      v-text-field.mt-4.mx-6(solo, type="email", :placeholder="$t('email')", :rules="[emailCheck]", v-model="email")
      v-text-field.mx-6(solo, :placeholder="$t('pass')", :type="viewPass ? 'text' : 'password'", @click:append="viewPass = !viewPass", :append-icon="!viewPass ? 'mdi-eye' : 'mdi-eye-off'", v-model="password", @keydown.enter="signin")
      section.mx-6
        v-btn(color="white", block, light, :loading="loading", :disabled="loginDisabled", @click="signin") {{$t("signin")}}
      .text-center.mt-6.white--text {{$t("enterThrough")}}
      v-layout.mx-6(justify-center, wrap)
        v-btn.pl-1.mt-2(rounded, style="letter-spacing: 0", v-google-signin-button="clientId")
          v-avatar(color="blue", size="30")
            v-icon.white--text(small) fab fa-google
          .text-capitalize.ml-2 Google
        //- v-btn.pl-1.mt-2.ml-2(rounded, style="letter-spacing: 0")
          v-avatar(color="black", size="30")
            v-icon.white--text(small) fab fa-apple
          .text-capitalize.ml-2 Apple
        //- v-btn.pl-1.mt-2.ml-2(rounded, style="letter-spacing: 0")
          v-avatar(color="pink", size="30")
            v-icon.white--text(small) fab fa-instagram
          .text-capitalize.ml-2 Instagram
        div#appleid-signin(data-color="black", data-border="true", data-type="sign in")
    v-sheet.pb-4(v-if="flap", color="tyellow")
      section.mx-6.mt-2
        v-layout(justify-center, column)
          h2.mt-2 {{$t("register")}}
          v-btn(color="black", block, dark, @click="toSignup") {{$t("register")}}

</template>

<script lang="ts">
import Vue from 'vue';
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default Vue.extend({
  directives: {
    GoogleSignInButton
  },
  computed: {
    loginDisabled() {
      return !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email) && this.password.length > 0)
    }
  },
  data: () => ({
    email: '',
    password: '',
    loading: false,
    viewPass: false,
    emailCheck: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || this.$t("emailNotValid"),
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
      console.log(idToken)
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
