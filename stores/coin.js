import { defineStore } from 'pinia';
import {computed, ref} from "vue";
import { showToast } from '../utils/common';
import {useSystemStore} from "@/stores/system.js"
const systemStore = useSystemStore();
const config = computed(()=>systemStore.config)
const actionCloudObj = uniCloud.importObject("client-user-action",{customUI:true});
export const useCoinStore = defineStore('coin', () => {
	const total = ref(0);
	const getCoinCount = async()=>{
		total.value = await actionCloudObj.getCoinCount();
		console.log(total.value);
	}
	//看完广告增加硬币
	const getAdCoin= async()=>{
		try{
			uni.showLoading()
			let {errCode}= await actionCloudObj.giveAdCoin();
			if(errCode!==0) return showToast({title:"获取硬币失败，请重试"});
			showToast({title:`获取${config.value.adCoin}硬币`});
			getCoinCount();
		}catch(err){
			console.log(err);
			showToast({title:err.errMsg})
		}
		
	}
	return { total, getCoinCount,getAdCoin };
});