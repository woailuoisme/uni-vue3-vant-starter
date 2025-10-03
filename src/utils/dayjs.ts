import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

/**
 * Day.js 配置
 * 配置中文语言
 */

// 配置中文语言
dayjs.locale('zh-cn');

/**
 * 格式化日期时间
 * @param date - 日期时间
 * @param format - 格式字符串
 * @returns 格式化后的字符串
 */
export const formatDate = (date?: string | number | Date | dayjs.Dayjs, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format);
};

/**
 * 获取相对时间（基础版本）
 * @param date - 日期时间
 * @returns 相对时间字符串
 */
export const getRelativeTime = (date?: string | number | Date | dayjs.Dayjs) => {
  const target = dayjs(date);
  const now = dayjs();
  const diffInSeconds = now.diff(target, 'second');
  
  if (diffInSeconds < 60) {
    return '刚刚';
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}分钟前`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}小时前`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}天前`;
  }
};

/**
 * 检查日期是否有效
 * @param date - 日期时间
 * @returns 是否有效
 */
export const isValidDate = (date?: string | number | Date | dayjs.Dayjs) => {
  return dayjs(date).isValid();
};

/**
 * 获取当前时间戳
 * @returns 当前时间戳（秒）
 */
export const getCurrentTimestamp = () => {
  return dayjs().unix();
};

/**
 * 日期加减操作
 * @param date - 基础日期
 * @param value - 加减值
 * @param unit - 时间单位
 * @returns 计算后的日期
 */
export const addDate = (date: string | number | Date | dayjs.Dayjs, value: number, unit: dayjs.ManipulateType) => {
  return dayjs(date).add(value, unit);
};

/**
 * 日期比较
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 比较结果
 */
export const compareDates = (date1: string | number | Date | dayjs.Dayjs, date2: string | number | Date | dayjs.Dayjs) => {
  const d1 = dayjs(date1);
  const d2 = dayjs(date2);
  
  if (d1.isBefore(d2)) return -1;
  if (d1.isAfter(d2)) return 1;
  return 0;
};

export default dayjs;