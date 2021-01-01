<template>
  <tab-bar class="tab-bar">
    <tab-bar-item link="/home" activeColor="black">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="主页">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="主页">
      <div slot="item-text">主页</div>
    </tab-bar-item>
    <tab-bar-item link="/category" activeColor="black">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="分类">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="分类">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item link="/shopcar" activeColor="black">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="购物车">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="购物车">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item link="/profile" activeColor="black">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="我的">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="我的">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/item/TabBarItem'

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
.tab-bar {
  z-index: 9;
}
</style>
