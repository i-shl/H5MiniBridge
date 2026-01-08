<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { stringifyQuery } from '@/http/tools/queryString'
import { useTokenStore, useUserStore } from '@/store'

definePage({
  style: {
    navigationBarTitleText: '商城',
  },
})

// H5项目的基础URL，请根据实际情况修改
const H5_BASE_URL = 'https://test.ishl.top'

const tokenStore = useTokenStore()
const userStore = useUserStore()

// 当前要加载的H5页面路由，默认为商城
const currentRoute = ref('shop')
const envInfo = ref('mp-weixin')

// 构建webview的src URL，包含token和url参数
const webviewSrc = computed(() => {
  // 从tokenInfo中获取token
  let token = ''
  token = '123'
  // const tokenInfo = tokenStore.tokenInfo
  // if (tokenInfo) {
  //   if (isDoubleTokenRes(tokenInfo)) {
  //     token = tokenInfo.accessToken || ''
  //   }
  //   else if (isSingleTokenRes(tokenInfo)) {
  //     token = tokenInfo.token || ''
  //   }
  // }

  // 构建URL参数对象
  const params: Record<string, string> = {}
  params.env = envInfo.value
  if (token) {
    params.token = token
  }
  // 添加路由参数，H5可以根据这个参数显示对应的页面
  if (currentRoute.value) {
    params.route = currentRoute.value
  }

  const queryString = stringifyQuery(params)
  return `${H5_BASE_URL}${queryString ? `?${queryString}` : ''}`
  // 实际传的是https://test.ishl.top?env=mp-weixin&token=123456token&route=shop
})

// 处理H5发送的消息
function handleMessage(event: any) {
  console.log('收到H5消息:', event)

  // 微信小程序中，消息数据在 event.detail.data 中
  // 企业微信和飞书小程序可能略有不同，需要根据实际情况调整
  const messageData = event.detail?.data || event.detail || event

  if (Array.isArray(messageData)) {
    // 微信小程序返回的是数组格式
    messageData.forEach((item: any) => {
      handleMessageItem(item)
    })
  }
  else {
    // 其他格式直接处理
    handleMessageItem(messageData)
  }
}

// 处理单条消息
function handleMessageItem(data: any) {
  console.log('处理H5消息项:', data)

  // 根据消息类型进行不同的处理
  if (data.action) {
    switch (data.action) {
      case 'updateUser':
        // H5请求更新用户信息
        if (data.info) {
          userStore.setUserInfo(data.info)
        }
        break
      case 'refreshToken':
        // H5请求刷新token
        if (tokenStore.refreshToken) {
          tokenStore.refreshToken()
        }
        break
      case 'navigate':
        // H5请求小程序跳转
        if (data.path) {
          uni.navigateTo({
            url: data.path,
          })
        }
        break
      case 'switchTab':
        // H5请求切换tab
        if (data.path) {
          uni.switchTab({
            url: data.path,
          })
        }
        break
      default:
        console.log('未知的消息类型:', data.action)
    }
  }

  // 可以在这里添加更多的消息处理逻辑
}

// 页面加载时检查登录状态
onMounted(() => {
  // 更新token时间，确保token有效性检查准确
  tokenStore.updateNowTime()

  // 打印当前页面信息和webview的src
  console.log('当前微信小程序页面：商城')
  console.log('当前页面路径：/pages/index/shop')
  console.log('当前webview的src：', webviewSrc.value)

  // 如果未登录，可以跳转到登录页（可选）
  // if (!tokenStore.hasLogin.value) {
  //   uni.reLaunch({
  //     url: '/pages-auth/login',
  //   })
  // }
})
</script>

<template>
  <view class="webview-container">
    <web-view
      :src="webviewSrc"
      @message="handleMessage"
    />
  </view>
</template>

  <style lang="scss" scoped>
  .webview-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
