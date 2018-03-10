<template>
  <div v-if="loading" class="loading">
    <img src="/static/images/loading.gif">
  </div>
</template>


<script>
export default {
  props: ['loading'],
}
</script>


<style lang="scss">
.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(255, 255, 255, 0.8);

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
}
</style>
