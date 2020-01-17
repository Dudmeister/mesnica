<template>
    <div>
        <router-link v-if="$store.state.logged=='admin@admin.com'" to="/dodaj-proizvod">
            <button class="btn btn-primary" >Dodaj proizvod</button>
        </router-link>

        <div v-if="$store.state.logged!=='admin@admin.com'" class="kosaricaIkona">
        <router-link :to="'kosarica'">
            <button>Kosarica</button>
        </router-link>  
    </div>
        
        <div class="card" v-for="proizvod in proizvodi" :key='proizvod.id'>
            <img :src="proizvod.urlSlike" height="200" width="200">
            <b>Vrsta: </b>{{proizvod.vrstaMesa}}
            <b>Naziv: </b>{{proizvod.nazivMesa}}
            <b>Kalorije: </b>{{proizvod.kalorije}}
            <b>Proteini: </b>{{proizvod.proteini}}
            <b>Masti: </b>{{proizvod.masti}}
            <b>Cijena: </b>{{proizvod.cijena}}
            <button v-if="$store.state.logged=='admin@admin.com'" @click="izbrisi(proizvod.id, proizvod.imeSlike)">Izbrisi</button>
            <button v-if="$store.state.logged!=='admin@admin.com' && $store.state.logged!==null" @click="uKosaricu(proizvod)">Dodaj u košaricu</button>
        </div>
            
        
    </div>
</template>


<script>
import firebase from 'firebase'
import baza from '@/firebase/init'
export default {
    data(){
        return{
            proizvodi:[]
        }
    },
    created(){
        baza.collection('proizvodi')
          .onSnapshot(snapshot =>{
            snapshot.docChanges().forEach( change =>{
              
              //u slučaju da je element dodan renderamo ga na stranici
              if (change.type === "added"){
                let doc = change.doc
                let proizvod = doc.data()
                proizvod.id = doc.id
                this.proizvodi.push(proizvod)
              }
              //u slučaju da je izbrisan brišemo ga stranice
              else if(change.type === "removed"){
                this.proizvodi = this.proizvodi.filter(proizvodi => {
                  return proizvodi.id != change.doc.id
                })
              }              
            })
        })
    },
    methods:{
        izbrisi(id, slika){
            firebase.storage().ref('slike/' + slika).delete()
            baza.collection('proizvodi').doc(id).delete()
        },
        uKosaricu(proizvod){
            proizvod.kolicina = 1
            this.$store.commit("addToCart", proizvod)
            console.log(this.$store.state.kosarica)
        }
    }
}
</script>

<style scoped>


</style>