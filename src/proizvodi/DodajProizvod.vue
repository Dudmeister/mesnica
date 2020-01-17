<template>
    <div class="container">
        <div class="nazad">
            <button class="btn btn-danger" @click="$router.go(-1)">Nazad</button>
        </div>

        <div v-if="greska">{{greska}}</div>
        
        <div class="naslov">
            <h2>Dodavanje proizvoda</h2>
        </div>
        
        <form>
            <div class="row">
                <div class="col">
                    <select v-model="proizvod.vrstaMesa" class="form-control" placeholder="Lijek">
                        <option value="">Odaberite vrstu mesa</option>
                        <option >Piletina</option>  
                        <option >Svinjetina</option>  
                        <option >Govedina</option>  
                        <option >Janjetina</option>  
                    </select>
                    <input v-model="proizvod.nazivMesa" type="text" class="form-control" placeholder="Naziv mesa">
                    <input type="file" @change="slika" class="form-control" placeholder="Tip nastambe">
                    <input v-model="proizvod.cijena" type="number" class="form-control" placeholder="Cijena">
                    
                </div>
                <div class="col">
                    <input v-model="proizvod.kalorije" type="number" class="form-control" placeholder="Kalorije / kcl">
                    <input v-model="proizvod.proteini" type="number" class="form-control" placeholder="Proteini">
                    <input v-model="proizvod.masti" type="number" class="form-control" placeholder="Masti">
                </div>              
            </div>
            <button @click.prevent="upisiUBazu"  class="btn btn-primary my-1">Dodaj proizvod</button>
        </form>
    </div>
</template>

<script>
import baza from '@/firebase/init'
import firebase from 'firebase'
export default {
    data(){
        return{
            proizvod:{
                vrstaMesa:'',
                nazivMesa:'',
                kalorije:'',
                proteini:'',
                masti:'',
                urlSlike:'',
                cijena:''
            },
            greska:'',
            img:''
        }
    },
    methods:{
        podatciPopunjeni(){
            for(var key in this.proizvod){
                if(!this.proizvod[key]){ 
                    return true
                }
            }
            return false
        },
        slika(e){
            this.img= e.target.files[0]
        },
        upisiUBazu(){
            var storageRef = firebase.storage().ref('slike/' + this.img.name);

            var uploadTask = storageRef.put(this.img)
            
                uploadTask.on('state_changed', () =>{
                }, 
                (error) =>{
                    this.greska = error
                }, 
                () =>{
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
                        this.proizvod.urlSlike = downloadURL

                        this.greska=''
                        if(this.podatciPopunjeni()){
                            this.greska = "Popunite sva polja"
                        }
                        else{
                            baza.collection('proizvodi').where('vrstaMesa','==',this.proizvod.vrstaMesa)
                                .get().then((querySnapshot) =>{
                                    if(querySnapshot.empty){
                                        this.dodajProizvod()
                                    }
                                    else{
                                        querySnapshot.forEach(doc => {
                                            if(doc.data().nazivMesa==this.proizvod.nazivMesa){
                                                this.greska= 'Proizvod već postoji'
                                            }
                                            else{
                                                this.dodajProizvod()
                                        }
                                        });
                                    }                        
                                })
                        }
                    });
                });





            
        },
        dodajProizvod(){
            baza.collection('proizvodi').add({
                vrstaMesa:this.proizvod.vrstaMesa,
                nazivMesa:this.proizvod.nazivMesa,
                kalorije:this.proizvod.kalorije,
                proteini:this.proizvod.proteini,
                masti:this.proizvod.masti,
                urlSlike: this.proizvod.urlSlike,
                imeSlike: this.img.name,
                cijena: this.proizvod.cijena
            })
                .then(()=>{
                    this.greska = 'Proizvod dodan'
                })
        }
    }
}
</script>