<template>
<div class="pozadina">
  <div class="container">
    <h1>Web Mesnica</h1>
    <form>
      
      <div class="form-group">
        <label for="exampleInputEmail1">Email adresa</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Unesite Email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Lozinka</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Unesite Lozinku">
      </div>
      <button @click.prevent="login()" class="btn btn-success">Prijavi se</button>
    </form>
  </div>
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
        if(cred.user.email == 'admin@admin.com'){
          this.$store.commit("logiranjeAdmina", cred.user.email)
        }
        this.$store.commit("logiranje", cred.user.email)
        this.$router.push('/')
      });
    }
  },
}
</script>
<style scoped>


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
