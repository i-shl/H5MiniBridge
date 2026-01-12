<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { stringifyQuery } from '@/http/tools/queryString'
import { useTokenStore } from '@/store'

definePage({
  style: {
    navigationBarTitleText: '商城',
  },
})

const H5_BASE_URL = 'https://test.ishl.top'

const tokenStore = useTokenStore()

const currentRoute = ref('shop')
const envInfo = ref('mp-weixin')

const webviewSrc = computed(() => {
  let token = ''
  token = '123'

  const params: Record<string, string> = {}
  params.env = envInfo.value
  if (token) {
    params.token = token
  }
  if (currentRoute.value) {
    params.route = currentRoute.value
  }

  const queryString = stringifyQuery(params)
  return `${H5_BASE_URL}${queryString ? `?${queryString}` : ''}`
})

function handleMessage(event: any) {
  const messageData = event.detail?.data

  if (!messageData) {
    console.warn('⚠️ 未收到消息数据')
    return
  }

  console.log('消息：', messageData)
}

onMounted(() => {
  tokenStore.updateNowTime()
})
</script>

<template>
  <view class="webview-container">
    <web-view :src="webviewSrc" @message="handleMessage" />
  </view>
</template>

<style lang="scss" scoped>
.webview-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
