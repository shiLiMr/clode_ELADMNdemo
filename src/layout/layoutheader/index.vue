<template>
	<el-header style="height: 100px;">
		<div class="header">
			<div class="headerleft">
				<el-icon @click="stores.isCollapse = !stores.isCollapse">
					<component :is="stores.isCollapse ? 'Expand' : 'Fold'"></component>
				</el-icon>
				<!-- 面包屑 -->
				<el-breadcrumb separator="/">
					<el-breadcrumb-item v-for="(item, index) in menus" :key="index">{{ item.meta.title }}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="headerright">
				<div class="headerSearch">
					<el-icon fize="20" size="20" @click="Searchdemo = !Searchdemo">
						<Search />
					</el-icon>
					<el-input v-model="Searchinput" v-if="Searchdemo" style="width: 200px; transition: width .5s ease;"
						placeholder="请输入" />
				</div>
				<div>
					<el-tooltip class="box-item" effect="dark" content="项目文档" placement="bottom">
						<el-icon size="20">
							<HelpFilled />
						</el-icon>
					</el-tooltip>
				</div>
				<div>
					<el-tooltip class="box-item" effect="dark" content="全屏缩放" placement="bottom">
						<el-icon @click="toggle()" size="20">
							<FullScreen />
						</el-icon>
					</el-tooltip>
				</div>
				<div>
					<el-tooltip class="box-item" effect="dark" content="布局设置" placement="bottom">
						<el-icon size="20">
							<Tools />
						</el-icon>
					</el-tooltip>
				</div>
				<el-switch v-model="isDark" class="mt-2" style="--el-switch-on-color: #333333;
             --el-switch-off-color: #dcdfe6" inline-prompt active-icon="Moon" size="large" inactive-icon="Sunny" />
				<el-dropdown trigger="click">
					<div class="headerAvatar">
						<el-avatar shape="square" :size="50" src="https://eladmin.vip/avatar/avatar.jpeg" />
						<el-icon>
							<CaretBottom />
						</el-icon>
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>布局设置</el-dropdown-item>
							<el-dropdown-item>个人中心</el-dropdown-item>
							<el-dropdown-item divided>退出登陆</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
		<!--  -->
		<!-- <el-tabs v-model="activeName" type="card" editable class="demo-tabs" >
			<el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
				{{ item.content }}
			</el-tab-pane>
		</el-tabs> -->
	</el-header>
</template>
<script setup lang='ts'>
import { useisCollStore, } from "@/stores/isColl"
const stores = useisCollStore()
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, enter, exit, toggle } = useFullscreen()
// console.log(route);
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()

const Searchdemo = ref(false)
const Searchinput = ref('')
const menus = ref<any>([])
watch(route, (newval, oldval) => {
	console.log(newval)
	menus.value = newval.matched.filter(item => item.meta.title)
	// console.log(menus.value)
}, { immediate: true, })

</script>
<style lang='scss' scoped>
.headerSearch {
	display: flex;
	align-items: center;
}

.headerAvatar {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.header {
	height: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 20px;

	.headerleft {
		display: flex;
		align-items: center;

		.el-icon {
			margin-right: 12px;
		}
	}

	.headerright {
		display: flex;
		align-items: center;

		>div {
			margin-right: 15px;
		}
	}
}
</style>
