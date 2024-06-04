
import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth',()=> {
	const password = ref('')
	const rsaPassword = ref('')

	return{
		password,rsaPassword
	}
})
