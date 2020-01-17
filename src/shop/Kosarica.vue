<template>
    <div class="container">

        <div class="nazad">
            <button class="btn btn-danger" @click="$router.go(-1)">Nazad</button>
        </div>

        <div class="naslov">
            <h2>Košarica</h2>
        </div>
        <div v-if="greska" class="greska">
            <h3>{{greska}}</h3>
        </div>
        
        <div class="row">
            <div class="col">
                <div class="proizvodiUKosarici" v-for="proizvod in kosarica" :key="proizvod.id">
                    <div>
                        Vrsta: <b>{{proizvod.vrstaMesa}}</b>
                        Naziv: <b>{{proizvod.nazivMesa}}</b>
                    </div>
                    <div>
                        Količina: 
                        <i @click="dodaj(proizvod)" class="fas fa-dodaj"></i>
                            <b>{{proizvod.kolicina}}</b>
                        <i @click="umanji(proizvod)" class="fas fa-umanji"></i>
                    </div>
                    <div>
                        Cijena jednog komada prizvoda: <b>{{proizvod.cijena}} kn</b>
                    </div>
                    <button class="btn btn-danger" @click="izbrisiIzKosarice(proizvod.id, proizvod.cijena, proizvod.kolicina)"> ukloni</button>
                </div>
                 Ukupna cijena: <b>{{UkupnaCijena}} kn</b>
                <div class="row">
                    <div class="col">
                        <input v-model="kupac.ime" type="text" class="form-control" placeholder="Ime">
                    </div>
                    <div class="col">
                        <input v-model="kupac.prezime" type="text" class="form-control" placeholder="Prezime">
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <input v-model="kupac.adresa" type="text" class="form-control" placeholder="Adresa">
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <input v-model="kupac.grad" type="text" class="form-control" placeholder="Grad">
                    </div>
                    <div class="col">
                        <input v-model="kupac.postanskiBroj" type="number" class="form-control" placeholder="Postanski Broj">
                    </div>
                </div>
                <button class="naruci btn btn-success" @click="naruci">Naruči</button>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import baza from '@/firebase/init'
import firebase from 'firebase'

export default {
    data(){
        return{
            kosarica: this.$store.state.kosarica,
            UkupnaCijena: 0,
            kupac:{
                ime:'',
                prezime:'',
                adresa:'',
                postanskiBroj:'',
                grad:'',

            },
            greska: '',
            email:''
            
            
        }
    },
    methods: {
        podatciPopunjeni(){
            for(var key in this.kupac){
                if(!this.kupac[key]){ 
                    return true
                }
            }
            return false
        },
        dodaj(proizvod){
            if(proizvod.kolicina++<100){
                proizvod.kolicina
                this.UkupnaCijena += 1*proizvod.cijena
            }else{
                proizvod.kolicina=100
            }
        },
        umanji(proizvod){
            if(proizvod.kolicina-->1){
                proizvod.kolicina
                this.UkupnaCijena -= 1*proizvod.cijena
            }else{
                proizvod.kolicina=1
            }
        },
        naruci(){
            if(this.podatciPopunjeni()){
                this.greska= 'Unesite sve podatke'
            }else{
                firebase.auth().onAuthStateChanged(user => {
                   this.email= user.email  
                    baza.collection('narudzbe').add({
                        kosarica: this.kosarica,
                        kupac: this.kupac,
                        ukupnaCijena: this.UkupnaCijena,
                        })
                            .then(() =>{
                                this.$store.commit("isprazniKosaricu", []);
                                this.$router.push('/ponuda')
                            })                 
                });
                    
            }
            
        },
        izbrisiIzKosarice(id, cijena, kolicina){
            this.UkupnaCijena -= cijena * kolicina
            this.kosarica = this.kosarica.filter(kosarica => {
            return kosarica.id != id
          })
        }
    },
    created() {
        for( let i=0; i<this.kosarica.length; i++){
            this.UkupnaCijena += this.kosarica[i].kolicina * this.kosarica[i].cijena
        }
        
    },
}
</script>