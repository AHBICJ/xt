<template>
  <div class="right">
    <div>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567585273507&di=15532efd0f67262b41cb25d89fea0519&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170326%2Fcefe4c71b75949cea5f967a52bcb9535_th.jpeg"
        alt
      />
    </div>
    <div>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567585306984&di=1519866ebba9b9c5b31e9bd624b485eb&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171015%2Fc318b1d44a5544938a7c1aeca12f075c.jpeg"
        alt
      />
    </div>
    <div>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567585306984&di=45f808639c8ec6e3245358122c8ce20d&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171004%2Fa515962ef4c04d08bdb3ff5a2c8b0e0c.jpeg"
        alt
      />
    </div>
    <div class="item">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
    <div>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567585306983&di=4e811bbcf66bde631067cb27675f8f91&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171201%2F722c71e1355a4444a6f71aca87cd3713.jpeg"
        alt
      />
    </div>
    <div>
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567585306983&di=41d43b4f98fa52d4503df1ebe8865109&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180608%2F4146cb180f8d49adb04466f00976b183.jpeg"
        alt
      />
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";

export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "20:16", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src:
              "//vdse.bdstatic.com//1adf55c54a87e99470dd0d4366f5d2b1?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//d6d22a3f90c97c7b29738a43374a3d1376c183186bdbd63febacfd823b772ec4", // 路径
            type: "video/mp4" // 类型
          },
          {
            src: "//path/to/video.webm",
            type: "video/webm"
          }
        ],
        poster:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569136329286&di=99da994dd7a0047971db4199540f9314&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180116%2F3bf016cc43114677a3f93bbb95bc1dea.jpeg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  methods: {},
  components: {
    videoPlayer
  }
};
</script>

<style>
.video-js .vjs-big-play-button {
  margin-left: 40%;
  margin-top: 35%;
  width: 100px;
}
</style>
<style lang="scss" scoped>
.right {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  // background-color: bisque;
  margin-top: 50px;
  height: 700px;
  padding: 0 0 0 3%;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  .item {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
    background-size: cover;

    // background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568179940&di=e9e452cf1f0cfe1fc708c0463e0b3f13&imgtype=jpg&er=1&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180116%2F3bf016cc43114677a3f93bbb95bc1dea.jpeg");
  }
  // .item:hover {
  //   background-image: url("../assets/images/BCK1.png");
  // }
  div {
    box-shadow: 0 6px 18px 0 rgba(25, 45, 155, 0.3);
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);
    img {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>

