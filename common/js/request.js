import {	API_URL } from '@/env.js'

function request(config) {
	
	let header = {
		'token': uni.getStorageSync('token')
	};
	
	if(config.contentType){
		header['Content-Type'] = 'application/x-www-form-urlencoded'
	}
	// console.log('header', header);
	Object.assign(header,config.header)
		let appId = uni.getStorageSync('appId')
		if(config.noLoading != true){
			uni.showLoading({
				title: '请稍后'
			})
		}
		const ERR_OK = 0
		
		//进行请求,一般外层都有一个封装,然后放在公共类里边
		return new Promise((resolve,reject)=>{
			uni.request({
				url: config.url.indexOf("http") == 0 ? config.url : API_URL + config.url,
				method: config.method,
				header: header, //传在请求的header里
				data: config.data,
				success: function(res) {
					if (res.statusCode === 200){
						//请求成功的处理
						if (res.data.errcode !== ERR_OK) {
							// 10002:数据不存在; -1:文件预览授权失败;
							if (res.data.errcode === 10002 || res.data.errcode === -1 || res.data.errcode === 99999 || res.data.errcode === 11004){
								if(config.noLoading != true){
									uni.hideLoading();
								}
								uni.stopPullDownRefresh()
								reject(res);
							}else{
								if(config.noLoading != true){
									uni.hideLoading();
								}
								uni.stopPullDownRefresh()
								uni.showToast({
									title: res.data.errmsg,
									icon: 'none',
									duration:2000
								})
								reject(res);
							}
						}
						else{
							uni.stopPullDownRefresh()
							resolve(res);
							if(config.noLoading != true){
								uni.hideLoading();
							}
						}
					}else{
						uni.stopPullDownRefresh()
						if(config.noLoading != true){
							uni.hideLoading();
						}
						if(res.data.errmsg){
							uni.showToast({
								// title: '请求异常，请重试!',
								title: res.data.errmsg,
								icon: 'none'
							})
							reject(res);
						}else{
							reject(res);
						}
					}
				},
				fail: function(res) {
					uni.stopPullDownRefresh()
					if(config.noLoading != true){
						uni.hideLoading();
					}
					if(config.url !== '/app/init'){
						uni.showToast({
							title: '请求异常，请重试!',
							// title: res.data.errmsg,
							icon: 'none'
						})
					}
					reject(res);
				}
			})
		})
	}
	
	export default request