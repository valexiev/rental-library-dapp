<template>
  <div class="container-fluid">

    <div class="row py-3">
      <div class="col-md-12">
        <h1 class="text-center">Add Book</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-md-10 col-lg-8 col-xl-6 mx-auto pt-3">
        <div v-if="createMode">
          <add-book-form @success="toggleMode"></add-book-form>
        </div>

        <div v-else class="text-center">
          <h2>The book was added successfully.</h2>
          <button @click="toggleMode" class="btn btn-lg btn-success" type="button">Add book</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import AddBookForm from '@/components/AddBookForm'

export default {
  name: 'AddBookPage',
  components: {
    AddBookForm,
  },
  data() {
    return {
      createMode: true,
    }
  },
  methods: {
    toggleMode() {
      this.createMode = !this.createMode
    },
  },
}
</script>
