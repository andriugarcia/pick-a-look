<template lang="pug">
  v-layout#signup(style="background-color: #2196F3;", :style="!$vuetify.breakpoint.mdAndUp ? 'height: 100%;' : ''", column, justify-space-between)
    v-sheet(color="tyellow", style="padding-bottom: 84px;")
      h1.pt-6 {{$t("register")}}
      v-layout(v-if="error", column, align-center)
        v-icon.my-2.error--text(large) fas fa-exclamation-circle
        b.error--text {{$t("emailPassIncorrect")}}
      v-text-field.mt-6.mx-6(solo, type="email", :placeholder="$t('email')", v-model="email", :rules="[emailCheck]")
      v-text-field.mx-6(solo, :placeholder="$t('pass')", v-model="password", type="password", :type="viewPass ? 'text' : 'password'", @click:append="viewPass = !viewPass", :append-icon="!viewPass ? 'mdi-eye' : 'mdi-eye-off'", :rules="[alphabeticalCheck, numberCheck, lengthCheck]", @keydown.enter="signup")
      v-dialog(width="500")
        template(v-slot:activator="{on}")
          a.black--text(v-on="on", style="text-decoration: underline") Recordar Contraseña
        v-card.pa-6
          div(style="font-size: 2em") Recordar Contraseña
          div Te mandaremos un mail con el proceso para que puedas cambiar tu contraseña, si tienes una cuenta recibirás el mail
          
          v-text-field.mt-6.mx-6(solo, type="email", :placeholder="$t('email')", v-model="email", :rules="[emailCheck]")
            v-btn(slot="append", depressed, color="tyellow") Recuperar
          
      section.mx-6.pb-4.mt-4
        v-btn(color="black", block, :dark="!loginDisabled", :loading="loading", :disabled="loginDisabled", @click="signup") {{$t("register")}}
    v-sheet(v-if="flap", color="tblue")
      v-layout.ma-6(column, justify-center)
        .white--text {{$t("haveAccount")}}
        v-btn.mt-3(color="white", block, light, @click="toSignup") {{$t("signin")}}

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    loginDisabled() {
      return !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email) && this.password.length > 0)
    }
  },
  data: () => ({
    email: '',
    password: '',
    loading: false,
    error: false,
    viewPass: false,
    emailCheck: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || this.$t("emailNotValid"),
    alphabeticalCheck: value => /^(?=.*[a-z])/.test(value) || this.$t("containLetter"),
    numberCheck: value => /^(?=.*[0-9])/.test(value) || this.$t("atLeastNumber"),
    lengthCheck: value => /^(?=.{8,})/.test(value) || this.$t("lengthCharacters"),
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
      else {
        this.error = true
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
