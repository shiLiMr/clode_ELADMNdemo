<script setup lang="ts">
const props = defineProps(["menulist"])
const changeIndex = (index: string) => {
	let arr = index.split("/")
	arr.pop()
	return arr.join("/")
}
</script>
<script lang="ts">
export default {
	name: "Menu"
}
</script>
<template>
	<div>
		<template v-for="item in menulist" :key="item.path">
			<!-- 当没有子路由时渲染 -->
			<el-menu-item v-if="!item.children" style="background-color: #1f2d3d; margin: 0"
				:index="'/' + changeIndex(item.component)">
				<template #title>
					<el-icon>
						<component :is="item.meta.icon" />
					</el-icon>
					<span> {{ item.meta.title }}</span>
				</template>
			</el-menu-item>
			<!-- 当只有一个子路时 -->
			<el-menu-item v-if="item.children && item.children.length === 1" style="background-color: #1f2d3d; margin: 0"
				:index="item.children[0].path">
				<template #title>
					<el-icon>
						<component :is="item.children[0].meta.icon" />
					</el-icon>
					<span> {{ item.children[0].meta.title }}</span>
				</template>
			</el-menu-item>
			<!-- 当有多个子路由时 -->
			<el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
				<template #title>
					<el-icon>
						<component :is="item.meta.icon" />
					</el-icon>
					<span>{{ item.meta.title }}</span>
				</template>
				<Menu :menulist="item.children" ></Menu>
			</el-sub-menu>
		</template>
	</div>

</template>
<style lang='scss' scoped></style>
