import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//@ts-ignore
const env = loadEnv(process.env.NODE_ENV, process.cwd());

/**
 * 一般用来配置我们服务的一些配置东西
 * 比如代理,启动项目的路径名称,启动项目的页面,端口号
 * 公司的环境都有哪些
 * 因为所处的环境不一样,环境的配置变量也不一样
 * 比如: 本地开发环境: 后端的域名: http://meituan.development.com
 * 比如: 测试环境: 后端的域名: http://meituan.tesing.com
 * 比如: 灰度: 后端的域名: http://meituan.stage.com
 * 比如: 线上: 后端的域名: http://meituan.com
 * 1. 本地开发环境 development
 * 2. 测试环境: testing
 * 3. 灰度环境(备机,半线上): stage
 * 4. 线上环境(全量): production
 */
// https://vitejs.dev/config/
export default defineConfig({
  /**修改打包跟目录路径 */
  build: {
    /**打包输出文件夹 */
    outDir: 'distsssss',
    /**打包输出的静态资源文件夹 */
    assetsDir: "aaaa",
  },
  /**配置跨域和端口代理 */
  server: {
    // 端口号
    // 一般前端配置端口号的时候,不配置80端口,选择其他端口进行配置,有好多后台服务,默认只能启动80端口
    port: 5173,
    //  如果多台电脑处在同一个局域网下,配置0.0.0.0后,别的电脑通过当前电脑ip://端口号,可以直接访问当前电脑上运行的项目
    host: "0.0.0.0",
    // 当前端口号被占用的时候,直接退出服务,不用新增端口
    strictPort: true,
    // 配置跨域
    proxy: {
      /**代理标识
       * api: https: //www.baidu.com
      */
      [env.VITE_API_BASE_API]: {
        /**代理路径 */
        target: env.VITE_API_BASE_URL,
        /**是否开启跨域地理 */
        changeOrigin: true,
        /**路径重写 */
        //rewrite: (path) => path.replace(/^\/api/, ''),
        rewrite:
          (path) => path.replace(new RegExp('^' + env.VITE_API_BASE_API), '')
      }
    }
  },
  /**
   * plugins: 插件,用来帮我们处理一些功能的作用,比如说: v3自动引入语法,可以自动识别
   * 我们使用了v3那些语法,帮我们自动引入
   * loader: js,css 将浏览器无法识别的语言,处理成可识别语言
   *
   */
  /**还缺一个loader的配置 */
  // vue-loader
  /**
   * 浏览器只能识别.js css img html
   * .vue .scss .less .svg
   * vue-loader
   * css-loader
   * babel-loader
   * style-loader
   * sass-loader
   * less-loader
   * url-loader
   * ts-loader/typeScrit-loader
   * svg-loader
   * 总结一下:
   * 1. webpack和vite的区别
   *      1.启动速度打包速度都特别快
   * 2. 为什么vite是下一代的打包工具,其他库的兼容性还不是那么好
   * 3. 配置vite的常用命令
   */

  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "@component": fileURLToPath(new URL('./src/components', import.meta.url))
    }
  }
})
