<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul v-for="product in products" :key="product.id">
      {{
        product.title
      }}
      -
      {{
        product.price
      }}
      -
      {{
        product.quantity
      }}
    </ul>
    <p>Total: {{ total }}</p>
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('cart', {
      checkoutStatus: (state) => state.checkoutStatus,
    }),

    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotal',
    }),
    // products() {
    //   return this.$store.getters.cartProducts
    // },

    // total() {
    //   return this.$store.getters.cartTotal
    // },
  },

  methods: {
    ...mapActions('cart', ['checkout']),
  },
}
</script>
