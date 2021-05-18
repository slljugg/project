<template>
  <div class="top-bar">
    <div class="left">
      <span class="iconfont icon-live"></span>
    </div>
    <div class="middle">
      <div class="item" @click="changeTop(0)">
        <span :class="showIdex==0? 'active':''">同城</span>
      </div>
      <div class="item" @click="changeTop(1)">
        <span :class="showIdex==1? 'active':''">关注</span>
      </div>
      <div class="item" @click="changeTop(2)">
        <span :class="showIdex==2? 'active':''">推荐</span>
      </div>
    </div>
    <div class="right">
      <span class="iconfont icon-sousuo"></span>
    </div>
  </div>
</template>

<style scoped>
  .top-bar {
    width: 100%;
    height: 60px;
    font-size: 18px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    background-color: rgba(153, 150, 150, 0.65);
    position: fixed;
    z-index: 999;
  }
  .left, .right {
    width: 20%;
  }
  .iconfont {
    font-size: 24px;
  }
  .middle {
    width: 60%;
    display: flex;
    justify-items: center;
    text-align: center;
  }
  .middle .item {
    cursor: pointer;
    flex: 1;
  }
  .middle .item span {
    padding-bottom: 10px;
  }
  .middle .item .active {
    border-bottom:3px solid white;
  }
  .right {
    text-align: right;
  }
</style>

<script>
export default {
  name: 'top-bar',
  data() {
    return {
      showIdex: 0,
    }
  },
  methods: {
    changeTop(idx) {
      this.showIdex = idx
    }
  },
}
</script>
