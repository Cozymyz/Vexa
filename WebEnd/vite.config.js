/*
 * @Author: Meiyizhi
 * @Date: 2025-06-05 22:52:25
 * @LastEditTime: 2025-06-08 23:15:28
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
			imports: ['vue', 'vue-router'],
			dts: 'src/auto-imports.d.ts', // 生成自动导入的声明文件
		}),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass', // 使用更高效的 SASS 样式
				})
			],
			dts: 'src/components.d.ts', // 生成组件声明文件
		})
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"), // 设置为@ 则使用时为 "@/components/index.module.css"
			"@components": resolve(__dirname, "./src/components"), // 使用时为 "@components/HelloWorld.vue"
		},
	},
	server: {
		// host: '0.0.0.0',
		port: 8080, // 本地服务端口
		https: false,
		strictPort: true ,// 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
		proxy: { // 代理
			'/api': {
				target: 'http://localhost:7788/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	}
})
