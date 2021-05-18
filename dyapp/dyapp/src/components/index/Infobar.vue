<template>
  <div class="info-bar">
    <div class="infobar-item"><span>@slljugg</span></div>
    <div class="infobar-item"><span>vue/cli实现抖音app界面</span></div>
    <div class="infobar-item music-item">
      <span class="iconfont icon-yinfu2"></span>
      <div class="music-name">
        <span data-text="slljugg创作原生代码">slljugg创作原生代码</span>
      </div>
    </div>
  </div>
</template>

<style>
  .info-bar {
    font-size: 16px;
    color: white;
  }
  .info-bar .infobar-item {
    padding: 5px 0;
  }
  .info-bar .iconfont {
    font-size: 14px;
    margin-right: 10px;
  }
  .info-bar .music-item {
    display: flex;
    text-align: center;
  }
  .music-item .music-name {
    width: 200px;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
  }
  .music-item .music-name span {
    display: inline-block;
    animation: scroll 5s linear infinite;
  }
  .music-item .music-name span::after {
    content: attr(data-text);
    margin-left: 60px;
  }
  @keyframes scroll{
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-50% - 30px));
    }
  }

</style>

<script>
export default {
}
</script>
