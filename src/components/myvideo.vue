<template>
  <div class="myvideo">
    <div>
      <router-link :to="'/article/775 '">
        <img
          src="images/threephoto/ppt001.jpg"
          alt
        />
      </router-link>
    </div>
    <div>
      <router-link :to="'/article/775 '">
        <img
          src="images/threephoto/ppt004.jpg"
          alt
        />
      </router-link>
    </div>
    <div>
      <img
        src="images/threephoto/ppt005.jpg"
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
        src="images/threephoto/ppt003.jpg"
        alt
      />
    </div>
    <div>
      <img
        src="images/threephoto/ppt002.jpg"
        alt
      />
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "@/styles/custom-theme.css";
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
        // aspectRatio: "20:16", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src:
              "//vdse.bdstatic.com//1adf55c54a87e99470dd0d4366f5d2b1?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//d6d22a3f90c97c7b29738a43374a3d1376c183186bdbd63febacfd823b772ec4", // 路径
            type: "video/mp4" // 类型
          },
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


<style lang="scss" scoped>
.myvideo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 800px;
  height: 450px;
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
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.5);
    img {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>

