<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :items="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailBaseInfo from "@/views/home/childComps/DetailBaseInfo";

import {getDetail, Shop, Goods} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DetailBaseInfo,
    DetailShopInfo,
    DetailSwiper,
    DetailNavBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  created() {
    //保存商品id
    this.iid = this.$route.params.iid
    //发送网络请求
    getDetail(this.iid).then(res => {
      const data = res.result
      //获取轮播图片数据
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.service)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
