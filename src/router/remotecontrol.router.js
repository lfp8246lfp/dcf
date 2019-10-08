export default [
  {
    name: 'cleandata',
    path: '/remotecontrol/cleandata',
    component: resolve => require(['views/remotecontrol/cleandata'], resolve),
    meta: {
      activeMenu: '/remotecontrol/cleandata',
      title: 'cleandata',
      noCache: true,
      affix: false
    }
  },
  {
    name: 'equipmentcontrol',
    path: '/remotecontrol/equipmentcontrol',
    component: resolve => require(['views/remotecontrol/equipmentcontrol'], resolve),
    meta: {
      activeMenu: '/remotecontrol/equipmentcontrol',
      title: 'equipmentcontrol',
      noCache: true,
      affix: false
    }
  },
]