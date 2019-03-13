<template>
  <div class="detail-pesanan">
    <div class="row mb-3">
      <div class="col-sm-6">
        <div class="label-group">
          <label class="text-darkgrey">Invoice Number</label>
          <div class="label-text text-purple">{{detail.invoice || '-'}}</div>
        </div>
        <div class="label-group">
          <label class="text-darkgrey">Tanggal Pembelian</label>
          <div class="label-text text-purple">{{detail.invoiceDate | date('DD MMMM YYYY hh:mm', ' WIB')}}</div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="label-group">
          <label class="text-darkgrey">Status Pesanan</label>
          <label class="text-darkgrey float-right" v-if="collapseBtn">
            <a href="#" @click="showOrder = !showOrder" class="text-reset">
              <i :class="showOrder ? 'fa fa-chevron-up fa-fw' : 'fa fa-chevron-down fa-fw'"></i>
            </a>
          </label>
          <div
            class="label-text text-purple"
            v-if="detail.statusList"
          >{{detail.statusList[0].status}}</div>
          <div v-else>-</div>
        </div>
      </div>
    </div>

    <hr>
    <div class="row">
      <div class="col-8 offset-2 col-md-8 offset-md-2">
        <h2 class="heading-6">Bukti Unggah Pembayaran</h2>
        <div v-if="detail.payment">
          <div class="label-group">
            <label class="text-darkgrey">Unggah Pembayaran</label>
          </div>
          <div class="mb-3">
            <!-- <viewer :options="optionViewer" :image="detail.payment.urlPayment" class="w-250" style="cursor: pointer;"> -->
              <img :src="detail.payment.urlPayment" class="img-fluid">
            <!-- </viewer> -->
          </div>
        </div>
        <div v-else class="font-sm text-darkgrey">Pembeli belum melakukan upload bukti pembayaran</div>
        <div class="label-group" v-if="detail.payment">
          <div>{{detail.payment.description}}</div>
          <label class="text-darkgrey">{{detail.payment.createDate | date('DD MMMM YYYY hh:mm', ' WIB')}}</label>
        </div>
      </div>
    </div>

    <b-collapse id="collapse1" v-model="showOrder" class="mt-2">
      <hr>

      <div class="row">
        <div class="col-sm-6">
          <h2 class="heading-6">Data Pembeli</h2>
          <div class="label-group">
            <label class="text-darkgrey">Nama Pembeli</label>
            <div class="label-text">{{detail.buyerName || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">No. Telpon Pembeli</label>
            <div class="label-text">{{detail.recipientNumber || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">Email Pembeli</label>
            <div class="label-text">{{detail.buyerId || '-'}}</div>
          </div>
          <div class="label-group" v-if="showBank">
            <label class="text-darkgrey">Rek Pembeli</label>
            <div class="label-text" v-if="detail.payment">
              {{detail.payment.buyerBankName}} {{detail.payment.buyerBankAccountNumber}}
              <br>
              {{detail.payment.buyerBankAccountName ? `a.n. ${detail.payment.buyerBankAccountName}` : ''}}
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <h2 class="heading-6">Data Penjual</h2>
          <div class="label-group">
            <label class="text-darkgrey">Nama Toko</label>
            <div class="label-text">{{detail.sellerStoreName || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">Nama Penjual</label>
            <div class="label-text">{{detail.sellerStoreDesc || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">No. Telpon Penjual</label>
            <div class="label-text">{{detail.sellerPhoneNo || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">Email Penjual</label>
            <div class="label-text">{{detail.sellerId || '-'}}</div>
          </div>
          <div class="label-group" v-if="showBank">
            <label class="text-darkgrey">Rek Penjual</label>
            <div class="label-text">
              {{detail.sellerBankName}} {{detail.sellerBankAccount}}
              <br>
              {{detail.sellerBankAccountName ? `a.n. ${detail.sellerBankAccountName}` : ''}}
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-sm-6" v-for="(item, index) in detail.product" :key="index">
          <h2 class="heading-6">Pesanan</h2>
          <div class="media">
            <div class="mr-3">
              <!-- <viewer :options="optionViewer" :image="item.thumbnail" style="cursor: pointer;"> -->
                <div class="img-overflow-sm">
                  <img :src="item.thumbnail" class="w-200">
                </div>
              <!-- </viewer> -->
            </div>
            <div class="media-body">
              <div class="mt-0">{{item.productName}}</div>
              <div class="mt-0 text-purple font-weight-bold">{{item.productPrice | currency('Rp ')}}</div>
              <div class="mt-0 font-sm">Jumlah: {{item.quantity}}</div>
              <div class="mt-0 font-sm">Berat: {{item.weight | unit(' gram')}}</div>
            </div>
          </div>

          <div class="label-group">
            <label class="text-darkgrey">Catatan untuk penjual</label>
            <div class="label-text word-wrap">{{item.notes || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">Metode Pembayaran</label>
            <div class="label-text" v-if="detail.payment">{{detail.payment.paymentMethodId || '-'}}</div>
          </div>
        </div>
        <div class="col-sm-6">
          <h2 class="heading-6">Pengiriman</h2>
          <div class="label-group">
            <label class="text-darkgrey">Jasa Pengiriman</label>
            <div class="label-text">{{detail.shipmentName || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">No. Resi</label>
            <div class="label-text">{{detail.waybillNo || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">Penerima</label>
            <div class="label-text">{{detail.recipientName || '-'}}</div>
          </div>
          <div class="label-group">
            <label class="text-darkgrey">Alamat Pengiriman</label>
            <div class="label-text">{{detail.shipmentAddress || '-'}}</div>
          </div>
        </div>
      </div>

      <hr>

      <div class="row mb-4">
        <div class="col-sm-12">
          <h2 class="heading-6">Ringkasan Pembelian</h2>
          <table class="table table-sm table-borderless font-sm mb-0 w-300">
            <tr>
              <td class="w-150">Jumlah Barang</td>
              <td class="w-10">:</td>
              <td class="w-150" colspan="2" v-if="detail.product">{{detail.totalProduct}} Barang ({{detail.product[0].weight | unit(' gram')}})</td>
            </tr>
            <tr>
              <td>Total Belanja</td>
              <td>:</td>
              <td class="w-10">Rp</td>
              <td class="text-right">{{detail.totalOrder | currency}}</td>
            </tr>
            <tr>
              <td>Total Ongkir</td>
              <td>:</td>
              <td class="w-10">Rp</td>
              <td class="text-right">{{detail.totalShipmentCost | currency}}</td>
            </tr>
            <tr>
              <td>Biaya Asuransi</td>
              <td>:</td>
              <td class="w-10">Rp</td>
              <td class="text-right">{{0 | currency}}</td>
            </tr>
            <tr>
              <td>Biaya Tambahan Penjual</td>
              <td>:</td>
              <td class="w-10">Rp</td>
              <td class="text-right">{{0 | currency}}</td>
            </tr>
            <tr>
              <td>Total Pembayaran</td>
              <td>:</td>
              <td class="w-10">Rp</td>
              <td class="text-right">{{detail.totalPayment | currency}}</td>
            </tr>
            <tr>
              <td>Biaya Tambahan</td>
              <td>:</td>
              <td class="w-10">Rp</td>
              <td class="text-right">{{detail.convenientFee | currency}}</td>
            </tr>
            <tr>
              <td>Grand Total</td>
              <td>:</td>
              <td class="w-10">Rp</td>
              <td class="text-right">{{detail.grandTotal | currency}}</td>
            </tr>
            <tr>
              <td>Metode Pembayaran</td>
              <td>:</td>
              <td colspan="2" v-if="detail.payment">{{detail.payment.paymentMethodId}}</td>
            </tr>
          </table>
        </div>
      </div>

      <hr>

      <div class="row">
        <div class="col-sm-12">
          <h2 class="heading-6">Status Transaksi</h2>
          <table class="table table-borderless font-sm">
            <tr v-for="(item, index) in detail.statusList" :key="index" class="text-darkgrey">
              <td class="w-125 text-right pr-3 pl-0" :class="{'text-purple font-weight-bold': index === 0,}">
                <div class="font-weight-">{{item.createdBy}}</div>
                <div class="font-weight-">{{item.date | date("DD MMMM YYYY hh:ss", " WIB")}}</div>
              </td>
              <td class="border-bottom font-default px-0" :class="{'text-default': index === 0}">
                <div :class="{'font-weight-bold': index === 0}">{{item.status}}</div>
                <div class="font-sm" :class="{'font-weight-bold': index === 0}">{{item.description}}</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import BCollapse from 'bootstrap-vue/es/components/collapse/collapse'
import { currency, date, unit } from '@/common/filter'
// import Viewer from 'v-viewer/src/component.vue'
// import 'viewerjs/dist/viewer.css'

export default {
  components: {
    BCollapse
    // Viewer
  },
  filters: {
    currency,
    date,
    unit
  },
  name: 'OrderDetail',
  data () {
    return {
      showOrder: this.collapse,
      files: []
    }
  },
  props: {
    detail: Object,
    collapse: Boolean,
    collapseBtn: Boolean,
    showBank: Boolean
  }
}
</script>
