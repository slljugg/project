<template>
  <div class="right-bar">
    <div class="rightbar-item">
      <div class="avatar-border" @click="showInfo($event)">
        <img src="../../static/img/home.jpg" alt="">
        <span class="iconfont icon-jia-tianchong"></span>
      </div>
    </div>
    <div class="item-icon">
      <span class="iconfont icon-aixin"></span>
      <p>18.0w</p>
    </div>
    <div class="item-icon" @click="showCom($event)">
      <span class="iconfont icon-pinglun"></span>
      <p>3.0w</p>
    </div>
    <div class="item-icon">
      <span class="iconfont icon-fenxiang"></span>
      <p>2.7w</p>
    </div>
    <div class="rightbar-item">
      <div class="avater-music">
        <img src="../../static/img/home.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<style>
  .right-bar {
    width: 70px;
    text-align: center;
    justify-items: center;
  }
  .right-bar .rightbar-item {
    height: 60px;
    width: 100%;
    display: flex;
    justify-items: center;
    text-align: center;
  }
  .right-bar img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    position: relative;
  }
  .icon-jia-tianchong {
    font-size: 20px;
    color: red;
    border-radius: 50%;
    position: absolute;
    top: 38px;
    left: 25px;
  }
  .right-bar .avatar-border {
    margin-left: 10px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 2px solid white
  }
  .right-bar .item-icon {
    height: 50px;
    text-align: center;
    margin-top: 8px;
  }
  .item-icon .iconfont {
    font-size: 28px;
    color: white;
  }
  .item-icon p {
    font-size: 12px;
    margin: 3px;
    color: white;
  }
  .right-bar .avater-music {
    height: 54px;
    width: 54px;
    background-color: rgb(0, 0, 0);
    border-radius: 50%;
    margin-top: 12px;
    position: relative;
    margin-left: 8px;
    animation: round 6s 0s linear infinite;
  }
  .avater-music img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  @keyframes round {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<script>
export default {
  props: ['showComment', 'showInfomes'],
  data() {
    return {
    }
  },
  methods: {
    showCom(e) {
      e.preventDefault()
      this.$emit('changeCom', this.showComment)
    },
    showInfo(e) {
      e.preventDefault()
      this.$emit('changeInfo', this.showInfomes)
    }
  },
}
</script>
