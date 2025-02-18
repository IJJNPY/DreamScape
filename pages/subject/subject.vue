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
						<view class="box" v-for='row in item.picList'>
							<image :src="row.picurl" mode="aspectFill"></image>
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
import { onLoad,onShareAppMessage,onShareTimeline,onReachBottom } from "@dcloudio/uni-app"
import { routerTo } from "../../utils/common";
const dataList = ref([]);
const queryParams = ref({	
	pageNum:1,
	pageSize:6
})
const noData = ref(false);

//获取专题列表
const getDayList = async ()=>{
	try{		
		let data = [{_id:"xxxxx",theme:"美女专题",day:"2024-11-12",size:15,view_count:123,picList:[{_id:"n8jgh72qc1",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20241026/1729906765161_0_small.webp"},{_id:"5xpd5tqmpf3",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20241026/1729906749210_1_small.webp"},{_id:"a28bu9bah3a",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240906/1725589938397_1_small.webp"},{_id:"6tf4lzsubjq",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240622/1719022883133_1_small.webp"},{_id:"0nb4d0hog10q",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240327/1711530698069_5_small.webp"}]},{_id:"yyyyyyy",theme:"可爱猫猫专题",day:"2024-11-12",size:21,view_count:598,picList:[{_id:"amy7gvbvd0i",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240905/1725543485532_0_small.webp"},{_id:"k226eo94hhb",picurl:"https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20240223/1708671856094_0_small.webp"},{_id:"jfj4l49uuoh",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20241112/1731375749717_0_small.webp"},{_id:"f2gxty2nle",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240905/1725543482427_0_small.webp"},{_id:"o4g1w1r66t",picurl:"https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20240223/1708671856384_7_small.webp"}]}];
		
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
