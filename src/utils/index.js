import {
  useLocalStorage as _useLocalStorage,
  useSessionStorage as _useSessionStorage,
} from '@vueuse/core';
import * as fileSaver from 'file-saver';
const prefix = '__qianhai-economics-pc__';
export const setHtmlFontSize = (designWidth = 1920, minWidth = 1024) => {
  const docEle = document.documentElement;
  const screenRatioByDesign = 16 / 9;
  const screenRatio = docEle.clientWidth / docEle.clientHeight;
  const fontSize =
    ((screenRatio > screenRatioByDesign ? screenRatioByDesign / screenRatio : 1) *
      docEle.clientWidth) /
    100;

  docEle.style.fontSize = fontSize.toFixed(3) + 'px';
};

export const pxToVw = (num, baseWidth = 1920) => {
  if (!num) return '';
  const docEle = document.documentElement;
  const screenWidth = docEle.clientWidth;
  const ratio = screenWidth / baseWidth;
  return (num / baseWidth) * 100 * ratio + 'vw';
};

export const pxToVh = (num, baseHeight = 1080) => {
  if (!num) return '';
  const docEle = document.documentElement;
  const screenHeight = docEle.clientHeight;
  const ratio = screenHeight / baseHeight;
  return (num / baseHeight) * 100 * ratio + 'vh';
};

export const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const setLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
  // return JSON.parse(window.localStorage.getItem(key));
};

/**
 *
 * @param {string} key
 * @param  {...any} args
 * @returns { import('vue').Ref<any> }
 */
export const useSessionStorage = (key, ...args) => _useSessionStorage(prefix + key, ...args);
/**
 *
 * @param {string} key
 * @param  {...any} args
 * @returns { import('vue').Ref<any> }
 */
export const useLocalStorage = (key, ...args) => _useLocalStorage(prefix + key, ...args);
/**
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function isDown(value) {
  return +value < 0;
}

// 除一万保留两位小数
/**
 *
 * @param {number | string} num
 * @param {number} to
 * @returns
 */
export function wanToFixed(num, to = 2) {
  if (num === null || num === undefined) return '-';
  num = Number(num);
  if (isNaN(num)) return '-';
  num /= 10000;
  return num.toFixed(to);
}

/**
 *
 * @param {Array<any>} data
 * @param {string[] | [string, (data: any) => any]} keys
 * @returns {{ [key: string]: any[] }}
 */
export function getMapData(data, keys) {
  const res = {};
  for (const key of keys) {
    const [_key, cb] = Array.isArray(key) ? key : [key];
    res[_key] = [];
    for (const item of data) {
      const val = cb ? cb(item[_key]) : item[_key];
      res[_key].push(val);
    }
  }
  return res;
}

/**
 *
 * @param {string} time
 * @returns { string }
 */
export function formatTime(time) {
  if (!time) return '';
  time = time.toString();
  return `${time.slice(0, 4)}-${time.slice(4, 6)}`;
}

/**
 *
 * @param {number} num
 * @param {number} to
 * @param {string} dep
 * @returns {string}
 */
export function toFixed(num, to = 2, dep = '-') {
  num = parseFloat(num);
  if (isNaN(num)) {
    return dep;
  }
  return num.toFixed(to);
}

/**
 *
 * @param {any[]} data
 * @param {string[]} keys
 */
export function filterEmpty(data, keys) {
  return data.filter((item) => keys.some((key) => item[key] !== null && item[key] !== undefined));
}

/**
 * @param {string} name
 * @returns {string}
 */
export function resolveIndustryValueUnit(name) {
  switch (true) {
    case /工业|建筑/.test(name):
      return '产值';
    case /批发|零售/.test(name):
      return '销售额';
    case /餐饮|住宿/.test(name):
      return '营业额';
    default:
      return '营收';
  }
}

/**
 * @param {string} name
 * @returns {Function}
 */
export function sortMethod(prop) {
  return (a, b) => parseFloat(a[prop] || 0) - parseFloat(b[prop] || 0);
}

export function formatter(r, c, v) {
  return toFixed(v);
}

export function formatterWan(r, c, v) {
  return wanToFixed(v);
}

export async function saveFile(data, name = '表格.xlsx') {
  const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
  await fileSaver.saveAs(blob, name);
}

export function formatter1(r, c, v) {
  return toFixed(v, 1);
}

export function getUrlParams(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.href.split('?')[1]?.match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}
/**
 * 是否使用接口数据
 * @returns
 */
export const noApi = () => {
  return getUrlParams('no_api') || '';
};

/**
 *获取链接时间
 * @returns
 */
export const urlTime = () => {
  return getUrlParams('data_time') || '';
};
export const getLocation = () => {
  return getUrlParams('location') || '';
};
export const pxToRem = (num, baseWidth = 1920) => {
  if (!num) return '';
  const docEle = document.documentElement;
  const screenWidth = docEle.clientWidth;
  const ratio = screenWidth / baseWidth;
  return (num / baseWidth) * 100 * ratio + 'rem';
};

/**
 * 字符串转16进制
 * @param {string} hexStr
 * @returns
 */
export function strToHex(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

/**
 * 16进制转字符串
 * @param {string} hexStr
 * @returns
 */
export function hexToStr(hexStr) {
  var result = '';
  for (var i = 0; i < hexStr.length; i += 2) {
    result += String.fromCharCode(parseInt(hexStr.substr(i, 2), 16));
  }
  return result;
}
