import { createStore } from 'vuex'
import cart from './modules/cart'
import products from './modules/products'

const store = createStore({
  modules: {
    cart,
    products,
  },

  state: {
    //data
  },

  getters: {
    // computed properties
  },

  mutations: {
    //setting and updating the state
  },
})

export default store
