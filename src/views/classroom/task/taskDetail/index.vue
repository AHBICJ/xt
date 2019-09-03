<template>
<student v-if="user.role=='student'"/>
<!-- <teacher/> -->
<teacher v-else/>
</template>
<script>
import Teacher from "@/views/classroom/task/taskDetail/Teacher.vue"
import Student from "@/views/classroom/task/taskDetail/Student.vue"
export default {
    data(){
        return{
            user: this.$store.state.user,
        }
    },
    components:{
        Teacher,
        Student
    }
}
</script>