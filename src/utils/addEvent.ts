import { setHtmlFontSize } from './index';
import router from '@/router';
import useDialog from '@/hooks/useLogin';
setHtmlFontSize();

window.addEventListener('resize', () => {
  setHtmlFontSize();
});

window.addEventListener('unauthorized', () => {
  const cumDialog = useDialog({
    title: '登录过期',
    delay: 3,
    submit: () => {
      console.log('submit');
    },
    close: () => {
      console.log('close');
    },
  });
  const route = router.currentRoute.value;
  console.log(route);

  if (route.path !== '/login') {
    cumDialog.open();
  }
});
