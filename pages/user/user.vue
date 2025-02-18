<template>
	<view class="userLayout pageBg" v-if="userInfo || record">
		<view :style="{height:getNavBarHeight()+'px'}"></view>
		<view class="userInfo" v-if="userInfo">
			<view class="box">
				<view class="avatar">
					<image src="https://cdn.qingnian8.com/project/bizhi/defAvatar.png" mode="aspectFill"></image>
				</view>
				<view class="name">{{userInfo.nickname}}</view>
			</view>
			<text class="other" selectable>	
				硬币：0
			</text>
		</view>
		
		<view class="section grid">
			<view @click="dayCoin" class="item" hover-class="hoverItem" hover-stay-time="0" hover-start-time="0">
				<uni-icons type="calendar" size="22"></uni-icons>
				<view class="title">每日领币</view>
				<view class="des">+10 / 日</view>
			</view>
			<view @click="adCoin" class="item" hover-class="hoverItem" hover-stay-time="0" hover-start-time="0">
				<uni-icons type="videocam" size="25"></uni-icons>
				<view class="title">看广告得币</view>
				<view class="des">+30 / 次</view>
			</view>
			<view @click="ruleCoin" class="item" hover-class="hoverItem" hover-stay-time="0" hover-start-time="0">
				<uni-icons type="info" size="23"></uni-icons>
				<view class="title">硬币规则</view>
				<view class="des">说明</view>
			</view>			
		</view>				
		
		<view class="section">
			<view class="list">
				<view 				
				@click="routerTo('/pages/classlist/classlist?name=我的下载&type=download')"
				hover-class="hoverRow"
				hover-stay-time="0"
				hover-start-time="0"
				class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20" ></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">{{record.downloadSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view  				
				@click="routerTo('/pages/classlist/classlist?name=我的评分&type=score')"
				hover-class="hoverRow"
				hover-stay-time="0"
				hover-start-time="0"
				class="row">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">{{record.scoreSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view class="row"
				hover-class="hoverRow"
				hover-stay-time="0"
				hover-start-time="0"
				>
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->				
					
					
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="list">
				<view				
				@click="routerTo('/pages/notice/detail?id=653507c6466d417a3718e94b')"
				hover-class="hoverRow"
				hover-stay-time="0"
				hover-start-time="0"
				class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view 				
				@click="routerTo('/pages/notice/detail?id=6536358ce0ec19c8d67fbe82')"
				hover-class="hoverRow"
				hover-stay-time="0"
				hover-start-time="0"
				class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>			
		</view>
		
		
		<view class="section" v-if="false">
			<view class="list">
				<view					
				hover-class="hoverRow"
				hover-stay-time="0"
				hover-start-time="0"
				@click="logout"
				class="row">
					<view class="left">
						<uni-icons type="gear-filled" size="20"></uni-icons>
						<view class="text">退出登录</view>
					</view>
					<view class="right">
						<view class="text">退出当前账号</view>						
					</view>
				</view>
			</view>			
		</view>
		
	</view>
	
	<view class="loadingLayout" v-else>
		<view :style="{height:getNavBarHeight()+'px'}"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
	
	
	<uni-popup ref="rulePopRef" :is-mask-click="false">
		<view class="rulePop">
			<view class="title">硬币规则说明</view>
			<text class="desc" decode>
				1.硬币为咸虾米壁纸虚拟币仅用于下载使用，不可交易及提现；\n
				2.每日可以获得10硬币；\n
				3.看广告并且完播后可获得30硬币；\n
				4.下载一次将消耗10硬币；\n
				5.每日凌晨硬币将会清空初始化；
			</text>
			<view class="confirm" @click="ruleClose">确认</view>
		</view>
	</uni-popup>
	
</template>

<script setup>
import {getNavBarHeight} from "@/utils/system.js"
import {apiUserInfo} from "@/api/apis.js"
import { ref } from "vue";
import {routerTo, showModal} from "@/utils/common.js"
const userInfo = ref(null)
const record = ref({downloadSize:0,scoreSize:0});
const rulePopRef = ref(null);

const clickContact = ()=>{
	uni.makePhoneCall({
		phoneNumber:"114"
	})
}

const getUserInfo = ()=>{
	userInfo.value = {
		_id:"xxx1mmm3ddd8yyy",
		nickname:"咸虾米xxm",
		avatar:"../../static/images/xxmLogo.png"
	}
}

const getRecord = ()=>{
	record.value = {
		downloadSize:2,
		scoreSize:1
	}
}


//每日领币
const dayCoin = ()=>{
	console.log("每日领币");
}

//看广告获得硬币
const adCoin = ()=>{
	console.log("看广告获得硬币");
}

//硬币规则说明
const ruleCoin = ()=>{
	rulePopRef.value.open();	
}

//关闭硬币规则
const ruleClose = ()=>{
	rulePopRef.value.close();
}

//退出登录
const logout = ()=>{
	
}


getRecord();
getUserInfo();
</script>

<style lang="scss" scoped>
.userLayout{
	.userInfo{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;		
		margin:50rpx 0;
		.box{			
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.name{
			font-size: 44rpx;
			color:#333;
			padding:20rpx 0 5rpx;
		}
		.other{
			font-size: 26rpx;
			color:#aaa;
		}
	}
	
	.section{
		width: 690rpx;
		margin:50rpx auto;
		border:1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0,0,0,0.05);
		.list{
			.row{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				position: relative;
				background: #fff;
				&:last-child{border-bottom:0}
				.left{
					display: flex;
					align-items: center;
					:deep(){
						.uni-icons{
							color:$brand-theme-color !important;
						}
					}
					.text{
						padding-left: 20rpx;
						color:#666
					}
				}
				.right{
					display: flex;
					align-items: center;
					.text{
						font-size: 28rpx;
						color:#aaa;
						
					}
				}
				button{
					position: absolute;
					top:0;
					left:0;
					height: 100rpx;
					width:100%;
					opacity: 0;
				}
			}
			.hoverRow{
				transform: scale(0.99);
			}
		}
	}
	.grid{
		display: grid;
		justify-content: space-between;
		grid-template-columns: repeat(3,1fr);
		min-height: 160rpx;
		margin-top:0;
		.item{
			border-right:1px solid #eee;
			background: #fff;
			display: flex;
			flex-direction: column;
			align-items:center;
			justify-content: center;			
			&:last-child{border-right:none}
			:deep(){
				.uni-icons{
					color:$brand-theme-color !important;
				}
			}
			.title{
				font-size: 26rpx;
				padding:8rpx 0 2rpx;
				color:#666;
			}
			.des{
				font-size: 22rpx;
				color: #aaa;
			}
		}
		.hoverItem{
			transform: scale(0.96);
		}
	}
}
.rulePop{
	background: #fff;
	width: 80vw;
	min-height: 200rpx;
	border-radius: 20rpx;
	padding-top:50rpx;
	.title{
		font-size: 38rpx;
		color:#333;
		text-align: center;		
		
	}
	.desc{
		font-size: 30rpx;
		color:#999;
		line-height: 1.7em;
		padding:50rpx;
		display: block;
	}
	.confirm{
		border-top: 1px solid #eee;
		line-height: 3.4em;
		display: flex;
		align-items: center;
		justify-content: center;
		color:$brand-theme-color;
		font-size: 34rpx;
	}
}
</style>
