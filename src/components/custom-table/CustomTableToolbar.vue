<template>
  <div class="custom-table-toolbar mb-2">
    <div class="row">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">Tampilkan</span>
          </div>
          <select class="custom-select" v-model="size" @change="doChangeSize">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
            <option :value="this.$parent.totalRows">Semua</option>
          </select>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" @click="doExport">Export Excel</button>
            <button class="btn btn-outline-secondary" type="button" @click="doRefresh">
              <i class="fa fa-refresh fa-fw"></i> Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      size: this.$parent.perPage
    }
  },
  methods: {
    doChangeSize: function () {
      this.$events.fire('change-size', this.size)
    },

    doRefresh: function () {
      this.$events.fire('refresh')
    },

    doExport: function () {
      this.$events.fire('export', this.size)
    }
  }
}
</script>
