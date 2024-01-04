import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// element-plus 按需引入
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        ElementPlusResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: { // 构建为库。如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
      // __dirname的值是vite.config.ts文件所在目录
      entry: resolve(__dirname, 'packages/index.ts'),  // entry是必需的，因为库不能使用HTML作为入口。
      name: 'DailyUse', // 库的全局变量名称
      fileName: 'vue-daily-use' // 输出的包文件名，默认是package.json的name选项
    },
    rollupOptions: { // 配置rollup的打包选项
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    /** 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。
     默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
     注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。
     当设置为 'terser' 时必须先安装 Terser。（yarn add terser -D）
     */
    minify: 'terser',
    terserOptions: { // 在打包代码时移除 console、debugger 和 注释
      compress: {
        /* (default: false) -- Pass true to discard calls to console.* functions.
           If you wish to drop a specific function call such as console.info and/or
           retain side effects from function arguments after dropping the function
           call then use pure_funcs instead
        */
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false // 删除注释
      }
    }
  }
})
