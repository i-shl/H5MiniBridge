<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useTokenStore } from '@/store'
import { buildWebviewUrl } from '@/utils/webviewUrl'

definePage({
  style: {
    navigationBarTitleText: 'H5首页',
  },
})

const tokenStore = useTokenStore()

const envInfo = ref<'mp-weixin' | 'mp-qiwei' | 'mp-lark'>('mp-weixin')
const userType = ref<'sales' | 'agent' | 'staff'>('agent') // 人员类型：销售、代理、员工

const webviewSrc = computed(() => {
  let token = ''
  token = '123'

  return buildWebviewUrl({
    env: envInfo.value,
    token: token || undefined,
    // H5首页不需要route参数
    userType: userType.value,
  })
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
