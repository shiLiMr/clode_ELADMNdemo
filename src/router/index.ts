import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/chinamap',
			name:'chinamap',
			component: () => import('@/views/ChinaMap/index.vue')
		},
		{
			path: '/chinamapxia',
			name:'chinamapxia',
			component: () => import('@/views/ChinaMap/indexxia.vue')
		},
		{
			path: "/",
			name: "home",
			component: () => import('@/layout/index.vue'),
			meta: {
				title: '首页'
			},
			redirect: '/dashboard',
			children: [

				{
					path: '/dashboard',
					name: 'dashboard',
					component: () => import('@/views/home/index.vue'),
					meta: {
						// title: '首页'
					},
				},

				{
					path: '/system',
					name: 'system',
					meta: { title: '系统管理' },
					children: [
						{
							path: '/system/user',
							name: 'systemuser',
							meta: { title: '用户管理' },
							component: () => import('@/views/system/user/index.vue')
						},
						{
							path: '/system/role',
							name: 'systemrole',
							meta: { title: '角色管理' },
							component: () => import('@/views/system/role/index.vue')
						},

					]
				}
			]
		},

		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginView/index.vue')
		}
	]
})

export default router
