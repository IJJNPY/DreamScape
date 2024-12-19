<template>
	<view class="classlist">
		<view class="loadingLayout" v-if="!classList.length && !noMoreData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<view class="content">
			<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in classList"
			:key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<view class="loadingLayout" v-if="classList.length || noMoreData">
			<uni-load-more :status="noMoreData?'noMore':'loading'"></uni-load-more>
		</view>
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import {onLoad,onUnload,onReachBottom,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import { apiGetClassList, apiGetHistoryList } from "../../api/apis";
import { gotoHome } from "../../utils/common";

const classList = ref([]);
const noMoreData = ref(false);
const queryParams = {
	pageNum:1,
	pageSize:12
};
let pageName;

//分享到好友
onShareAppMessage((e)=>{
	return {
		title:"梦境壁纸-"+pageName,
		path:"/pages/classlist/classlist?id="+queryParams.classid+"&name="+pageName
	}
})

//分享到朋友圈
onShareTimeline(()=>{
	return{
		title:"梦境壁纸-"+pageName,
		query:"id="+queryParams.classid+"&name="+pageName
	}
})

onLoad((e)=>{
	let {id=null,name=null,type=null} = e;
	if(!id) gotoHome();
	if(type){
		queryParams.type = type;
	}
	if(id){
		queryParams.classid = id;
	}
	pageName = name;
	//修改导航栏标题
	uni.setNavigationBarTitle({
		title:name
	})
	getClassList();
})

onUnload(()=>{
	uni.removeStorageSync("storageClassList")
})

onReachBottom(()=>{
	if(noMoreData.value) return;
	queryParams.pageNum++;
	getClassList();
})

//获取分类列表网格数据
const getClassList = async() =>{
	let res;
	if(queryParams.classid) res = await apiGetClassList(queryParams);
	if(queryParams.type) res = await apiGetHistoryList(queryParams);
	
	classList.value = [...classList.value,...res.data.data];
	if(queryParams.pageSize > res.data.data){
		noMoreData.value = true;
	}
	uni.setStorageSync("storageClassList",classList.value)
}

</script>

<style lang="scss" scoped>
.classlist{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
