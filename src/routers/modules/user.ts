/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const usersRouter = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'user',
    hidden: false,
    meta: {
      title: '用户中心',
      icon: 'School',
    },
    children: [
      {
        path: '/user/index',
        component: () => import('@/views/users/index.vue'),
        name: 'userManagement',
        meta: { title: '用户列表', icon: 'School' },
      },
    ],
  },
]

export default usersRouter
