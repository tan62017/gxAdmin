import { onUnmounted } from 'vue'

export default function useAutoScroll(el, table) {
  let isMouseEnter = false
  let raf = null

  function autoScroll() {
    if (!isMouseEnter && el) {
      if (el.scrollHeight > el.clientHeight) {
        if (el.scrollTop + el.clientHeight === el.scrollHeight) {
          el.scrollTop = 0
        }
        el.scrollTop += 1
      }
    }

    raf = window.requestAnimationFrame(autoScroll)
  }

  table.addEventListener('mouseenter', () => {
    isMouseEnter = true
  })

  table.addEventListener('mouseleave', () => {
    isMouseEnter = false
  })

  autoScroll()

  onUnmounted(() => {
    raf = window.cancelAnimationFrame(raf)
  })
}
