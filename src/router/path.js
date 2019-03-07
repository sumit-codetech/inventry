export default [

    {
      path: '*',
      meta: {
        public: true,
      },
      redirect: {
        path: '/404'
      }
    },
    {
      path: '/404',
      meta: {
        public: true,
        title:'Opps ! 404 not found.'
      },
      name: 'NotFound',
      component: () => import(

        '@/components/pages/NotFound.vue'
      )
    },
    {
      path: '/403',
      meta: {
        public: true,
        title:'Bad !! Access denied'
      },
      name: 'AccessDenied',
      component: () => import(

        '@/components/pages/Deny.vue'
      )
    },
    {
      path: '/500',
      meta: {
        public: true,
        title:'Server error'
      },
      name: 'ServerError',
      component: () => import(

        '@/components/pages/Error.vue'
      )
    },
    {
      path: '/',
      meta: { public: true,title:'Welcome to Inventry'},
      name: 'Welcome',
      component: () => import(

        '@/components/Welcome.vue'
      )
    },
    {
      path: '/view_inventry',
      meta: { public: true,title:'View Items in Inventry'},
      name: 'InventryView',
      component: () => import(

        '@/components/InventryView.vue'
      )
    },
    {
      path: '/add_manufacturer',
      meta: { public: true,title:'Add Manufacturer in Inventry'},
      name: 'ManufacturerAdd',
      component: () => import(

        '@/components/ManufacturerAdd.vue'
      )
    },
    {
      path: '/add_model',
      meta: { public: true,title:'Add Model in Inventry'},
      name: 'ModelAdd',
      component: () => import(

        '@/components/ModelAdd.vue'
      )
    },

  ];
