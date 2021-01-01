<template>
  <el-carousel height="220px" :interval="5000" arrow="always">
    <el-carousel-item v-for="item in items">
      <a :href="item.link">
        <img class="swiper_image" :src="item.image" alt="">
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    items: {
      type: Array,
      required: true,
      default() {
        return ['暂无数据，请稍后']
      }
    }
  }
}
</script>

<style>
.el-carousel__item a {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.swiper_image {
  width: 100%;
  height: 100%;
}
</style>
