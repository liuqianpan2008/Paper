const env =process.env.NODE_ENV;
const config={
	development:{
		baseURL:'http://127.0.0.1:8888',
		wsURL:"ws://127.0.0.1:8888/websocket"
	},
	production:{
		baseURL:'http://jpaper.fengyeqiulin.cn:8888',
		wsURL:"ws://jpaper.fengyeqiulin.cn:8888/websocket"
	}
}
export default{
	baseURL:config[env].baseURL,
	wsURL:config[env].wsURL
}