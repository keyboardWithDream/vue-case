<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon">
        <img src="~assets/img/error/bug.svg" alt="暂无图片">
      </slot>
    </div>
    <div v-else>
      <slot name="item-icon-active">
        <img src="~assets/img/error/bug-fill.svg" alt="暂无图片">
      </slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text">
        <div>正在加载</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String,
    activeColor: {
      type: String,
      default: 'pink'
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link);
    }
  },
  computed: {
    isActive() {
      return !this.$route.path.indexOf(this.link);
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>
