/**风状态码校验 */
enum Code{
	/**请求参数错误 */
	PARAM_ERROR = 400,
	/**请求资源未授权 */
	UNAUTHORIZED = 401,
	/**请求资源不存在 */
	NOT_FOUND = 404,
	/**服务器报错 */
	SERVER_ERROR = 500,
}

/**获取代理标识 */
const Target = import.meta.env.VITE_API_BASE_API

/**axios 请求根目录 */
const Url ='./'

/**超过时间 */
const Timeout=3600 * 1000

/**axios 请求跨域凭证 */
const withCredentials=true

/**配置请求头 header */
const headers={
  'Content-Type': 'application/json;charset=UTF-8'
}


/**返回值TS 类型校验 */
interface ResponseResult<T>{
	content:T,
	totalElements:number,
}

export{
	Code,
	Target,
	Url,
	Timeout,
	withCredentials,
	headers,

}
export  type
{ResponseResult}
