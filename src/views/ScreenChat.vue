
<template>
  <div class="chat" >
    <HeaderComponant/>
    <ChatComponent />
  </div>
</template>

<script>
// @ is an alias to /src
  import HeaderComponant from '@/components/HeaderComponant.vue'
  import ChatComponent from '@/components/ChatComponent.vue'

  export default {
    name: 'ScreenChat',
    components: {
      HeaderComponant,
      ChatComponent
    }
    
  }


</script>

<style scoped>

</style>
