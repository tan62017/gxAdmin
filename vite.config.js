import { URL, fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import unocss from 'unocss/vite';
import Icons from 'unplugin-icons/vite';
import iconsResolver from 'unplugin-icons/resolver';
import { toResolver } from './resolvers';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: '/gxAdmin',
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
        },
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3',
      }),
      vueJsx(),
      unocss(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        eslintrc: {
          enabled: true,
        },
        dts: true,
        resolvers: [ElementPlusResolver(), toResolver],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          iconsResolver({
            prefix: 'Icon',
          }),
        ],
        dirs: ['src/components'],
        dts: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': resolve(__dirname, 'src/components'),
      },
    },
    build: {
      outDir: 'gxAdmin',
      target: ['es2016', 'chrome68'],
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    server: {
      // 是否开启 https
      https: false,
      open: true,
      // 端口号
      port: 8090,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      // open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
    },
  };
});
