<template>
     <div class="wrapper flex1 w100" :class="[this.isIphoneX() ? 'x-top':'']">
         <image class="bg-img pos-full w100" :src="getLocalImgUrl('pay_rank_bg.png')"></image>
         <image class="back-icon" :class="[this.isIphoneX() ? 'x-back':'']" :src="getLocalImgUrl('pay_back2.png')" @click="goBack"></image>
         <div class="nav-box flex-row">
             <text class="nav-item fz32 cl-fff text-center pingfang border1" :class="[navSelected === index ? 'nav-active':'']" v-for="(item,index) in navList" :key="index" @click="changeNav(index)">{{item}}</text>
         </div>
         <div class="main">
            <div class="info-box flex-row-between">
                <div class="info-bottom"></div>
                <image class="info-bg pos-full" :src="getLocalImgUrl('pay_shadow.png')"></image>
                <div class="info-item flex-align">
                    <text class="info-title fz40 cl-333">4</text>
                    <text class="info-subtitle fz26">我的排名</text>
                </div>
                <div class="avatar-box flex1 flex-align">
                    <image class="avatar border3" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg"></image>
                </div>
                <div class="info-item">
                    <text class="info-title">{{income}}</text>
                    <text class="info-subtitle pingfang">我的收入</text>
                </div>
            </div>
            <scroller class="main-list bg-fff" show-scrollbar="false">
                <div class="list-item flex-row flex-align" :class="[index > 0 ? 'mt48' : '']" v-for="(item,index) in list" :key="index">
                    <image v-if="index === 0" class="rank-icon" :src="getLocalImgUrl('pay_rank1.png')"></image>
                    <image v-if="index === 1" class="rank-icon" :src="getLocalImgUrl('pay_rank2.png')"></image>
                    <image v-if="index === 2" class="rank-icon" :src="getLocalImgUrl('pay_rank3.png')"></image>
                    <text v-if="index > 2" class="rank-text fz32 text-center">{{index+1}}</text>
                    <image class="rank-avatar" :src="item.avatar"></image>
                    <text class="rank-title fz28 flex1 line1 pingfang">{{item.title}}</text>
                    <text class="rank-money fz32">{{item.money}}</text>
                    <image class="award-icon" :src="getLocalImgUrl('pay_rank_icon.png')"></image>
                </div>
            </scroller>
         </div>
    </div>
</template>

<script>
// import { nativeUtil } from '../../lib/nativeUtils'
export default {
  name: 'rankList',
  data () {
    return {
      navList: ['周榜', '总榜'],
      navSelected: 0,
      income: 13020,
      list: [
        {title: '周佳敏', money: '33210', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'},
        {title: '周佳敏', money: '332', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'},
        {title: '周佳敏', money: '33210', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'},
        {title: '周佳敏', money: '33210', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'},
        {title: '周佳敏', money: '33210', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'},
        {title: '周佳敏', money: '33210', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'},
        {title: '周佳敏', money: '33210', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'},
        {title: '周佳敏', money: '33210', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'},
        {title: '周佳敏', money: '33210', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009840232,3610865157&fm=26&gp=0.jpg'}
      ]
    }
  },
  methods: {
    changeNav (index) {
      this.navSelected = index
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
.wrapper{
    position: relative;
    padding-top: 60px;
}
.x-top{
    padding-top: 90px;
}
.back-icon{
    width: 44px;
    height: 44px;
    position: absolute;
    top: 62px;
    left: 24px;
}
.x-back{
    top: 92px;
}
.nav-box{
    width: 296px;
    height: 60px;
    margin-left: 228px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-bottom: 40px;
}
.nav-item{
    width: 148px;
    height: 60px;
    line-height: 60px;
    border-top-color:  #fff;
    border-bottom-color:  #fff;
    border-left-color:  #fff;
    border-right-color:  #fff;
}
.nav-active{
    background-color: #fff;
    color: #FB6C61;
}
.main{
    padding-left: 20px;
    padding-right: 20px;
}
.info-box{
    width: 710px;
    height: 200px;
    position: relative;
    padding-left: 70px;
    padding-right: 70px;
    padding-top: 32px;
    padding-bottom: 20px;
}
.info-bg{
    width: 710px;
}
.info-bottom{
    width: 670px;
    height: 20px;
    background-color: #fdfdfd;
    position: absolute;
    bottom: 2px;
    left: 20px;
}
.info-item{
    padding-top: 16px;
}
.info-title{
    font-family: PingFangSC-Medium;
}
.info-subtitle{
    color: #A6A6A6;
}
.avatar{
    width: 112px;
    height: 112px;
    border-top-color:  #FB7361;
    border-bottom-color:  #FB7361;
    border-left-color:  #FB7361;
    border-right-color:  #FB7361;
    border-top-left-radius: 56px;
    border-top-right-radius: 56px;
    border-bottom-left-radius: 56px;
    border-bottom-right-radius: 56px;
}
.main-list{
    width: 670px;
    height: 928px;
    margin-left: 20px;
    margin-top: -2px;
    padding-top: 24px;
    padding-bottom: 36px;
}
.list-item{
    padding-left: 32px;
    padding-right: 28px;
}
.mt48{
    margin-top: 50px;
}
.rank-icon{
    width: 40px;
    height: 52px;
    margin-right: 32px;
}
.rank-text{
    font-family: PingFangSC-Medium;
    color: #FB6C61;
    width: 40px;
    margin-right: 32px;
}
.rank-avatar{
    width: 64px;
    height: 64px;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    margin-right: 16px;
}
.rank-title{
    color: #4F4F4F;
}
.rank-money{
    width: 120px;
    font-family: PingFangSC-Medium;
    color: #FFA82D;
    text-align: right;
}
.award-icon{
    width: 28px;
    height: 26px;
    margin-left: 20px;
}
</style>
