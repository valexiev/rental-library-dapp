<template>
  <div class="container-fluid">

    <div class="row py-3">
      <div class="col-md-12">
        <h1 class="text-center">Books by ISBN</h1>
      </div>
    </div>

    <div class="row pb-3">
      <div class="col-md-12 d-flex">
        <b-button variant="success" to="/add-book">Add Book</b-button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <isbn-table :isbns="ISBNarr"></isbn-table>

        <loading :loading="loading"></loading>

      </div>
    </div>

  </div>
</template>


<script>
import IsbnTable from '@/components/ISBNTable'

export default {
  components: {
    IsbnTable,
  },
  created() {
    this.loadISBNs()
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ISBNarr() {
      return this.$store.getters.ISBNarr
    },
  },
  methods: {
    loadISBNs(page) {
      this.loading = true
      this.$store.dispatch('loadISBNs')
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
