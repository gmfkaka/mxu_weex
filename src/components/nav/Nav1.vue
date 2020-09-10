<template>
  <scroller class="wrapper"  scroll-direction="horizontal">
    <div class="nav-item" v-for="(bar,index) in navList" :ref="'navitem'+index"
    :key="index" @click="changeSlide(index)"
    >
      <text class="nav-text" :class="[index === slideIndex ?'active-text':'common-text']">{{bar}}</text>
    </div>
  </scroller>
</template>

<script>
const dom = weex.requireModule('dom')
export default {
  props: ['navList', 'slideIndex'],
  name: 'Nav1',
  components: {

  },
  data () {
    return {
    }
  },
  methods: {
    changeSlide (index) {
      this.$emit('changeSlide', index)
    },
    // 触发导航栏滚动
    scrollToEl (el, num) {
      const currentBarRef = this.$refs[el]
      dom.scrollToElement(currentBarRef, { offset: num })
    }
  },
  watch: {
    slideIndex (curVal, oldVal) {
      this.scrollToEl('navitem' + this.slideIndex, -327)
    }

  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">

.wrapper{
   width: 750px;
   height:64px;
   padding-left:32px;
   padding-right:32px;
}
.nav-item{
  margin-right:64px;
  justify-content: center;
  width: 96px;
}
.nav-text{
  text-align: center;
  color:#fff;
}
.active-text{
  font-size: 46px;
}
.common-text{
  font-size:32px;
  opacity: 0.8;
}
</style>
