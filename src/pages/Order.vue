<template>
  <div class="home pb-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <tablelist :fields="orderFields" :fetch="onGetOrder" ref="tablelist">
            <template slot="tablelist-toolbar">
              <button class="btn btn-outline-secondary" @click="onExport">Export Excel</button>
            </template>
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
              <button type="button" class="btn btn-warning font-weight-bold btn-sm btn-block" @click="onGetDetail(data.item.orderId)">Detail</button>
            </template>
          </tablelist>
        </div>
      </div>
    </div>

    <b-modal ref="modalOrder" :centered="true"  title="Detail Pesanan">
      <order-detail :detail="detailOrder" :collapse="true" :collapseBtn="false" :showBank="false"></order-detail>
    </b-modal>
  </div>
</template>

<script>
import OrderService from '@/services/order.service'
import { ApiError } from '@/services/api.service'
import { currency, ago } from '@/common/filter'
import { swall } from '@/common/helper'
import BModal from 'bootstrap-vue/es/components/modal/modal'
import OrderDetail from '@/components/order-detail/OrderDetail'
import Tablelist from '@/components/tablelist/TableList'
import XLSX from 'xlsx'

export default {
  components: {
    OrderDetail,
    BModal,
    Tablelist
  },
  filters: {
    currency,
    ago
  },
  data: function () {
    return {
      detailOrder: {},
      orderFields: [
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
    }
  },
  methods: {
    onGetOrder: async function (page, size) {
      const options = {
        page: page,
        size: size
      }

      try {
        const res = await OrderService.get('complete', options)
        return res
      } catch (e) {
        if (e instanceof ApiError) {
          swall(e.errorType, e.errorCode, e.message)
        }
      }
    },

    onGetDetail: async function (id) {
      try {
        const res = await OrderService.getDetail(id)
        console.log('res', res)
        this.detailOrder = res
        this.$refs.modalOrder.show()
      } catch (e) {
        if (e instanceof ApiError) {
          swall(e.errorType, e.errorCode, e.message)
        }
      }
    },

    onExport: async function () {
      const options = {
        page: this.$refs.tablelist.currentPage - 1,
        size: this.$refs.tablelist.perPage
      }

      try {
        const res = await OrderService.get('complete', options)
        const jsonWS = XLSX.utils.json_to_sheet(res.content)

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, jsonWS, 'pesanan-selesai')
        XLSX.writeFile(wb, 'pesanan-selesai.xlsx')
      } catch (e) {
        if (e instanceof ApiError) {
          swall(e.errorType, e.errorCode, e.message)
        }
      }
    }
  }
}
</script>
