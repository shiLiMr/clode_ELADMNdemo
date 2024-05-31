import { fileURLToPath, URL } from "node:url"

import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
// @ts-ignore
const env= loadEnv(process.env.NODE_ENV, process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
	// 修改打包根目录路径
	build:{
		// 打包输出文件夹
		outDir: 'dist',
		// 打包输出静态资源文件名
		assetsDir: 'static',
	},
	server:{
		// 服务端口
		//一般前端配置端口号的时候,不配置80端口,选择其他端口进行配置,有好多后台服务,默认只能启动80端口
		port: 3000,
		//如果多台电脑处在同一个局域网下,配置0.0.0.0后,别的电脑通过当前电脑ip://端口号,可以直接访问当前电脑上运行的项目
		host: '0.0.0.0',
		//当前端口号被占用的时候，直接退出服务，不用新增端口
		strictPort: true,
		//  跨域代理配置
		proxy:{
			[env.VITE_API_BASE_API]:{
				// 代理目表基准地址
				target: env.VITE_API_BASE_URL,
				// 是否开启跨域
				changeOrigin:true,
				// 路径重写
				// rewrite:(path) => path.replace(/^\/api/,''),
				rewrite:(path) =>path.replace( new RegExp('^'+env.VITE_API_BASE_API),'')
			}
		}
	},
  plugins: [vue(), vueJsx()],

  resolve: {
		// 设置路径别名
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
			"@components":fileURLToPath(new URL("./src/components", import.meta.url)),
    }
  }
})
