<template>
  <div class="video-list">
    <swiper :options="swiperOption">
      <!-- 幻灯内容 -->
      <swiper-slide v-for="(item,idx) in dataList" :key="idx">
        <div>
          <Videos ref="videos" :videoList="item" :idx="idx"></Videos>
        </div>
        <div class="infobar_wrap">
          <InfoBar></InfoBar>
        </div>
        <div class="rightbar_wrap">
          <RightBar @changeCom="showComs" @changeInfo="showInfos"></RightBar>
        </div>
      </swiper-slide>
    </swiper>
    <transition name="up">
    <div class="comment-warp" v-if="showComment">
      <div class="comment-list">
        <div class="comment-top">
          <div class="number">15.0w评论</div>
          <div class="close" @click="close"><span>×</span></div>
        </div>
        <div class="comment-body">
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
          <div class="comment-box">
            <div class="comment-item">
              <div class="user-pic"><img src="../../static/img/home.jpg"></div>
              <div class="item-info">
                <div class="reply">
                  <p class="name">测试员</p>
                  <p class="reply-des">这是一段评论测试内容 <span class="time">00-00</span></p>
                </div>
                <div class="zan"><span class="iconfont icon-aixin"></span><p>250</p></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 评论框 -->
        <div class="reply-input">
          <input type="text" name="" id="" placeholder="留下你的精彩评论">
          <span class="at1">@</span>
          <span class="iconfont icon-pinglun"></span>
        </div>
      </div>
    </div>
    </transition>
    <div class="showinfo" v-if="showInfomes">
      <Info @backInfo="backInfos"></Info>
    </div>
  </div>
</template>

<style>
  .showinfo {
    background-color: #fff;
    z-index: 9999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }
  .video-list {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .infobar_wrap {
    position: absolute;
    bottom: 70px;
    left: 5px;
  }
  .rightbar_wrap {
    position: absolute;
    bottom: 80px;
    right: 0px;
  }
  .up-enter-active, .up-leave-active {
    transition: all .5s;
  }
  .up-enter, .up-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 1;
    transform: translateY(100%);
  }
  .item-info .icon-aixin {
    color: #cccccc;
    margin-right: 11px;
  }
  .comment-warp{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    height:500px;
    width: 100%;
    background:white ;
    border-top-left-radius:10px;
    border-top-right-radius: 10px;
    z-index:9999;
    padding:10px 10px;
    box-sizing: border-box;
  }
  .comment-top{
    display: flex;
    align-items: center;
  }
  .number{
    flex-grow: 1;
    text-align: center;
  }
  .close{
    padding-right:10px;
    font-size: 30px;
    color:#666;
  }
  .comment-warp .comment-body{
    max-width: 450px;
    height: 480px;
    overflow: scroll;
    margin-top: 20px;
  }
  .comment-item{
    display: flex;
  }
  .user-pic img{
    height:33px;
    width:33px;
    border-radius: 50%;

  }
  .item-info{
    margin-left: 10px;
    display: flex;
    flex:1 1 auto;
  }
  .reply{width:90%;}
  .reply-des{line-height: 24px;}
  .reply .name{
    color:#666;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .reply .time{
    color:#666;
  }
  .zan{text-align: center;}
  .zan .iconfont{
    font-size:20px;
  }
  .zan p{
    color:#cccccc;
    margin-top: 5px;
  }

  .reply-input{
    width:100%;
    height:50px;
    position: fixed;
    bottom: 0;
    left:0;
    right:0;
    background: #ffffff;
    display: flex;
    align-items: center;
  }
  .reply-input input{
    line-height: 40px;
    width: 70%;
    border: none;
    padding:0 10px;
  }
  .reply-input .at1{
    font-size: 30px;
    color: #cccccc;
    margin-right: 8%;
  }
  .reply-input .iconfont{
    font-size: 25px;
    color: #cccccc;
    margin-right: 18px;
  }
</style>

<script>
// 导入组件
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import Videos from './Videos.vue';
import InfoBar from './Infobar.vue';
import RightBar from './Rightbar.vue';
import Info from './Info.vue';

export default {
  name: 'videoList',
  data() {
    return {
      showComment: false,
      showInfomes: false,
      page: 1,
      swiperOption: {
        direction: 'vertical',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true, // 自动高度。设置为true时,wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1,
        mousewheel: true,
        mousewheelControl: true,
        height: window.innerHeight, // 高度设置，占满设备高度
        resistanceRatio: 0,
        observeParents: true,
        on: {
          tap: () => {
            // console.log(1111)
            this.playAction(this.page - 1)
          },
          slideNextTransitionStart: () => {
            this.page += 1
            this.nextVideo(this.page - 1)
          },
          slidePrevTransitionEnd: () => {
            if (this.page > 1) {
              this.page -= 1
              this.prevVideo(this.page - 1)
            }
          },
        }
      },
      dataList: [
        {
          id: "1",
          url: "http://video.jishiyoo.com/3720932b9b474f51a4cf79f245325118/913d4790b8f046bfa1c9a966cd75099f-8ef4af9b34003bd0bc0261cda372521f-ld.mp4"
        },
        {
          id: "2",
          url: "http://video.jishiyoo.com/1eedc49bba7b4eaebe000e3721149807/d5ab221b92c74af8976bd3c1473bfbe2-4518fe288016ee98c8783733da0e2da4-ld.mp4"
        },
        {
          id: "3",
          url: "http://video.jishiyoo.com/549ed372c9d14b029bfb0512ba879055/8e2dc540573d496cb0942273c4a4c78c-15844fe70971f715c01d57c0c6595f45-ld.mp4"
        },
        {
          id: "4",
          url: "http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4"
        }
      ],
    }
  },
  methods: {
    playAction(idx) {
      this.$refs.videos[idx].playOrStop()
    },
    nextVideo(idx) {
      this.$refs.videos[idx - 1].stop()
      this.$refs.videos[idx].play()
    },
    prevVideo(idx) {
      this.$refs.videos[idx + 1].stop()
      this.$refs.videos[idx].play()
    },
    showComs() {
      this.showComment = true
    },
    close() {
      this.showComment = false
    },
    showInfos() {
      this.showInfomes = true
    },
    backInfos() {
      this.showInfomes = false
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Videos,
    InfoBar,
    RightBar,
    Info,
  },
  direction: {
    swiper: directive,
  },
}
</script>
