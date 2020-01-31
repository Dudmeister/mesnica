<template>
  <div class="container">
    <h1>Web Mesnica</h1>
        <div v-if="greska">{{greska}}</div>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email adresa</label>
          <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Unesite Email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Lozinka</label>
          <input v-model="password" type="password" class="form-control" placeholder="Unesite Lozinku">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Ponovo Unesite Lozinku</label>
          <input v-model="passwordRepeated" type="password" class="form-control" placeholder="Ponovo Unesite Loziku">
        </div>
        <button @click.prevent="register" class="btn btn-success">Registriraj se</button>
      </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data(){
    return{
      email:'',
      password:'',
      passwordRepeated:'',
      greska:''
    }
  },
  methods:{
    register(){
        if(this.password==this.passwordRepeated){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(greska => {
            // Handle Errors here.
            this.greska = greska.message;
            // ...
        }).then(()=>{
          this.$router.push('/')
        })
        }
        
    }
  }
}
</script>

<style>
form{
  color:white;
  margin: auto;
  margin-top:10%;
  width: 50%;
}


h1{
  color:white;
  font-size: 70px;
  padding-top:40px;
}
</style>