<template>
  <form @submit.prevent="submit">

    <div class="alert alert-danger text-center" v-if="errMsg">
      {{ errMsg }}
    </div>

    <div class="form-group">
      <label for="aaf-isbn">Arbitrator's address:</label>
      <input type="text" class="form-control" v-model="formData.addr" id="aaf-isbn" placeholder="Enter address" required>
    </div>

    <button type="submit" class="btn btn-success mt-4">Submit</button>

    <loading :loading="loading"></loading>

  </form>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        addr: null,
      },
      loading: false,
      errMsg: null,
    }
  },
  methods: {
    submit() {
      this.errMsg = null
      this.loading = true
      this.$store.dispatch('addArbitrator', this.formData)
        .then(() => {
          this.$emit('success')
        })
        .catch(err => {
          this.errMsg = err
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
