<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

/**
 * 应用启动时执行
 */
onLaunch(() => {
  console.log("App Launch");
});

/**
 * 应用显示时执行
 */
onShow(() => {
  console.log("App Show");
});

/**
 * 应用隐藏时执行
 */
onHide(() => {
  console.log("App Hide");
});
</script>

<style>
/* 引入 Vant Weapp 样式在微信小程序平台会自动处理 */

/* 全局样式 */
page {
  background-color: #f7f8fa;
}
</style>
