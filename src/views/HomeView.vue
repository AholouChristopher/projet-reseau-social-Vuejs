<template>
  <div class="home">
    <HeaderComponant/>
    <LoginComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComponant from '@/components/HeaderComponant.vue'
import LoginComponent from '@/components/LoginComponent.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderComponant,
    LoginComponent
  }
}
</script>
