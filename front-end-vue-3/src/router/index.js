import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import IndexComponent from '../views/pages/IndexComponent.vue';
import ChartsComponent from '../views/pages/ChartsComponent.vue';
import FullWidthComponent from '../views/pages/FullWidthComponent.vue';
import FormBasicComponent from '../views/pages/FormBasicComponent.vue';
import FormWizardComponent from '../views/pages/FormWizardComponent.vue';
import Error403Component from '../views/pages/Error403Component.vue';
import SignUpAdminComponent from '../views/pages/SignUpAdminComponent.vue';
import SignUpUserComponent from '../views/pages/SignUpUserComponent.vue';
import LogInAdminComponent from '../views/pages/LogInAdminComponent.vue';
import AddPostByAdminComponent from '../views/pages/AddPostByAdminComponent.vue';
import UpdatePostByAdminComponent from '../views/pages/UpdatePostByAdminComponent.vue';
import ShowPostsForAdminAndUserComponent from '../views/pages/ShowPostsForAdminAndUserComponent.vue';

import store from '../store/index';

const routes = [
	{
		path: '/',
		name: 'home',
		component: IndexComponent
	},
	{
		path: '/charts',
		name: 'charts',
		component: ChartsComponent,
		meta: { auth: true }
	},
	{
		path: '/fullwidth',
		name: 'fullwidth',
		component: FullWidthComponent,
		meta: { auth: true }
	},
	{
		path: '/formbasic',
		name: 'formbasic',
		component: FormBasicComponent,
		meta: { auth: true }
	},
	{
		path: '/formwizard',
		name: 'formwizard',
		component: FormWizardComponent,
		meta: { auth: true }
	},
	{
		path: '/sign_up_admin',
		name: 'sign_up_admin',
		component: SignUpAdminComponent,
		meta: { auth: false }
	},
	{
		path: '/sign_up_user',
		name: 'sign_up_user',
		component: SignUpUserComponent,
		meta: { auth: false }
	},
	{
		path: '/log_in_admin',
		name: 'log_in_admin',
		component: LogInAdminComponent,
		meta: { auth: false }
	},
	{
		path: '/log_in_user',
		name: 'log_in_user',
		component: SignUpUserComponent,
		meta: { auth: false }
	},
	{
		path: '/add_post_by_admin',
		name: 'add_post_by_admin',
		component: AddPostByAdminComponent,
		meta: { auth: true }
	},
	{
		path: '/update_post_by_admin/:post_id',
		name: 'update_post_by_admin',
		component: UpdatePostByAdminComponent,
		meta: { auth: true },
		props: true
	},
	{
		path: '/show_posts_for_admin_and_user',
		name: 'show_posts_for_admin_and_user',
		component: ShowPostsForAdminAndUserComponent,
		meta: { auth: true }
	},
	{
		path: '/:pathMatch(.*)*',
		component: Error403Component,
		name: 'error403component'
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});
router.beforeEach((to, from, next) => {
	let user_data = store.state.authentication_module.user_data;
	let is_admin_authenticate = null;
	if (user_data.user_type == 'admin' && user_data.token != '') {
		is_admin_authenticate = true;
	} else {
		is_admin_authenticate = false;
	}
	//console.log(is_admin_authenticate);
	if ('auth' in to.meta && to.meta.auth && !is_admin_authenticate) {
		next('/sign_up_admin');
	} else if ('auth' in to.meta && !to.meta.auth && is_admin_authenticate) {
		next('/');
	} else {
		next();
	}
});

export default router;
