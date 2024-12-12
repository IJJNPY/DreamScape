<template>
	<view class="preview">
		<swiper circular="true">
			<swiper-item v-for="item in 5">
				<image @click="maskChange" src="../../static/logo.png" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="maskState">
			<view class="goBack" :style="{top:getStatusBarHeight()+'px', marginLeft:getLeftIcon()+'px'}" @click="goBackPage">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count"> 3/9 </view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="23"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="23"></uni-icons>
					<view class="text">5分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable="true" class="value">165453416413135fad</text>
						</view>
						<view class="row">
							<view class="label">分类：</view>
							<text class="value">明星</text>
						</view>
						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">大白菜</text>
						</view>
						<view class="row">
							<view class="label">评分：</view>
							<text class="value rateBox">
								<uni-rate readonly="true" touchable="true" value="3.5" size="16"/>
								<text class="score">5分</text>
							</text>
						</view>
						<view class="row">
							<view class="label">摘要：</view>
							<text class="value">
								内容填充这是一段文字，内容填充这是一段文字，内容填充这是一段文字，内容填充这是一段文字，内容填充这是一段文字，内容填充这是一段文字
							</text>
						</view>
						<view class="row">
							<view class="label">标签：</view>
							<view class="value tabs">
								<view class="tab" v-for="item in 2">
									标签名
								</view>
							</view>
						</view>
						<view class="copyright">
							内容填充这是一段文字，内容填充这是一段文字，内容填充这是一段文字，内容填充这是一段文字，内容填充这是一段文字，内容填充这是一段文字
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				
				<view class="content">
					<uni-rate v-model="userScore" allow-half="true"></uni-rate>
					<text class="text">{{userScore}}分</text>
				</view>
				
				<view class="footer">
					<button @click="submitScore" :disabled="!userScore" type="default" size="mini">确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getStatusBarHeight, getTitleBarHeight,getNavBarHeight,getLeftIcon} from "@/utils/system.js"
const maskState = ref(true);
const infoPopup = ref(null);
const scorePopup = ref(null);
const userScore = ref(0);

//点击Info弹窗
const clickInfo = () => {
	infoPopup.value.open();
}
//点击关闭信息弹窗
const clickInfoClose = () =>{
	infoPopup.value.close();
}

//点击评分弹窗
const clickScore = () =>{
	scorePopup.value.open();
}

//点击关闭评分弹窗
const clickScoreClose = () =>{
	scorePopup.value.close();
}

//确认评分
const submitScore= () =>{
	console.log("评分")
}

//遮罩层状态
const maskChange = ()=>{
	maskState.value = !maskState.value
}

const goBackPage = () => {
	let pages = getCurrentPages();
	let prepage = pages[pages.length - 2];

	if(prepage===undefined){
		uni.switchTab({
			url:"/pages/index/index"
		})
	}else{
		uni.navigateBack()
	}
	
	
}
</script>

<style lang="scss" scoped>
.preview{
	width: 100%;
	height: 100vh;
	position: relative;
	swiper{
		width: 100%;
		height: 100%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.mask{
		//父级紧邻的元素
		&>view{
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			color: #fff;
			width: fit-content;
		}
		.goBack{
			width: 60rpx;
			height: 60rpx;
			background: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 0;
			border-radius: 50%;
			top: 0;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.count{
			top: 10vh;
			background: rgba(0, 0, 0, 0.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding: 8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}
		.time{
			font-size: 140rpx;
			top: calc(10vh + 80rpx);
			font-weight: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}
		.date{
			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}
		.footer{
			background: rgba(255, 255, 255, 0.8);
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color: #000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			backdrop-filter: blur(20rpx);
			.box{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 2rpx 12rpx;
				.text{
					font-size: 26rpx;
					color: $text-font-color-2;
				}
			}
		}
	}

	.popHeader{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title{
			color: $text-font-color-2;
			font-size: 26rpx;
		}
		.close{
			padding: 6rpx;
		}
	}

	.infoPopup{
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		scroll-view{
			max-height: 60vh;
			
			.content{
				.row{
					display: flex;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label{
						color: $text-font-color-3;
						width: 140rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value{
						flex: 1;
						width: 0;
					}
					.rateBox{
						display: flex;
						align-items: center;
						.score{
							font-size: 26rpx;
							color: $text-font-color-2;
							padding: 20rpx;
						}
					}
					.value.tabs{
						display: flex;
						flex-wrap: wrap;
						.tab{
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 20rpx;
							border-radius: 40rpx;
							list-height: 1em;
							margin: 0 10rpx 10rpx 0;
						}
					}
					.class{
						color: $brand-theme-color;
					}
					
					
				}
				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #F6F6F6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}

	.scorePopup{
		background: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.content{
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				color: #FFCA3E;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}
		.footer{
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
