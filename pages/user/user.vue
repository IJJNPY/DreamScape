<template>
	<view class="userLayout pageBg" v-if="userInfo || record">
		<view :style="{height:getNavBarHeight()+'px'}"></view>
		<view class="userInfo">
			<view class="box" @click="handleUserInfo">
				
				<view class="avatar">
					<uni-id-pages-avatar 
					v-if="userInfo.avatar_file && userInfo.avatar_file.url" 
					width="102%" height="102%" style="pointer-events: none;"></uni-id-pages-avatar>
					<image v-else 
					src="https://cdn.qingnian8.com/project/bizhi/defAvatar.png" mode="aspectFill"></image>
				</view>
				<view class="name">{{userInfo.nickname || '未登录'}}</view>
			</view>
			<text class="other" selectable>	
				硬币：{{coinStore.total}}
			</text>
		</view>
		
		<view class="section grid" v-if="config.checkedAd">
			<view @click="dayCoin" class="item" hover-class="hoverItem" hover-stay-time="0" hover-start-time="0">
				<uni-icons type="calendar" size="22"></uni-icons>
				<view class="title">每日领币</view>
				<view class="des">+{{config.dayCoin}} / 日</view>
			</view>
			<view @click="adCoin" class="item" hover-class="hoverItem" hover-stay-time="0" hover-start-time="0">
				<uni-icons type="videocam" size="25"></uni-icons>
				<view class="title">看广告得币</view>
				<view class="des">+{{config.adCoin}} / 次</view>
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
				@click="downloadPage"
				hover-class="hoverRow"
				hover-stay-time="0"
				hover-start-time="0"
				class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20" ></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text" v-if="record.downloadSize">{{record.downloadSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view  				
				@click="scorePage"
				hover-class="hoverRow"
				hover-stay-time="0"
				hover-start-time="0"
				class="row">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text" v-if="record.scoreSize">{{record.scoreSize}}</view>
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
				@click="routerTo('/pages/notice/detail?id=xxm-notice-dygx&name=订阅更新')"
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
				@click="routerTo('/pages/notice/detail?id=xxm-notice-cjwt&name=常见问题')"
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
		
		
		<view class="section" v-if="hasLogin">
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
		
		<!-- #ifdef MP-WEIXIN -->
		<view class="section" v-if="systemStore.config.cardVideo">
			<ad-custom :unit-id="systemStore.config.cardVideo"></ad-custom>
		</view>
		<!-- #endif -->
		
	</view>
	
	<view class="loadingLayout" v-else>
		<view :style="{height:getNavBarHeight()+'px'}"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
	
	
	<uni-popup ref="rulePopRef" :is-mask-click="false">
		<view class="rulePop">
			<view class="title">硬币规则说明</view>
			<text class="desc" decode>
				{{config.ruleCoin}}
			</text>
			<view class="confirm" @click="ruleClose">确认</view>
		</view>
	</uni-popup>
	
</template>

<script setup>
import {getNavBarHeight} from "@/utils/system.js"
import {apiUserInfo} from "@/api/apis.js"
import { computed, ref } from "vue";
import {onLoad} from "@dcloudio/uni-app"
import {routerTo, showModal,getPageAndParams, gotoLogin, showToast} from "@/utils/common.js"
import {
    store,
    mutations
} from '@/uni_modules/uni-id-pages/common/store.js'
import pagesJson from '@/pages.json'
import {useSystemStore} from "@/stores/system.js"
import {useCoinStore} from "@/stores/coin.js"
import { watch } from "vue";
const systemStore = useSystemStore();
const coinStore = useCoinStore();
const config = computed(()=>systemStore.config)
const actionCloudObj = uniCloud.importObject("client-user-action",{customUI:true});

const userInfo = computed(()=>store.userInfo);
const hasLogin = computed(()=>store.hasLogin);
const record = ref({downloadSize:0,scoreSize:0});
const rulePopRef = ref(null);

let videoAd = null

onLoad(()=>{
	
})

watch(()=>config.value.rewardedVideo,(nv)=>{
	if(!config.value.rewardedVideo) return;
	if (wx.createRewardedVideoAd) {
	  videoAd = wx.createRewardedVideoAd({
	    adUnitId: config.value.rewardedVideo
	  })
	  videoAd.onLoad(() => {})
	  videoAd.onError((err) => {
	    console.error('激励视频广告加载失败', err)
		showToast({title:"请稍后重试"})
	  })
	  videoAd.onClose((res) => {
		  if(res.isEnded){
			   coinStore.getAdCoin();
		  }else{
			  showToast({title:"广告未完播，无法获得奖励"})
		  }
		 
	  })
	}
},{immediate:true})



const clickContact = ()=>{
	uni.makePhoneCall({
		phoneNumber:"114"
	})
}

const getCoin = ()=>{
	if(!hasLogin.value) return;
	coinStore.getCoinCount();
}

const getRecord = async()=>{
	if(!hasLogin.value) return;
	let res = await  actionCloudObj.userHistoryCount();	
	record.value = res
}


//每日领币
const dayCoin = async()=>{
	console.log("每日领币");
	if(!gotoLogin()) return;
	try{
		uni.showLoading()
		let {errCode} = await actionCloudObj.giveDayCoin();
		if(errCode!==0) return showToast({title:"请重试"})
		showToast({title:"领取成功"});
		getCoin();		
	}catch(err){
		showToast({title:err.errMsg})
	}
	
}




//看广告获得硬币
const adCoin = ()=>{
	if(!gotoLogin()) return;
	if( uni.getSystemInfoSync().uniPlatform !=='mp-weixin') return showToast({title:"只支持微信小程序"})
	console.log("看广告获得硬币");
	if (videoAd) {
	  videoAd.show().catch(() => {
	    // 失败重试
	    videoAd.load()
	      .then(() => videoAd.show())
	      .catch(err => {
	        console.error('激励视频 广告显示失败', err)
			showToast({title:"加载失败，请刷新重试"})
	      })
	  })
	}	
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
const logout = async()=>{
	let feedback = await showModal({content:"是否确认退出登录"})
	if(feedback == 'confirm') mutations.logout();
	init();
}

//登录或者个人中心
const handleUserInfo = ()=>{
	if(hasLogin.value){
		routerTo(`/uni_modules/uni-id-pages/pages/userinfo/userinfo`)
	}else{
		routerTo(`/${pagesJson.uniIdRouter.loginPage}?uniIdRedirectUrl=${getPageAndParams()}`)
	}
	
}

const downloadPage = ()=>{
	if(!gotoLogin()) return;
	routerTo('/pages/classlist/classlist?name=我的下载&type=download')
}
const scorePage = ()=>{
	if(!gotoLogin()) return;
	routerTo('/pages/classlist/classlist?name=我的评分&type=score')
}




const init = ()=>{
	record.value = {downloadSize:0,scoreSize:0};
	coinStore.total = 0
}
//监听登录成功
uni.$on('uni-id-pages-login-success',()=>{
	getRecord();
	getCoin();
})

getRecord();
getCoin();

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
