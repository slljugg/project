<template>
  <div class="tab-bar">
    <div class="item" @click="change(0)">
      <router-link to="/index" tag="span" :class="tableIdex==0?'active':''">首页</router-link>
    </div>
    <div class="item" @click="change(1)">
      <router-link to="/follow" tag="span" :class="tableIdex==1?'active':''">熟人</router-link>
    </div>
    <div class="item" @click="change(4)">
      <router-link to="/publish" tag="span" class="dec" :class="tableIdex==4?'active':''">
      +</router-link>
    </div>
    <div class="item" @click="change(2)">
      <router-link to="/msg" tag="span" :class="tableIdex==2?'active':''">消息</router-link>
    </div>
    <div class="item" @click="change(3)">
      <router-link to="/sign" tag="span" :class="tableIdex==3?'active':''">我</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-bar',
  data() {
    return {
      tableIdex: 0,
    }
  },
  methods: {
    change(idx) {
      this.tableIdex = idx
    }
  },
}
</script>

<style scoped>
  html, body {
    margin: 0;
  }
  .tab-bar {
    height: 50px;
    width: 100%;
    line-height: 50px;
    background-color: rgba(153, 150, 150, 0.65);
    position: fixed;
    justify-items: center;
    bottom: 0;
    left: 0;
    font-size: 16px;
    display: flex;
    z-index: 999;
  }
  .tab-bar .item {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
  .tab-bar .item .active {
    color: rgb(255, 0, 0);
  }
  .dec {
    width: 60px;
    display:inline-block;
    border-radius: 20px;
    line-height: 30px;
    background-color: #fff;
  }
</style>
