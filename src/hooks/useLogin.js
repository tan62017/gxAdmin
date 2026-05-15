import Dialog from '@/components/GoLogin/GoLogin.vue';

import { render, createVNode } from 'vue';

function useDialog(props) {
  const div = document.createElement('div');
  const vnode = createVNode(Dialog, {
    ...props,
    functional: true,
  });
  // debugger
  render(vnode, div);

  const instance = vnode.component;
  const open = () => {
    document.body.appendChild(div.firstElementChild);
    // instance?.proxy?.open();
  };
  const close = () => {
    instance?.exposed?.close();
  };

  return {
    open,
    close,
  };
}

export default useDialog;
