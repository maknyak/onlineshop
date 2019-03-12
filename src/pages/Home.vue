<template>
  <div class="home">
    <h1>Home Page</h1>
    <a href="#" @click.prevent="onLogout">Logout</a>
  </div>
</template>

<script>
import { ProductService, ProductError } from '@/services/product.service'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('auth', [
      'logout'
    ]),

    onLogout: function () {
      this.logout()
    },

    onGetProduct: async function () {
      try {
        const res = await ProductService.getProduct()
        console.log(res)
      } catch (e) {
        if (e instanceof ProductError) {
          if (e.errorCode > 0) {
            alert(`[warning][${e.errorCode}] ${e.message}`)
          } else {
            alert(`[danger][${e.errorCode}] ${e.message}`)
          }
        }
      }
    }
  },
  created: function () {
    this.onGetProduct()
  }
}
</script>
