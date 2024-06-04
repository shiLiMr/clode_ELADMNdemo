
	// cookie  存储设置
	import { useCookies } from "vue3-cookies";
	const { cookies } = useCookies();

	// import cookies from 'js-cookie'

	// let token = cookies.get("token");

	// 设置token
	function setToken(key:string ,value: any) {
		cookies.set(key,value);
	}

	// 获取token
	function getToken(key:string) {
		return cookies.get(key);
	}

	// 删除token
	function removeToken(key:string ) {
		return cookies.remove(key);
	}

export
{
	setToken,
	getToken,
	removeToken,
}
