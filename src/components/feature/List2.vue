// 特写 书籍列表 左图右文字
<template>
     <div class="list-wrapper">
        <image :src="data.indexpic" class="book-img"></image>
        <div class="book-box">
            <text class="book-title">{{data.name}}</text>
            <text class="book-author">{{data.author}}</text>
            <text class="book-brief">{{data.brief}}</text>
        </div>
    </div>
</template>

<script>
export default {
  props: ['data'],
  name: 'List2'
}
</script>

<style scoped lang="scss">
.list-wrapper{
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: #fff;
    flex-direction: row;
}
.book-img{
    width: 140px;
    height: 250px;
    margin-right: 30px;
    position: relative;
}
.book-title{
    padding-bottom: 10px;
    font-size: 28px;
}
.book-author{
    font-size: 28px;
    margin-bottom: 30px;
}
.book-brief{
    font-size: 22px;
    color:#ccc;
    lines:4;
    width: 450px;
    text-overflow:ellipsis;
}
</style>
