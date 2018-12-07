<template>
	<div v-show="visible" class="sidebar">
		<div class="sidebar__header">
			<slot name="header">
				<h4>Default Header</h4>
			</slot>
		</div>
		<div class="sidebar__content">
			<slot name="body"></slot>
		</div>
	</div>
</template>


<script>
export default {
	name: 'Sidebar',
	data: function() {
		return {
			visible: true
		};
	},
	mounted() {}
};
</script>


<style lang="scss" scoped>
.sidebar {
	height: 100vh;
	position: fixed;
	top: initial;
	left: 0;
	background: rgba($color: #101113, $alpha: 0.9);
	width: 100%;
	max-width: 300px;
	overflow: auto;

	&__header {
		padding: 1rem 0;
		margin: 0 1rem;
		border-bottom: 1px solid #fff;
	}

	&--content {
		max-height: 100%;
	}
}
</style>
