import shop from '@/api/shop'

export default {
  namespaced: true,

  state: {
    items: [],
  },
  getters: {
    availableProducts(state) {
      return state.items.filter((product) => product.inventory > 0)
    },

    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    },
  },

  mutations: {
    setProducts(state, products) {
      //update products
      state.items = products
    },

    decreaseProductInventory(state, product) {
      product.inventory--
    },
  },

  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        //make the call
        //run setProducts mutation
        shop.getProducts((products) => {
          commit('setProducts', products)
          resolve()
        })
        reject()
      })
    },
  },
}
