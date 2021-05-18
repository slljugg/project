<template>
  <div class="follow">
    <div class="follow-wrap">
      <div class="follow-top">
        <span class="inc">+</span>
        <div class="find-wrap">
          <span class="iconfont icon-sousuo"></span>
          <span class="find">找朋友</span>
        </div>
      </div>
      <div class="follow-buttom">
        <div class="follow-more">
          <div class="more-item1"><span>暂无朋友动态</span></div>
          <div class="more-item2"><span>快去寻找更多可能认识的人吧</span></div>
        </div>
        <div class="follow-show">
          <div class="show-item"><span>你可能认识的人</span></div>
          <div class="msg-list-box">
            <div class="msg-list">
              <img src="../../static/img/home.jpg">
              <div class="user-des">
                <div class="top">
                  <span>抖音小助手</span>
                  <span>11:00</span>
                </div>
                <div class="top top-msg">
                  <span>欢迎来到抖音</span>
                  <span class="no-see"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="msg-list-box">
            <div class="msg-list">
              <img src="../../static/img/code.jpg">
              <div class="user-des">
                <div class="top">
                  <span>抖音小助手</span>
                  <span>13:00</span>
                </div>
                <div class="top top-msg">
                  <span>欢迎来到抖音</span>
                  <span class="no-see"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="msg-list-box">
            <div class="msg-list">
              <img src="../../static/img/messi.jpg">
              <div class="user-des">
                <div class="top">
                  <span>抖音小助手</span>
                  <span>14:00</span>
                </div>
                <div class="top top-msg">
                  <span>欢迎来到抖音</span>
                  <span class="no-see"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="msg-list-box">
            <div class="msg-list">
              <img src="../../static/img/home.jpg">
              <div class="user-des">
                <div class="top">
                  <span>抖音小助手</span>
                  <span>13:00</span>
                </div>
                <div class="top top-msg">
                  <span>欢迎来到抖音</span>
                  <span class="no-see"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="msg-list-box">
            <div class="msg-list">
              <img src="../../static/img/home.jpg">
              <div class="user-des">
                <div class="top">
                  <span>抖音小助手</span>
                  <span>13:00</span>
                </div>
                <div class="top top-msg">
                  <span>欢迎来到抖音</span>
                  <span class="no-see"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="msg-list-box">
            <div class="msg-list">
              <img src="../../static/img/home.jpg">
              <div class="user-des">
                <div class="top">
                  <span>抖音小助手</span>
                  <span>13:00</span>
                </div>
                <div class="top top-msg">
                  <span>欢迎来到抖音</span>
                  <span class="no-see"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .follow {
    width: 100%;
    height: 100%;
    background-color: #101821;
  }
  .follow .follow-wrap {
    width: 100%;
    height: 100%;
    color: #ffffff;
    position: relative;
  }
  .follow-top {
    width: 100%;
    height: 80px;
    display: flex;
  }
  .follow-top .inc {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    border: 2px solid white;
    margin-top: 20px;
    margin-left: 15px;
    margin-right: 15px;
  }
  .find-wrap {
    width: 261px;
    height: 40px;
    background-color: rgb(165, 162, 162);
    margin-top: 18px;
    border-radius: 5px;
    margin-right: 15px;
    text-align: left;
    display: flex;
  }
  .find-wrap .iconfont {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    text-align: center;
  }
  .find-wrap .find {
    margin-left: 5px;
    color: white;
    line-height: 40px;
  }
  .follow-buttom {
    width: 100%;
    height: 497px;
    overflow: auto;
    position: relative;
  }
  .follow-more {
    width: 100%;
    height: 150px;
    border-bottom: 1px solid rgba(253, 253, 253, 0.644);
  }
  .more-item1 {
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  .more-item1 span {
    line-height: 40px;
    font-size: 20px;
  }
  .more-item2 {
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  .more-item2 span {
    line-height: 30px;
    font-size: 12px;
    color: rgb(155, 154, 154);
  }
  .show-item {
    font-size: 14px;
    color: rgb(155, 154, 154);
    margin-top: 20px;
    margin-left: 15px;
  }
  .follow-show .msg-nav-item{
    text-align: center;
    width:60px;
  }
  .follow-show .icon-box{
    height:60px;
    width:60px;
    background-color:#ff4074;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .follow-show .msg-list-box{
    padding: 0 15px;
  }
  .follow-show .msg-list{
    display: flex;
    padding:10px 0;
    /* justify-content: space-between; */
  }
  .follow-show .msg-list img {
    width:50px;
    height:50px;
    border-radius: 50%;
  }
  .follow-show .user-des{
    flex: 1;
    height:60px;
  }
  .follow-show .user-des .top{
    font-size: 14px;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    line-height: 25px;
  }
  .follow-show .top-msg{
    color: #666;
    align-items: center;
  }
  .follow-show .no-see{
    width:8px;
    height: 8px;
    border-radius: 50%;
    background-color:#face15 ;
  }
</style>
