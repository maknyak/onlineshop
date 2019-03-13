<template>
  <div class="home">
    <div class="container-fluid">
      <custom-table :items="orders" :fields="orderFields" :total-rows="totalOrder" :per-page="size" :offset="offset" :fetch="onGetOrder" :page="page">
        <template slot="invoice" slot-scope="data">
          <strong>{{ data.item.invoice || '-' }}</strong>
          <div class="font-sm">{{ data.item.buyerName || '-' }}</div>
        </template>
        <template slot="status" slot-scope="data">
          <strong v-if="data.item.statusList.length > 0">{{ data.item.statusList[0].status }}</strong>
          <div v-else>-</div>
          <div class="font-sm" v-if="data.item.statusList.length > 0">{{ data.item.statusList[0].date | ago }}</div>
          <div class="font-sm" v-else>-</div>
        </template>
        <template slot="storeName" slot-scope="data">
          <strong>{{ data.item.sellerStoreName || '-'}}</strong>
          <div class="font-sm">{{ data.item.sellerStoreDesc || '-' }}</div>
        </template>
        <template slot="total" slot-scope="data">
          <strong>{{ data.item.total | currency('Rp ') }} <span class="text-black-50 font-sm">{{ data.item.product.length > 0 ? `(${data.item.product[0].quantity} barang)` : '-'  }}</span></strong>
          <div class="font-sm">Kode Unik: <span class="text-danger font-weight-bold">{{ data.item.convenientFee || '-'}}</span></div>
        </template>
        <template slot="detail" slot-scope="data">
          <button type="button" class="btn btn-primary font-weight-bold btn-sm btn-block" @click="onGetDetail(data.item.orderId)">Detail</button>
        </template>
        <div slot="loading" class="text-center text-warning my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </custom-table>
    </div>

    <b-modal ref="modalOrder" :centered="true"  title="Detail Pesanan">
      <order-detail :detail="orderDetail" :collapse="true" :collapseBtn="false" :showBank="false"></order-detail>
    </b-modal>
  </div>
</template>

<script>
import OrderService from '@/services/order.service'
import { ApiError } from '@/services/api.service'
import { currency, ago } from '@/common/filter'
import { swall } from '@/common/helper'
import XLSX from 'xlsx'
import BModal from 'bootstrap-vue/es/components/modal/modal'
import CustomTable from '@/components/custom-table/CustomTable'
import OrderDetail from '@/components/order-detail/OrderDetail'

export default {
  components: {
    CustomTable,
    OrderDetail,
    BModal
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
      offset: 0,
      orderDetail: {}
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
            thClass: 'text-center width-80',
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
    },

    onGetDetail: async function (id) {
      try {
        const res = await OrderService.getDetail(id)
        this.orderDetail = res
        this.$refs.modalOrder.show()
      } catch (e) {
        if (e instanceof ApiError) {
          swall(e.errorType, e.errorCode, e.message)
        }
      }
    },

    onExport: async function (id) {
      const params = {
        page: this.page - 1,
        size: this.size
      }

      try {
        const res = await OrderService.get('complete', params)
        const jsonWS = XLSX.utils.json_to_sheet(res.data.data)
        
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, jsonWS, 'pesanan-selesai')
        XLSX.writeFile(wb, 'pesanan-selesai.xlsx')
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
