/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const activityRouter = [
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/index',
    name: 'activity',
    meta: {
      title: '活动管理',
      icon: 'Grape',
    },
    children: [
      {
        path: '/activity/index',
        component: () => import('@/views/activity/index.vue'),
        name: 'activity',
        meta: { title: '活动列表', icon: 'MenuIcon' },
      },
      {
        path: '/activity/:detail',
        component: () => import('@/views/activity/detail.vue'),
        name: 'detail',
        hidden: true,
        meta: { title: '活动详情', icon: 'MenuIcon' },
      },
    ],
  },
]

export default activityRouter
