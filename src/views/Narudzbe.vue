<template>
    <div class="container">
          <ul v-for="narudzba in narudzbe" :key="narudzba.id" class="narudzba">
            <li>
                
            <div class="row">
                <div class="col">
                    <div v-for="pojedina in narudzba.kosarica" :key="pojedina.id" class="parametrisvi">
                        <div class="detalji">
                            <div>Vrsta: <b>{{pojedina.vrstaMesa}}</b></div> 
                            <div>Naziv: <b>{{pojedina.nazivMesa}}</b></div> 
                            <div>Količina: <b>{{pojedina.kolicina}}</b></div> 
                        </div>
                    </div>

                    <div class="kupac">
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
                        
                        <div class="button row">
                            <button @click="posalji(narudzba.id)" class="btn btn-success">Pošalji</button>
                        </div>
                    </div>
                    
                </div>
              
                
            </div>
                          
            </li>
          </ul> 
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
        podaci(){
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
        this.podaci()
    },
}
</script>
<style scoped>

ul{
    list-style: none;
    padding: 0;
}

.narudzba{
    margin: 15px 20px;
    background-color:rgba(158, 46, 46, 0.884);
    color:rgb(212, 212, 212);
    border-radius: 15px;

}

.parametrisvi{
    padding: 15px 0;
    color:rgb(212, 212, 212);
}

.btn{
    padding: 5px;
    margin:auto;
    width: 30%;
}

.kupac{
    padding: 15px 0;
}

.button{
    margin:10px;
}

.sve{
    margin: 0 20%;
}

</style>