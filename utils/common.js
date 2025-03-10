import {
    store,
    mutations
} from '@/uni_modules/uni-id-pages/common/store.js'
import pagesJson from '@/pages.json'

export function compareTimestamp(timestamp) {
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - timestamp;

  if (timeDiff < 60000) {  
    return '1分钟内';
  } else if (timeDiff < 3600000) {
    return Math.floor(timeDiff / 60000) + '分钟';
  } else if (timeDiff < 86400000) {
    return Math.floor(timeDiff / 3600000) + '小时';
  } else if (timeDiff < 2592000000) {
    return Math.floor(timeDiff / 86400000) + '天';
  } else if (timeDiff < 7776000000) {
    return Math.floor(timeDiff / 2592000000) + '月';
  } else {
    return null;
  }
}


export function gotoHome(){
	uni.showModal({
		title:"提示",
		content:"页面有误将返回首页",
		showCancel:false,
		success: (res) => {
			if(res.confirm){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	})
}


//页面间跳转
export function routerTo(url,type="navigateTo") {  
  if(type=="navigateTo"){	  
	  uni.navigateTo({
	  	url,
		fail:err=>{
			console.log(err);
			routerTo(url,"reLaunch")
		}
	  })
  }else if(type=="reLaunch"){
	  uni.reLaunch({
	  	url
	  })
  }else if(type=="redirectTo"){
	  uni.redirectTo({
	  	url,
		fail:err=>{
			console.log(err);
			routerTo(url,"reLaunch")
		}
	  })
  }
}


//显示模态弹窗
export function showModal({title="提示",content="",showCancel=true}={}){
	return new Promise((resolve,reject)=>{
		uni.showModal({
			title,
			content,
			showCancel,
			success: ({confirm}) => {
			  if (confirm) resolve('confirm')
			  else resolve('cancel')
			},
			fail: () => {
			  reject('fail')
			}
		})
	})
}


//提示框
export function showToast({title="",duration=1500,icon="none",mask=false}={}){
	uni.showToast({
		title:String(title),
		icon,
		duration,
		mask
	})
}

//获取当前页面地址和参数
export const getPageAndParams = () => {
    // let { path, query = {} } = uni.getLaunchOptionsSync();	
    let { route:path,options:query = {} } = getCurrentPages()[getCurrentPages().length - 1]
    // 用于存储拼接后的查询参数字符串
    return formatPageUrl(path,query);
};

export const formatPageUrl = (path,query)=>{
	let queryString = "";
	// 将对象形式的查询参数转换为字符串形式
	for (let key in query) {
	    if (query.hasOwnProperty(key)) {
	        if (queryString) {
	            queryString += "&";
	        }
	        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
	    }
	}
	const result = `/${path}?${queryString}`;
	return encodeURIComponent(result);
}





export const  gotoLogin = ()=>{
	if(store.hasLogin) return true;
	routerTo(`/${pagesJson.uniIdRouter.loginPage}?uniIdRedirectUrl=${getPageAndParams()}`)
	return false
}