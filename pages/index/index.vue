<template>
	<view class="homeLayout pageBg">
		<!-- #ifndef MP-TOUTIAO -->
		<custom-nav-bar title="首页"></custom-nav-bar>
		<!-- #endif -->
				
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)" 
			indicator-active-color="#fff" autoplay>
				<swiper-item v-for="item in bannerList" :key="item._id">
					
					<navigator v-if="item.target == 'miniProgram'" 
					:url="item.url" 
					class="like"
					target="miniProgram"
					:app-id="item.appid"
					>
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					
					<navigator v-else :url="`/pages/classlist/classlist?${item.url}`" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>				
			</swiper>
		</view>
		
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notice/detail?id='+item._id">
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		
		<view class="select">
			<common-title>
				<template #name><text @click="routerTo('/pages/subject/subject','reLaunch')">专题推荐</text></template>
				<template #custom>
					<view class="date" @click="routerTo('/pages/subject/subject','reLaunch')">
						<uni-icons type="calendar" size="18"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>							
						</view>						
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="item in randomList" :key="item._id">					
						<picture-item :item="item" :classList="randomList"></picture-item>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="theme">
			<common-title>
				<template #name><text @click="routerTo('/pages/classify/classify','reLaunch')">分类精选</text></template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">More+</navigator>
				</template>
			</common-title>
			
			<view class="content">
				<theme-item v-for="item in classifyList" 
				:key="item._id"
				:item="item"
				></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
			
		</view>
		
		
		
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"
import {routerTo, showToast} from "@/utils/common.js"
const classCloudObj = uniCloud.importObject("client-wallpaper-classify",{customUI:true});
const bannerList= ref([]);
const randomList = ref([]);
const noticeList = ref([]);
const classifyList = ref([]);

const getBanner = async ()=>{	
	bannerList.value = [{
		url:"",
		picurl:"https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/banner/1699255179817_5858.jpg"
	}];	
}

const getDayRandom = async ()=>{	
	randomList.value = [{
		_id:"671c48fe7ad52ddc6cb14cab",
		// picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20241026/1729906765161_0_small.webp"
	},{
		_id:"671c48fe7ad52ddc6cb14ca7",
		// picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20241026/1729906749210_1_small.webp"
	},{
		_id:"66e55e91816a3ffb2dccb589",
		picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240914/1726307754431_8_small.webp"
	},{
		_id:"66022036337a9fefcc439617",
		picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240326/1711415157399_4_small.webp"
	}]	
}


const getNotice = async()=>{	
	noticeList.value = [{
		title:"咸虾米壁纸，版权公告"
	},{
		title:"欢迎使用咸虾米壁纸"
	}]
}

const getClassify =async()=>{
	let {data,errCode,errMsg,...rest} = await classCloudObj.list({select:true});
	if(errCode!==0) return showToast({title:errMsg})
	classifyList.value = data;
}






//跳转到预览页面
const goPreview = (id)=>{
	uni.setStorageSync("storgClassList",randomList.value);
	uni.navigateTo({
		url:"/pages/preview/preview?id="+id
	})	
}


//分享给好友
onShareAppMessage((e)=>{
	return {
		title:"咸虾米壁纸，好看的手机壁纸",
		path:"/pages/classify/classify"
	}
})

//分享朋友圈
onShareTimeline(()=>{
	return {
		title:"咸虾米壁纸，好看的手机壁纸"
	}
})


getBanner();
getDayRandom();
getNotice();
getClassify();
</script>

<style lang="scss" scoped>
.homeLayout{
	.banner{
		width: 750rpx;
		padding:30rpx 0;
		swiper{
			width: 750rpx;
			height: 340rpx;
			&-item{
				width: 100%;
				height: 100%;
				padding:0 30rpx;
				.like{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				
			}
		}
	}
	.notice{
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(){
				.uni-icons{
					color:$brand-theme-color !important;
				}
			}			
			.text{
				color:$brand-theme-color;
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
					color:#666;
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
		padding-top:50rpx;
		.date{
			color:$brand-theme-color;
			display: flex;
			align-items: center;
			:deep(){
				.uni-icons{
					color:$brand-theme-color !important;
				}
			}	
			.text{
				margin-left:5rpx;
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
		padding:50rpx 0;
		.more{
			font-size: 32rpx;
			color:#888;
			
		}
		.content{
			margin-top:30rpx;
			padding:0 30rpx;
			display: grid;
			gap:15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
}
</style>
