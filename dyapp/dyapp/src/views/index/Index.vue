<template>
  <div class="index">
    <Topbar></Topbar>
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .index {
    widows: 100%;
    height: 100%;
    background-color: rgba(153, 150, 150, 0.4);
  }
</style>

<script>
import Topbar from '../../components/index/Topbar.vue'

export default {
  name: 'index',
  data() {
    return {
    }
  },
  components: {
    Topbar
  },
}
</script>
