// 使用不同的导入方式避免 Pinia 导出警告
import { createPinia } from 'pinia';

/**
 * Pinia store 配置
 * 创建并导出 Pinia 实例
 */
const pinia = createPinia();

export default pinia;