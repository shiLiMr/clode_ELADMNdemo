
import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useisCollStore = defineStore('isColl',()=> {
	const isCollapse=ref(false)//默认展开


	return{
		isCollapse,
	}
})
