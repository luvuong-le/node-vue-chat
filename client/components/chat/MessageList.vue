<template>
	<div class="chat__c-messagelist">
		<ul class="chat__messages">
			<li class="chat__message">
				<div class="chat__message-item">
					<img src="https://img.icons8.com/color/48/000000/user.png" class="chat__user-avatar" alt>
					<div class="chat__message-details">
						<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi accusantium odio mollitia reprehenderit similique qui ipsum, voluptatum deserunt maiores iusto, optio, explicabo deleniti quod quis porro numquam sed animi magnam?</span>
					</div>
				</div>
			</li>
			<li class="chat__message">
				<div class="chat__message-item">
					<img src="https://img.icons8.com/color/48/000000/user.png" class="chat__user-avatar" alt>
					<div class="chat__message-details">
						<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi accusantium odio.</span>
					</div>
				</div>
			</li>
			<li class="chat__message">
				<div class="chat__message-item u-flex-right">
					<div class="chat__message-details">
						<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi accusantium odio.</span>
					</div>
					<img src="https://img.icons8.com/color/48/000000/user.png" class="chat__user-avatar" alt>
				</div>
			</li>
		</ul>
	</div>
</template>


<script>
export default {
	name: 'MessageList',
	data: function() {
		return {};
	},
	mounted() {}
};
</script>


<style lang="scss" scoped>
</style>
