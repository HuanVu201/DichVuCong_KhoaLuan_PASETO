import { useEffect, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { chatbotApi } from './apis/chatbot';

import codangLogo from './images/codang.link';
import './App.css';
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import { SearchPublicConfig } from '@/features/config/redux/action';

const ChatBotMobile = () => {
	const {publicModule} = useAppSelector(state => state.config)
	const chatBotConfig = useMemo(()=> {
        const config = publicModule?.find(x => x.code == "chatbot_config")?.content
        return config? JSON.parse(config) : null
    }, [publicModule])
	const dispatch = useAppDispatch()
	useEffect(() => {
		if(publicModule === undefined){
			dispatch(SearchPublicConfig())
		}
	}, [publicModule])
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

	useEffect(() => {
		const fetchDefaultStep = async () => {
			const result = await chatbotApi.jumpTo({
				step_id: chatBotConfig.defaultStepId,
				user_name: user_name,
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
				...(command && {command})
			});

			const { answers, step_id } = result;
			setStepId(step_id);
			setHasFormCard(
				answers.some((answer) => answer.card_type === 'form')
			);
			setChatContent([
				...chatContent,
				{
					type: 'request',
					text: innerText,
				},
				...answers,
			]);
		};

		if (innerText) {
			fetchJumpToStep();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stepIdToCall, innerText, publicModule]);

	useEffect(() => {
		const fetchHandleMessage = async () => {
			const result = await chatbotApi.chat({
				bot_id: chatBotConfig.bot_id,
				sentence: textSend,
				user_name: user_name,
				...(stepId && hasFormCard && { ...{ step_id: stepId } }),
			});

			const { answers, step_id } = result;

			if (answers.length === 0 || !step_id) {
				const result2 = await chatbotApi.jumpTo({
					step_id: defaultStepId,
					user_name: user_name,
				});

				const { answers, step_id } = result2;
				setStepId(step_id);
				setHasFormCard(
					answers.some((answer) => answer.card_type === 'form')
				);
				setChatContent([
					...chatContent,
					{
						type: 'request',
						text: textSend,
					},
					{
						card_type: 'text',
						text: 'Hiện tại câu hỏi của đồng chí đang được cập nhật. Để tra cứu thêm thông tin mời đồng chí đặt câu hỏi hoặc lựa chọn các nội dung dưới đây',
						buttons: [],
					},
					...answers,
				]);
			} else {
				setStepId(step_id);
				setHasFormCard(
					answers.some((answer) => answer.card_type === 'form')
				);
				setChatContent([
					...chatContent,
					{
						type: 'request',
						text: textSend,
					},
					...answers,
				]);
			}
		};

		if (textSend) {
			fetchHandleMessage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textSend, publicModule]);

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
						<img src={codangLogo} alt='logo' />
						<div className='item-card-first'>
							{row?.srcVoice ? (
								<audio
									controls=''
									autoplay=''
									playsinline=''
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

	return (
		<div className='live-chat-container'>
			<div className='live-chat-header'>
				<img src={codangLogo} alt='logo-chat' />
				<div className='live-chat-header-name'>
					<span id='line1'>{chatBotConfig?.line1}</span>
					<span id='line2'>{chatBotConfig?.line2}</span>
				</div>
			</div>
			<div className='live-chat-body'>
				<div className='live-chat-conversation'>
					{chatContent.map((row) => getRowHtml(row))}
				</div>
				<div className='live-chat-input'>
					<div className='live-chat-input-body'>
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
}

export default ChatBotMobile