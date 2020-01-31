import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    daliJePrijavljeno:'',
    daliJeAdmin:'',
    kosarica:[]
  },
  getters:{
    
  },
  mutations: {
    logiranje(state, status) {
      state.daliJePrijavljeno = status;
    },
    logiranjeAdmina(state, status) {
      state.daliJeAdmin = status;
    },

    addToCart(state, proizvod){
      let naden = false
      if(state.kosarica.length==0){
        state.kosarica.push(proizvod)
      }else{
        for( let i=0; i<state.kosarica.length; i++){

          if(state.kosarica[i].nazivMesa==proizvod.nazivMesa && state.kosarica[i].vrstaMesa==proizvod.vrstaMesa){
            naden = true
            state.kosarica[i].kolicina++
          }
        }
        if(!naden){
          state.kosarica.push(proizvod)
        }
      }
    },
    isprazniKosaricu(state,stanje){
      state.kosarica=stanje    }
  },

})