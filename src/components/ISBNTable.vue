<template>
  <div class="table-responsive">

    <div class="alert alert-danger text-center" v-if="errMsg">
      {{ errMsg }}
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ISBN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="isbn in isbns">
          <td>{{ isbn }}</td>
        </tr>
      </tbody>
    </table>

    <loading :loading="loading"></loading>

  </div>
</template>


<script>
export default {
  props: ['isbns'],
  data() {
    return {
      loading: false,
      errMsg: null,
    }
  },
}
</script>
