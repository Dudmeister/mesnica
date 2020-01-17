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
            <router-link class="nav-link" to="/ponuda">Ponuda</router-link>
          </li>
          <li v-if="$store.state.logged=='admin@admin.com'" class="nav-item">
            <router-link class="nav-link" to="/narudzbe">Narudzbe</router-link>
          </li>
          <li>
            <button @click="odjava">Odjava</button>
          </li>
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
        this.$store.commit("postaviLoged", false)
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
</style>
