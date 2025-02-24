<template>
	<view class="listLayout">
		<view class="head" style="background-image: url(https://cdn.qingnian8.com/public/xxmBizhi/20240905/1725543485532_0_small.webp);">
			
			<view class="inner" :style="{paddingTop:getStatusBarHeight()+'px'}">
				<view :style="{height:getTitleBarHeight()+'px'}" class="backOut">
					<view class="goBack" @click="goBack">
						<uni-icons type="back" color="#fff" size="20"></uni-icons>
					</view>
				</view>
				<view class="theme">
					{{detail.theme}}
				</view>								
				<view class="day">{{detail.day}}推荐</view>								
				<view class="description" v-if="true">
					这里是详细的描述信息，可以有也可以隐藏，此处为内容填充部分
				</view>				
			</view>				
				
		</view>
		
		
		<view class="content">
			<view class="size">共15张，3999人看过</view>
			<view class="list">
				<view class="item"
				v-for="item in detail.picList"
				:key="item._id"
				>	
					<picture-item :item="item" :classList="detail.picList"></picture-item>				
				</view>
			</view>
			<view class="loadingLayout">
				<uni-load-more status="noData"></uni-load-more>
			</view>
		</view>
		
		
	</view>
</template>

<script setup>
import { computed ,ref} from "vue";
import {getStatusBarHeight,getTitleBarHeight,getNavBarHeight} from "@/utils/system.js"
import {onLoad,onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"


//分类列表数据
const detail = ref({});


let id,name;


onLoad((e)=>{	
	({id, name} = e);
		
	//执行获取分类列表方法
	getDetail();
})



//获取分类列表网络数据
const getDetail = async ()=>{	
	let data = {_id:"xxxxx",theme:"AI美女专题",day:"2024-11-12",size:15,view_count:123,picList:[{_id:"n8jgh72qc1",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20241026/1729906765161_0_small.webp"},{_id:"5xpd5tqmpf3",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20241026/1729906749210_1_small.webp"},{_id:"a28bu9bah3a",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240906/1725589938397_1_small.webp"},{_id:"6tf4lzsubjq",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240622/1719022883133_1_small.webp"},{_id:"0nb4d0hog10q",picurl:"https://cdn.qingnian8.com/public/xxmBizhi/20240327/1711530698069_5_small.webp"}]}		
	detail.value = data;	
}


//分享给好友
onShareAppMessage((e)=>{
	return {
		title:name,
		path:"/pages/subject/detail?id="+id+"&name="+name
	}
})


//分享朋友圈
onShareTimeline(()=>{
	return {
		title:name,
		query:"id="+id+"&name="+name
	}
})

//返回上一页
const goBack = () => {
	uni.navigateBack({
		success: () => {
			
		},
		fail: (err) => {
			uni.reLaunch({
				url:"/pages/index/index"
			})
		}
	})
}
</script>

<style lang="scss" scoped>
.listLayout{
	.backOut{
		display: flex;
		align-items: center;
		.goBack {
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);		
			margin-left: 30rpx;
			border-radius: 100px;		
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
	.head{			
		background-size: cover;		
		position: relative;
		overflow: hidden;
		.inner{
			width: 100%;
			min-height:200rpx;	
			background-color: rgba(0, 0, 0, 0.2);
			backdrop-filter: blur(30px) saturate(180%);
			padding-bottom:80rpx;
			.theme{
				color:#fff;				
				font-weight: bolder;
				font-size: 50rpx;
				text-align: center;
				padding-left:30rpx;
				padding-right:30rpx;
			}
			
			.day{
				padding:10rpx 30rpx 30rpx;
				font-size: 28rpx;
				color:#fff;
				text-align: center;
			}
				
			.description{
				font-size: 34rpx;
				padding:30rpx;
				padding-top:10rpx;
				color:rgba(255,255,255,0.7);
				line-height: 1.6em;
			}
			
			&::before{
				content: "";
				display: block;
				width: 400rpx;
				height: 400rpx;
				border-radius: 50%;
				background: rgba(255,255,255,0.07);
				position: absolute;
				right: -100rpx;
				top:-50rpx;
			}
			&::after{
				content: "";
				display: block;
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				background: rgba(255,255,255,0.05);
				position: absolute;
				right: 250rpx;
				top:150rpx;
			}
		}
	}
	
	.content{
		width: 100%;
		min-height: 500px;
		background: #fff;
		border-radius: 70rpx 70rpx 0 0;
		transform: translateY(-70rpx);
		.size{
			font-size: 22rpx;
			color:$text-font-color-3;
			line-height: 70rpx;
			text-align: center;
		}
		.list{
			display: grid;
			grid-template-columns: repeat(3,1fr);
			gap:15rpx;
			padding:15rpx;
			padding-top:0;
			.item{
				height: 440rpx;
				border-radius: 18rpx;
				overflow: hidden;
			}
		}
	}

}
</style>
