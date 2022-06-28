<template>
	<header class="topbar" data-navbarbg="skin5">
		<nav class="navbar top-navbar navbar-expand-md navbar-dark">
			<div class="navbar-header" data-logobg="skin5">
				<!-- ============================================================== -->
				<!-- Logo -->
				<!-- ============================================================== -->
				<router-link
					:to="{ name: 'home' }"
					class="navbar-brand"
					href="index.html"
				>
					<!-- Logo icon -->
					<b class="logo-icon ps-2">
						<!--You can put here icon as well // <i class="wi wi-sunset"></i> //-->
						<!-- Dark Logo icon -->
						<img
							src="../../../public/frontend/assets/images/logo-icon.png"
							alt="homepage"
							class="light-logo"
							width="25"
						/>
					</b>
					<!--End Logo icon -->
					<!-- Logo text -->

					<span
						v-if="is_admin_authenticate"
						class="logo-text ms-2 light-logo text-danger mt-2"
					>
						<!-- dark text -->
						Admin Portal
					</span>
					<span v-else class="logo-text ms-2 light-logo text-danger mt-2">
						<!-- dark text -->
						Admin & User Portal
					</span>
					<!-- Logo icon -->
					<!-- <b class="logo-icon"> -->
					<!--You can put here icon as well // <i class="wi wi-sunset"></i> //-->
					<!-- Dark Logo icon -->
					<!-- <img src="../../../public/frontend/assets/images/logo-text.png" alt="homepage" class="light-logo" /> -->

					<!-- </b> -->
					<!--End Logo icon -->
				</router-link>
				<!-- ============================================================== -->
				<!-- End Logo -->
				<!-- ============================================================== -->
				<!-- ============================================================== -->
				<!-- Toggle which is visible on mobile only -->
				<!-- ============================================================== -->
				<a
					class="nav-toggler waves-effect waves-light d-block d-md-none"
					href="javascript:void(0)"
					><i class="ti-menu ti-close"></i
				></a>
			</div>
			<!-- ============================================================== -->
			<!-- End Logo -->
			<!-- ============================================================== -->
			<div
				class="navbar-collapse collapse"
				id="navbarSupportedContent"
				data-navbarbg="skin5"
			>
				<!-- ============================================================== -->
				<!-- toggle and nav items -->
				<!-- ============================================================== -->
				<ul class="navbar-nav float-start me-auto">
					<li class="nav-item d-none d-lg-block">
						<a
							class="nav-link sidebartoggler waves-effect waves-light"
							href="javascript:void(0)"
							data-sidebartype="mini-sidebar"
							><i class="mdi mdi-menu font-24"></i
						></a>
					</li>
					<!-- ============================================================== -->
					<!-- create new -->
					<!-- ============================================================== -->
					<li v-if="is_admin_authenticate" class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<span class="d-none d-md-block"
								>Posts <i class="fa fa-angle-down"></i
							></span>
							<span class="d-block d-md-none"><i class="fa fa-plus"></i></span>
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
							<li><hr class="dropdown-divider" /></li>
							<li v-if="is_admin_authenticate">
								<router-link
									:to="{ name: 'add_post_by_admin' }"
									class="dropdown-item"
								>
									Add Post</router-link
								>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li v-if="is_admin_authenticate">
								<a class="dropdown-item" href="#">View All Posts</a>
							</li>
							<li><hr class="dropdown-divider" /></li>
						</ul>
					</li>
					<!-- ============================================================== -->
					<!-- Search -->
					<!-- ============================================================== -->
					<li class="nav-item search-box">
						<a
							class="nav-link waves-effect waves-dark"
							href="javascript:void(0)"
							><i v-if="is_admin_authenticate" class="mdi mdi-magnify fs-4"></i
						></a>
						<form class="app-search position-absolute">
							<input
								v-if="is_admin_authenticate"
								type="text"
								class="form-control"
								placeholder="Search &amp; enter"
							/>
							<a class="srh-btn"
								><i
									v-if="is_admin_authenticate"
									class="mdi mdi-window-close"
								></i
							></a>
						</form>
					</li>
				</ul>
				<!-- ============================================================== -->
				<!-- Right side toggle and nav items -->
				<!-- ============================================================== -->
				<ul v-if="is_admin_authenticate" class="navbar-nav float-end">
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
							href="#"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img
								src="../../../public/frontend/assets/images/users/1.jpg"
								alt="user"
								class="rounded-circle"
								width="31"
							/>
							{{ user_data.name }} ({{ user_data.email }})
						</a>
						<ul
							class="dropdown-menu dropdown-menu-end user-dd animated"
							aria-labelledby="navbarDropdown"
						>
							<div class="dropdown-divider"></div>
							<span
								@click="onLogOut"
								style="cursor: pointer"
								:class="{
									disable_btn: is_btn_deactive,
									'dropdown-item': true
								}"
								href="javascript:void(0)"
								><i class="fa fa-power-off me-1 ms-1"></i> Logout</span
							>
							<div class="dropdown-divider"></div>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
import useIsAuthenticateComposable from '../../composables/getters/is_authenticate_composable';
import useLogOutComposable from '../../composables/log_out_composable';

export default {
	name: 'TopbarComponent',
	setup() {
		const { is_admin_authenticate, user_data } = useIsAuthenticateComposable();

		const { log_out, is_btn_deactive } = useLogOutComposable();
		const onLogOut = () => {
			log_out({
				request_link: 'logout/admin',
				user_type: 'admin',
				token: user_data.value.token
			});
		};
		return {
			is_admin_authenticate,
			user_data,
			onLogOut,
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
	background-color: #ffffff;
}
</style>
