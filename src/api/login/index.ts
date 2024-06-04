import http from '@/utils/httpRequest'

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
