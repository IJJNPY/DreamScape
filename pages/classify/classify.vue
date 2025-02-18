<template>
	<view class="classLayout pageBg">
		<!-- #ifndef MP-TOUTIAO -->
		<custom-nav-bar title="分类"></custom-nav-bar>
		<!-- #endif -->
		
		<view class="classify">
			<theme-item v-for="item in classifyList" 
			:key="item._id"
			:item="item"
			></theme-item>
		</view>
		
		<view class="loadingLayout" v-if="classifyList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
		
		<view class="safe-area-inset-bottom"></view>
		
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onShareAppMessage,onShareTimeline,onReachBottom} from "@dcloudio/uni-app"
import { showToast } from '../../utils/common';
const classCloudObj = uniCloud.importObject("client-wallpaper-classify");
const classifyList = ref([]);
const noData= ref(false);
const queryParams = ref({
	pageSize:12,
	pageNum:1
})

const getClassify =async()=>{
	
	let {errCode,errMsg,data,count,...rest} = await classCloudObj.list(queryParams.value);
	if(errCode!==0) return showToast({title:errMsg})
	classifyList.value = [...classifyList.value,...data];	
	if(queryParams.value.pageSize > data.length) noData.value = true;

}



//触底加载更多
onReachBottom(()=>{
	if(noData.value) return;
	queryParams.value.pageNum++
	getClassify();
})




//分享给好友
onShareAppMessage((e)=>{
	return {
		title:"咸虾米壁纸，精选分类",
		path:"/pages/classify/classify"
	}
})

//分享朋友圈
onShareTimeline(()=>{
	return {
		title:"咸虾米壁纸，精选分类"
	}
})


getClassify();
</script>

<style lang="scss" scoped>
.classify{
	padding:30rpx;
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap:15rpx;
}
</style>
