<template>
	<view class="layout">
		<view class="head">
			<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
			<view class="text" :style="{height:getTitleBarHeight()+'px'}">登录</view> 
		</view>
		
		<view class="content">		
			<view class="logo">
				<view class="pic">
					<image src="../../static/images/xxmLogo.png" mode="aspectFill"></image>
				</view>
				<view class="text">
					<view class="big">咸虾米壁纸</view>
					<view class="small">好看到爆的免费壁纸</view>
				</view>
			</view>
			
			<view class="group">
				<view class="btn weixin" hover-class="btnHover" hover-start-time="50" hover-stay-time="50">
					<uni-icons type="weixin" size="30" color="#fff"></uni-icons>
					<text>微信一键登录</text>
				</view>
				<view class="btn pwd" hover-class="btnHover">
					<uni-icons type="locked-filled" size="25" color="#FF8D69"></uni-icons>
					<text>账号密码登录</text>	
				</view>
			</view>
				
				
			<view class="agreement">
				协议信息
			</view>
		</view>
		
		<view></view>
		
	</view>
</template>

<script setup>
import {getStatusBarHeight,getTitleBarHeight} from "@/utils/system.js"
</script>

<style lang="scss" scoped>
.head{
	.text{
		font-weight: bolder;
		text-align: center;
		width: 100%;		
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.layout{
	background: #fff;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-bottom:220rpx;
	.logo{
		display: flex;
		justify-content: center;
		padding-bottom:60rpx;
		.pic{
			width: 100rpx;
			height: 100rpx;
			border-radius: 20rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.text{			
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left:20rpx;
			color:#FF8D69;			
			.big{
				font-size: 60rpx;
				line-height: 1em;
				font-weight: bold;
			}
			.small{
				font-size: 22rpx;
				letter-spacing: 0.55em;
			}
		}
	}
	
	.group{
		padding:160rpx 60rpx 40rpx;
		display: flex;
		flex-direction: column;
		gap:40rpx;		
		.btn{
			width: 100%;
			height: 100rpx;
			border:1px solid red;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
			font-size: 40rpx;
			color:#FF8D69;
			text{
				padding-left:10rpx;
			}
		}
		.weixin{
			background:#FF8D69;
			color:#fff;
		}
		.btnHover{
			transform: scale(0.98);
		}
	}
	
	.agreement{
		padding:0 60rpx 0;
	}
}
</style>
