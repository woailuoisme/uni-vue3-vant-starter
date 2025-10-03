import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * 用户状态管理 store
 * 管理用户相关的状态和操作
 */
export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>('');
  const userInfo = ref<{
    id: number;
    name: string;
    avatar: string;
  } | null>(null);

  // 计算属性
  const isLogin = computed(() => !!token.value);
  const userName = computed(() => userInfo.value?.name || '');

  // Actions
  /**
   * 设置用户 token
   * @param newToken - 新的 token
   */
  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  /**
   * 设置用户信息
   * @param info - 用户信息
   */
  const setUserInfo = (info: { id: number; name: string; avatar: string }) => {
    userInfo.value = info;
  };

  /**
   * 清除用户信息（退出登录）
   */
  const clearUserInfo = () => {
    token.value = '';
    userInfo.value = null;
  };

  return {
    token,
    userInfo,
    isLogin,
    userName,
    setToken,
    setUserInfo,
    clearUserInfo,
  };
});