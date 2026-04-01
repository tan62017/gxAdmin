export const systemLouy = [
  {
    id: 1,
    name: '主题名称改修',
    icon: '',
    path: '/system-setting-titles-edit',
  },
];

export const bigVisOptions = [
  {
    label: '大屏：',
    key: 'name',
    type: 'input',
    placeholder: '请输入大屏名称',
  },
  {
    label: '地址：',
    key: 'location',
    type: 'input',
    placeholder: '请输入大屏访问地址',
  },
  {
    label: '状态：',
    key: 'status',
    type: 'switch',
    placeholder: '',
  },
  {
    label: '分类：',
    key: 'type',
    type: 'select',
    placeholder: '请选择分类',
    options: [
      {
        label: '对公线',
        value: 1,
      },
      {
        label: '业务线',
        value: 2,
      },
    ],
  },
  {
    label: '缩略图：',
    key: 'img',
    type: 'upload',
    placeholder: '',
    height: '130px',
  },
  {
    label: '所属机构：',
    key: 'unit',
    type: 'select',
    placeholder: '请选择机构',
    options: [
      {
        label: '机构部',
        value: 1,
      },
      {
        label: '金融部',
        value: 2,
      },
    ],
  },
  {
    label: '简介：',
    key: 'intro',
    type: 'textarea',
    placeholder: '请输入大屏介绍',
    height: 'auto',
    width: '100%',
  },
];
