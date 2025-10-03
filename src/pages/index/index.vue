<template>
  <view class="content">   
    <!-- Vant UI 组件演示 -->
    <view class="demo-section">
      <text class="section-title">Vant UI 组件演示</text>
      
      <!-- 按钮组件 -->
      <view class="component-group">
        <text class="component-title">按钮组件</text>
        <view class="button-group">
          <van-button type="primary" @click="showCustomToast('主要按钮')">主要按钮</van-button>
          <van-button type="success" @click="showCustomToast('成功按钮')">成功按钮</van-button>
          <van-button type="default" @click="showCustomToast('默认按钮')">默认按钮</van-button>
          <van-button type="warning" @click="showCustomToast('警告按钮')">警告按钮</van-button>
          <van-button type="danger" @click="showCustomToast('危险按钮')">危险按钮</van-button>
        </view>
      </view>
      
      <!-- 表单组件 -->
      <view class="component-group">
        <text class="component-title">表单组件</text>
        <van-cell-group>
          <van-field
            v-model="inputValue"
            label="输入框"
            placeholder="请输入内容"
            clearable
          />
          <van-field
            v-model="phoneValue"
            label="手机号"
            placeholder="请输入手机号"
            type="tel"
          />
          <van-switch v-model="switchValue" @change="onSwitchChange" />
          <van-rate v-model="rateValue" @change="onRateChange" />
        </van-cell-group>
      </view>
      
      <!-- 反馈组件 -->
      <view class="component-group">
        <text class="component-title">反馈组件</text>
        <view class="button-group">
          <van-button type="primary" @click="showNotify">显示通知</van-button>
          <van-button type="success" @click="showDialog">显示对话框</van-button>
          <van-button type="warning" @click="showLoading">显示加载</van-button>
        </view>
      </view>
      
      <!-- 导航组件 -->
      <view class="component-group">
        <text class="component-title">导航组件</text>
        <van-tabs v-model="activeTab" @change="onTabChange">
          <van-tab title="标签1">
            <view class="tab-content">标签1的内容</view>
          </van-tab>
          <van-tab title="标签2">
            <view class="tab-content">标签2的内容</view>
          </van-tab>
          <van-tab title="标签3">
            <view class="tab-content">标签3的内容</view>
          </van-tab>
        </van-tabs>
      </view>
    </view>
    
    <!-- Pinia 状态管理演示 -->
    <view class="demo-section">
      <text class="section-title">Pinia 状态管理演示</text>
      <view class="info-item">
        <text>登录状态: {{ isLogin ? '已登录' : '未登录' }}</text>
      </view>
      <view class="info-item">
        <text>用户名: {{ userName || '未登录' }}</text>
      </view>
      <view class="button-group">
        <van-button type="primary" size="small" @click="handleLogin">模拟登录</van-button>
        <van-button type="default" size="small" @click="handleLogout">退出登录</van-button>
      </view>
    </view>
    
    <!-- Day.js 日期处理演示 -->
    <view class="demo-section">
      <text class="section-title">Day.js 日期处理演示</text>
      <view class="info-item">
        <text>当前时间: {{ currentTime.toLocaleString() }}</text>
      </view>
      <view class="info-item">
        <text>格式化时间: {{ formatDate(currentTime) }}</text>
      </view>
      <view class="info-item">
        <text>相对时间: {{ getRelativeTime(currentTime) }}</text>
      </view>
      <view class="info-item">
        <text>时间戳: {{ currentTime.getTime() }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { formatDate as utilsFormatDate, getRelativeTime as utilsGetRelativeTime, getCurrentTimestamp } from '@/utils/dayjs'

const title = ref('Hello')

// Vant UI 组件状态
const inputValue = ref('')
const phoneValue = ref('')
const switchValue = ref(false)
const rateValue = ref(3)
const activeTab = ref(0)

// Pinia store
const userStore = useUserStore()
const isLogin = computed(() => userStore.isLogin)
const userName = computed(() => userStore.userName)

// Day.js 相关状态
const currentTime = ref(new Date())

// 定时器用于更新时间
let timer: number | null = null

/**
 * 格式化日期时间
 * @param date - 日期对象
 * @returns 格式化后的字符串
 */
const formatDate = (date: Date) => {
  return utilsFormatDate(date, 'YYYY-MM-DD HH:mm:ss')
}

/**
 * 获取相对时间
 * @param date - 日期对象
 * @returns 相对时间字符串
 */
const getRelativeTime = (date: Date) => {
  return utilsGetRelativeTime(date)
}

/**
 * 获取时间戳
 * @param date - 日期对象
 * @returns 时间戳
 */
const getTimestamp = (date: Date) => {
  return date.getTime()
}

/**
 * 显示 Toast 提示
 * @param message - 提示消息
 */
const showCustomToast = (message: string) => {
  uni.showToast({
    title: message,
    duration: 2000,
    icon: 'none'
  });
}

/**
 * 显示通知
 */
const showNotify = () => {
  // Vant Weapp 的 Notify 组件需要手动引入和调用
  // 这里使用 uni-app 的 showModal 替代
  uni.showModal({
    title: '通知',
    content: '这是一个通知消息',
    showCancel: false
  });
}

/**
 * 显示对话框
 */
const showDialog = () => {
  uni.showModal({
    title: '提示',
    content: '这是一个对话框',
    success: (res) => {
      if (res.confirm) {
        showCustomToast('点击了确认');
      }
    }
  });
}

/**
 * 显示加载
 */
const showLoading = () => {
  uni.showLoading({
    title: '加载中...'
  });
  
  setTimeout(() => {
    uni.hideLoading();
    showCustomToast('加载完成');
  }, 2000);
}

/**
 * 开关状态变化
 * @param value - 开关状态
 */
const onSwitchChange = (value: boolean) => {
  showCustomToast(`开关状态: ${value ? '开' : '关'}`);
}

/**
 * 评分变化
 * @param value - 评分值
 */
const onRateChange = (value: number) => {
  showCustomToast(`评分: ${value} 星`);
}

/**
 * 标签页变化
 * @param name - 标签页名称
 */
const onTabChange = (name: number) => {
  showCustomToast(`切换到标签 ${name + 1}`);
}

/**
 * 模拟登录操作
 */
const handleLogin = () => {
  userStore.setToken('mock-token-' + Date.now())
  userStore.setUserInfo({
    id: 1,
    name: '测试用户',
    avatar: '/static/logo.png'
  })
  showCustomToast('登录成功')
}

/**
 * 退出登录操作
 */
const handleLogout = () => {
  userStore.clearUserInfo()
  showCustomToast('已退出登录')
}

/**
 * 组件挂载时启动定时器
 */
onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

/**
 * 组件卸载时清除定时器
 */
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 40rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 100rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 60rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.demo-section {
  width: 100%;
  margin-bottom: 60rpx;
  padding: 30rpx;
  background-color: #f8f8f8;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  text-align: center;
}

.info-item {
  margin-bottom: 20rpx;
  padding: 20rpx;
  background-color: white;
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #666;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20rpx;
  margin-top: 30rpx;
  flex-wrap: wrap;
}

.van-button {
  flex: 1;
  min-width: 120rpx;
  max-width: 200rpx;
}

.component-group {
  margin-bottom: 40rpx;
}

.component-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  padding-left: 10rpx;
  border-left: 6rpx solid #1989fa;
}

.tab-content {
  padding: 30rpx;
  text-align: center;
  color: #666;
  font-size: 28rpx;
}

.van-cell-group {
  margin-top: 20rpx;
}

.van-field {
  margin-bottom: 20rpx;
}

.van-switch,
.van-rate {
  margin: 20rpx 0;
  padding: 20rpx 0;
}
</style>
