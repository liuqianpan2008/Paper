import config from './config/index'


class ws {
	constructor(user) {
		this.ws1 = new WebSocket(config.wsURL + "/" + user);
		this.ws1.addEventListener('open', function (e) {
			console.log("WS open",e);
		},false)
		this.ws1.addEventListener('close', function (e) {
			console.log("WS close",e);
		},false)
		this.ws1.addEventListener('error', function (e) {
			console.log("WS error",e);
		},false)
	}
	ws_connect(fMessage) {
		this.ws1.addEventListener('message', fMessage,false)
	}
	ws_close(){
		this.ws1.close()
	}
	getWs(){
		return this.ws1;
	}
}

export default{
	ws
}