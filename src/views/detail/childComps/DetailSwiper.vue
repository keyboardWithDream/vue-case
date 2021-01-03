<template>
  <div class="detail-swiper">
    <el-carousel height="300px" :interval="5000" arrow="always">
      <el-carousel-item v-for="item in items">
        <div>
          <img class="swiper_image" :src="item" alt="推荐" @load="imageLoad">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    items: {
      type: Array,
      required: true,
      default() {
        return ['暂无数据，请稍后']
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) this.$emit('swiperImageLoad')
      this.isLoad = true
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

.swiper_item {
  height: 300px;
  overflow: hidden;
}

.detail-swiper {
  margin-top: 44px;
}
</style>
