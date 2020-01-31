<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">

        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Ponuda</router-link>
          </li>
          <li v-if="$store.state.daliJePrijavljeno=='admin@admin.com'" class="nav-item">
            <router-link class="nav-link" to="/narudzbe">Narudzbe</router-link>
          </li>
          <ul class="lista">
            <li>
            <button class="odjava" @click="odjava">Odjava</button>
          </li>
          </ul>
        </ul>
      </div>
    </nav>
<router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  methods:{
    odjava(){
      firebase.auth().signOut().then(() => {
        this.$store.commit("logiranje", false)
        this.$store.commit("logiranjeAdmina", false)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: rgba(250, 31, 31, 0.911);
  overflow: auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.odjava{
  border-radius: 25px;
    padding: 8px;
    background-color:rgba(238, 51, 51);
    color: white;
    margin: auto;
    width: 100%;
    text-align: center;
}

.lista{
  position: absolute;
  right:0;
  list-style-type:none;
  padding-right: 16px;
  
}

.collapse{
  padding: 0 25px;
}

.nav-link{
  margin: 0 20px;
  font-size: 20px;
}

</style>
