<template>
  <h1>Product List</h1>

  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price }}-{{ product.inventory }}
      <button
        :disabled="!productIsInStock(product)"
        @click="addProductToCart(product)"
      >
        Add To Cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapState({
      products: (state) => state.products.items,
    }),

    // products() {
    //   return this.$store.state.products
    // },

    ...mapGetters('products', {
      productIsInStock: 'productIsInStock',
    }),

    // productIsInStock() {
    //   return this.$store.getters.productIsInStock
    // },
  },

  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart',
    }),
    // addProductToCart(product) {
    //   this.$store.dispatch('addProductToCart', product)
    // },
  },

  created() {
    this.loading = true
    this.fetchProducts().then(() => (this.loading = false))
  },
}
</script>
