<template>
  <section>
    <div>
      <btn type="primary" @click="show=!show">Click me!</btn>
    </div>
    <br />
    <transition @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="collapse"   v-if="show" >Hi there.</div>
    </transition>
  </section>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    enter(el) {
      el.style.height = "auto";
      // noinspection JSSuspiciousNameCombination
      let endWidth = window.getComputedStyle(el).height;
      el.style.height = "0px";
      el.offsetHeight; // force repaint
      // noinspection JSSuspiciousNameCombination
      el.style.height = endWidth;
    },
    afterEnter(el) {
      el.style.height = null;
    },
    leave(el) {
      el.style.height = window.getComputedStyle(el).height;
      el.offsetHeight; // force repaint
      el.style.height = "0px";
    },
    afterLeave(el) {
      el.style.height = null;
    }
  }
};
</script>
<style lang="scss" scoped>
.collapse {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}
</style>