<template>
	<div class="homes">
		<div class="one">
			<el-row :gutter="20">
				<el-col :span="6">
					<el-card>
						<div class="shang colorone">
							<div class="icon">
								<el-icon color="#40c9c6" size="45px">
									<Avatar />
								</el-icon>
							</div>
							<div>
								<p class="text">New Visits</p>
								<P class="number">102400</P>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card>
						<div class="shang colortow">
							<div class="icon">
								<el-icon color="#36a3f7" size="45px">
									<Comment />
								</el-icon>
							</div>
							<div>
								<p class="text">New Visits</p>
								<P class="number">102400</P>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card>
						<div class="shang colorthree">
							<div class="icon">
								<el-icon color="#f4516c" size="45px">
									<Iphone />
								</el-icon>
							</div>
							<div>
								<p class="text">New Visits</p>
								<P class="number">102400</P>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="6">
					<el-card>
						<div class="shang colorfour">
							<div class="icon">
								<el-icon color="#34bfa3" size="45px">
									<ShoppingCart />
								</el-icon>
							</div>
							<div>
								<p class="text">New Visits</p>
								<P class="number">102400</P>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="tow">
			<el-row>
				<el-col :span="24">
					<el-card style="margin: 12px 0;">
						<div ref="chartts" style="width: 100%; height: 300px;"></div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="three">
			<el-row class="row-bg" :gutter="15" justify="space-evenly">
				<el-col :span="8">
					<el-card>
						<div ref="lls" style="width: 100%; height:300px;"></div>
					</el-card>
				</el-col>
				<el-col :span="8">
					<el-card></el-card>
				</el-col>
				<el-col :span="8">
					<el-card></el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script setup lang='ts'>
import { Ones } from './echarts'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartts = ref()
const lls = ref()
onMounted(() => {
	// one
	var myChart = echarts.init(chartts.value);
	var option;
	option = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		legend: {
			data: ['expected', 'actual']
		},
		series: [
			{
				name: 'expected',
				data: [120, 82, 91, 154, 162, 140, 145],
				type: 'line',
				smooth: true
			},
			{
				name: 'actual',
				type: 'line',
				smooth: true,
				data: [100, 120, 161, 134, 105, 160, 165]
			}
		]
	};
	option && myChart.setOption(option);
	type EChartsOption = echarts.EChartsOption;
	var myCharts = echarts.init(lls.value);
	var options: EChartsOption;
	options = {
		radar: [
			{
				indicator: [
					{ text: 'Look', max: 100 },
					{ text: 'Photo', max: 100 },
					{ text: 'System', max: 100 },
					{ text: 'Performance', max: 100 },
					{ text: 'Screen', max: 100 }
				],
				radius: 80,
				center: ['50%', '60%']
			}
		],
		series: [
			{
				type: 'radar',

				areaStyle: {},
				data: [

					{
						value: [85, 90, 90, 95, 95],
					},
					{
						value: [95, 80, 95, 90, 93],
					}
				]
			}
		]
	};

	options && myCharts.setOption(options);
	window.addEventListener("resize", function () {
		myChart.resize();
		myCharts.resize();
	});
})
</script>
<style lang='scss' scoped>
.shang {
	display: flex;
	justify-content: space-between;
	align-items: center;

	>div {
		.text {
			color: #bab7b7;
			margin-bottom: 10px;
		}
	}

	.icon {
		width: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 6px;
		background-color: #fff;
	}
}

.colorone:hover .icon {
	background-color: #40c9c6 !important;

	.el-icon {
		color: #fff !important;
	}
}

.colortow:hover .icon {
	background-color: #36a3f7 !important;

	.el-icon {
		color: #fff !important;
	}
}

.colorthree:hover .icon {
	background-color: #f4516c !important;

	.el-icon {
		color: #fff !important;
	}
}

.colorfour:hover .icon {
	background-color: #34bfa3 !important;

	.el-icon {
		color: #fff !important;
	}
}
</style>
