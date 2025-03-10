<template>
	<view class="subjectLayout pageBg">
		<!-- #ifndef MP-TOUTIAO -->
		<custom-nav-bar title="专题"></custom-nav-bar>
		<!-- #endif -->
		
		<view class="content">
			<view class="item" v-for="item in dataList" :key="item._id" 
			@click="routerTo(`/pages/subject/detail?name=${item.theme}&id=${item._id}`)">
				<view class="pic">
					<view class="group">
						<view class="box" v-for='row in item.picList.slice(0,5)'>
							<image :src="getSmallImg(row.picurl,130)" mode="aspectFill"></image>
						</view>
					</view>
					<view class="count">
						{{item.view_count}}人看过
					</view>
				</view>
				<view class="text">
					<view class="title">{{item.theme}}</view>
					<view class="desc">
						<view class="time">{{item.day}}推送</view>
						<view class="num">
							<uni-icons type="image" size="23" color="#999"></uni-icons>
							<text>{{item.size}}P</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="loadingLayout" v-if="dataList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
		
		<view class="safe-area-inset-bottom"></view>
		
		
	</view>
</template>

<script setup>
import {ref} from "vue";	
import {getSmallImg} from "@/utils/tools.js"
import { onLoad,onShareAppMessage,onShareTimeline,onReachBottom } from "@dcloudio/uni-app"
import { routerTo, showToast } from "../../utils/common";
const dayCloudObj = uniCloud.importObject("client-activity-everyday")
const dataList = ref([]);
const queryParams = ref({	
	pageNum:1,
	pageSize:6
})
const noData = ref(false);

//获取专题列表
const getDayList = async ()=>{
	try{	
		let {data,errCode} = await dayCloudObj.list(queryParams.value)
		if(errCode!==0) return showToast({title:"查询有误"})
		dataList.value = [...dataList.value,...data];
		if(queryParams.value.pageSize > data.length) noData.value = true;		
		console.log(data);
	}catch(err){
		console.log(err);
		showToast("系统出错，请刷新重试")
	}
	
}


//触底加载更多
onReachBottom(()=>{
	if(noData.value) return;
	queryParams.value.pageNum++
	getDayList();
})



onShareAppMessage((res)=>{		
	return {
	  title: "每日推荐专题",
	  path:'/pages/subject/subject'
	}
})

onShareTimeline((res)=>{
	return {
	  title: "每日推荐专题"
	}
})


getDayList();
</script>

<style lang="scss" scoped>
.content{
	padding:30rpx;
	.item{
		width: 100%;
		background: #fff;
		border-radius: 16rpx;		
		box-sizing: border-box;
		border:1px solid #efefef;
		position: relative;
		margin-bottom:60rpx;
		box-shadow: 0 10rpx 26rpx rgba(0,0,0,0.1);		
		overflow: hidden;
		.pic{
			width: 100%;
			aspect-ratio: 1.618 / 1;			
			position: relative;
			top:0;
			left:0;		
			display: flex;
			align-items: flex-start;
			overflow: hidden;
			.group{
				width: 830rpx;	
				height: 830rpx;				
				transform: rotate(15deg) scale(0.98);
				position: absolute;
				top:-95rpx;
				left:-90rpx;			
				.box{
					width: 260rpx;
					height: 300rpx;
					border-radius: 18rpx;
					overflow: hidden;
					position: absolute;
					image{
						width: 100%;
						height: 100%;
						display: block;
					}
				}
				.box:nth-child(1){
					left:275rpx;
					top:0;
					aspect-ratio: 9 / 20;
					height: auto;
				}
				.box:nth-child(2){
					left:0;
					top:0;					
				}
				.box:nth-child(3){
					left:0;
					top:315rpx;					
				}
				.box:nth-child(4){
					left:550rpx;
					top:0rpx;					
				}
				.box:nth-child(5){
					left:550rpx;
					top:315rpx;					
				}
			}
		
			.count{
				position: absolute;
				right:30rpx;
				top:30rpx;
				background: rgba(0,0,0,0.2);
				color:rgba(255,255,255,0.8);
				border:1px solid rgba(255,255,255,0.8);
				font-size: 20rpx;
				border-radius: 20px;
				padding:5rpx 10rpx;
				backdrop-filter: blur(20rpx);
			}
		
		
		}
		.text{
			border-top:1px solid #efefef;
			padding:30rpx;
			.title{
				font-size: 46rpx;
				font-weight: bold;
				margin-bottom: 15rpx;
			}
			.desc{
				display: flex;
				align-items: center;
				justify-content: space-between;
				color:#999;
				.num{
					color:#999;
					font-size: 30rpx;
					display: flex;
					align-items: center;
				}
			}
		}
	}
	.item:last-child{
		margin-bottom: 0;
	}
}
</style>
