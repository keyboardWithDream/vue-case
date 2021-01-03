<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control
      ref="tabControlTop"
      class="tab-controller"
      :titles="titles"
      @itemClick="tabClick"
      v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
            @scroll="contentScroll">
      <home-swiper :items="banners.list" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends.list"/>
      <feature-view/>
      <tab-control
        ref="tabControl"
        :titles="titles"
        @itemClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";

import {debounce} from "@/common/utils";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import {getHomeMultiData, getHomeGoods} from "@/network/home";

export default {
  name: "Home",
  components: {
    TabControl,
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: {},
      recommends: {},
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: true,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  methods: {
    /**
     * 事件监听方法
     */
    tabClick(index) {
      if (0 === index) {
        this.currentType = 'pop'
      }else if (1 === index) {
        this.currentType = 'new'
      }else if (2 === index) {
        this.currentType = 'sell'
      }
      this.$refs.tabControlTop.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isShowBackTop = ((-position.y) > 1000)
      //决定tabControl是否吸顶
      this.isTabFixed = ((-position.y) > this.tabOffsetTop)
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      //获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    /**
     * 网络请求方法
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner
        this.recommends = res.data.recommend
        this.keywords = res.data.keywords
      }).catch(err => {
        console.log(err)
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //push进数组进行保存
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    //初始化请求多个数据
    this.getHomeMultiData()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //防抖函数
    const  refresh = debounce(this.$refs.scroll.refresh, 50)
    //监听图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  activated() {
    //返回时设置位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //离开时保存位置
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>

<style scoped>
#home {
  //padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}

.tab-controller {
  position: relative;
  z-index: 9;
  top: 44px;
}

.content {
  height: calc(100% - 94px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
