<template>
    <div class="container">

        <div class="nazad">
            <button class="nazdabtn btn" @click="$router.go(-1)">Nazad</button>
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
                        <i @click="dodaj(proizvod)" class="fas fa-dodaj">+</i>
                            <b>{{proizvod.kolicina}}</b>
                        <i @click="umanji(proizvod)" class="fas fa-umanji">-</i>
                    </div>
                    <div>
                        Cijena jednog komada prizvoda: <b>{{proizvod.cijena}} kn</b>
                    </div>
                    <button class="uklonibtn btn btn-danger" @click="izbrisiIzKosarice(proizvod.id, proizvod.cijena, proizvod.kolicina)">Ukloni</button>
                </div>
                <div class="ukupna">
                    Ukupna cijena: <b>{{UkupnaCijena}} kn</b>
                </div>
                 

                <div class="kupac">
                    <div class= "podaci row">
                        <div class="col">
                            <input v-model="kupac.ime" type="text" class="form-control" placeholder="Ime">
                        </div>
                    </div>

                    <div class="podaci row">
                        <div class="col">
                            <input v-model="kupac.prezime" type="text" class="form-control" placeholder="Prezime">
                        </div>
                    </div>
                    

                    <div class="podaci row">
                        <div class="col">
                            <input v-model="kupac.adresa" type="text" class="form-control" placeholder="Adresa">
                        </div>
                    </div>

                    <div class="podaci row">
                        <div class="col">
                            <input v-model="kupac.grad" type="text" class="form-control" placeholder="Grad">
                        </div>
                    </div>
                    <div class="podaci row">
                        <div class="col">
                            <input v-model="kupac.postanskiBroj" type="number" class="form-control" placeholder="Poštanski Broj">
                        </div>
                    </div>

                    <button class="btn" @click="naruci">Naruči</button>
                </div>
                
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
        kosaricaFunk(){
            for( let i=0; i<this.kosarica.length; i++){
                this.UkupnaCijena += this.kosarica[i].kolicina * this.kosarica[i].cijena
            }
        },
        podaciPopunjeni(){
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
            if(this.podaciPopunjeni()){
                this.greska= 'Unesite sve podatke'
            }else{
                    baza.collection('narudzbe').add({
                        kosarica: this.kosarica,
                        kupac: this.kupac,
                        ukupnaCijena: this.UkupnaCijena,
                        })
                            .then(() =>{
                                this.$store.commit("isprazniKosaricu", []);
                                this.$router.push('/ponuda')
                            })                 
                    
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
        this.kosaricaFunk()
        
    },
}
</script>
<style scoped>
button{
  background-color: rgb(16, 145, 16);
  border-color: hsl(64, 84%, 26%);
  color:white;
}
.row {
    color:white;
}
.naslov {
    color:white;
}

.kupac{
    margin:auto;
    width: 40%;
}

.podaci{
    margin:10px;
}

.ukupna{
    margin:15px;
    font-size: 25px;
}

.nazad{
    text-align: right;
    margin:10px;
}

.nazdabtn, .uklonibtn{
    background-color: white;
    color:red;
    border:none;
}

.nazdabtn:hover{
  -ms-transform: scale(1.5);
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
}
</style>