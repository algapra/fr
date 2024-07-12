// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      path: '/dashboard',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Manage',
      icon: 'tabler:layout-grid-add',
      children: [
        {
          title: 'Manage Member',
          path: '/manage-member',
          icon: 'tabler:users',
        },
        
        // {
        //   title: 'Manage Access',
        //   path: '/manage-access',
        //   icon: 'tabler:shield',
        // },
        // {
        //   title: 'Department & Room',
        //   icon: 'tabler:player-eject',
        //   children: [
        //     {
        //       title: 'Department',
        //       path: '/department-room/department'
        //     },
        //     {
        //       title: 'Room',
        //       path: '/department-room/room'
        //     }
        //   ]
        // }
      ]
    }

    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'tabler:shield',
    // }
  ]
}

export default navigation
