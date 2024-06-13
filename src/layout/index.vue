<template>
	<div class="common-layout">
		<el-container>
			<!-- aside -->
			<layaside></layaside>
			<el-container direction="vertical">
				<!-- header -->
				<layoutheader></layoutheader>
				<!-- main -->
				<layoutmain></layoutmain>
			</el-container>
		</el-container>
	</div>
</template>
<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';

const layaside = defineAsyncComponent(() => import('./layoutaside/index.vue'))
const layoutheader = defineAsyncComponent(() => import('./layoutheader/index.vue'))
const layoutmain = defineAsyncComponent(() => import('./layoutmain/index.vue'))


</script>
<style lang='scss' scoped>

</style>
