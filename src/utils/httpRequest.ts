//  封装axios
/**
 * 第一步： 下载
 * 第二部：引入
 * 第三部：调用方法 创建axios实例
 * 第四部：配置根目录 超时时间 开启跨域凭证 配置headers请求头
 * 第五步：实例化当前配置，挂在拦截器，配置请求拦截器和响应拦截器
 *  			（客户端向服务端发起请求）
 *         请求拦截器：配置token 配置headers请求方式
 *         （服务端向客户端返回数据，401过期，404，500，）
 *
 *         请求成功，直接返回当前数据，请求失败，根据状态码，封装报错，若为401，就跳转到登录页面，让其重新登陆
 *         响应拦截器：1、请求成功，retrun当前值
 *                    2、请求失败，根据状态码，封装报错，并需要清空token和本地存储的个人信息
 * 第六步：和环境变量关联起来
 *         （因为环境是多变的，代理标识，请求头也是多变的，axios.get('/api/xxx/xxx)  ）
 *          vite提供给我们一个方法 import.meta.env. 可通过此方法获取环境变量中配置的各种代理标识，
 *          根据不同的环境变量，配置不同的代理标识，
 *          封装一个人函数，将接口与代理标识拼接在一起
 *
 * 第七步：将get,post,put,delete等请求方法进行封装
 *         根据查看接口，发现基本符合返回值是 content，total 只不过具体内容不一样，可使用泛型进行校验<T,D,A>
 *
 * 第八步：导出当前方法，并且挂载至全局
 *
 *  **/

import {setToken,getToken,removeToken,} from './auth'
import axios, { type AxiosRequestConfig, type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
import * as TS from "./httpTypes"

const Config = {
	// 配置根目录
	baseURL: TS.Url,
	// 超时时间
	timeout: TS.Timeout,
	// 开启跨域凭证
	withCredentials: TS.withCredentials,
	// 配置headers请求头 方式
	headers: TS.headers,
}


class Request {
	serves: AxiosInstance
	constructor(config: AxiosRequestConfig) {
		this.serves = axios.create(config)
		/**
		 *请求拦截器
		 * 客户端发送请求--> [请求拦截器]--> 服务器
		 * toekn 校验 （JWT）：接收服务器返回的token，并将其存储至 vuex本地存储当中
		 *
		 * **/
		this.serves.interceptors.request.use((config: InternalAxiosRequestConfig) => {
			// 配置token
			config.headers['Authorization'] = getToken('token') // 调用封装好的token
			return config
		}, (error: AxiosError) => {
			// 请求报错
			return Promise.reject(error)
		})

		/**
		 * 响应拦截器
		 *  **/
		this.serves.interceptors.response.use((response) => {
			// 请求成功，直接返回当前数据
			// 要在此进行404检验
			const { data, config } = response // 结构
			// if (data.code == TS.Code.UNAUTHORIZED) {
			// 	// 清除token
			// 	removeToken()
			// 	// 清除本地存储的个人信息
			// 	// 跳转到登录页面
			// 	router.push('/login')
			// 	return Promise.reject(data)
			// }// 全局错误信息拦截 防止下载文件得时候返回数据流，没有code，直接报错
			return data
		}, (error: AxiosError) => {
			let title:string = ''
			// 先判断返回的是否是401,如果是401就跳转到登录页面,如果不是,其他返回状态,根据状态报错
			const { response } = error
			if(error&& response){
				// 401,token失效
				if(response.status == TS.Code.UNAUTHORIZED){
					// 跳转到登录页面
					router.push('/login')
				}
				switch(
					response.status // 跨域存在获取不到状态码情况
				){
					case TS.Code.PARAM_ERROR:
						title = '请求参数错误'
						break
					case TS.Code.UNAUTHORIZED:
						title = '资源未授权，请登录'
						break
					case TS.Code.NOT_FOUND:
						title = '未找到请求资源'
						break
					case TS.Code.SERVER_ERROR:
						title = '服务器错误'
						break

					default:
						title = response.status.toString()
				}
				return ElMessageBox.alert(
					title,'提示',{
						confirmButtonText:'确定',
						type:'warning'
					}
				)
			}else{
				// 跨域或取不到状态码或 其他状态进行处理
				return ElMessageBox.alert(
					'未知错误，请联系管理员','提示',{
						confirmButtonText:'确定',
						type:'error'
					}
				)
			}

		})
	}
	/****
	 * 封装一个多环境变量和请求代理标识拼接的字样
	 * 将代理标识和接口拼接到一起
	 *
	 */
	addUrl(url:string){
		return TS.Target + url
	}

	/**
	 *封装get请求方法
	 *
	 * 入参：接口需要的参数
	 * 出参：接口返回值
	 * T，泛型：根据具体情况，进行类型约束
	 *
	 */
	get<T>(url:string,params?:Object):Promise<T>{
		return this.serves.get(this.addUrl(url),{params})
	}
	post<T>(url:string,params?:Object):Promise<T>{
		return this.serves.post(this.addUrl(url),params)
	}
	put<T>(url:string,params?:Object):Promise<T>{
	  return this.serves.put(this.addUrl(url),params)
	}
	delete<T>(url:string,params?:Object):Promise<T>{
	  return this.serves.delete(this.addUrl(url),{params})
	}
}

const http = new Request(Config)


export default http
