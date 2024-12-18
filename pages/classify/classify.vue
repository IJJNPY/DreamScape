<template>
	<view class="classLayout">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
		</view>
		
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apiGetClassify } from "@/api/apis.js"
import { onShareAppMessage,onShareTimeline} from "@dcloudio/uni-app"

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

const classifyList = ref([]);

const getClassify = async()=>{
	let res = await apiGetClassify({
		pageSize:15
	})
	classifyList.value = res.data.data;
}

getClassify();
</script>

<style lang="scss" scoped>
.classify{
	padding: 30rpx;
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap: 10rpx;
}
</style>
