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
    <div class="item"></div>
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
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.right {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  // background-color: bisque;
  height: 80%;
  padding: 10% 0 10% 3%;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  .item {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
    background-size: cover;
    background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568179940&di=e9e452cf1f0cfe1fc708c0463e0b3f13&imgtype=jpg&er=1&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180116%2F3bf016cc43114677a3f93bbb95bc1dea.jpeg");
  }
  .item:hover{
     background-image:url("../assets/images/BCK1.png")
  }
  div {
    box-shadow: 0 6px 18px 0 rgba(25, 45, 155, 0.3);
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>

