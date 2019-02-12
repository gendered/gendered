import Vue from "vue";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;

Vue.directive("focus", {
	// When the bound element is inserted into the DOM...
	inserted: function(el) {
		// Focus the element
		el.focus();
	}
});

Vue.directive("currentPage", {
	// When the bound element is inserted into the DOM...
	update: function(nav) {
		setTimeout(() => {
			if (nav) {
				let current = nav.querySelector("[aria-label='current page']");
				if (current) {
					current.removeAttribute("aria-label");
				}
				nav
					.querySelector(".router-link-exact-active")
					.setAttribute("aria-label", "current page");
			}
		}, 200);
	}
});

export default new Vue({
	el: "#app",
	router,
	render: h => h(App)
});
