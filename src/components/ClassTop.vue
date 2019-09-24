<template>
  <div
    class="classTop"
    :style="{backgroundImage:`url(${imgAddress(classinfo.classImgSrc)})`}"
    :key="classinfo.classImgSrc"
  >
    <el-dialog :visible.sync="dialogVisible" :fullscreen="true">
      <span
        style="font-size: 200px;color: var(--main-color);position: absolute; top: 37%; left: calc(50% - 328px);"
      >{{classinfo.classCode}}</span>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
    <div>
      <span class="className">{{classinfo.className}}</span>
      <el-dropdown
        style="float:right;margin-top:10px;"
        trigger="click"
        v-if="user.role=='teacher'||user.role=='admin'"
      >
        <span class="el-dropdown-link" style="color: white;font-size: 18px;font-weight: bold;cursor:pointer;">
          菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogVisible=true">班级码</el-dropdown-item>
          <el-dropdown-item>编辑班级</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="classIntro">{{classinfo.classDesc}}</div>
    </div>
  </div>
</template>
<script>
import Address from "@/mixin/Address";
export default {
  data() {
    return {
      dialogVisible: false,
      user: this.$store.state.user
    };
  },
  props: {
    classinfo: {
      type: Object
    }
  },
  mixins: [Address]
};
</script>


<style lang="scss" scoped>
.classTop {
  height: 240px;
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  border-radius: 8px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color:rgb(224, 195, 131);
  .className {
    color: #fff;
    position: relative;
    top: 10px;
    left: 20px;
    font-size: 36px;
    font-weight: bold;
    line-height: 44px;
  }
  .classIntro {
    position: relative;
    top: 20px;
    left: 20px;
    font-size: 18px;
    line-height: 30px;
    color: #fff;
  }
}
</style>