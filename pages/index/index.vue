<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="white" autoplay="true" circular="true">
				<swiper-item v-for="item in bannerList" :key="item._id">
					<image :src="item.picurl" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left"> 
				<uni-icons type="sound-filled" size= 35rpx></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="500" circular="true">
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notice/detail?id='+item._id">
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="20" color='#333'></uni-icons>
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="30"></uni-icons>
						<view>
							<uni-dateformat :date="Date.now()" format="dd"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true">
					<view class="box" v-for="item in randomList" :key="item._id" 
					@click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" class="more">MORE+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { apiGetBanner, apiGetDayRandom, apiGetNotice, apiGetClassify } from "@/api/apis.js";
import { onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"

const bannerList = ref([]);
const randomList = ref([]);
const noticeList = ref([]);
const classifyList = ref([]);

//跳转到预览页面
const goPreview = (id)=>{
	uni.setStorageSync("storageClassList",randomList.value);
	uni.navigateTo({
		url:"/pages/preview/preview?id="+id
	})
}

const getBanner = async()=>{
	let res =await apiGetBanner();	
	bannerList.value = res.data.data;
}

const getDayRandom = async()=>{
	let res = await apiGetDayRandom();
	randomList.value = res.data.data;
}

const getNotice = async()=>{
	let res = await apiGetNotice({select:true});
	noticeList.value = res.data.data;
}

const getClassify = async()=>{
	let res = await apiGetClassify({
		select:true
	});
	classifyList.value = res.data.data;
}

//分享到好友
onShareAppMessage((e)=>{
	return {
		title:"分享测试标题",
		path:"/pages/index/index"
	}
})

//分享到朋友圈
onShareTimeline(()=>{
	return{
		title:"分享朋友圈---",
	}
})

getBanner();
getDayRandom();
getNotice();
getClassify();
</script>
 
<style lang="scss" scoped>
	:deep(){
		.uni-icons{
			color: $brand-theme-color !important;
		}
	}
.homeLayout{
	.banner{
		width: 750rpx;
		padding: 30rpx 0;
		swiper{
			width: 750rpx;
			height: 340rpx;
			swiper-item{
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
	.notice{
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f9f9f9;
		margin: 0 auto;
		border-radius: 40rpx;
		display: flex;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.text{
				color: #28b389;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center{
			flex:1;
			swiper{
				height: 100%;
				&-item{
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right{
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.select{
		padding-top: 50rpx;
		.date{
			color: #28b389;
			display: flex;
			align-items: center;
			.text{
				margin-left: 5rpx;
			}
		}
		.content{
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view{
				white-space: nowrap;
				.box{
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child{margin-right: 30rpx;}
			}
		}
	}
	.theme{
		padding-top: 50rpx;
		.more{
			font-size: 32rpx;
			color: #666;
		}
		.content{
			margin-top: 30rpx;
			padding: 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
}
</style>
