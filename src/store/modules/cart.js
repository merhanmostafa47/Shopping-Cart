import shop from '@/api/shop'

export default {
  namespaced: true,

  state: {
    items: [], //id,quantity,
    checkoutStatus: null,
  },

  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map((cartIem) => {
        const product = rootState.products.items.find(
          (product) => product.id == cartIem.id
        )
        return {
          title: product.title,
          price: product.price,
          quantity: cartIem.quantity,
        }
      })
    },

    cartTotal(state, getters) {
      // let total = 0
      // getters.cartProducts.forEach((product) => {
      //   total += product.price * product.quantity
      // })
      // return total

      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    },
  },

  mutations: {
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity: 1,
      })
    },

    incrementProductQuantity(state, cartItem) {
      cartItem.quantity++
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },

    emptyCart(state) {
      state.items = []
    },
  },

  actions: {
    addProductToCart({ state, commit, rootGetters }, product) {
      if (rootGetters['products/productIsInStock'](product)) {
        // find cartItem
        const cartIem = state.items.find((item) => item.id == product.id)
        if (!cartIem) {
          // push product to cart
          commit('pushProductToCart', product.id)
        } else {
          // increment item quantity
          commit('incrementProductQuantity', cartIem)
        }
        commit('products/decreaseProductInventory', product, { root: true })
      }
    },

    checkout({ state, commit }) {
      shop.buyProducts(
        state.items,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    },
  },
}
