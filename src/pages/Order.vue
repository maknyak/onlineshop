<template>
  <div class="home">
    <div class="container-fluid">
      <custom-table :items="orders" :fields="orderFields" :total-rows="totalOrder" :per-page="size" :offset="offset" :fetch="onGetOrder">
        <template slot="invoice" slot-scope="data">
          <strong>{{ data.item.invoice || '-' }}</strong>
          <div>{{ data.item.buyerName || '-' }}</div>
        </template>
        <template slot="status" slot-scope="data">
          <strong v-if="data.item.statusList.length > 0">{{ data.item.statusList[0].status }}</strong>
          <div v-else>-</div>
          <div v-if="data.item.statusList.length > 0">{{ data.item.statusList[0].date | ago }}</div>
          <div v-else>-</div>
        </template>
        <template slot="storeName" slot-scope="data">
          <strong>{{ data.item.sellerStoreName || '-'}}</strong>
          <div>{{ data.item.sellerStoreDesc || '-' }}</div>
        </template>
        <template slot="total" slot-scope="data">
          <strong>{{ data.item.total | currency('Rp ') }} <span class="text-black-50">{{ data.item.product.length > 0 ? `(${data.item.product[0].quantity} barang)` : '-'  }}</span></strong>
          <div class="text-danger">Kode Unik: {{ data.item.convenientFee || '-'}}</div>
        </template>
        <template slot="detail" slot-scope="data">
          <button type="button" class="btn btn-warning font-weight-bold btn-sm btn-block">Detail</button>
        </template>
        <div slot="loading" class="text-center text-warning my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </custom-table>
    </div>
  </div>
</template>

<script>
import OrderService from '@/services/order.service'
import { ApiError } from '@/services/api.service'
import CustomTable from '@/components/custom-table/CustomTable'
import swall from '@/common/helper'
import { currency, ago } from '@/common/filter'

export default {
  components: {
    CustomTable
  },
  filters: {
    currency,
    ago
  },
  data: function () {
    return {
      orderFields: [],
      orders: [],
      page: 1,
      size: 10,
      totalOrder: 0,
      offset: 0
    }
  },
  methods: {
    onGetOrder: async function () {
      const params = {
        page: this.page - 1,
        size: this.size
      }

      try {
        this.isBusy = true
        const res = await OrderService.get('complete', params)
        this.orderFields = [
          {
            key: 'invoice',
            label: 'Nomor Tagihan',
            sortable: true
          },
          {
            key: 'status',
            label: 'Status',
            sortable: false
          },
          {
            key: 'storeName',
            label: 'Nama Toko',
            sortable: true
          },
          {
            key: 'total',
            label: 'Total',
            sortable: true
          },
          {
            key: 'detail',
            label: 'Detail',
            thClass: 'text-center',
            tdClass: 'align-middle'
          }
        ]

        this.orders = res.content
        this.totalOrder = res.totalElements
        this.offset = res.pageable.offset
      } catch (e) {
        if (e instanceof ApiError) {
          swall(e.errorType, e.errorCode, e.message)
        }
      }
    }
  },
  created: function () {
    this.onGetOrder()
  }
}
</script>
