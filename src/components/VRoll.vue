<template>
  <div>
     <div class="marquee_box">
      <div class="marquee_con" ref="marqueeCon">
          <div class="marquee_list" v-for="(item, index) in advList" :key="index">
            <text class="marquee_text">{{item.title}}</text>
          </div>
      </div>
    </div>
  </div>

</template>

<script>
const animation = weex.requireModule('animation')

export default {
  props: ['advList'],
  data: function () {
    return {
      marqueeNum: 0,
      marqueeLens: 0,
      interval: ''
    }
  },
  mounted () {
    this.advList.push(this.advList[0])
    this.marqueeLens = this.advList.length
    this.interval = setInterval(this.showMarquee, 2000)
  },
  methods: {

    showMarquee: function () {
      let marqueeeEl = this.$refs.marqueeCon
      this.marqueeNum++
      animation.transition(marqueeeEl, {
        styles: {
          transform: 'translateY(' + (-this.marqueeNum * 26) + 'px) translateZ(0)'
        },
        duration: 500, // ms
        timingFunction: 'ease',
        delay: 0 // ms
      }, () => {
        if (this.marqueeNum >= this.marqueeLens - 1) {
          this.marqueeNum = 0
          animation.transition(marqueeeEl, {
            styles: {
              transform: 'translateY(' + 0 + 'px) translateZ(0)'
            }
          })
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
   /*跑马灯*/
.title_marquee{
    position: absolute;
    height: 26px;
    left:0;
    right: 0;
    top:0;
}
.marquee_bg{
    position:absolute;
    height: 26px;
    left:0;
    top:0;
    right:0;
}
.marquee_box {
    position:absolute;
    top:0;
    right:0;
    height: 26px;
    left:0;
    overflow: hidden;
}

.marquee_con {
    height: 26px;
    position: absolute;
    display: block;
    left: 0;
    right:0;
    top: 0;
}

.marquee_list{
    flex-direction: row;
    align-items: center;
    height: 26px;
}
.marquee_text{
    flex:1;
    color: #4F4F4F;
    font-size: 26px;
    lines:1;
    text-overflow: ellipsis;

}

</style>
