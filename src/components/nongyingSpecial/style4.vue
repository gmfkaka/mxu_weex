 <!-- 上标题下大图 -->
<template>
    <div>
        <text class="fz34 cl-333 line1">{{data.title}}</text>
        <image class="img" :src="data.index_pic+'?imageView/0/h/350/w/702'"></image>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'style3'
}
</script>

<style scoped lang="scss">
.img{
    width: 702px;
    height: 350px;
    margin-top: 20px;
}
</style>
