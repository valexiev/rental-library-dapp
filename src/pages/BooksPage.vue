<template>
  <div class="container-fluid">

    <div class="row py-3">
      <div class="col-md-12">
        <h1 class="text-center">Arbitrators</h1>
      </div>
    </div>

    <div class="row pb-3">
      <div class="col-md-12 d-flex">
        <b-button variant="success" to="/add-arbitrator">Add Arbitrators</b-button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <arbitrators-table :arbitrators="arbitrators"></arbitrators-table>

        <loading :loading="loading"></loading>

      </div>
    </div>

  </div>
</template>


<script>
import ArbitratorsTable from '@/components/ArbitratorsTable'

export default {
  components: {
    ArbitratorsTable,
  },
  created() {
    this.loadArbitrators()
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    arbitrators() {
      return this.$store.getters.arbitrators
    },
  },
  methods: {
    loadArbitrators(page) {
      this.loading = true
      this.$store.dispatch('loadArbitrators')
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
