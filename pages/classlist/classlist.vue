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
import { apiGetClassList } from "../../api/apis";


const classList = ref([]);
const noMoreData = ref(false);
const queryParams = {
	pageNum:1,
	pageSize:12
};
onLoad((e)=>{
	let {id=null,name=null} = e;
	queryParams.classid = id;
	//修改导航栏标题
	uni.setNavigationBarTitle({
		title:name
	})
	getClassList();
})

onReachBottom(()=>{
	if(noMoreData.value) return;
	queryParams.pageNum++;
	getClassList();
})

const getClassList = async() =>{
	let res = await apiGetClassList(queryParams);
	classList.value = [...classList.value,...res.data.data];
	if(queryParams.pageSize > res.data.data){
		noMoreData.value = true;
	}
	uni.setStorageSync("localClassList",classList.value)
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
