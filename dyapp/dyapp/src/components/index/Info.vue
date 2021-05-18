<template>
  <div class="info">
    <div class="info-top">
      <div class="menu-box">
        <span class="back" @click="back($event)">←</span>
        <span class="more" @click="showmore">...</span>
      </div>
    </div>
    <div class="me-wrap">
      <div class="me-content">
        <div class="infomsg">
          <img src="../../static/img/home.jpg">
          <button class="btn">+关注</button>
          <span>+</span>
        </div>
        <div class="des">
          <h2>slljugg</h2>
          <span>抖音号：994192111</span>
          <p>浙江杭州</p>
        </div>
        <div class="user-tag">
          <span><a href="#">20w</a>获赞</span>
          <span><a href="#">30w</a>关注</span>
          <span><a href="#">4w</a>粉丝</span>
        </div>
      </div>
      <div class="me-tab">
        <div class="me-navbar">
          <div class="item" @click="changeTab(0)" :class="indexTab==0?'active':''">作品9</div>
          <div class="item" @click="changeTab(1)" :class="indexTab==1?'active':''">喜欢0</div>
        </div>
        <div class="tab-wrap">

          <div class="tab-con" v-show="indexTab==0">
            <div class="tab-img">
              <img src="../../static/img/home.jpg" alt="">
              <img src="../../static/img/home.jpg" alt="">
              <img src="../../static/img/home.jpg" alt="">
              <img src="../../static/img/home.jpg" alt="">
              <img src="../../static/img/home.jpg" alt="">
              <img src="../../static/img/home.jpg" alt="">
              <img src="../../static/img/home.jpg" alt="">
              <img src="../../static/img/home.jpg" alt="">
              <img src="../../static/img/home.jpg" alt="">
            </div>
          </div>
          <div class="tab-con" v-show="indexTab==1"></div>
        </div>
      </div>
    </div>
    <transition name="up">
    <div class="mask" v-if="showMask">
      <div class="oauth">
        <ul>
          <li class="oauth-item special">slljugg</li>
          <li class="oauth-item">分享</li>
          <li class="oauth-item">发私信</li>
          <li class="oauth-item">不让TA看</li>
          <li class="oauth-item" style="color:red;">举报</li>
          <li class="oauth-item" style="color:red;">拉黑</li>
          <li @click="close" class="oauth-item">取消</li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['showInfomes'],
  data() {
    return {
      showMask: false,
      indexTab: 0,
    }
  },
  methods: {
    changeTab(index) {
      this.indexTab = index;
    },
    back(e) {
      e.preventDefault()
      this.$emit('backInfo', this.showInfomes)
    },
    showmore() {
      this.showMask = true
    },
    close() {
      this.showMask = false
    }
  }
}
</script>

<style>
  .info{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .info .menu-box {
    width: 100%;
    display: flex;
  }
  .info-top{
    height: 130px;
    width: 100%;
    background-color: rgb(105, 104, 104);
  }
  .info-top .back {
    flex: 1;
    color: #fff;
    font-size: 25px;
    margin-top: 20px;
    margin-left: 30px;
  }
  .info-top .menu-box .more {
    /* flex: 1; */
    color: #fff;
    font-size: 35px;
    margin-top: 0px;
    margin-right: 30px;
  }
  .me-wrap{
    position: absolute;
    top:130px;
    width:100%;
    background-color: #101821;
    color:#ffffff;
  }
  .me-content{
    position: relative;
    padding:0 15px;
  }
  .infomsg{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding-bottom:20px ; */
  }
  .infomsg img{
    margin-top: -20px;
    height:90px;
    width:90px;
    border-radius: 50%;
  }
  .infomsg button{
    width: 160px;
    height:40px;
    border-radius: 5px;
    background-color: #f80713;
    font-size: 16px;
    border:none;
    color:white;
  }
  .infomsg span {
    width: 40px;
    background-color: rgb(172, 171, 171);
    line-height: 40px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
  }
  .des h2{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #fff;
  }
  .des span{
    font-size: 14px;
  }
  .des p {
    margin-top: 30px;
    font-size: 14px;
  }
  .user-tag span{
    font-size: 16px;
    color: #cccccc;
    margin-right: 5px;
    padding:5px 8px;
  }
  .user-tag a{
    margin-right: 5px;
    color: #cccccc;
    text-decoration: none;
  }
  .me-tab{
    margin-top: 30px;
    height:300px;
  }
  .me-navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .me-navbar .item{
    flex: 1;
    padding:10px 25px;
    color:#cccccc;
    text-align: center;
  }
  .me-navbar .active{
    border-bottom:2px solid #ffdf0e;
    color:white;
  }

  .tab-img img{
    width:33.3%;
    height:130px;
  }
  .info .oauth-item{
    border-bottom: 1px solid #f0eeee;
    line-height: 50px;
    list-style: none;
    margin-right: 40px;
  }
  .info .oauth {
    height: 62%;
  }
  .info .special {
    line-height: 62px;
    font-size: 28px;
  }
</style>
