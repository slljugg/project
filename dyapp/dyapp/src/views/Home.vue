<template>
  <div class="home">
    <router-view></router-view>
    <Tabbar></Tabbar>
  </div>
</template>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
  }
</style>

<script>
import Tabbar from '../components/home/Tabbar.vue'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  components: {
    Tabbar
  },
};
</script>
