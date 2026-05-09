import { onUnmounted } from 'vue';
import { setHtmlFontSize } from './index';
setHtmlFontSize();

window.addEventListener('resize', () => {
  setHtmlFontSize();
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    setHtmlFontSize();
  });
});
