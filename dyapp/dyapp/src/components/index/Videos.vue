<template>
  <div class="videos">
    <video-player  class="video-player vjs-default-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>
  </div>
</template>

<style>
  .videos {
    position: relative;
  }
  .videos .vjs-big-play-button {
    height: 50px;
    width: 50px;
    line-height: 50px;
    font-size: 24px;
    border-radius: 50%;
    position: absolute;
    /* top: 50%;
    left: 50%; */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    /* transform: translate(-50%,-50%); */
  }
</style>

<script>
import { videoPlayer } from 'vue-video-player';

export default {
  name: 'videos',
  props: ['videoList', 'idx'],
  data() {
    return {
      playerOptions: {
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto',
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: this.videoList.url, // 路径
            type: 'video/mp4' // 类型
          },
        ],
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: false,
      },
      playing: true,
    }
  },
  mounted() {
    this.playAuto()
  },
  methods: {
    playOrStop() {
      if (this.playing) {
        this.$refs.videoPlayer.player.pause()
        this.playing = false
      } else {
        this.$refs.videoPlayer.player.play()
        this.playing = true
      }
    },
    playAuto() {
      if (this.idx == 0) {
        this.playerOptions.autoplay = true
      }
    },
    play() {
      this.$refs.videoPlayer.player.load()
      this.$refs.videoPlayer.player.play()
      this.playing = true
    },
    stop() {
      this.$refs.videoPlayer.player.pause()
      this.playing = false
    }
  },
  components: {
    videoPlayer
  },
}
</script>
