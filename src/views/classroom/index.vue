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
        isHome: false,
        isClassroom: true,
        collapsed: false,
        cityId: 12,
        shortTilte: true
      }
    };
  },
  components: {
    NavBar
  }
};
</script>
<style lang="scss" scoped>
.classroom {
  width: 100%;
  min-height: 100%;
  background: url(../../assets/images/BG6.jpg);
  background-attachment: fixed;
  background-position: center;
}
</style>
