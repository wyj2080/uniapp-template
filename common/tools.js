
import {router} from '@/common/router.js'
	
	function msg(title){
		uni.showToast({
			title: title,
			duration: 1500,
			icon: 'none'
		});
	}
	
	/**
	 * 跳转再封装，不支持复杂传参。
	 */
	function routerTo(path, params = {}, isLogin) {
		if (path.indexOf('/pages/index/') !== -1) {
			router.pushTab({
				path: path
			})
		} else {
			if (path.indexOf('?') !== -1) {
				let index = path.lastIndexOf('?');
				let query = path.substring(index + 1, path.length);
				let arr = query.split('&')
				path = path.slice(0, index);
				arr.forEach(item => {
					let mArr = item.split('=');
					params[mArr[0]] = mArr[1];

				})
			}
			if (isLogin) {
				router.replaceAll({
					path: path,
					query: params
				})
			} else {
				router.push({
					path: path,
					query: params
				})
			}

		}
	}
	
	/**
	 * 回退
	 */
	function back(num){
		if(num){
			router.back(num);
		}else{
			router.back(1);
		}
	}
	
	/**
	 * 获取路径参数
	 */
	function getOptions(context){
		return context.$Route.query;
	}
	
	/**
	 * 原地刷新，触发beforeEach，不会触发onShow那种(h5不适用，小程序可以)
	 */
	function forceEach(){
		router.forceGuardEach();
	}

export default {
	msg,
	routerTo,
	back,
	getOptions,
	forceEach,
}
