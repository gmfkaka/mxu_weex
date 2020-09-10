<template>
  <div class="dynamic-list-top">
        <image v-if='data.best_answer==="0"' :src="getLocalImgUrl('ask_goldcoin.png')"  class="dynamic-goldcoin-img"></image>
        <text v-if='data.best_answer==="0"' class="glodnum">{{data.reward_points}}</text>
        <text v-if='data.best_answer==="0"' class="dynamic-list-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.title}}</text>
        <text v-if='data.best_answer==="1"' class="dynamic-list-title">{{data.title}}</text>
    </div>
</template>

<script>

export default {
  props: ['data'],
  name: 'Title1',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.dynamic-list-top{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 650px;
    lines:1;
    text-overflow:ellipsis;
}
.dynamic-goldcoin-img{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0;
    top: 6px;
}
.glodnum{
    font-size: 28px;
    color: #FBAC04;
    margin-left: 10px;
    margin-right: 10px;
    position: absolute;
    left: 25px;
    top: 4px;
}
.dynamic-list-title{
    width: 650px;
    font-size: 30px;
    color:#000000;
    // text-indent: 60px;
    lines:2;
    text-overflow:ellipsis;
}
</style>
