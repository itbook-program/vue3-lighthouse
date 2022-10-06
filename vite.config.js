import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// 预加载
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    PkgConfig(),
    OptimizationPersist(),
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),
  ],
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      "components": path.resolve(__dirname, "src/components"),
      '@types': path.resolve(__dirname, 'src/types')
    }
  },
  css: {
    preprocessorOptions: { 
      scss: {
        additionalData: '@import"./src/pages/style/index.scss";',
      }
    }
  }
})
