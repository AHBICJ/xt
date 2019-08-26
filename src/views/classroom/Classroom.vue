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
        <el-button type="warning" plain>
          <i class="el-icon-plus"></i>
          <span>加入班级</span>
        </el-button>
      </div>
    </div>
    <div class="classes">
      <card v-for="o in 6" :key="o" />
    </div>
    <div class="block">
      <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>

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
          font-family: "Courier New", Courier, monospace;
          font-weight: bold;
          color: var(--main-color);
        }
        .el-select__caret {
          color: var(--main-color);
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped >
.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 1120px;
  .classroomSearchandjoin {
    height: 40px;
    border-bottom: 1px solid var(--main-color);
    justify-content: space-between;
    margin-bottom: 10px;
    padding:0 16px;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    .classroomSearch {
      color: var(--main-color);

      span {
        font-family: "Courier New", Courier, monospace;
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

<script>
import Card from "@/components/ClassroomCard.vue";
export default {
  data() {
    return {
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
      value: "全部学年"
    };
  },
  components: {
    Card
  }
};
</script>