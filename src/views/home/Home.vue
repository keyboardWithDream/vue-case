<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultiData} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    //初始化请求多个数据
    getHomeMultiData().then(res => {
      this.banners = res.data.banner
      this.recommends = res.data.recommend
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}
</style>
