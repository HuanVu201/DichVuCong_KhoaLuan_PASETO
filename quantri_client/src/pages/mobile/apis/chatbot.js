const baseUrl = 'https://chatbot.hanhchinhcong.net/api';

const getVoice = (msg) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: msg,
		redirect: 'follow',
	};

	return new Promise((resolve, reject) => {
		fetch(`${baseUrl}/t2s`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

const getVoiceFpt = (msg) => {
	const url = 'https://api.fpt.ai/hmi/tts/v5';

	const headers = {
		'api-key': 'P93eEyQoac0vBXs1N8ia8PRKKZnvy1Yy',
		speed: '',
		voice: 'banmai',
	};

	const options = {
		method: 'POST',
		headers: headers,
		body: msg,
	};

	return new Promise((resolve, reject) => {
		fetch(url, options)
			.then((response) => response.text())
			.then((data) => resolve(data))
			.catch((error) => reject(error));
	});
};

const chat = (req) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const raw = JSON.stringify(req);

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow',
	};

	return new Promise((resolve, reject) => {
		fetch(`${baseUrl}/qa`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				resolve(result);
			})
			.catch((error) => reject(error));
	});
};

const jumpTo = ({ step_id, user_name, command, bot_id }) => {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const raw = JSON.stringify({
		user_name,
		step_id,
		command,
		bot_id,
	});

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow',
	};

	return new Promise((resolve, reject) => {
		fetch(`${baseUrl}/steps/jumpto`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				resolve(result);
			})
			.catch((error) => reject(error));
	});
};

export const chatbotApi = {
	getVoice,
	getVoiceFpt,
	chat,
	jumpTo,
};
