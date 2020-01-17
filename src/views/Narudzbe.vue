<template>
    <div class="container">
        <transition-group name="brisanje">
          <ul v-for="narudzba in narudzbe" :key="narudzba.id" class="brisanje-group">
            <li class="brisanje-group-item">
                
            <div class="row">
                <div class="col">
                    <div v-for="pojedina in narudzba.kosarica" :key="pojedina.id" class="parametri">
                        <div class="detalji">
                            <div>Vrsta: <b>{{pojedina.vrstaMesa}}</b></div> 
                            <div>Naziv: <b>{{pojedina.nazivMesa}}</b></div> 
                            <div>Količina: <b>{{pojedina.kolicina}}</b></div> 
                        </div>
                    </div>
                </div>
              
                <div class="col">

                    <div class="row">
                        <div class="col">
                            <div class="parametri">Kupac: <b>{{narudzba.kupac.ime}} {{narudzba.kupac.prezime}}</b></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="parametri">Adresa: <b>{{narudzba.kupac.adresa}}, {{narudzba.kupac.grad}}</b></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="parametri">Poštanski broj: <b>{{narudzba.kupac.postanskiBroj}}</b></div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <button @click="posalji(narudzba.id)" class="btn btn-success">Pošalji</button>
                    </div>
                </div>
            </div>
                          
            </li>
          </ul>
        </transition-group>  
    </div>
</template>

<script>
import baza from '@/firebase/init'
import firebase from 'firebase'



export default {
    data(){
    return{
      narudzbe: [],
      obavijest: false,
      error:''
    }
  },
    methods:{
        citaj(){
            baza.collection('narudzbe')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {

                if (change.type === "added"){
                    let doc = change.doc
                    let narudzba = doc.data()
                    narudzba.id = doc.id
                    this.narudzbe.push(narudzba)
                }
                else if(change.type === "removed"){
                    this.narudzbe = this.narudzbe.filter(narudzbe => {
                    return narudzbe.id != change.doc.id
                    })
                } 
                });
            })
        },
        posalji(id){
            baza.collection('narudzbe').doc(id).delete()
        }
    },
    created() {
        this.citaj()
    },
}
</script>