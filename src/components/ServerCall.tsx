const serverHost = "http://192.168.0.206";
const serverBase = "/volapp/";

//function callAPI(url, params, callbackFunc) {	
function callServer(trxId, params, callbackFunc){
	
	let requestOptions = {
		method: 'POST',
		contentType: 'application/json',
		headers: { "Content-Type": "application/json", "Accept": "application/json" },
		timeout: 15000,
		origin: serverHost,
		body: JSON.stringify(params)
	}

	Promise.resolve(
		fetch(serverHost + serverBase + trxId, requestOptions)
	)
	.then((response) => {
		if(!response.ok) {
			callbackFunc && callbackFunc(trxId, -1, "Unknown Network or Server Error!", {});
			return;
		}
		Promise.resolve(
			response.text()
		).then(async (text) => {
			//console.log(text);
			let data = await JSON.parse(text);
			//console.log(data);
			let errorCode = data['ErrorCode'] == undefined ? 1 : Number(data['ErrorCode']);
			let errorMsg = data['ErrorMsg'] == undefined ? "Success" : data['ErrorMsg'];

			callbackFunc && callbackFunc(trxId, errorCode, errorMsg, data);
		}).catch((error) => {
			throw error;
		}).finally(() => {
			//
		})
	}).catch((error) => {
		callbackFunc && callbackFunc(trxId, -1, error.toString(), {});
	}).finally(() => {
		//
	});
}
export {
	callServer
}