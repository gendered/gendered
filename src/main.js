import Vue from "vue";
import App from "./App.vue";
import router from "./router";
require("dotenv").config();

Vue.config.productionTip = false;

Vue.directive("focus", {
	// When the bound element is inserted into the DOM...
	inserted: function(el) {
		// Focus the element
		el.focus();
	}
});

export default new Vue({
	el: "#app",
	router,
	render: h => h(App)
});
