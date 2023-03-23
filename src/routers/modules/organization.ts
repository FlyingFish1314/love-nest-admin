/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const organizationRouter = [
  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/index',
    name: 'organization',
    meta: {
      title: '组织管理',
      icon: 'Grape',
    },
    children: [
      {
        path: '/organization/index',
        component: () => import('@/views/organization/index.vue'),
        name: 'organizationManagement',
        meta: { title: '组织列表', icon: 'MenuIcon' },
      },
      {
        path: '/organization/audit',
        component: () => import('@/views/organization/audit.vue'),
        name: 'audit',
        meta: { title: '组织审核', icon: 'MenuIcon' },
      },
    ],
  },
]

export default organizationRouter
