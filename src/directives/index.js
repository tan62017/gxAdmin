import { isDown } from '@/utils'

function arrowFactory() {
  const update = (el, binding) => {
    const { value } = binding
    let cn = el.className
    cn = cn.replace(/arrow-up|arrow-down/, '')
    if (value === null || value === undefined || value === '-' || isNaN(value) || value === '0' || value === 0) {
      cn += ''
    } else if (isDown(value)) {
      cn += ' arrow-down'
    } else {
      cn += ' arrow-up'
    }
    el.className = cn
  }

  return {
    mounted: update
  }
}

export const arrow = arrowFactory()

export function registerDirectives(app) {
  app.directive('arrow', arrow)
}
