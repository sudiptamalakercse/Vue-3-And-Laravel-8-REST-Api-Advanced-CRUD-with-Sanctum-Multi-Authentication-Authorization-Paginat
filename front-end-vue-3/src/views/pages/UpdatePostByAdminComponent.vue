<template>
	<!-- ============================================================== -->
	<!-- Start Page Content -->
	<!-- ============================================================== -->
	<div class="row">
		<div class="col-md-3"></div>
		<div class="col-md-6">
			<div class="card">
				<form class="form-horizontal" @submit.prevent="onUpdatePostClick()">
					<div class="card-body">
						<h4 class="card-title mt-3 mb-3 text-center">
							Update Post By Admin
						</h4>
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
									placeholder="Name Here"
									v-model.trim="inputed_add_and_edit_post_form_data.name"
								/>
								<span class="text-danger" v-if="error_messages.name">{{
									error_messages.name
								}}</span>
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
									placeholder="City Here"
									v-model.trim="inputed_add_and_edit_post_form_data.city"
								/>
								<span class="text-danger" v-if="error_messages.city">{{
									error_messages.city
								}}</span>
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
									placeholder="Fees Here"
									v-model.trim="inputed_add_and_edit_post_form_data.fees"
								/>
								<span class="text-danger" v-if="error_messages.fees">{{
									error_messages.fees
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
								Update
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
import useAddAndEditPostByAdminComposable from '../../composables/add_and_edit_post_by_admin_composable';
import useIsAuthenticateComposable from '../../composables/getters/is_authenticate_composable';
import useRetrieveSingleRecordComposable from '../../composables/retrieve_single_record';

export default {
	name: 'UpdatePostByAdminComponent',
	props: {
		post_id: {
			type: String,
			required: true
		}
	},
	setup(props) {
		// Breadcrumb And Title related composables
		const {
			cheange_breadcrumb_links,
			cheange_breadcrumb_heading_and_title_heading
		} = useBreadcrumbAndTitle();

		// SignUp related composables
		const {
			error_messages,
			onAddOrEditPost,
			inputed_add_and_edit_post_form_data,
			response_message,
			error_messages_from_server,
			is_submit_btn_deactive
		} = useAddAndEditPostByAdminComposable();
		const { user_data } = useIsAuthenticateComposable();

		// Breadcrumb And Title related code
		cheange_breadcrumb_heading_and_title_heading('Update Post By Admin');

		cheange_breadcrumb_links([
			{ name: 'Admin Portal', name_of_route: 'home', disabled: false },
			{
				name: 'Update Post By Admin',
				name_of_route: 'update_post_by_admin',
				params: { post_id: props.post_id },
				disabled: true
			}
		]);

		//working...
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
		//console.log(name + city);

		//Sign Up Related code
		const onUpdatePostClick = () => {
			let payload = {
				request_link: `posts/${props.post_id}`,
				token: user_data.value.token,
				data: inputed_add_and_edit_post_form_data,
				action_type: 'update'
			};
			onAddOrEditPost(payload);
		};

		return {
			inputed_add_and_edit_post_form_data,
			onUpdatePostClick,
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
