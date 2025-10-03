import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  // 更彻底的 Pinia 警告解决方案
  optimizeDeps: {
    exclude: ['pinia'],
    include: []
  },
  // 配置更严格的日志过滤
  logLevel: 'error',
});
