<template>
	<div
		@keyup.esc="closeOptions"
		@blur="closeOptions"
		v-show="isActive"
		class="options"
		v-focus
		tabindex="-1"
		ref="controls"
	>
		<FilterPanel :options="gender" @filter="handleFilter" />
		<ScrollToTopButton @scrollToTop="$emit('scrollToTop')" />
		<input
			class="random can-open-modal"
			type="button"
			@click="$emit('random')"
			value="Get Random Word"
		/>
	</div>
</template>
<script>
import FilterPanel from "@/components/FilterPanel";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default {
	name: "OptionsContainer",
	components: {
		FilterPanel,
		ScrollToTopButton
	},
	props: {
		isActive: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			gender: [
				{
					category: "gender",
					type: "female",
					active: false
				},
				{
					category: "gender",
					type: "male",
					active: false
				}
			]
		};
	},
	methods: {
		handleFilter(option, options) {
			let len = this[option.category].length;
			// If there are only two filters, it should be a toggle
			this.$emit("filter", option, len == 2, options);
		},
		closeOptions(e) {
			let refs = this.$refs;
			let parent = refs.controls;
			let relatedTarget = e.relatedTarget || e.target;
			if (
				relatedTarget &&
				(parent === relatedTarget || parent.contains(relatedTarget))
			) {
				return;
			} else {
				this.$emit("close");
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.options {
	position: fixed;
	bottom: 6rem;
	right: 0;
	background: white;
	border: 1px solid black;
	display: flex;
	flex-wrap: wrap;
}
</style>
