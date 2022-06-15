<template>
  <form v-on:submit.prevent="signupUser">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" placeholder="Your name" required v-model="form.name">
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required v-model="form.email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="form.password">
    </div>
    <button type="submit" class="btn btn-primary">Signup</button>
  </form>
</template>

<script>
const axios = require('axios').default

export default {
  name: 'SignupComponent',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signupUser () {
      await axios.post('http://localhost:3000/api/user/signup', this.form)
        .then((res) => {
          console.log(res.data)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log('Probleme de creation')
          console.log(error.response.data.error.sqlMessage) // message d'erreur a afficher dans le front
        })
    }
  }

}
</script>

<style scoped>
 form {
   margin: 3em auto;
    width: 200px;
  }
</style>
