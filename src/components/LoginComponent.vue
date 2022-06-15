<template>
  <form v-on:submit.prevent="signinUser">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required v-model="form.email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required v-model="form.password">
    </div>
    <button type="submit" class="btn btn-primary">signin</button>
  </form>
</template>

<script>

const axios = require('axios').default

export default {
  name: 'LoginComponant',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signinUser () {
      axios.post('http://localhost:3000/api/user/signin', this.form)
        .then((res) => {
          axios.get(`http://localhost:3000/api/chat?id=${res.data.userId}`, { headers: { authorization: `BEARER ${res.data.token}` } })

          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userName', res.data.name)

          this.$router.push('/chat')
        })
        .catch((err) => {
          console.log(err.response.data.error)
        }) // retour de l'erreur a afficher.
    }
  }
}
</script>

<style>
 form {
   margin: 3em auto;
    width: 200px;
  }
</style>
