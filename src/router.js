/* global Vue */
import Router from 'vue-router'
import Home from '@/pages/ModWeexStyle2/Home.vue'
import Media from '@/pages/ModWeexStyle3/Media.vue'
import MediaDetail from '@/pages/ModWeexStyle3/MediaDetail.vue'
import Report from '@/pages/ModWeexStyle1/Report.vue'
import Demo from '@/pages/demo/Demo.vue'
import Service from '@/pages/ModWeexStyle4/Service.vue'
import Errors from '@/pages/ModWeexStyle4/Errors.vue'
import NewsDetail from '@/pages/ModWeexStyle2/NewsDetail.vue'
import GalleryDetail from '@/pages/ModWeexStyle2/GalleryDetail.vue'
import TopicDetail from '@/pages/ModWeexStyle2/TopicDetail.vue'
import Search from '@/pages/ModWeexStyle2/Search.vue'
import Post from '@/pages/ModWeexStyle1/Post.vue'
import ReportDetail from '@/pages/ModWeexStyle1/ReportDetail.vue'
import CommentList from '@/pages/ModWeexStyle2/CommentList.vue'
import ModWeexStyle5 from '@/pages/ModWeexStyle5/ModWeexStyle5Home.vue'
import ModWeexStyle5WendaDongTai from '@/pages/ModWeexStyle5/ModWeexStyle5DongTai.vue'
import ModWeexStyle5WendaAsk from '@/pages/ModWeexStyle5/ModWeexStyle5Ask.vue'
import ModWeexStyle5WendaDetail from '@/pages/ModWeexStyle5/ModWeexStyle5Detail.vue'
import ModWeexStyle5WendaExpertDetail from '@/pages/ModWeexStyle5/ModWeexStyle5ExpertDetail.vue'
import ModWeexStyle5WendaSelect from '@/pages/ModWeexStyle5/ModWeexStyle5SelectList.vue'
import ModWeexStyle5WendaMyComment from '@/pages/ModWeexStyle5/ModWeexStyle5MyComment.vue'
import ModWeexStyle5WendaAnswer from '@/pages/ModWeexStyle5/ModWeexStyle5MyAnswer.vue'
import ModWeexStyle6FeatureHome from '@/pages/ModWeexStyle6/ModWeexStyle6Home.vue'
import ModWeexStyle6FeatureHomeArticleDetail from '@/pages/ModWeexStyle6/ModWeexStyle6HomeArticleDetail.vue'
import ModWeexStyle6FeatureHomeListen from '@/pages/ModWeexStyle6/ModWeexStyle6HomeListen.vue'
import ModWeexStyle6FeatureHomeListenList from '@/pages/ModWeexStyle6/ModWeexStyle6HomeListenList.vue'
import ModWeexStyle6FeatureHomeListenDetail from '@/pages/ModWeexStyle6/ModWeexStyle6HomeListenDetail.vue'
import ModWeexStyle6FeatureHomeListenAudio from '@/pages/ModWeexStyle6/ModWeexStyle6HomeListenAudio.vue'
import ModWeexStyle6FeatureHomeListenVideo from '@/pages/ModWeexStyle6/ModWeexStyle6HomeListenVideo.vue'
import ModWeexStyle6FeatureHomeLook from '@/pages/ModWeexStyle6/ModWeexStyle6HomeLook.vue'
import ModWeexStyle6FeatureHomeWrite from '@/pages/ModWeexStyle6/ModWeexStyle6HomeWrite.vue'
import ModWeexStyle6FeatureHomeWriteList from '@/pages/ModWeexStyle6/ModWeexStyle6HomeWriteList.vue'
import ModWeexStyle6FeatureHomeSpeak from '@/pages/ModWeexStyle6/ModWeexStyle6HomeSpeak.vue'
import ModWeexStyle6FeatureHomeSpeakList1 from '@/pages/ModWeexStyle6/ModWeexStyle6HomeSpeakList1.vue'
import ModWeexStyle6FeatureHomeSpeakList2 from '@/pages/ModWeexStyle6/ModWeexStyle6HomeSpeakList2.vue'
import ModWeexStyle6FeatureHomeSpeakList3 from '@/pages/ModWeexStyle6/ModWeexStyle6HomeSpeakList3.vue'
import ModWeexStyle6FeatureHomeVideoList from '@/pages/ModWeexStyle6/ModWeexStyle6HomeVideoList.vue'
import ModWeexStyle6FeatureHomeCommentList from '@/pages/ModWeexStyle6/ModWeexStyle6HomeCommentList.vue'
import ModWeexStyle7FeatureHotHome from '@/pages/ModWeexStyle7/ModWeexStyle7Home.vue'
import ModWeexStyle7FeatureHotBookList from '@/pages/ModWeexStyle7/ModWeexStyle7BookList.vue'
import ModWeexStyle7FeatureHotBookList2 from '@/pages/ModWeexStyle7/ModWeexStyle7BookList2.vue'
import ModWeexStyle7FeatureHotRankList from '@/pages/ModWeexStyle7/ModWeexStyle7RankList.vue'
import ModWeexStyle7FeatureHotPeopleList from '@/pages/ModWeexStyle7/ModWeexStyle7PeopleList.vue'
import ModWeexStyle7FeatureHotEventList from '@/pages/ModWeexStyle7/ModWeexStyle7EventList.vue'
import ModWeexStyle8 from '@/pages/ModWeexStyle8/ModWeexStyle8.vue'
import ModWeexStyle9 from '@/pages/ModWeexStyle9/ModWeexStyle9.vue'
import ModWeexStyle9MyCollection from '@/pages/ModWeexStyle9/ModWeexStyle9MyCollection.vue'
import ModWeexStyle13 from '@/pages/ModWeexStyle13/ModWeexStyle13.vue'
import ModWeexStyle13RankList from '@/pages/ModWeexStyle13/ModWeexStyle13RankList.vue'
import ModWeexStyle13TixianHistory from '@/pages/ModWeexStyle13/ModWeexStyle13TixianHistory.vue'
import ModWeexStyle14 from '@/pages/ModWeexStyle14/ModWeexStyle14.vue'
import ModWeexStyle11 from '@/pages/ModWeexStyle11/ModWeexStyle11.vue'
import ModWeexStyle11SelectCompany from '@/pages/ModWeexStyle11/ModWeexStyle11SelectCompany.vue'
import ModWeexStyle11Result from '@/pages/ModWeexStyle11/ModWeexStyle11Result.vue'
import ModWeexStyle12 from '@/pages/ModWeexStyle12/ModWeexStyle12.vue'
import ModWeexStyle12AddCar from '@/pages/ModWeexStyle12/ModWeexStyle12AddCar.vue'
import ModWeexStyle12Result from '@/pages/ModWeexStyle12/ModWeexStyle12Result.vue'
import ModWeexStyle15 from '@/pages/ModWeexStyle15/ModWeexStyle15.vue'
import ModWeexStyle15Result from '@/pages/ModWeexStyle15/ModWeexStyle15Result.vue'
import ModWeexStyle16 from '@/pages/ModWeexStyle16/ModWeexStyle16.vue'
import ModWeexStyle16Detail from '@/pages/ModWeexStyle16/ModWeexStyle16Detail.vue'
import ModWeexStyle16New from '@/pages/ModWeexStyle16/ModWeexStyle16New.vue'
import ModWeexStyle16Comment from '@/pages/ModWeexStyle16/ModWeexStyle16Comment.vue'
import ModWeexStyle17 from '@/pages/ModWeexStyle17/ModWeexStyle17.vue'
import ModWeexStyle18 from '@/pages/ModWeexStyle18/ModWeexStyle18.vue'
import ModWeexStyle18List from '@/pages/ModWeexStyle18/ModWeexStyle18List.vue'
Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'ModWeexStyle18',
      component: ModWeexStyle18
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Media',
      name: 'Media',
      component: Media
    },
    {
      path: '/MediaDetail',
      name: 'MediaDetail',
      component: MediaDetail
    },
    {
      path: '/Demo',
      name: 'Demo',
      component: Demo
    },
    {
      path: '/Report',
      name: 'Report',
      component: Report
    },
    {
      path: '/Errors',
      name: 'Errors',
      component: Errors
    },
    {
      path: '/Service',
      name: 'Service',
      component: Service
    },
    {
      path: '/NewsDetail',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/GalleryDetail',
      name: 'GalleryDetail',
      component: GalleryDetail
    },
    {
      path: '/TopicDetail',
      name: 'TopicDetail',
      component: TopicDetail
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Post',
      name: 'Post',
      component: Post
    },
    {
      path: '/ReportDetail',
      name: 'ReportDetail',
      component: ReportDetail
    },
    {
      path: '/CommentList',
      name: 'CommentList',
      component: CommentList
    },
    {
      path: '/ModWeexStyle5WendaAsk',
      name: 'ModWeexStyle5WendaAsk',
      component: ModWeexStyle5WendaAsk
    },
    {
      path: '/ModWeexStyle5WendaDongTai',
      name: 'ModWeexStyle5WendaDongTai',
      component: ModWeexStyle5WendaDongTai
    },
    {
      path: '/ModWeexStyle5WendaDetail',
      name: 'ModWeexStyle5WendaDetail',
      component: ModWeexStyle5WendaDetail
    },
    {
      path: '/ModWeexStyle5WendaSelect',
      name: 'ModWeexStyle5WendaSelect',
      component: ModWeexStyle5WendaSelect
    },
    {
      path: '/ModWeexStyle5WendaMyComment',
      name: 'ModWeexStyle5WendaMyComment',
      component: ModWeexStyle5WendaMyComment
    },
    {
      path: '/ModWeexStyle5WendaHome',
      name: 'ModWeexStyle5',
      component: ModWeexStyle5
    },
    {
      path: '/ModWeexStyle5WendaAnswer',
      name: 'ModWeexStyle5WendaAnswer',
      component: ModWeexStyle5WendaAnswer
    },
    {
      path: '/ModWeexStyle5WendaExpertDetail',
      name: 'ModWeexStyle5WendaExpertDetail',
      component: ModWeexStyle5WendaExpertDetail
    },
    {
      path: '/ModWeexStyle6FeatureHome',
      name: 'ModWeexStyle6FeatureHome',
      component: ModWeexStyle6FeatureHome
    },
    {
      path: '/ModWeexStyle6FeatureHomeListen',
      name: 'ModWeexStyle6FeatureHomeListen',
      component: ModWeexStyle6FeatureHomeListen
    },
    {
      path: '/ModWeexStyle6FeatureHomeListenList',
      name: 'ModWeexStyle6FeatureHomeListenList',
      component: ModWeexStyle6FeatureHomeListenList
    },
    {
      path: '/ModWeexStyle6FeatureHomeListenDetail',
      name: 'ModWeexStyle6FeatureHomeListenDetail',
      component: ModWeexStyle6FeatureHomeListenDetail
    },
    {
      path: '/ModWeexStyle6FeatureHomeLook',
      name: 'ModWeexStyle6FeatureHomeLook',
      component: ModWeexStyle6FeatureHomeLook
    },
    {
      path: '/ModWeexStyle6FeatureHomeWrite',
      name: 'ModWeexStyle6FeatureHomeWrite',
      component: ModWeexStyle6FeatureHomeWrite
    },
    {
      path: '/ModWeexStyle6FeatureHomeWriteList',
      name: 'ModWeexStyle6FeatureHomeWriteList',
      component: ModWeexStyle6FeatureHomeWriteList
    },
    {
      path: '/ModWeexStyle6FeatureHomeSpeak',
      name: 'ModWeexStyle6FeatureHomeSpeak',
      component: ModWeexStyle6FeatureHomeSpeak
    },
    {
      path: '/ModWeexStyle6FeatureHomeSpeakList1',
      name: 'ModWeexStyle6FeatureHomeSpeakList1',
      component: ModWeexStyle6FeatureHomeSpeakList1
    },
    {
      path: '/ModWeexStyle6FeatureHomeSpeakList2',
      name: 'ModWeexStyle6FeatureHomeSpeakList2',
      component: ModWeexStyle6FeatureHomeSpeakList2
    },
    {
      path: '/ModWeexStyle6FeatureHomeSpeakList3',
      name: 'ModWeexStyle6FeatureHomeSpeakList3',
      component: ModWeexStyle6FeatureHomeSpeakList3
    },
    {
      path: '/ModWeexStyle6FeatureHomeVideoList',
      name: 'ModWeexStyle6FeatureHomeVideoList',
      component: ModWeexStyle6FeatureHomeVideoList
    },
    {
      path: '/ModWeexStyle6FeatureHomeCommentList',
      name: 'ModWeexStyle6FeatureHomeCommentList',
      component: ModWeexStyle6FeatureHomeCommentList
    },
    {
      path: '/ModWeexStyle6FeatureHomeListenAudio',
      name: 'ModWeexStyle6FeatureHomeListenAudio',
      component: ModWeexStyle6FeatureHomeListenAudio
    },
    {
      path: '/ModWeexStyle6FeatureHomeListenVideo',
      name: 'ModWeexStyle6FeatureHomeListenVideo',
      component: ModWeexStyle6FeatureHomeListenVideo
    },
    {
      path: '/ModWeexStyle6FeatureHomeArticleDetail',
      name: 'ModWeexStyle6FeatureHomeArticleDetail',
      component: ModWeexStyle6FeatureHomeArticleDetail
    },
    {
      path: '/ModWeexStyle7FeatureHotHome',
      name: 'ModWeexStyle7FeatureHotHome',
      component: ModWeexStyle7FeatureHotHome
    },
    {
      path: '/ModWeexStyle7FeatureHotRankList',
      name: 'ModWeexStyle7FeatureHotRankList',
      component: ModWeexStyle7FeatureHotRankList
    },
    {
      path: '/ModWeexStyle7FeatureHotBookList',
      name: 'ModWeexStyle7FeatureHotBookList',
      component: ModWeexStyle7FeatureHotBookList
    },
    {
      path: '/ModWeexStyle7FeatureHotBookList2',
      name: 'ModWeexStyle7FeatureHotBookList2',
      component: ModWeexStyle7FeatureHotBookList2
    },
    {
      path: '/ModWeexStyle7FeatureHotPeopleList',
      name: 'ModWeexStyle7FeatureHotPeopleList',
      component: ModWeexStyle7FeatureHotPeopleList
    },
    {
      path: '/ModWeexStyle7FeatureHotEventList',
      name: 'ModWeexStyle7FeatureHotEventList',
      component: ModWeexStyle7FeatureHotEventList
    },
    {
      path: '/ModWeexStyle8',
      name: 'ModWeexStyle8',
      component: ModWeexStyle8
    },
    {
      path: '/ModWeexStyle9',
      name: 'ModWeexStyle9',
      component: ModWeexStyle9
    },
    {
      path: '/ModWeexStyle9MyCollection',
      name: 'ModWeexStyle9MyCollection',
      component: ModWeexStyle9MyCollection
    },
    {
      path: '/ModWeexStyle13',
      name: 'ModWeexStyle13',
      component: ModWeexStyle13
    },
    {
      path: '/ModWeexStyle13RankList',
      name: 'ModWeexStyle13RankList',
      component: ModWeexStyle13RankList
    },
    {
      path: '/ModWeexStyle13TixianHistory',
      name: 'ModWeexStyle13TixianHistory',
      component: ModWeexStyle13TixianHistory
    },
    {
      path: '/ModWeexStyle14',
      name: 'ModWeexStyle14',
      component: ModWeexStyle14
    },
    {
      path: '/ModWeexStyle11',
      name: 'ModWeexStyle11',
      component: ModWeexStyle11
    },
    {
      path: '/ModWeexStyle11SelectCompany',
      name: 'ModWeexStyle11SelectCompany',
      component: ModWeexStyle11SelectCompany
    },
    {
      path: '/ModWeexStyle11Result',
      name: 'ModWeexStyle11Result',
      component: ModWeexStyle11Result
    },
    {
      path: '/ModWeexStyle12',
      name: 'ModWeexStyle12',
      component: ModWeexStyle12
    },
    {
      path: '/ModWeexStyle12AddCar',
      name: 'ModWeexStyle12AddCar',
      component: ModWeexStyle12AddCar
    },
    {
      path: '/ModWeexStyle12Result',
      name: 'ModWeexStyle12Result',
      component: ModWeexStyle12Result
    },
    {
      path: '/ModWeexStyle15',
      name: 'ModWeexStyle15',
      component: ModWeexStyle15
    },
    {
      path: '/ModWeexStyle15Result',
      name: 'ModWeexStyle15Result',
      component: ModWeexStyle15Result
    },
    {
      path: '/ModWeexStyle16',
      name: 'ModWeexStyle16',
      component: ModWeexStyle16
    },
    {
      path: '/ModWeexStyle16Detail',
      name: 'ModWeexStyle16Detail',
      component: ModWeexStyle16Detail
    },
    {
      path: '/ModWeexStyle16New',
      name: 'ModWeexStyle16New',
      component: ModWeexStyle16New
    },
    {
      path: '/ModWeexStyle16Comment',
      name: 'ModWeexStyle16Comment',
      component: ModWeexStyle16Comment
    },
    {
      path: '/ModWeexStyle17',
      name: 'ModWeexStyle17',
      component: ModWeexStyle17
    },
    {
      path: '/ModWeexStyle18',
      name: 'ModWeexStyle18',
      component: ModWeexStyle18
    },
    {
      path: '/ModWeexStyle18List',
      name: 'ModWeexStyle18List',
      component: ModWeexStyle18List
    }
  ]
})
