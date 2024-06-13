<template>
	中国地图
	<!--

   1. 绘制中国地图
    第一步: 先准备好中国地图的json数据,也就是经纬度的数据集合
    第二步: 在assets文件夹下面,新建json文件夹,放置我们中国json数据
    第三步:  * 准备一个盒子,设置宽和高
            * 实例化div盒子,
            * 注册可用的地图，只在 geo 组件或者map图表类型中使用
            * 设置图表 option
 -->
	<div ref="chinaMap" style="width: 100vw;height: 100vh;" id="chinaMap"></div>
</template>
<script setup lang='ts'>
import mapData from '../../assets/chinamap/china.json'
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chinaMap = ref()

onMounted(() => {
	// 1. 因为要获取dom元素,所以需要再实例挂在后,才能获取
	// 2. 实例化当前echarts图标
	// 3. 使用map类型的地图,进行注册地图
	// 4. 设置图标options选项
	const myChart = echarts.init(chinaMap.value)
	echarts.registerMap('china', mapData as any) //用导入的json文件注册一个name:china的地图组件
	let option = {
		// 3.
		geo: {
      show: true,
      map: 'china',
      label: {
        shiow: true
      },
      itemStyle: {
        normal: {
          areaColor: 'rgba(37, 157, 255, 0.2)'
        }
      },
      regions: [
        {
          name: '青海', //与china.js对应的省份名称
          itemStyle: {
            areaColor: 'pink' //省份背景色
          }
        },
        {
          name: '天津', //与china.js对应的省份名称
          itemStyle: {
            areaColor: 'blue' //省份背景色
          }
        }
      ]
    }

		// dataRange: {
		// 	x: '-1000 px', // 图例横轴位置
		// 	y: '-1000 px', // 图例纵轴位置
		// 	splitList: [
		// 		{ start: 1, end: 1, label: '北京', color: '#cfc5de' },
		// 		{ start: 2, end: 2, label: '天津', color: '#f1ebd1' },
		// 		{ start: 3, end: 3, label: '上海', color: '#feffdb' },
		// 		{ start: 4, end: 4, label: '重庆', color: '#e0cee4' },
		// 		{ start: 5, end: 5, label: '河北', color: '#fde8cd' },
		// 		{ start: 6, end: 6, label: '河南', color: '#e4f1d7' },
		// 		{ start: 7, end: 7, label: '云南', color: '#fffed7' },
		// 		{ start: 8, end: 8, label: '辽宁', color: '#e4f1d7' },
		// 		{ start: 9, end: 9, label: '黑龙江', color: '#e4f1d7' },
		// 		{ start: 10, end: 10, label: '湖南', color: '#fffed7' },
		// 		{ start: 11, end: 11, label: '安徽', color: '#fffed8' },
		// 		{ start: 12, end: 12, label: '山东', color: '#dccee7' },
		// 		{ start: 13, end: 13, label: '新疆', color: '#fffed7' },
		// 		{ start: 14, end: 14, label: '江苏', color: '#fce8cd' },
		// 		{ start: 15, end: 15, label: '浙江', color: '#ddceeb' },
		// 		{ start: 16, end: 16, label: '江西', color: '#e4f1d3' },
		// 		{ start: 17, end: 17, label: '湖北', color: '#fde8cd' },
		// 		{ start: 18, end: 18, label: '广西', color: '#fde8cd' },
		// 		{ start: 19, end: 19, label: '甘肃', color: '#fde8cd' },
		// 		{ start: 20, end: 20, label: '山西', color: '#fffdd6' },
		// 		{ start: 21, end: 21, label: '内蒙古', color: '#ddcfe6' },
		// 		{ start: 22, end: 22, label: '陕西', color: '#fad8e9' },
		// 		{ start: 23, end: 23, label: '吉林', color: '#fce8cd' },
		// 		{ start: 24, end: 24, label: '福建', color: '#fad8e8' },
		// 		{ start: 25, end: 25, label: '贵州', color: '#fad8e8' },
		// 		{ start: 26, end: 26, label: '广东', color: '#ddcfe8' },
		// 		{ start: 27, end: 27, label: '青海', color: '#fad8e9' },
		// 		{ start: 28, end: 28, label: '西藏', color: '#ddcfe6' },
		// 		{ start: 29, end: 29, label: '四川', color: '#e4f1d5' },
		// 		{ start: 30, end: 30, label: '宁夏', color: '#fefcd5' },
		// 		{ start: 31, end: 31, label: '海南', color: '#fad8e9' },
		// 		{ start: 32, end: 32, label: '台湾', color: '#fce8cd' },
		// 		{ start: 33, end: 33, label: '香港', color: '#dc9bbb' },
		// 		{ start: 34, end: 34, label: '澳门', color: '#e0f7cc' }
		// 	]
		// }, // 各省地图颜色；start：值域开始值；end：值域结束值；label：图例名称(和json数据要保持一致)；color：自定义颜色值；

		//   2.
		// series: [
		//   {
		//     name: '中国地图',
		//     type: 'map',
		//     // mapType: 'china',
		//     map: 'china',
		//     label: {
		//       normal: {
		//         show: true, // 显示省份标签
		//         textStyle: {
		//           color: 'blue'
		//         } // 省份标签字体颜色
		//       },
		//       emphasis: {
		//         // 对应的鼠标悬浮效果
		//         show: false,
		//         textStyle: {
		//           color: '#800080'
		//         }
		//       }
		//     },
		//     aspectScale: 0.75,
		//     zoom: 1.2,
		//     itemStyle: {
		//       normal: {
		//         borderWidth: 0.5, // 区域边框宽度
		//         borderColor: '#009fe8', // 区域边框颜色
		//         areaColor: 'pink' // 区域颜色
		//       },
		//       emphasis: {
		//         borderWidth: 0.5,
		//         borderColor: '#4b0082',
		//         areaColor: '#ffdead'
		//       }
		//     },
		//     data: [
		//       { name: '北京', selected: false, value: 1 },
		//       { name: '天津', selected: false, value: 2 },
		//       { name: '上海', selected: false, value: 3 },
		//       { name: '重庆', selected: false, value: 4 },
		//       { name: '河北', selected: false, value: 5 },
		//       { name: '河南', selected: false, value: 6 },
		//       { name: '云南', selected: false, value: 7 },
		//       { name: '辽宁', selected: false, value: 8 },
		//       { name: '黑龙江', selected: false, value: 9 },
		//       { name: '湖南', selected: false, value: 10 },
		//       { name: '安徽', selected: false, value: 11 },
		//       { name: '山东', selected: false, value: 12 },
		//       { name: '新疆', selected: false, value: 13 },
		//       { name: '江苏', selected: false, value: 14 },
		//       { name: '浙江', selected: false, value: 15 },
		//       { name: '江西', selected: false, value: 16 },
		//       { name: '湖北', selected: false, value: 17 },
		//       { name: '广西', selected: false, value: 18 },
		//       { name: '甘肃', selected: false, value: 19 },
		//       { name: '山西', selected: false, value: 20 },
		//       { name: '内蒙古', selected: false, value: 21 },
		//       { name: '陕西', selected: false, value: 22 },
		//       { name: '吉林', selected: false, value: 23 },
		//       { name: '福建', selected: false, value: 24 },
		//       { name: '贵州', selected: false, value: 25 },
		//       { name: '广东', selected: false, value: 26 },
		//       { name: '青海', selected: false, value: 27 },
		//       { name: '西藏', selected: false, value: 28 },
		//       { name: '四川', selected: false, value: 29 },
		//       { name: '宁夏', selected: false, value: 30 },
		//       { name: '海南', selected: false, value: 31 },
		//       { name: '台湾', selected: false, value: 32 },
		//       { name: '香港', selected: false, value: 33 },
		//       { name: '澳门', selected: false, value: 34 }
		//     ] // 各省地图颜色数据依赖value
		//   }
		// ]
		//   1.
		// series: [
		// 	{
		// 		name: '中国地图',
		// 		type: 'map',
		// 		map: 'china', // 这个是上面注册时的名字哦，registerMap（'这个名字保持一致'）
		// 		label: {
		// 			show: true
		// 		}
		// 	}
		// ],
	}
	// 显示地图
	myChart.setOption(option)
	// 自适应
	window.addEventListener("resize", function () {
		myChart.resize();
	});
})


</script>
<style lang='scss' scoped></style>
