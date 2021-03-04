// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log("beforeEach")
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log("afterEach")
})

export {
	router,
	RouterMount
}