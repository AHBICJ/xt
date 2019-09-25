<template>
  <div class="content">
    <div class="classroomSearchandjoin">
      <div class="classroomSearch">
        <el-select v-model="value" placeholder="请选择学年">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="classroomJoin">
        <!-- 创建班级dialog -->
        <el-dialog
          title="创建班级"
          :visible.sync="dialogCreate"
          v-if="user.role=='admin'||user.role=='teacher'"
        >
          <div class="create">
            <el-form ref="form" :model="form" label-width="100px" class="myform">
              <el-form-item label="班级名字">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="班级介绍">
                <el-input type="textarea" v-model="form.intro"></el-input>
              </el-form-item>
              <div class="myrow">
                <el-upload
                  class="upload-demo"
                  :action="uploadAddr"
                  multiple
                  :limit="3"
                  :on-success="getimg"
                  list-type="picture"
                >
                  <el-form-item label="班级图片">
                    <el-button size="small" type="primary" class="mybutton ml35">
                      <i class="el-icon-plus"></i>
                    </el-button>
                  </el-form-item>
                </el-upload>
              </div>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogCreate = false">取 消</el-button>
            <el-button type="primary" @click.native="submit_classroom">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 加入班级dialog -->
        <el-dialog title="加入班级" :visible.sync="dialogJoin" v-else>
          <el-form ref="form" :model="form" label-width="100px" class="myform">
            <el-form-item label="班级码">
              <el-input v-model="form.ma"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogJoin = false">取 消</el-button>
            <el-button type="primary" @click.native="join_classroom">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 创建班级按钮 -->
        <el-button
          type="warning"
          plain
          @click="dialogCreate = true"
          v-if="user.role=='admin'||user.role=='teacher'"
        >
          <i class="el-icon-plus"></i>
          <span>创建班级</span>
        </el-button>
        <!-- 加入班级按钮 -->
        <el-button type="warning" plain @click="dialogJoin = true" v-else>
          <i class="el-icon-plus"></i>
          <span>加入班级</span>
        </el-button>
      </div>
    </div>
    <!-- 班级卡片 -->
    <div class="classes">
      <card v-for="c in classes" :key="c.id" :classrooms="c" />
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="12" :sm="8" :lg="6">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="page"
            :page-size="pagenum"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Card from "@/components/ClassroomCard.vue";
import { getClassroomList } from "@/api/toGet";
import { create_classroom, JoinClassRoom } from "@/api/toPost.js";
export default {
  data() {
    return {
      user: this.$store.state.user,
      options: [
        {
          value: "选项1",
          label: "全部学年"
        },
        {
          value: "选项2",
          label: "2019-2020学年"
        },
        {
          value: "选项3",
          label: "2018-2019学年"
        },
        {
          value: "选项4",
          label: "2017-2018学年"
        }
      ],
      value: "全部学年",
      classrooms: [],
      page: 1,
      pagenum: 8,
      totalPage: 1,
      dialogJoin: false,
      dialogCreate: false,
      form: {
        ma: "",
        title: "",
        intro: "",
        picimg: ""
      }
    };
  },
  methods: {
    getClassrooms() {
      let prams = {
        page: this.page,
        pagenum: this.pagenum
      };
      getClassroomList(prams).then(res => {
        res.data.myclass.reverse();
        this.classrooms = [...res.data.myclass, ...res.data.other];
        // this.totalPage = res.totalpage;
      });
    },
    getimg(response) {
      this.form.picimg = response.data[0];
    },
    submit_classroom() {
      let datas = {
        room_name: this.form.title,
        description: this.form.intro,
        photo: this.form.picimg
      };
      create_classroom(datas)
        .then(res => {
          this.classrooms.unshift(res.data);
          this.form.title = "";
          this.form.intro = "";
          this.form.picimg = "";
        })
        .catch(() => {});
      this.dialogCreate = false;
    },
    join_classroom() {
      let datas = {
        room_code: this.form.ma
      };
      JoinClassRoom(datas)
        .then(res => {
          if (res.code == 200) {
            this.$message({
              message: "加入成功",
              type: "success"
            });

            this.classrooms.unshift(res.data);
          }
          this.form.ma = "";
          this.dialogJoin = false;
        })
        .catch(error => {
          this.$message({
            message: error,
            type: "error"
          });
        });
      this.dialogJoin = false;
      this.form.ma = "";
    }
  },
  created() {
    this.getClassrooms();
  },
  computed: {
    total() {
      return this.classrooms.length;
    },
    uploadAddr() {
      return process.env.VUE_APP_API + "/upload";
    },
    classes() {
      return this.classrooms.slice(
        (this.page - 1) * this.pagenum,
        this.page * this.pagenum
      );
    }
  },
  components: {
    Card
  }
};
</script>

<style lang="scss">
.content {
  .classroomSearchandjoin {
    .classroomSearch {
      .el-select {
        width: 180px;
        .el-input__inner {
          border: none;
          padding: 0;
          font-size: 20px;
          color: var(--main-color);
        }
        .el-select__caret {
          color: var(--main-color);
        }
      }
    }
    //dialog
    .classroomJoin {
      .el-dialog {
        width: 500px;
      }
      .el-dialog__body {
        padding: 10px 20px 0 20px;
      }
      .el-input {
        width: 300px;
      }
      .el-dialog__title {
        line-height: 24px;
        font-size: 20px;
        // font-family: "Courier New", Courier, monospace;
        font-weight: bold;
        border-left: 6px solid var(--main-color);
        color: var(--main-color);
        padding-left: 10px;
      }
      .el-dialog__headerbtn .el-dialog__close {
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
}
</style>
<style lang="scss">
</style>
<style lang="scss" scoped >
.el-pagination {
  margin: 30px 0 30px;
  text-align: center;
}
.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  .classroomSearchandjoin {
    height: 40px;
    border-bottom: 1px solid var(--main-color);
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 0 16px;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    .classroomSearch {
      color: var(--main-color);

      span {
        // font-family: "Courier New", Courier, monospace;
        font-size: 22px;
        font-weight: bold;
        line-height: 40px;
        margin-right: 5px;
      }
    }
    .classroomJoin {
      float: right;
      color: var(--main-color);
      .el-button {
        padding: 10px 16px;
      }
    }
    .create {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
      p {
        margin-left: 32px;
        span {
          color: var(--main-color);
          margin-left: 10px;
        }
      }
      .myform {
        margin-top: 25px;
      }
      .myrow {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        .mybutton {
          width: 45px;
          height: 30px;
          margin-right: 20px;
        }
        // .ml35 {
        //   margin-left: 35px;
        // }
      }
    }
  }
  .classes {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 280px);
    justify-items: center;
  }
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
</style>

