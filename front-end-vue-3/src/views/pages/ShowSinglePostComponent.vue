<template>
	<!-- ============================================================== -->
	<!-- Start Page Content -->
	<!-- ============================================================== -->
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<div class="card">
				<div
					class="card-body border-bottom d-flex justify-content-end py-2 p-3"
				>
					<button
						type="button"
						:class="{
							btn: true,
							'btn-primary': true
						}"
						@click="onBackClick()"
					>
						Back
					</button>
				</div>

				<form class="form-horizontal">
					<div class="card-body">
						<h4 class="card-title mt-1 mb-3 text-center">Single Post</h4>
						<div class="form-group row">
							<label
								for="name"
								class="col-sm-3 text-end control-label col-form-label"
								>Name</label
							>
							<div class="col-sm-9">
								<input
									name="name"
									type="text"
									class="form-control"
									id="name"
									v-model="inputed_add_and_edit_post_form_data.name"
									readonly
								/>
							</div>
						</div>
						<div class="form-group row">
							<label
								for="city"
								class="col-sm-3 text-end control-label col-form-label"
								>City</label
							>
							<div class="col-sm-9">
								<input
									name="city"
									type="text"
									class="form-control"
									id="city"
									v-model="inputed_add_and_edit_post_form_data.city"
									readonly
								/>
							</div>
						</div>
						<div class="form-group row">
							<label
								for="fees"
								class="col-sm-3 text-end control-label col-form-label"
								>Fees</label
							>
							<div class="col-sm-9">
								<input
									name="fees"
									type="number"
									class="form-control"
									id="fees"
									v-model="inputed_add_and_edit_post_form_data.fees"
									readonly
								/>
							</div>
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
import useAddAndEditPostByAdminComposable from '../../composables/add_and_edit_post_by_admin_composable';
import useRetrieveSingleRecordComposable from '../../composables/retrieve_single_record';
import useIsAuthenticate from '../../composables/getters/is_authenticate_composable';
import { useRouter } from 'vue-router';

export default {
	name: 'ShowSinglePostComponent',
	props: {
		post_id: {
			type: String,
			required: true
		}
	},
	setup(props) {
		// Breadcrumb And Title related composables
		const router = useRouter();
		const { is_admin_authenticate, is_user_authenticate } = useIsAuthenticate();
		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();

		// SignUp related composables
		const {
			inputed_add_and_edit_post_form_data,
			response_message,
			error_messages_from_server
		} = useAddAndEditPostByAdminComposable();

		// Breadcrumb And Title related code
		cheange_breadcrumb_heading_and_title_heading('Single Post');

		if (
			is_admin_authenticate.value == true ||
			is_user_authenticate.value == true
		) {
			let user_type = null;
			if (is_admin_authenticate.value) {
				user_type = 'Admin';
			} else if (is_user_authenticate.value) {
				user_type = 'User';
			}

			cheange_breadcrumb_links([
				{
					name: `${user_type} Portal`,
					name_of_route: 'home',
					disabled: false
				},

				{
					name: 'Posts',
					name_of_route: 'show_posts_for_admin_and_user',
					disabled: false
				},
				{
					name: 'Single Post',
					name_of_route: 'show_single_post',
					params: { post_id: props.post_id },
					disabled: true
				}
			]);
		}
		const { retrieve_single_record } = useRetrieveSingleRecordComposable();

		let result = retrieve_single_record(props.post_id);

		result.then(
			res => {
				inputed_add_and_edit_post_form_data.name = res.name;
				inputed_add_and_edit_post_form_data.city = res.city;
				inputed_add_and_edit_post_form_data.fees = res.fees;
			},
			e => {
				console.log(e);
			}
		);

		const onBackClick = () => {
			router.push({ name: 'show_posts_for_admin_and_user' });
		};

		return {
			inputed_add_and_edit_post_form_data,
			response_message,
			error_messages_from_server,
			onBackClick
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
