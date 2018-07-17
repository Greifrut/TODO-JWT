<template>
    <form class="form-signup" @submit.prevent="signup">
        <div class="aler aler-danger" v-if="error">{{ error }}</div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="email" class="form-control" id="email" >
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" id="password">
        </div>
        <div class="form-group">
            <label for="password">Password confirmation</label>
            <input type="password" v-model="password_confirmation" class="form-control" id="password_confirmation" >
        </div>
        <button type="submit" class="btn btn-primary mb-3">Sign up</button>
        <div>
            <router-link to="/">Sign in</router-link>
        </div>
    </form>
</template>

<script>
export default {
  name: "Signup",
  data () {
    return {
      email: '',
      password: '',
      password_confiramtion: '',
      error: ''
    }
  },
  created () {
      this.checkSignedIn()
  },
  updated() {
      this.checkSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confiramtion: this.password_confiramtion })
        .then(response => this.singupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    singupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/todos')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something we wring'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/todos')
      }
    }
  }
}
</script>

<style lang="css">
  .form-signup {
      width: 70%;
      max-width: 500px;
      padding: 10% 15px;
      margin: 0 auto;
  }
</style>
