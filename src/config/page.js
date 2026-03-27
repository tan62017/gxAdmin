import { ref } from 'vue';

import img from '@/assets/images/pageImgs/ex.png';
import area from '@/assets/images/pageImgs/area.jpg';
import gg from '@/assets/images/pageImgs/gg.png';
import moneyImg from '@/assets/images/pageImgs/2.jpg';
import fiveImg from '@/assets/images/pageImgs/five.jpg';
import owserImg from '@/assets/images/pageImgs/owser.jpg';
import rollImg from '@/assets/images/pageImgs/roll.jpg';
import threeImg from '@/assets/images/pageImgs/three.png';
import bankNav from '@/assets/images/pageImgs/bankNav.jpg';

import {
  getLocalStorage,
  setLocalStorage,
  noApi,
  urlTime,
  hexToStr,
  strToHex,
  getLocation,
} from '@/utils';

const proUrl = hexToStr('687474703a2f2f36302e302e3139312e3231313a39313138');
const testUrl = hexToStr('687474703a2f2f3132382e312e3132342e36383a39313138');

const baseUrl =
  getLocation() ||
  (import.meta.env.MODE === 'development'
    ? 'http://localhost'
    : import.meta.env.MODE === 'production'
    ? proUrl
    : testUrl);

const hasApi = noApi();
const hasTime = urlTime();
  
export const navList = ref([
  {
    label: '全部',
    level: 1,
    list: [
      {
        label: '社保资金链路驾驶仓',
        icon: img,
        location:
          baseUrl +
          `/gxdatav/index?no_api=${hasApi}&data_time=${hasTime}&from_url=${baseUrl}/gxAdmin/home`,
        // "http://localhost/gxdatav/index?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['对公条线-机构业务'],
        // types: ["对公条线-机构业务"],
        num: 0,
      },
      {
        label: '广西分行高质量发展检测平台',
        icon: gg,
        location: baseUrl + `/vis?from_url=${baseUrl}/gxAdmin/home`,
        // "http://localhost/Html/?from_url=${baseUrl}/gxAdmin/home"/,
        // "http://localhost/Html/?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['综合管理'],
        num: 0,
      },
      {
        label: '建行物色业务挂图作战分布',
        icon: area,
        showType: 'hidden',
        location:
          baseUrl +
          `/gxdatav/construction-bank/map-new?no_api=${hasApi}&data_time=${hasTime}&from_url=${baseUrl}/gxAdmin/home`,
        // "http://localhost/gxdatav/construction-bank/map-new?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['对公条线-公司业务'],
        num: 0,
      },
      {
        label: '对公活期资金流向全景图',
        icon: moneyImg,
        location:
          baseUrl +
          `/gxdatav/gx/amap/map-new?no_api=${hasApi}&data_time=${hasTime}&from_url=${baseUrl}/gxAdmin/home`,
        // "http://localhost/gxdatav/gx/amap/map?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['对公条线-公司业务'],
        num: 0,
      },
      {
        label: '“五篇大文章”主要指标仪表盘',
        icon: fiveImg,
        location:
          baseUrl +
          `/gxdatav/five-text/index?no_api=${hasApi}&data_time=${hasTime}&from_url=${baseUrl}/gxAdmin/home`,
        // "http://localhost/gxdatav/five-text/index?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['综合管理'],
        num: 0,
      },
      {
        label: '"三个一万亿"重大项目库',
        icon: threeImg,
        location:
          baseUrl +
          `/gxdatav/gx-ccb-map/index?no_api=${hasApi}&data_time=${hasTime}&from_url=${baseUrl}/gxAdmin/home`,
        // "http://localhost/gxdatav/five-text/index?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['综合管理'],
        num: 0,
      },
      {
        label: '个人金融驾驶舱大屏',
        icon: owserImg,
        location:
          'http://i.ccb.com/apps/91f50bc1d5814bd88688294c235b864a/index.html#/index/CD00002910/CD00002911/CD00002912',
        // "http://localhost/gxdatav/five-text/index?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['零售条线'],
        num: 0,
      },
      {
        label: '行长日报',
        icon: bankNav,
        location:
          baseUrl +
          `/gxdatav/gx-four-bank-navigation/index?no_api=${hasApi}&data_time=${hasTime}&from_url=${baseUrl}/gxAdmin/home`,
        // "http://localhost/gxdatav/five-text/index?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['综合管理'],
        num: 0,
      },
      {
        label: '金融科技部重点工作督办平台',
        icon: rollImg,
        location: baseUrl + `/gxAdmin/working?from_url=${baseUrl}/gxAdmin`,

        // "http://localhost/gxdatav/five-text/index?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['综合管理'],
        num: 0,
      },
    ],
  },
  {
    label: '对公条线',
    level: 2,
    list: [
      {
        label: '公司业务',
        list: [],
      },
      {
        label: '机构业务',
        list: [],
      },
    ],
  },
  {
    label: '零售条线',
    level: 2,
    list: [],
  },
  {
    label: '综合管理',
    level: 2,
    list: [],
  },
]);

export const supList = ref([
  {
    label: '全部',
    level: 1,
    list: [
      {
        label: '行长日报',
        icon: bankNav,
        location: baseUrl + '/supplemental-admission-item',
        path: '/supplemental-admission-item',
        // "http://localhost/gxdatav/five-text/index?from_url=${baseUrl}/gxAdmin/home",
        typesLine: ['综合管理'],
        num: 0,
      },
    ],
  },
  {
    label: '对公条线',
    level: 2,
    list: [
      {
        label: '公司业务',
        list: [],
      },
      {
        label: '机构业务',
        list: [],
      },
    ],
  },
  {
    label: '零售条线',
    level: 2,
    list: [],
  },
  {
    label: '综合管理',
    level: 2,
    list: [],
  },
]);
