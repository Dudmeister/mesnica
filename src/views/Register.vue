<template>
  <div class="container">
      <div v-if="greska">{{greska}}</div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="passwordRepeated" type="password" class="form-control" placeholder="Repeat password">
      </div>
      <button @click.prevent="register" class="btn btn-primary">Submit</button>
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
        console.log("sadas")
        if(this.password==this.passwordRepeated){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(greska => {
            // Handle Errors here.
            this.greska = greska.message;
            // ...
        });
        }
        
    }
  }
}
</script>