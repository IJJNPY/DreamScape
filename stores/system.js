import { defineStore } from 'pinia';
import {ref} from "vue";
const dbJQL = uniCloud.databaseForJQL()

export const useSystemStore = defineStore('system', () => {
	const config = ref({
		dayCoin:10,
		adCoin:30,
		checkedAd:false		
	})
	const getSysConfig = async()=>{
		let {data={}} = await dbJQL.collection("xxm-system-config").orderBy("_id asc").limit(1)
		.field("adCoin,brand,checkedAd,dayCoin,cardVideo,copyright,hots,logo,rewardedVideo,ruleCoin")
		.get({getOne:true});
		config.value = {...config.value,...data}
		console.log(config.value);
	}
	return {config,getSysConfig}
});