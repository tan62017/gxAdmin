import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { createRules, createShortCuts } from '@tonyptang/unocss-config'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  rules: [
    ...createRules(),
    [
      /lh-(.*)/,
      ([_, value]) => {
        return {
          'line-height': value
        }
      }
    ]
  ],
  shortcuts: {
    ...createShortCuts()
  }
})
