<template>
  <div class="publish">
    <div class="pub-top">
      <div class="bac">
        <span @click="backindex">×</span>
      </div>
      <div><span><span class="iconfont icon-yinfu2"></span>选择音乐</span></div>
    </div>
    <div class="upload-box">
      <video ref="video" style="width:100%;height:450px;object-fit:fill" src=""></video>
      <div class="upload-bar">
        <div class="bar-item">
          <div class="icon"></div>
          <p>道具</p>
        </div>
        <!-- <div class="bar-item" @click="getCamera"> -->
        <div class="bar-item">
          <div class="pub-border">
            <div class="pub"></div>
          </div>
        </div>
        <div class="bar-item">
          <div class="icon"></div>
          <p>上传</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .publish {
    background-color: #cccccc;
    color: #fff;
  }
  .pub-top {
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    position: relative;
  }
  .pub-top .bac {
    position: absolute;
    left: 10px;
  }
  .pub-top .bac span {
    font-size: 28px;
  }
  .upload-box {
    background-color: #cccccc;
    height: 580px;
  }
  .upload-box .upload-bar {
    position: fixed;
    bottom: 0;
    display: flex;
    height: 100px;
    justify-content: space-between;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    background-color: #cccccc;
  }
  .upload-box .upload-bar .icon {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid red;
    margin-bottom: 5px;
  }
  .pub-border {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px solid #CB6074;
    box-shadow: -5px 0 5px #CB6074,5px 0 5px #CB6074,0 -5px 5px #CB6074,0 5px 5px #CB6074;
  }
  .pub-border .pub {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: #FE2C55;
  }
</style>

<script>
export default {
  name: 'publish',
  data() {
    return {
    }
  },
  methods: {
    // getCamera() {
    //   navigator.mediaDevices.getUserMedia({
    //     video: true
    //   }).then(success => {
    //     this.$refs['video'].srcObject = success
    //     this.$refs['video'].play()
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    backindex() {
      this.$router.push('/')
    }
  },
}
</script>
