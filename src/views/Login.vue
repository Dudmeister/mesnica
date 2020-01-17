<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button @click.prevent="login()" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(cred => {
        this.$store.commit("postaviLoged", cred.user.email)
        this.$router.push('ponuda')
      });
    }
  },
}
</script>
