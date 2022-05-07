
<template>
  <div class="chat">
    <HeaderComponant/>
    <ChatComponent  v-bind:message="message"/>
  </div>
</template>

<script>
// @ is an alias to /src
  import HeaderComponant from '@/components/HeaderComponant.vue'
  import ChatComponent from '@/components/ChatComponent.vue'
  const axios = require('axios').default;

  let message = [];

  axios.get('http://localhost:3000/api/chat').then((res)=> { 
    for ( let i = 0; i< res.data.length; i++){
      message.push(res.data[i]);
    }
      console.log(message)

  })

  export default {
    name: 'ScreenChat',
    components: {
      HeaderComponant,
      ChatComponent
    },
      data: () => {
        return { message }
    }
  }
</script>
