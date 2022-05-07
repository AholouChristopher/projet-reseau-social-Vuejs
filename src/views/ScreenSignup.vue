<template>
  <div class="sigup">
    <HeaderComponant/>
    <SignupComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComponant from '@/components/HeaderComponant.vue'
import SignupComponent from '@/components/SignupComponent.vue'

export default {
  name: 'ScreenSignup',
  components: {
    HeaderComponant,
    SignupComponent
  }
}
</script>
