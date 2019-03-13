<script>
import Vue from 'vue'
import VueEvents from 'vue-events'
import BTable from 'bootstrap-vue/es/components/table/table'
import BPagination from 'bootstrap-vue/es/components/pagination/pagination'
import CustomTableToolbar from '@/components/custom-table/CustomTableToolbar'

Vue.use(VueEvents)

export default {
  components: {
    BTable,
    BPagination,
    CustomTableToolbar
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    totalRows: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      required: true
    },
    fetch: {
      type: Function,
      required: true
    }
  },
  render (h) {
    return h(
      'div',
      [
        h('custom-table-toolbar'),
        h('div', { class: 'card' }, [
          h('div', { class: 'table-responsive' }, [ this.renderTable(h) ])
        ]),
        this.renderPagination(h),
        h('hr', { class: 'mt-1' })
      ]
    )
  },
  methods: {
    renderTable (h) {
      return h(
        'b-table',
        {
          ref: 'custom-table',
          class: 'mb-0',
          props: {
            items: this.items,
            fields: this.fields
          },
          scopedSlots: this.$vnode.data.scopedSlots
        }
      )
    },

    renderPagination (h) {
      const paginationInfo = (this.totalRows > 0) ? `Menampilkan ${this.offset + 1} sampai ${this.offset + this.perPage} dari ${this.totalRows} data` : 'Data tidak relevan'
      return h(
        'div',
        { class: 'mt-2 text-right' },
        [
          h('span', paginationInfo),
          h(
            'b-pagination',
            {
              style: { display: 'inline-flex', 'margin': '5px 0 10px 15px' },
              props: {
                totalRows: this.totalRows,
                perPage: this.perPage,
                value: this.page,
                prevText: 'Sebelumnya',
                nextText: 'Selanjutnya',
                hideGotoEndButtons: true
              },
              on: {
                'input': this.onChangePage
              }
            }
          )
        ]
      )
    },

    onChangePage: function (page) {
      this.$parent.page = page
      this.fetch()
    },

    onChangeSize: function (size) {
      this.$parent.size = size
      this.onChangePage(1)
    },

    onExport: function () {
      console.log(this.$parent)
    },

    onRefresh: function () {
      this.fetch()
    }
  },

  mounted () {
    this.$events.$on('change-size', eventData => this.onChangeSize(eventData))
    this.$events.$on('refresh', e => this.onRefresh())
  }
}
</script>
