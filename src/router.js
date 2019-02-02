import Vue from 'vue';
import Router from 'vue-router';
import VueHead from 'vue-head';

const Home = () => import('./components/Home/Home.vue');
const About = () => import('./components/About');
const WordContainer = () => import('./components/WordContainer');
const NotFound = () => import('./components/NotFound');

Vue.use(Router);
Vue.use(VueHead)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			children: [{
				path: '/words/:word',
				name: 'word',
				component: WordContainer,
				props: true
			}]
		},
		{
			path: '/about',
			name: 'about',
			component: About,
		},
		{
			path: '/404',
			component: NotFound,
		},
		{
			path: '*',
			redirect: '/404',
		},
	],
});
