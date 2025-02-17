import { useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { chatbotApi } from './apis/chatbot';

import dvcLink from './images/dvc.link';
import microLink from './images/micro.link';
import './App.css';
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import { SearchPublicConfig } from '@/features/config/redux/action';

const ChatBotMobile = () => {
	const { publicModule } = useAppSelector((state) => state.config);
	const chatBotConfig = useMemo(() => {
		const config = publicModule?.find(
			(x) => x.code == 'chatbot_config'
		)?.content;
		return config ? JSON.parse(config) : null;
	}, [publicModule]);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (publicModule === undefined) {
			dispatch(SearchPublicConfig());
		}
	}, [publicModule]);
	// const bot_id = 1009;
	const user_name = useState('Anonymous_' + uuidv4());
	// const defaultStepId = 1177;

	const [chatContent, setChatContent] = useState([]);
	const [stepId, setStepId] = useState(chatBotConfig?.defaultStepId);
	const [stepIdToCall, setStepIdToCall] = useState();
	const [hasFormCard, setHasFormCard] = useState(false);
	const [innerText, setInnerText] = useState('');
	const [textSend, setTextSend] = useState('');
	const [command, setCommand] = useState();

	console.log({ stepId });

	useEffect(() => {
		const fetchDefaultStep = async () => {
			const result = await chatbotApi.jumpTo({
				step_id: chatBotConfig.defaultStepId,
				user_name: user_name,
				bot_id: chatBotConfig.botId,
			});

			const { answers, step_id } = result;
			setStepId(step_id);

			setHasFormCard(
				answers.some((answer) => answer.card_type === 'form')
			);
			setChatContent([...chatContent, ...answers]);
		};

		if (chatBotConfig && chatBotConfig?.defaultStepId) {
			fetchDefaultStep();
		}

		const conversationElement = document.querySelector(
			'.live-chat-conversation'
		);
		if (conversationElement) {
			conversationElement.scrollTop = conversationElement.scrollHeight;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatBotConfig]);

	useEffect(() => {
		const conversationElement = document.querySelector(
			'.live-chat-conversation'
		);
		if (conversationElement) {
			conversationElement.scrollTop = conversationElement.scrollHeight;
		}

		const textSendElement = document.querySelector('.text-send');
		if (textSendElement) {
			textSendElement.value = '';
		}
	}, [chatContent, publicModule]);

	useEffect(() => {
		const fetchJumpToStep = async () => {
			const result = await chatbotApi.jumpTo({
				step_id: stepIdToCall,
				user_name: user_name,
				...(command && { command }),
				bot_id: chatBotConfig.botId,
			});

			const { answers, step_id } = result;
			setStepId(step_id);
			handleAnswers(answers);
		};

		if (innerText) {
			fetchJumpToStep();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stepIdToCall, innerText, chatBotConfig]);

	useEffect(() => {
		// console.log(chatBotConfig);
		const fetchHandleMessage = async () => {
			const result = await chatbotApi.chat({
				bot_id: chatBotConfig.botId,
				sentence: textSend,
				user_name: user_name,
				...(stepId && hasFormCard && { ...{ step_id: stepId } }),
			});

			const { answers, step_id } = result;

			if (answers.length === 0 || !step_id) {
				handleJumpToDefaultStep();
			} else {
				setStepId(step_id);
				handleAnswers(answers);
			}
		};

		if (textSend) {
			fetchHandleMessage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textSend, chatBotConfig, publicModule]);

	const handleJumpToDefaultStep = () => {
		chatbotApi
			.jumpTo({
				step_id: chatBotConfig.defaultStepId,
				user_name: user_name,
				bot_id: chatBotConfig.botId,
			})
			.then((result) => {
				const { answers, step_id } = result;
				setStepId(step_id);

				setHasFormCard(
					answers.some((answer) => answer.card_type === 'form')
				);
				setChatContent([
					...this.chatContent,
					{
						card_type: 'text',
						text: 'Hiện tại câu hỏi của Ông/bà đang được cập nhật. Để tra cứu thêm thông tin mời Ông/bà đặt câu hỏi hoặc lựa chọn các nội dung dưới đây',
						buttons: [],
					},
					...answers,
				]);
			})
			.catch((error) => console.log('error', error));
	};

	const handleAnswers = (answers) => {
		setHasFormCard(
			(answers ?? []).some((answer) => answer.card_type === 'form')
		);

		(answers ?? []).forEach((answer) => {
			// TODO: Xử lý append voice
			chatbotApi
				.getVoiceFpt(answer.text.replace(/<[^>]*>?/gm, ''))
				.then((resultVoice) => {
					resultVoice = JSON.parse(resultVoice);
					setTimeout(() => {
						setChatContent([
							...chatContent,
							{
								type: 'response',
								text: answer.text,
								buttons: answer.buttons,
								srcVoice: resultVoice?.async,
							},
						]);
					}, 1000);
				})
				.catch(() => {
					setChatContent([
						...chatContent,
						{
							type: 'response',
							text: answer.text,
							buttons: answer.buttons,
						},
					]);
				});
		});
	};

	const handleSendMessage = async (event) => {
		const isValidEvent =
			event.type === 'click' ||
			(event.type === 'keypress' && event?.key === 'Enter');
		if (!isValidEvent) return;

		const textSendElement = document.querySelector('.text-send');
		setTextSend(textSendElement.value);
	};

	const getRowHtml = (row) => {
		return row.type === 'request' ? (
			<div className='row-message'>
				<div className='answer'>
					<div className='text'>{row.text}</div>
				</div>
			</div>
		) : (
			<div className='row-answer'>
				<div className='row-answer-body'>
					<div className='row-answer-content'>
						<img src={dvcLink} alt='logo' />
						<div className='item-card-first'>
							{row?.srcVoice ? (
								<audio
									controls
									autoplay
									playsinline
									onLoadedData={handleLoadedAudio}
								>
									<source
										src={row.srcVoice}
										type='audio/mpeg'
									/>
								</audio>
							) : (
								<></>
							)}
							<div className='row-text'>
								<div className='row-text-body'>
									<div className='row-text-content'>
										<span
											className='content'
											dangerouslySetInnerHTML={{
												__html: row.text,
											}}
										></span>
									</div>
								</div>
							</div>
							{row.buttons.map((button) => getButtonHtml(button))}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const getButtonHtml = (button) => {
		if (button?.type === 'link') {
			if (button?.title) {
				return (
					<div className='row-button' title={button.title}>
						<div className='row-button-body'>
							<a
								className='row-button-content'
								href={button.url}
								target='_blank'
								rel='noreferrer'
							>
								<span>{button.title}</span>
							</a>
						</div>
					</div>
				);
			}
			return <></>;
		}

		return (
			<div className='row-button'>
				<div className='row-button-body'>
					<button
						className='row-button-content'
						data-step-id={button.step_id}
						onClick={(e) => handleJumpToStep(e, button.command)}
					>
						{button.step_name}
					</button>
				</div>
			</div>
		);
	};

	const handleJumpToStep = async (event, _command) => {
		setCommand(_command);
		setStepId(event.currentTarget.dataset.stepId);
		setStepIdToCall(event.currentTarget.dataset.stepId);
		setInnerText(event.currentTarget.innerText);
	};

	const handleLoadedAudio = (e) => {
		const audioElements = document.querySelectorAll('audio');
		audioElements.forEach((audioElement) => {
			audioElement.pause();
		});

		if (e?.currentTarget) {
			e?.currentTarget?.play();
		}
	};

	const handleMicro = () => {
		let mediaRecorder;
		const liveChatBodyElement = document.querySelector('.live-chat-body');
		const overlayElement = document.querySelector('.overlay');
		const constraints = { audio: true };
		let chunks = [];

		// Kiểm tra xem microphone có đang được sử dụng bởi một ứng dụng khác không
		navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				const isMicrophoneAlreadyInUse = devices.some(
					(device) =>
						device.kind === 'audioinput' && device.label !== ''
				);

				if (isMicrophoneAlreadyInUse) {
					// Tắt micro hiện tại nếu đang chạy
					if (mediaRecorder && mediaRecorder.state !== 'inactive') {
						mediaRecorder.stop();
					}

					// Tiếp tục gọi getUserMedia để khởi tạo lại microphone
					startRecording();
				} else {
					startRecording();
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				alert('Lỗi khi kiểm tra trạng thái microphone:', error);
			});

		const startRecording = () => {
			navigator.mediaDevices
				.getUserMedia(constraints)
				.then((stream) => {
					liveChatBodyElement.style.display = 'none';
					overlayElement.style.display = 'block';

					mediaRecorder = new MediaRecorder(stream);

					mediaRecorder.ondataavailable = (event) => {
						chunks.push(event.data);
					};

					mediaRecorder.onstop = () => {
						const blob = new Blob(chunks, {
							type: 'audio/ogg; codecs=opus',
						});
						const url = 'https://api.fpt.ai/hmi/asr/general';
						const apiKey = 'bzlrIiNZ4ktunDyXO6vyrXP3ut0pKkXE';

						fetch(url, {
							method: 'POST',
							headers: {
								'api-key': apiKey,
								'Content-Type': 'application/octet-stream',
							},
							body: blob,
						})
							.then((response) => response.json())
							.then((data) => {
								const txt = data.hypotheses[0].utterance;
								setTextSend(txt);
							})
							.catch((error) => console.error('Error:', error));
					};

					mediaRecorder.start();
					setTimeout(() => {
						mediaRecorder.stop();
						console.log('Dừng ghi âm');
						overlayElement.style.display = 'none';
						liveChatBodyElement.style.display = 'flex';
					}, 4000);
				})
				.catch((error) => {
					alert('Lỗi khi truy cập microphone:', error);
					if (error.name === 'NotAllowedError') {
						alert('Bạn đã từ chối quyền truy cập vào microphone.');
					} else if (error.name === 'NotFoundError') {
						alert('Không tìm thấy thiết bị microphone.');
					} else {
						alert(error.name);
					}
				});
		};
	};

	return (
		<div className='live-chat-container'>
			<div className='live-chat-header'>
				<img src={dvcLink} alt='logo-chat' />
				<div className='live-chat-header-name'>
					<span id='line1'>{chatBotConfig?.line1}</span>
					<span id='line2'>{chatBotConfig?.line2}</span>
				</div>
			</div>

			<div class='overlay'>
				<div className='container'>
					<img src={microLink} alt='Record icon' />
					<div className='micro-desc'>Mời bạn nói</div>
				</div>
			</div>

			<div className='live-chat-body'>
				<div className='live-chat-conversation'>
					{chatContent.map((row) => getRowHtml(row))}
				</div>
				<div className='live-chat-input'>
					<div className='live-chat-input-body'>
						<img
							onClick={handleMicro}
							src={microLink}
							alt='send'
							class='micro'
						/>

						<input
							className='text-send'
							type='text'
							placeholder={chatBotConfig?.inputPlaceholder}
							onKeyPress={handleSendMessage}
						/>
						<img
							src='https://cdn-icons-png.flaticon.com/512/6652/6652725.png'
							alt='send'
							onClick={handleSendMessage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatBotMobile;
