<template>
  <router-view></router-view>
  <FooterComponent/>

</template>


<script>
// @ is an alias to /src
  import FooterComponent from '@/components/FooterComponent.vue'

  export default {
    name: 'ScreenChat',
    components: {
      FooterComponent
    }
    
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 20px;


    &.router-link-exact-active {
      color: #FD2D01;
      font-weight: bold;

    }
  }
}
</style>
