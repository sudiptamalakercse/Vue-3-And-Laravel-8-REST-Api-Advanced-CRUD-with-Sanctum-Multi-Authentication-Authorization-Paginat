<template>
	<aside class="left-sidebar" data-sidebarbg="skin5">
		<!-- Sidebar scroll-->
		<div class="scroll-sidebar">
			<!-- Sidebar navigation-->
			<nav class="sidebar-nav">
				<ul id="sidebarnav" class="pt-4">
					<li class="sidebar-item d-md-none">
						<!-- <div class="sidebar-link text-center">User</div> -->
						<a ref="admin_icon" href="javascript:void(0)" aria-expanded="false"
							><i v-if="is_admin_authenticate" class="mdi mdi-account"></i>
							<span v-if="is_admin_authenticate" class="hide-menu"
								>{{ user_data.name }} ({{ user_data.email }})</span
							></a
						>
						<ul
							v-if="is_admin_authenticate"
							aria-expanded="false"
							class="collapse first-level"
						>
							<li
								@click="onLogOut"
								:class="{
									disable_btn: is_btn_deactive,
									'sidebar-item': true
								}"
								style="cursor: pointer"
							>
								<span class="sidebar-link">
									<i class="mdi mdi-power"></i
									><span class="hide-menu"> Log Out </span>
								</span>
							</li>
						</ul>
					</li>
					<li class="sidebar-item d-md-none">
						<a ref="posts_icon" href="javascript:void(0)" aria-expanded="false"
							><i v-if="is_admin_authenticate" class="mdi mdi-receipt"></i
							><span v-if="is_admin_authenticate" class="hide-menu"
								>Posts</span
							></a
						>
						<ul
							v-if="is_admin_authenticate"
							aria-expanded="false"
							class="collapse first-level"
						>
							<li class="sidebar-item">
								<router-link
									:to="{ name: 'add_post_by_admin' }"
									class="sidebar-link"
									><i class="mdi mdi-plus-circle"></i
									><span class="hide-menu"> Add Post </span>
								</router-link>
							</li>
							<li class="sidebar-item">
								<router-link :to="{ name: 'sign_up_user' }" class="sidebar-link"
									><i class="mdi mdi-view-list"></i
									><span class="hide-menu"> View All Posts </span>
								</router-link>
							</li>
						</ul>
					</li>
					<li class="sidebar-item">
						<a
							ref="sign_up_icon"
							href="javascript:void(0)"
							aria-expanded="false"
							><i v-if="!is_admin_authenticate" class="mdi mdi-account-plus"></i
							><span v-if="!is_admin_authenticate" class="hide-menu"
								>Sign Up</span
							></a
						>
						<ul
							v-if="!is_admin_authenticate"
							aria-expanded="false"
							class="collapse first-level"
						>
							<li class="sidebar-item">
								<router-link
									:to="{ name: 'sign_up_admin' }"
									class="sidebar-link"
									><i class="mdi mdi-account-circle"></i
									><span class="hide-menu"> Admin </span>
								</router-link>
							</li>
							<li class="sidebar-item">
								<router-link :to="{ name: 'sign_up_user' }" class="sidebar-link"
									><i class="mdi mdi-account"></i
									><span class="hide-menu"> User </span>
								</router-link>
							</li>
						</ul>
					</li>
					<li class="sidebar-item">
						<a ref="log_in_icon" href="javascript:void(0)" aria-expanded="false"
							><i
								v-if="!is_admin_authenticate"
								class="mdi mdi-login-variant"
							></i
							><span v-if="!is_admin_authenticate" class="hide-menu"
								>Log In</span
							></a
						>
						<ul
							v-if="!is_admin_authenticate"
							aria-expanded="false"
							class="collapse first-level"
						>
							<li class="sidebar-item">
								<router-link :to="{ name: 'log_in_admin' }" class="sidebar-link"
									><i class="mdi mdi-account-circle"></i
									><span class="hide-menu"> Admin </span>
								</router-link>
							</li>
							<li class="sidebar-item">
								<router-link :to="{ name: 'log_in_user' }" class="sidebar-link"
									><i class="mdi mdi-account"></i
									><span class="hide-menu"> User </span>
								</router-link>
							</li>
						</ul>
					</li>
					<li v-if="is_admin_authenticate" class="sidebar-item">
						<router-link
							:to="{ name: 'charts' }"
							class="sidebar-link waves-effect waves-dark sidebar-link"
							aria-expanded="false"
							><i class="mdi mdi-chart-bar"></i
							><span class="hide-menu">Charts</span>
						</router-link>
					</li>
					<li v-if="is_admin_authenticate" class="sidebar-item">
						<router-link
							:to="{ name: 'fullwidth' }"
							class="sidebar-link waves-effect waves-dark sidebar-link"
							aria-expanded="false"
							><i class="mdi mdi-blur-linear"></i
							><span class="hide-menu">Full Width</span>
						</router-link>
					</li>
					<li class="sidebar-item p-3">
						<a
							href="https://www.google.com/"
							target="_blank"
							class="w-100 btn btn-danger d-flex align-items-center text-white"
							><i class="mdi mdi-google font-20 me-2"></i>Goggle</a
						>
					</li>
				</ul>
			</nav>
			<!-- End Sidebar navigation -->
		</div>
		<!-- End Sidebar scroll-->
	</aside>
