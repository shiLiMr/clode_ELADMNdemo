<template>
	<div class="login">
		<div class="login-main">
			<h3>ELADMIN 后台管理系统</h3>
			<el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
				class="demo-ruleForm" status-icon>
				<el-form-item prop="username">
					<el-input v-model="ruleForm.username" prefix-icon="user" placeholder="请输入用户名" />
				</el-form-item>
				<el-form-item prop="password" style="margin: 20px 0;">
					<el-input v-model="ruleForm.password" prefix-icon="lock" show-password placeholder="请输入密码"
						@change="encryptPassword" />
				</el-form-item>
				<el-form-item prop="code">
					<div class="img">
						<el-input v-model="ruleForm.code" prefix-icon="CircleCheckFilled" placeholder="验证码" />
						<img :src="codeimg" alt="" @click="getCode()">
					</div>
				</el-form-item>
				<el-form-item style="margin: 20px 0;">
					<el-checkbox v-model="ruleForm.rememberMe" label="记住我" size="large" />
				</el-form-item>
				<el-form-item>
					<el-button style="width: 100%;" type="primary" @click="submitForm">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { getCodeApi, loginApi } from '../../api/login/index'
// import { Base64 } from 'js-base64';
import { encrypt } from '../../utils/rsaEncrypy.js'
import { useRouter } from 'vue-router'
const router = useRouter()

import {
	setToken,
	getToken,
	removeToken,
} from '@/utils/auth'

interface loginParams {
	code: string,
	password: string,
	username: string,
	uuid: string,
	rememberMe: boolean
}

const ruleForm = ref<loginParams>({
	code: '',
	password: '123456',
	username: 'admin',
	uuid: '',
	rememberMe: false,
})
const codeimg = ref('')
const getCode = () => { // 获取验证码
	ruleForm.value.uuid = ''
	getCodeApi().then((res: any) => {
		console.log(res);
		codeimg.value = res.img
		ruleForm.value.uuid = res.uuid
	})
}
getCode()
const encryptPassword = () => { // 存储密码
	setToken('Copypassword', ruleForm.value.password)
}
encryptPassword() //进去就存储
const ruleFormRef = ref<FormInstance>()
const rember = () => { // 记住密码
	setToken('password', ruleForm.value.password)
	setToken('username', ruleForm.value.username)
	setToken('rememberMe', ruleForm.value.rememberMe)
}
const nonrember = () => { // 忘记密码
	removeToken('password')
	removeToken('username')
	removeToken('rememberMe')
}
const rules = ref<FormRules<loginParams>>({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' },],
	code: [{ required: true, message: '请输入验证码', trigger: 'blur' },]
})

const submitForm = () => {
	ruleFormRef.value?.validate((valid: boolean) => {
		if (!valid) return
		console.log(ruleForm.value);
		let user = {
			username: ruleForm.value.username,
			password: ruleForm.value.password,
			code: ruleForm.value.code,
			uuid: ruleForm.value.uuid
		}
		if (user.password === getToken('Copypassword')) {
			  user.password = encrypt(user.password) as  string
				console.log(user.password);
		}

		// if (ruleForm.value.rememberMe) {
		// 	rember()
		// } else {
		// 	nonrember()
		// }

		console.log(user);
		loginApi(user).then(res => {
			console.log(res);
			setToken('Authorization',res.token) // 存储token
			router.replace({path:'/'})
			ElMessage.success('登录成功')
		}).catch(err=>{
			ElMessage.error(err.message)
		})
	})
}


</script>
<style lang='scss' scoped>
.img {
	display: flex;
	align-items: center;

	.el-input {
		width: 230px !important;
	}

	img {
		margin-left: 5px;
		height: 32px;
	}
}

* {
	margin: 0;
	padding: 0;
}

.login {
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background-image: url('https://eladmin.vip/demo/static/img/background.4a692a58.jpeg');
	background-size: cover;

	.login-main {
		width: 400px;
		background-color: #fff;
		border-radius: 9px;
		padding: 20px;
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		h3 {
			text-align: center;
			margin-bottom: 20px;
		}
	}
}
</style>
