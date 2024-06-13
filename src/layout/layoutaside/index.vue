<template>
	<el-aside style="background-color: #304156;transition: all .3s ease-in-out;" :width="stores.isCollapse ? '45px' : '200px'" >
		<div class="logo">
			<img src="https://eladmin.vip/demo/static/img/logo.381d6a3e.png" alt="">
			<h3 v-if="!stores.isCollapse" style="transition: all .3s ease;">ELADMIN-后台管理</h3>
		</div>
		<!-- menulist -->
		<el-menu router  active-text-color="#ffd04b" background-color="transparent"  class="el-menu-vertical-demo"
			:default-active="$route.path" text-color="#fff" :collapse="stores.isCollapse">
			<el-menu-item index="/dashboard">
				<el-icon>
					<ElemeFilled />
				</el-icon>
				<span>首页</span>
			</el-menu-item>

			<Menu :menulist="menulist" ></Menu>
		</el-menu>
	</el-aside>
</template>
<script setup lang='ts'>
import { ref ,defineAsyncComponent} from 'vue'
import { getMenuListApi } from '@/api/login/index'
import type { RequestMenulist } from '@/api/login/types'
const Menu = defineAsyncComponent(() => import('./component/menus.vue'))

import {useisCollStore} from "@/stores/isColl"
const stores = useisCollStore()

const menulist = ref<any>([])
const getmenulist = async () => {
	let res = await getMenuListApi()
	console.log(res);
	menulist.value = res
}
getmenulist()

</script>
<style lang='scss' scoped>
.logo {
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	height: 60px;

	>img {
		width: 45px;
	}

	h3 {
		white-space: nowrap;
		font-size: 15px;
	}
}
</style>
