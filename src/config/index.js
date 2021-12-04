const env =process.env.NODE_ENV;
const config={
	development:{
		baseURL:'http://127.0.0.1:8888'
	},
	production:{
		baseURL:'http://jpaper.fengyeqiulin.cn:8888'
	}
}
export default{
	baseURL:config[env].baseURL
}