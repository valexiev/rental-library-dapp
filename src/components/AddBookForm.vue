<template>
  <form @submit.prevent="submit">

    <div class="alert alert-danger text-center" v-if="errMsg">
      {{ errMsg }}
    </div>

    <div class="form-group">
      <label for="abf-isbn">ISBN:</label>
      <input type="text" class="form-control" v-model="formData.ISBN" id="abf-isbn" placeholder="Enter ISBN" required>
    </div>

    <div class="form-group">
      <label for="abf-ppd">Price per day:</label>
      <input type="text" class="form-control" v-model="formData.pricePerDay" id="abf-ppd" placeholder="Enter price per day" required>
    </div>

    <div class="form-group">
      <label for="abf-lend-days">Lend days:</label>
      <input type="text" class="form-control" v-model="formData.lendDays" id="abf-lend-days" placeholder="Enter lend days" required>
    </div>

    <div class="form-check mb-2">
      <input type="checkbox" class="form-check-input" id="abf-cover" v-model="formData.hasCovers">
      <label class="form-check-label" for="abf-cover">The book has covers.</label>
    </div>

    <div class="form-check mb-2">
      <input type="checkbox" class="form-check-input" id="abf-pages" v-model="formData.hasAllPages">
      <label class="form-check-label" for="abf-pages">The book has all pages.</label>
    </div>

    <div class="form-check mb-2">
      <input type="checkbox" class="form-check-input" id="abf-striked" v-model="formData.isStrikedThrough">
      <label class="form-check-label" for="abf-striked">The book is striked through.</label>
    </div>

    <div class="form-check mb-2">
      <input type="checkbox" class="form-check-input" id="abf-shabby" v-model="formData.isShabby">
      <label class="form-check-label" for="abf-shabby">The book is shabby.</label>
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
        ISBN: null,
        pricePerDay: null,
        lendDays: null,
        hasCovers: false,
        hasAllPages: false,
        isStrikedThrough: false,
        isShabby: false,
      },
      loading: false,
      errMsg: null,
    }
  },
  methods: {
    submit() {
      this.loading = true
      this.$store.dispatch('addBook', this.formData)
        .then(() => {
          this.$emit('success')
        })
        .catch(errRes => {
          this.errMsg = errRes.error
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
