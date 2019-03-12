<template>
  <div class="login">
    <div class="login-box">
      <h1>Login</h1>
      <form @submit.prevent="doLogin">
        <div class="form-group">
          <input type="text" class="form-control" name="email" id="email" placeholder="Email" v-model="email" v-validate="'required'">
          <span>{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" name="password" id="password" placeholder="Password" v-model="password" v-validate="'required'">
          <span>{{ errors.first('password') }}</span>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    ...mapGetters('auth', [
      'authenticating',
      'authenticationError',
      'authenticationErrorCode'
    ]),

    authErrorMsg () {
      return this.authenticationError
    },

    authProcess () {
      return this.authenticating
    }
  },

  methods: {
    ...mapActions('auth', [
      'login'
    ]),

    doLogin () {
      this.$validator.validateAll().then(() => {
        this.login({ email: this.email, password: this.password })
      })
    }
  }
}
</script>

<style lang="scss">
.login {
  position: relative;
  height: 100vh;

  .login-box {
    position: absolute;
    left: 50%;
    top: 45%;
    width: 350px;
    padding: 20px;
    transform: translate(-50%, -50%);
  }
}
</style>
