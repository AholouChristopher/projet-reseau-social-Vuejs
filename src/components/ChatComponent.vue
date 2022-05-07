<template>
    <div class="container">
        <div class="card_avatar" v-for="items in message" :key="items.id">
            <img src="../assets/images/avatar-5.jpg" alt="avatar" class="size-avatar">
            <div class="card_text_avatar">
            <h6>{{items.name}}</h6>
            <p>{{items.description}}</p>
            </div>
            <img src="../assets/images/trash.png" alt="supprimer" class ="size-trash">
        </div>
        <!--newMessages-->
        <form v-on:submit="submitMessage">
            <div id = "cardInputNewMessage">
<!--            <input type="text" placeholder="new message" name="message" id ="new-message" value=""> -->
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Your name" require v-model="form.name">
                </div>
                <textarea id="new-message" placeholder="add multiple lines" v-model="form.newMessage"></textarea>
                <input type="file" class="inputFile">
                <img class="imgStyle" src="../assets/images/avatar-5.jpg" v-show="falsed">
                <button type="submit"  class="btn-add">Envoyer</button>
            </div>
         </form>
        <!--count&recherche-->
        <div id ="cardCountMessageAndSeach">
            <p id= "Compter-Message"> Messages total: {{counter}} </p>
            <input type="text" placeholder="searchMessage" name="searchMessage" id ="searchMessage" value="">
            <button type="submit" id="btn-search">Search</button>
        </div>
    </div>
</template>

<script>

const axios = require('axios').default
export default {
  name: 'ChatComponent',
  props: ['message'],
  data () {
    return {
      form: {
        newMessage: '',
        name: ''
      }
    }
  },
  methods: {  
    submitMessage(){ 
        console.log(this.form.newMessage)
        console.log(this.form.name)

      axios.post('http://localhost:3000/api/chat', this.form)
        .then((res) => { console.log(res.json) })
        .catch((error) => { console.log(error) }) 
    }
  }
}

</script>

<style>
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
    .card_avatar
    {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid  #DADADA;
        background-color: #FFFFFF;
        height: auto;
        padding: 20px;
    }
    .card-text-avatar
    {  padding-left: 20px; }
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
    #new-message
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
    p
    {
        font-family:'Open Sans', sans-serif;
        margin: 0px;
        font-size: 14px;

    }
    h6
    {
        margin: 0px;
        padding-bottom: 0px;
        font-size: 14px;
    }
    .size-trash
    {
        height: 15px;

    }
    .size-avatar
    {
        height: 60px;
        border-radius: 100px;
    }
</style>
