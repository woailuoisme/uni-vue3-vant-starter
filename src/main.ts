import { createSSRApp } from "vue";
import App from "./App.vue";
import pinia from "./stores/index";

/**
 * 创建应用实例
 * 集成 Pinia 状态管理
 */
export function createApp() {
  const app = createSSRApp(App);
  
  // 使用 Pinia
  app.use(pinia);
  
  return {
    app,
  };
}
