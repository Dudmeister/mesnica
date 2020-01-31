<template>
    <div>
        <router-link v-if="$store.state.daliJeAdmin" to="/dodaj-proizvod">
            <button class="dp" >Dodaj proizvod</button>
        </router-link>

        <div v-if="!$store.state.daliJeAdmin" class="kosaricaIkona">
        <router-link :to="'kosarica'">
            <button class="ks">Košarica</button>
        </router-link>  
    </div>
        
        <div class="row">
            <div class="col-6" v-for="proizvod in proizvodi" :key='proizvod.id'>
                <div class="card">
                    <img :src="proizvod.urlSlike" height="200" width="200">
                    <b>Vrsta: </b>{{proizvod.vrstaMesa}}
                    <b>Naziv: </b>{{proizvod.nazivMesa}}
                    <b>Kalorije: </b>{{proizvod.kalorije}}
                    <b>Proteini: </b>{{proizvod.proteini}}
                    <b>Masti: </b>{{proizvod.masti}}
                    <b>Cijena: </b>{{proizvod.cijena}}
                    <button class="izb" v-if="$store.state.daliJeAdmin" @click="izbrisi(proizvod.id, proizvod.imeSlike)">Izbriši</button>
                    <button class="dk" v-if="!$store.state.daliJeAdmin && $store.state.daliJePrijavljeno!==null" @click="uKosaricu(proizvod)">Dodaj u košaricu</button>
                </div>
            </div>
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
        this.podaci()
    },
    methods:{
        podaci(){
            baza.collection('proizvodi')
            .onSnapshot(snapshot =>{
                snapshot.docChanges().forEach( change =>{

                if (change.type === "added"){
                    let doc = change.doc
                    let proizvod = doc.data()
                    proizvod.id = doc.id
                    this.proizvodi.push(proizvod)
                }
                else if(change.type === "removed"){
                    this.proizvodi = this.proizvodi.filter(proizvodi => {
                    return proizvodi.id != change.doc.id
                    })
                }              
                })
            })
        },
        izbrisi(id, slika){
            firebase.storage().ref('slike/' + slika).delete()
            baza.collection('proizvodi').doc(id).delete()
        },
        uKosaricu(proizvod){
            proizvod.kolicina = 1
            this.$store.commit("addToCart", proizvod)
        }
    }
}
</script>
<style>
.dk{
    border-radius: 25px;
    padding: 14px 40px;
    background-color:rgb(26, 167, 33);
    color: white;
    margin: auto;
    width: 30%;
}
.izb{
    border-radius: 25px;
    padding: 14px 40px;
    background-color:rgb(238, 51, 51);
    color: white;
    margin: auto;
    width: 30%;
}
.dp{
    border-radius: 25px;
    padding: 14px 40px;
    background-color:rgb(26, 167, 33);
    color: white;
    margin: auto;
    width: 30%;
}
.ks{
    border-radius: 25px;
    padding: 10px;
    background-color: rgba(250, 127, 11, 0.76);
    color: white;
    margin: auto;
    width: 10%;
    border-color:rgba(235, 86, 28, 0.897);
}

.card{
    margin:auto;
    margin: 15px;
    border-radius: 15px;
}

img{
    padding: 15px;
    margin:auto;
}
</style>