/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import router from './router';

window.Vue = require('vue');
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import { Form, HasError, AlertError, AlertSuccess } from 'vform';
import Vue from 'vue';

window.Form = Form;


Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertSuccess.name, AlertSuccess)

// ES6 Modules or TypeScript
window.Swal = require('sweetalert2');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('foot', require('./components/Foot.vue').default);
Vue.component('navbar', require('./components/Navbar.vue').default);
Vue.component('CreatePost', require('./components/CreatePost.vue').default);

//for custom event
//let Fire = new Vue();
window.Fire = new Vue();

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '4px'
});

import VueNotification from "@kugatsu/vuenotification";

// Vue.use(VueNotification, {
//     timer: 10,
// });

Vue.use(VueNotification, {
    timer: 10,
    position: "topRight",
    //title: "Vue notification",
    error: {
        background: "#F56565",
        color: "white"
    },
    success: {
        background: "#38A169",
        color: "white"
    },
    warning: {
        background: "#ED8936",
        color: "white"
    }
});



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});

