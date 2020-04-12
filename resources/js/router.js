


import VueRouter from 'vue-router'
//Vue.use(VueRouter)
//Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        //  name: 'Home',
        component: require('./views/Home').default
    },
    {
        path: '/create',
        component: require('./views/Create').default
    }
]

// const router = new VueRouter({
//     mode: 'history',
//     //base: process.env.BASE_URL,
//     routes
// })

// export default router

export default new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes
});


