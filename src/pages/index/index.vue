<script lang="ts" setup>
import { onMounted } from 'vue'
import { useTokenStore } from '@/store'

defineOptions({
  name: 'Home',
})
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
})

const tokenStore = useTokenStore()

// 跳转到H5首页
function navigateToH5Home() {
  uni.navigateTo({
    url: '/pages/index/h5-home',
  })
}

// 跳转到商城页面
function navigateToShop() {
  uni.navigateTo({
    url: '/pages/index/shop',
  })
}

// 跳转到订单页面
function navigateToOrder() {
  uni.navigateTo({
    url: '/pages/index/order',
  })
}

// 跳转到我的页面
function navigateToMine() {
  uni.navigateTo({
    url: '/pages/index/mine',
  })
}

// 页面加载时检查登录状态
onMounted(() => {
  // 更新token时间，确保token有效性检查准确
  tokenStore.updateNowTime()

  // 打印当前页面信息
  console.log('当前微信小程序页面：首页')
  console.log('当前页面路径：/pages/index/index')

  // 如果未登录，可以跳转到登录页（可选）
  // if (!tokenStore.hasLogin.value) {
  //   uni.reLaunch({
  //     url: '/pages-auth/login',
  //   })
  // }
})
</script>

<template>
  <view class="home-container">
    <button class="btn" @click="navigateToH5Home">
      H5首页
    </button>
    <button class="btn" @click="navigateToShop">
      商城
    </button>
    <button class="btn" @click="navigateToOrder">
      订单
    </button>
    <button class="btn" @click="navigateToMine">
      我的
    </button>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  padding: 40rpx;
}

.btn {
  width: 100%;
  margin-bottom: 30rpx;
  padding: 30rpx;
  background-color: #007aff;
  color: #ffffff;
  border: none;
  border-radius: 8rpx;
  font-size: 32rpx;
}
</style>
