<template>
  <div>
    <nav-bar>
      <div class="back" slot="left" @click="backClick">
        <img src="~/assets/img/common/back.svg" alt="返回">
      </div>
      <div class="title" slot="center">
        <div class="title-item"
             :class="{active: index === currentIndex}"
             v-for="(item, index) in titles"
             @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return{
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 15px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 16px;
}
</style>
