<template>
  <div class="home">
    <h1>Home Page</h1>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Nama</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <a href="#" @click.prevent="onLogout">Logout</a>
  </div>
</template>

<script>
import ProductService from '@/services/product.service'
import helper from '@/helper/helper'
import { ApiError } from '@/services/api.service'
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
        if (e instanceof ApiError) {
          const errorCode = e.errorCode ? `[${e.errorCode}]` : ''
          helper.swall(e.errorType, e.errorCode, e.message)
        }
      }
    }
  },
  created: function () {
    this.onGetProduct()
  }
}
</script>
