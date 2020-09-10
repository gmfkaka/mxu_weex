<template>
     <div class="adv-box">
        <image class="adv-img" :src="getLocalImgUrl('pic_notice3x.png')"></image>
        <div class="adv-scroll" >
            <v-roll :adv-list="data"></v-roll>
        </div>
    </div>

</template>

<script>
import VRoll from './VRoll'
export default {
  name: 'RollAnnounce',
  props: ['advList'],
  components: {
    VRoll

  },
  data () {
    return {
      data: []

    }
  },
  methods: {

  },
  created () {
    this.data = this.advList
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.adv-box{
    padding:24px 32px;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    height:112px;
}
.adv-img{
    width: 64px;
    height:64px;
    margin-right:34px;
}
.adv-scroll{
    position: relative;
    height:26px;
    flex:1;
    overflow: hidden;
}

</style>
