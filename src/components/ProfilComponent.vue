<template>
    <div class="container d-flex">
        <div class="card" style="width: 18rem;">
            <img src="../assets/images/avatar-1.jpg" class="card-img-top" alt="photo de profil">
            <div class="card-body" v-for="items in user" :key="items.id">
                <p class="card-text">{{items.username}}</p>
                <p class="card-text">{{items.email}}</p>
            </div>
        </div>
    </div>
    <button class="btn btn-danger" @click="deleteCompte()" type="button">Supression du compte</button>
</template>

<script>

const axios = require('axios').default

export default {
  name: 'ProfilComponent',
  data () {
    return {
      user: []
    }
  },

  created () { this.fetchGetOneUser() },

  methods: {
    fetchGetOneUser () {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')
      axios.get(`http://localhost:3000/api/user?id=${userId}`, { headers: { authorization: `BEARER ${token}` } })
        .then((res) => {
          this.user = res.data
          console.log(res.data)
        }).catch((err) => { throw err })
    },
    deleteCompte () {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/api/user?id=${userId}`, { headers: { authorization: `BEARER ${token}` } })
        .then((res) => {
          this.$router.push('/')
          localStorage.clear()
        })
        .catch((err) => { console.log(err.response.data.message) })
    }
  }
}
</script>

<style>
.card{ margin-top:100px; border-radius:10px;}
.card-description{
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left:3rem;
}
</style>
