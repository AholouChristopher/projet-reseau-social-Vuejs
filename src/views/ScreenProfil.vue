<template>
  <div class="profil">
    <HeaderComponant/>
    <ProfilComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComponant from '@/components/HeaderComponant.vue'
import ProfilComponent from '@/components/ProfilComponent.vue'

export default {
  name: 'ScreenProfil',
  components: {
    HeaderComponant,
    ProfilComponent
  }  
}
</script>
