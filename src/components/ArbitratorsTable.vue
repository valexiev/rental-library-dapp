<template>
  <div class="table-responsive">

    <div class="alert alert-danger text-center" v-if="errMsg">
      {{ errMsg }}
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Arbitrator</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="arbitrator in arbitrators">
          <td>{{ arbitrator }}</td>
          <td>
            <button type="button" class="btn btn-danger btn-sm" @click="remove(arbitrator)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <loading :loading="loading"></loading>

  </div>
</template>


<script>
export default {
  props: ['arbitrators'],
  data() {
    return {
      loading: false,
      errMsg: null,
    }
  },
  methods: {
    remove(arbitrator) {
      if (confirm('Are you sure you want to remove arbitrator ' + arbitrator + '?')) {
        this.$store.dispatch('removeArbitrator', arbitrator)
          .then(() => {
            this.$emit('success')
          })
          .catch(err => {
            this.errMsg = err
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>
