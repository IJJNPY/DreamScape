<template>
	<view class="classlist">
		
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		
		<view class="content">
			<view class="item" 
			v-for="item in classList"
			:key="item._id"
			>	
				<picture-item :item="item" :classList="classList"></picture-item>				
			</view>
		</view>
		
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
		
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onLoad,onUnload,onReachBottom,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"


import {gotoHome} from "@/utils/common.js"
//分类列表数据
const classList = ref([]);
const noData = ref(false)
const picCloudObj = uniCloud.importObject("client-wallpaper-piclist")

//定义data参数
const queryParams = {
	pageNum:1,
	pageSize:12
}
let pageName;

onLoad((e)=>{	
	let {id=null,name=null,type=null} = e;
	if(type) queryParams.type = type;
	if(id) queryParams.classid = id;	
	
	pageName = name	
	//修改导航标题
	uni.setNavigationBarTitle({
		title:name
	})
	//执行获取分类列表方法
	getClassList();
})




onReachBottom(()=>{
	if(noData.value) return;
	queryParams.pageNum++;
	console.log(queryParams.pageNum);
	getClassList();
})

//获取分类列表网络数据
const getClassList = async ()=>{
	let {data,errCode,errMsg} = await picCloudObj.list(queryParams);
	console.log(data);
	classList.value = [...classList.value , ...data];
	if(queryParams.pageSize > data.length) noData.value = true;	
}


//分享给好友
onShareAppMessage((e)=>{
	return {
		title:"咸虾米壁纸-"+pageName,
		path:"/pages/classlist/classlist?id="+queryParams.classid+"&name="+pageName
	}
})


//分享朋友圈
onShareTimeline(()=>{
	return {
		title:"咸虾米壁纸-"+pageName,
		query:"id="+queryParams.classid+"&name="+pageName
	}
})

onUnload(()=>{
	uni.removeStorageSync("storgClassList")
})

</script>

<style lang="scss" scoped>
.classlist{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap:5rpx;
		padding:5rpx;
		.item{
			height: 440rpx;			
		}
	}
}
</style>
