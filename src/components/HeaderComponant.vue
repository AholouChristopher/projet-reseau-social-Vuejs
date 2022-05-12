<template>
    <nav>
        <div class="left-nav">
            <ul>
                <li>
                     <router-link to="/chat" v-if="login">Chat</router-link>
                </li>
                <li>
                    <router-link to="/profile" v-if="login">Profil</router-link>
                </li>
            </ul>
        </div>
        <div class="logo">
            <div class="logo-image">
                <img alt="Flame logo" src="../assets/logos/icon-removebg-preview.png">
            </div>
            <div class="logo-text">
                <h1> Groupomania</h1>
                <h5> THE WEB'S BEST ENTREPRISE </h5>
            </div>
        </div>
        <div class="right-nav">
            <ul>
                <li>
                    <router-link v-if="!login" to="/signup" >SIGNUP</router-link>
                </li>
                <li>
                    <router-link v-if="!login" to="/">LOGIN</router-link>
                </li>
                <li>
                    <v-btn v-if="login" @click="logout">LOGOUT</v-btn>  
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data(){
    return{
      login: false 
    }
  },
  created (){
      let token = localStorage.getItem('token');
      if(token){ this.login = "true" }
      console.log(this.login)
    },
  methods:{
    logout: function(){
      localStorage.clear();
      this.$router.push("/");
    }
  }
  
}

</script>

<style scoped>
nav{
  box-sizing: border-box;
  width: 100%;
  max-width: 1400px;
  margin: auto;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: thin solid black;
}

h1 {
  font-weight: 700;
  font-size: 2.4em;
  margin: 0;
}

h5 {
  font-size: 1.2em;
  font-weight: 400;
  margin: 0;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  text-align: center;
}

.logo-image img{
    height: 4.5em;
    margin-right: 1em;
}

.left-nav, .right-nav {
  align-self: center;
  width: 30%;
}

.right-nav ul {
    justify-content: flex-end;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

li {
  margin: 0 15px;
}

a {
  color: black;
  font-weight: 400;
  text-decoration: none;
  cursor: pointer;

}
a:hover {
    text-decoration: underline;
  }

.active {
  font-weight: 700;
  text-decoration: underline;
}
</style>
