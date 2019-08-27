<template>
  <div class="classroom">
    <nav-bar :options="navbarOptions" />
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  data() {
    return {
      navbarOptions: {
        isclassrom: true,
        ishome: false
      }
    };
  },
  components: {
    NavBar
  }
};
</script>
<style lang="scss" scoped>
  .classroom{
    width: 100%;
    min-height: 100%;
    background: url(../../assets/images/BG6.jpg);
    background-attachment: fixed;
  }
</style>
