import { isDown } from '@/utils';

const resizeOb = new WeakMap();

const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = resizeOb.get(entry.target);
    handler &&
      handler({
        width: entry.borderBoxSize[0].inlineSize,
        height: entry.borderBoxSize[0].blockSize,
      });
  }
});

function arrowFactory() {
  const update = (el, binding) => {
    const { value } = binding;
    let cn = el.className;
    cn = cn.replace(/arrow-up|arrow-down/, '');
    if (
      value === null ||
      value === undefined ||
      value === '-' ||
      isNaN(value) ||
      value === '0' ||
      value === 0
    ) {
      cn += '';
    } else if (isDown(value)) {
      cn += ' arrow-down';
    } else {
      cn += ' arrow-up';
    }
    el.className = cn;
  };

  return {
    mounted: update,
  };
}

function resizeFactory() {
  const update = (el, binding) => {
    const { value } = binding;
    ob.observe(el);
    resizeOb.set(el, binding.value);
  };

  const destory = (el, binding) => {
    ob.unobserve(el);
  };
  return {
    mounted: update,
    unmounted: destory,
  };
}

export const arrow = arrowFactory();

export function registerDirectives(app) {
  app.directive('arrow', arrow);
  app.directive('resize', resizeFactory());
}
