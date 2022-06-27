<template>
	<!-- ============================================================== -->
	<!-- Start Page Content -->
	<!-- ============================================================== -->
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<div class="card">
				<form class="form-horizontal" @submit.prevent="onLogInClick()">
					<div class="card-body">
						<h4 class="card-title mt-3 mb-3 text-center">Log In As Admin</h4>

						<div class="form-group row">
							<label
								for="email"
								class="col-sm-3 text-end control-label col-form-label"
								>Email</label
							>
							<div class="col-sm-9">
								<input
									name="email"
									type="email"
									class="form-control"
									id="email"
									placeholder="Email Here"
									v-model.trim="inputed_log_in_form_data.email"
								/>
								<span class="text-danger" v-if="error_messages.email">{{
									error_messages.email
								}}</span>
							</div>
						</div>
						<div class="form-group row">
							<label
								for="password"
								class="col-sm-3 text-end control-label col-form-label"
								>Password</label
							>
							<div class="col-sm-9">
								<input
									name="password"
									type="password"
									class="form-control"
									id="password"
									placeholder="Password Here"
									v-model.trim="inputed_log_in_form_data.password"
								/>
								<span class="text-danger" v-if="error_messages.password">{{
									error_messages.password
								}}</span>
							</div>
						</div>
					</div>
					<div class="border-top">
						<div class="card-body" id="submit">
							<button
								type="submit"
								:class="{
									disable_btn: is_submit_btn_deactive,
									btn: true,
									'btn-primary': true
								}"
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="col-md-3"></div>
	</div>
	<!-- ============================================================== -->
	<!-- End PAge Content -->
	<!-- ============================================================== -->
	<!-- ============================================================== -->
	<!-- Right sidebar -->
	<!-- ============================================================== -->
	<!-- .right-sidebar -->
	<!-- ============================================================== -->
	<!-- End Right sidebar -->
	<!-- ============================================================== -->
</template>
<script>
import useBreadcrumbAndTitle from '../../composables/breadcrumb_and_title_composable';
import useLogInComposable from '../../composables/log_in_composable';
import useNotifyComposable from '../../composables/notify_composable';
import { onMounted } from 'vue';

export default {
	name: 'LogInAdminComponent',
	setup() {
		// Breadcrumb And Title related composables
		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();
		const { clear_notify_messages } = useNotifyComposable();

		// SignUp related composables
		const {
			error_messages,
			onLogIn,
			inputed_log_in_form_data,
			response_message,
			error_messages_from_server,
			is_submit_btn_deactive
		} = useLogInComposable();

		// Breadcrumb And Title related code
		cheange_breadcrumb_heading_and_title_heading('Log In As Admin');

		cheange_breadcrumb_links([
			{ name: 'Admin & User Portal', name_of_route: 'home', disabled: false },
			{
				name: 'Log In As Admin',
				name_of_route: 'log_in_admin',
				disabled: true
			}
		]);

		//Sign Up Related code
		const onLogInClick = () => {
			let payload = {
				request_link: 'login/admin',
				data: inputed_log_in_form_data,
				user_type: 'admin'
			};
			onLogIn(payload);
		};

		onMounted(() => {
			clear_notify_messages();
		});

		return {
			inputed_log_in_form_data,
			onLogInClick,
			error_messages,
			response_message,
			error_messages_from_server,
			is_submit_btn_deactive
		};
	}
};
</script>

<style scoped>
#submit {
	float: right;
}
.disable_btn {
	cursor: not-allowed;
	pointer-events: none;

	/*Button disabled - CSS color class*/
	color: #c0c0c0;
	background-color: #ffffff;
}
</style>
