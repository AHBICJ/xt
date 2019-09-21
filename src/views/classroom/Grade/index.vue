<template>
  <grade-stu v-if="user.role=='student'" />
  <grade-tea v-else/>
</template>
<script>
import GradeStu from "@/views/classroom/Grade/GradeStu.vue";
import GradeTea from "@/views/classroom/Grade/GradeTea.vue";
export default {
  data(){
    return {
      user:this.$store.state.user
    }
  },
  components:{
    GradeStu,GradeTea
  }
}
</script>