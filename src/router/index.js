import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Items from '../views/Items.vue'
// import Users from '../views/Users.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import FoldersCreateUpdate from '../views/FolderCreateUpdate'
import StorageCreateUpdate from '../views/StorageCreateUpdate'
import Communities from '../views/Communities'
import CommunityCreateUpdate from '../views/CommunityCreateUpdate'

Vue.use(VueRouter)

const routes =[
    {
        path: '*',
        name: 'Login',
        component: Login
      },
    //   {
    //     path: '/',
    //     name: 'Login',
    //     component: Login
    //   },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/Communities',
        name: 'Communities',
        component: Communities,
    },
    {
        path: '/FoldersCreateUpdate/:folder',
        name: 'FoldersCreateUpdate',
        props: true,
        component: FoldersCreateUpdate,
    },
    {
        path: '/StorageCreateUpdate/:storage',
        name: 'StorageCreateUpdate',
        props: true,
        component: StorageCreateUpdate,
    },
    {
        path: '/CommunityCreateUpdate/:community',
        name: 'CommunityCreateUpdate',
        props: true,
        component: CommunityCreateUpdate,
    },
    {
        path: '/items/:from',
        name: 'Items',
        props: true,
        component: Items
    },
    // {
    //     path: '/users',
    //     name: 'Users',
    //     component: Users
    // },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration,
        
    },
]


const router = new VueRouter({
    routes
})

  export default router