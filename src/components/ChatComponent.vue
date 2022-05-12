<template>
    <div class="container mt-5">
        <div class="card_avatar" v-for="items in message" :key="items.id">
            <div class="card_header">
                <img src="../assets/images/avatar-5.jpg" alt="avatar" class="size-ico-avatar">
                <h6 class="card_name">{{items.name}}</h6>
                <img src="../assets/images/trash.png" alt="supprimer" class ="size-ico-trash">
            </div>
            <div class="card-text">
                <p> {{items.description}}</p>
                <img class ="imageUser" alt="img utilisateur" v-if=" items.imageUrl != null " :src="items.imageUrl">
            </div>
        </div>
        <!--newMessages-->
        <form v-on:submit.prevent="submitMessage" enctype="multipart/form-data">
            <div id = "cardInputNewMessage">
                <div class="form-group">
                    <label for="name">{{name}}</label>
                </div>
                <textarea id="newMessage" name="newMessage" placeholder="add multiple lines" v-model="newMessage"></textarea>
                <input type="file" ref="file" name="userfile" id="userfile" @change="selectFile" class="inputFile">
                <img class="imgStyle" src="../assets/images/avatar-5.jpg" v-show="falsed">
                <button type="submit"  class="btn-add">Envoyer</button>
            </div>
         </form>
        <!--count&recherche-->
        <div id ="cardCountMessageAndSeach">
            <p id= "Compter-Message"> Messages total: {{count}}</p>
            <input type="text" placeholder="searchMessage" name="searchMessage" id ="searchMessage" value="">
            <button type="submit" id="btn-search">Search</button>
        </div>
    </div>
</template>

<script>

const axios = require('axios').default


export default {
  name: 'ChatComponent',
  data () {
    return {
        newMessage: '',
        name: localStorage.getItem('userName'),
        userfile: '',
        message: [],
        count: 0
    }
  },
  created (){ this.fetchGetMessage() },

  methods: { 
      // Get message 
    async fetchGetMessage (){
        let userId = localStorage.getItem('userId');
        let token = localStorage.getItem('token');
        await axios.get(`http://localhost:3000/api/chat?id=${userId}`,{ headers: { authorization: `BEARER ${token}` }} )
            .then((res)=> { 
                 this.message = res.data
                 this.count = res.data.length 
            }).catch((err)=>{ throw err})
        console.log(this.message)
    },
      
    // Post  message 
   submitMessage(){ 
        let userId = localStorage.getItem('userId');
        let token = localStorage.getItem('token'); 

        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('newMessage', this.newMessage);
        formData.append('image', this.userfile);
        
        let form = {newMessage: this.newMessage, name: this.name, image: this.userfile }

        console.log(formData);
        
        for (var value of formData.values()) {
                console.log("X= " + value);
        }


        axios.post(`http://localhost:3000/api/chat?id=${userId}`,formData,  { headers: { authorization: `BEARER ${token}` }}  )
            .then((res) => {  res.status(200) })
            .catch((error) => { console.log(error) }) 

        this.newMessage =""


    },
    selectFile(){
              this.userfile = this.$refs.file.files[0];  
    },

    //supression d'un message
    deleteMessage(){
        axios.delete('url supp message ')
    }
  
       
  }    

}

</script>

<style scoped>
.container{
    font-family:'Open Sans', sans-serif;
    font-size: 15px;
}
.imageUser{
    max-width: 300px;
    max-height: 300px;
}
.card_avatar
    {
        display: flex;
        flex-direction: column;
        width: auto;
        height: 30%;
        border: 1px solid  #DADADA;
        background-color: #FFFFFF;
        padding: 0.75rem ;
        margin-bottom: 1rem;
    }
    .card_header{
        display: flex;
        align-items: center;
        margin-top: 0.75rem;
        height: 4.25rem;
        margin-bottom: 0.75rem;

    }
    
    .card-text
    {  margin-top: 0.75rem;
       overflow-wrap: break-word;
    }
    .card-text p {
        text-align: left;
        margin: 0.75rem;
    }
    .card_name{
        margin: 0.75rem;
        font-size: 18px;
        font-weight: bold;
    }
    
     .size-ico-trash
    {
        height: 20px;
        
    }
    .size-ico-avatar
    {
        height: 100px;
        border-radius: 100px;
    }
   

    .inputFile{
        margin: 5px;
    }
    form{
        width: 100%;
    }
    .imgStyle{
        max-height: 100px;
        display:block;
        margin-top:10px
    }
    .container{
        box-sizing: border-box;
        width: 100%;
        margin: auto;
        position: relative;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        padding: 20px;
        justify-content: space-between;
    }
    
    #cardInputNewMessage
    {
        display:flex;
        justify-content: left;
        align-items: center;
        border: 1px solid  #DADADA;
        background-color: #FFFFFF;
        height: auto;
        padding: 20px;
    }
    #CountMessageAndSeach{
        margin: auto;

    }
    #newMessage
    {
        width: 60%;
        margin-left: 5px;
    }
    #searchMessage
    {
        width: 50%;
        margin-left: 5px;
    }
    .btn-add,#btn-search
    {
        background-color: #FFFFFF;
        margin-left: 10px;
        color: #3498db;
        border: 1px solid #3498db;
        border-radius: 5px;
        padding: 5px;
    }
    #btn-add:focus,#btn-search:focus
    { outline:0;}
    #body-background
    {
        display: flex;
        flex-direction: column;
        background-color: #F5F6FA;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    

</style>
