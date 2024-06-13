import http from '@/utils/httpRequest'
import type {RequestMenulist} from './types'

/**登录 */
interface loginParams {
    code: string,
    password: string,
    username: string,
    uuid: string
}
interface loginResult {
	token: string,
	user: object
}
export const loginApi=(data:loginParams)=>http.post<loginResult>('/auth/login',data)

// 验证码  /auth/code
export const getCodeApi=()=>http.get<{img:string,uuid:string}>('/auth/code')


// 获取menu 信息 /api/menus/build

export const getMenuListApi=()=>http.get<RequestMenulist>('/api/menus/build')