</template>

<script>
import useIsAuthenticate from '../../composables/getters/is_authenticate_composable';
import { ref, onUpdated, onMounted } from 'vue';
import useLogOutComposable from '../../composables/log_out_composable';

export default {
	name: 'LeftSidebarComponent',
	setup() {
		const { is_admin_authenticate, user_data } = useIsAuthenticate();
		const admin_icon = ref(null);
		const posts_icon = ref(null);
		const sign_up_icon = ref(null);
		const log_in_icon = ref(null);

		const { log_out, is_btn_deactive } = useLogOutComposable();

		const onLogOut = () => {
			log_out({
				request_link: 'logout/admin',
				user_type: 'admin',
				token: user_data.value.token
			});
		};
		const add_class_to_admin_icon = () => {
			if (is_admin_authenticate.value) {
				admin_icon.value.classList.add('sidebar-link');
				admin_icon.value.classList.add('has-arrow');
				admin_icon.value.classList.add('waves-effect');
				admin_icon.value.classList.add('waves-dark');
			} else {
				admin_icon.value.classList.remove('sidebar-link');
				admin_icon.value.classList.remove('has-arrow');
				admin_icon.value.classList.remove('waves-effect');
				admin_icon.value.classList.remove('waves-dark');
			}
		};

		const add_class_to_posts_icon = () => {
			if (is_admin_authenticate.value) {
				posts_icon.value.classList.add('sidebar-link');
				posts_icon.value.classList.add('has-arrow');
				posts_icon.value.classList.add('waves-effect');
				posts_icon.value.classList.add('waves-dark');
			} else {
				posts_icon.value.classList.remove('sidebar-link');
				posts_icon.value.classList.remove('has-arrow');
				posts_icon.value.classList.remove('waves-effect');
				posts_icon.value.classList.remove('waves-dark');
			}
		};

		const add_class_to_sign_up_icon = () => {
			if (!is_admin_authenticate.value) {
				sign_up_icon.value.classList.add('sidebar-link');
				sign_up_icon.value.classList.add('has-arrow');
				sign_up_icon.value.classList.add('waves-effect');
				sign_up_icon.value.classList.add('waves-dark');
			} else {
				sign_up_icon.value.classList.remove('sidebar-link');
				sign_up_icon.value.classList.remove('has-arrow');
				sign_up_icon.value.classList.remove('waves-effect');
				sign_up_icon.value.classList.remove('waves-dark');
			}
		};

		const add_class_to_log_in_icon = () => {
			if (!is_admin_authenticate.value) {
				log_in_icon.value.classList.add('sidebar-link');
				log_in_icon.value.classList.add('has-arrow');
				log_in_icon.value.classList.add('waves-effect');
				log_in_icon.value.classList.add('waves-dark');
			} else {
				log_in_icon.value.classList.remove('sidebar-link');
				log_in_icon.value.classList.remove('has-arrow');
				log_in_icon.value.classList.remove('waves-effect');
				log_in_icon.value.classList.remove('waves-dark');
			}
		};

		onUpdated(() => {
			add_class_to_admin_icon();
			add_class_to_posts_icon();
			add_class_to_sign_up_icon();
			add_class_to_log_in_icon();
		});

		onMounted(() => {
			add_class_to_admin_icon();
			add_class_to_posts_icon();
			add_class_to_sign_up_icon();
			add_class_to_log_in_icon();
		});

		return {
			is_admin_authenticate,
			user_data,
			admin_icon,
			posts_icon,
			onLogOut,
			sign_up_icon,
			log_in_icon,
			is_btn_deactive
		};
	}
};
</script>

<style scoped>
.disable_btn {
	cursor: not-allowed;
	pointer-events: none;

	/*Button disabled - CSS color class*/
	color: #c0c0c0;
	background-color: #141313;
}
.sidebar-item .router-link-exact-active {
	background: #27a9e3;
}
</style>
