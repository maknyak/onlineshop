<template>
  <div class="tablelist">
    <div class="row align-items-center mb-2">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">Tampilkan</span>
          </div>
          <select class="custom-select" v-model="perPage" @change="onChangeSize">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
            <option :value="totalRow">Semua</option>
          </select>
          <div class="input-group-append">
            <slot name="tablelist-toolbar"></slot>
            <button class="btn btn-outline-secondary" type="button" @click="onRefresh"><i class="fa fa-refresh fa-fw"></i> Refresh</button>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4 col-md-3 col-md-3 col-lg-3 ml-auto">
        <div class="row align-items-center">
          <label for="cari" class="col-sm-2 col-form-label">Cari</label>
          <div class="col-sm-10">
            <input type="email" class="form-control form-control-sm" id="cari">
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="table-responsive">
        <b-table :items="tableData" :fields="fields" :busy="isBusy" class="mb-0" id="tablelist" show-empty emptyText="Belum ada data">
          <template v-for="field in fields" :slot="field.key" slot-scope="data">
            <slot :name="field.key" v-bind="data">{{ data.item[field.key] }}</slot>
          </template>
          <div slot="empty" slot-scope="scope" class="text-center">{{ scope.emptyText }}</div>
          <div slot="table-busy" class="text-center">
            <b-spinner class="align-middle mx-2" small />
            <span>Memuat...</span>
          </div>
        </b-table>
      </div>
    </div>
    <div class="pagination-section">
      <div class="pagination-info">{{paginationInfo}}</div>
      <b-pagination class="pagination-md" v-model="currentPage" :total-rows="totalRow" :per-page="perPage" @input="onChangePage" :hide-goto-end-buttons="true" next-text="Selanjutnya" prev-text="Sebelumnya" />
    </div>
  </div>
</template>

<script>
import BTable from 'bootstrap-vue/es/components/table/table'
import BSpinner from 'bootstrap-vue/es/components/spinner/spinner'
import BPagination from 'bootstrap-vue/es/components/pagination/pagination'

export default {
  components: {
    BTable,
    BSpinner,
    BPagination
  },
  props: {
    fetch: {
      type: Function,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      tableData: [],
      isBusy: true,
      currentPage: 1,
      totalRow: 0,
      perPage: 10,
      offset: 0,
      numberOfElements: 0
    }
  },
  computed: {
    paginationInfo () {
      const paginationInfo = (this.totalRow > 0) ? `Menampilkan ${this.offset} sampai ${this.numberOfElements} dari ${this.totalRow} data` : 'Tidak ada data yang relevan'
      return paginationInfo
    }
  },
  methods: {
    onFetch: async function () {
      try {
        this.isBusy = true
        const res = await this.fetch(this.currentPage - 1, this.perPage)
        this.isBusy = false
        if (res) {
          this.tableData = res.content
          this.totalRow = res.totalElements
          this.offset = res.pageable.offset + 1
          this.numberOfElements = res.numberOfElements
        }
      } catch (e) {
        this.isBusy = false
        console.log(e)
      }
    },

    onChangePage: function (page) {
      this.currentPage = page
      this.onRefresh(this.currentPage)
    },

    onChangeSize: function () {
      this.onReload()
    },

    onRefresh: async function () {
      try {
        await this.onFetch()
      } catch (e) {
        console.log(e)
      }
    },

    onReload: async function () {
      try {
        this.currentPage = 1
        await this.onFetch()
      } catch (e) {
        console.log(e)
      }
    },

    onExport: function () {
      this.$parent.exportExcel(this.currentPage - 1, this.perPage)
    }
  },

  created () {
    this.onFetch()
  }
}
</script>

<style lang="scss">
.pagination-section {
  text-align: right;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;

  .pagination-info {
    display: inline;
    margin: 0 10px;
  }

  .pagination {
    display: inline-flex;
    margin-bottom: 0;
  }
}
</style>
