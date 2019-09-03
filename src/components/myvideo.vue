<template>
  <div class="right">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div class="item" id="mse"></div>
    <div>5</div>
    <div>6</div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      
    }
  },
  methods: {},
  mounted()
  
};
</script>

<style lang="scss" scoped>
.right {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  // background-color: bisque;
  height: 80%;
  padding: 10% 17% 10% 3%;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  .item {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
  }
  div {
    box-shadow: 0 6px 18px 0 rgba(25, 45, 155, 0.3);
  }
}
</style>

