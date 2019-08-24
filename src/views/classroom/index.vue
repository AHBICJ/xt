<template>
  <div>
    <nav-bar :options="navbarOptions" />
    <router-view />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  data() {
    return {
        navbarOptions:{

        }
    };
  },
  components: {
    NavBar
  }
};
</script>
