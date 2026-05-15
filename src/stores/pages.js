import { defineStore } from 'pinia';
import { getPagesList as _getPagesList } from '@/api/pages';

// class Token {
//   static SUPER = 'super64f549fed8a14057926358a635f'
// }

export const usePagesStore = defineStore('pages', () => {
  const infoPagesList = ref([]);
  const navList = ref([]);
  const getPagesList = async () => {
    const res = await _getPagesList();

    if (res.code === 200) {
      infoPagesList.value = res.data.data || [];
      navList.value = processList(res.data.data);
    }
  };
  getPagesList();
  return { getPagesList, infoPagesList, navList };
});

function processList(data) {
  const reList = [
    {
      label: '全部',
      level: 1,
      list: data,
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
  ];
  if (Array.isArray(data)) {
    data.forEach((i) => {
      let typeArr = [];
      i.types = i.typesLine.map((type) => {
        typeArr = type?.split('-');

        const navItem = reList.find((nav) => nav.label === typeArr[0]);

        if (navItem) {
          if (typeArr.length === 1) navItem.list.push(i);
          else {
            typeArr.slice(1).forEach((b) => {
              const navB = navItem.list.find((navChild) => navChild.label === b);
              if (navB) {
                navB.list.push(i);
              }
            });
          }
        }

        return typeArr[0];
      });
      return i;
    });
  }
  return reList;
}
