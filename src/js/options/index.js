import '../../css/options.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Setting from './views/Setting.vue';
import List from './views/List.vue';
import About from './views/About.vue';
import { Aside, Button, Checkbox, Collapse, CollapseItem, Container, Footer, Header, Input, Loading, Main, Menu, MenuItem, Message, Progress, Tooltip } from 'element-ui';

Vue.use(VueRouter);
Vue.use(Container);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Loading.directive);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Button);
Vue.use(Progress);
Vue.use(Tooltip);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;

const routes = [
    { path: '/', redirect: '/setting' },
    { path: '/setting', component: Setting },
    { path: '/list', component: List },
    { path: '/about', component: About },
];
const router = new VueRouter({
    routes,
});

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');
