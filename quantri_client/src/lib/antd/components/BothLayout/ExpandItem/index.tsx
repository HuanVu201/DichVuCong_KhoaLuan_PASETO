import { useState, useEffect, useMemo, useRef } from "react"
import './ExpandItem.scss'
import 'bootstrap/dist/css/bootstrap.css';
import logoDvc from '../../../../../assets/images/dvcLogo.png'
import logoFb from '../../../../../assets/images/fbThanhHoa.png'
import logoZalo from '../../../../../assets/images/zaloThanhHoa.png'
import upIcon from '../../../../../assets/images/IconUp.png'
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchPublicConfig } from "@/features/config/redux/action";
import { Link } from "react-router-dom";
import { useWindowSizeChange } from "@/hooks/useWindowSizeChange";


function ExpandItem() {
    let linkFacebook
    let useLinkFacebook = false
    let linkZalo
    let useLinkZalo = false
    let linkDvcQG
    let useLinkDvcQG = false
    const { publicModule } = useAppSelector(state => state.config)
    const dispatch = useAppDispatch()
    const [contentAlert, setContentAlert] = useState<string>('abcd')
    const { isWindow, isTablet } = useWindowSizeChange()

    const { datas: quanlylienket } = useAppSelector(
        (state) => state.quanlylienket
    );
    useEffect(() => {
        if (publicModule === undefined) {
            dispatch(SearchPublicConfig())
        }
    }, [publicModule])
    const CHATBOT_WIDTH = isWindow || isTablet ? 40 : 30;

    quanlylienket?.map(item => {
        if (item.ma === "facebook") {
            linkFacebook = item.linkLienKet;
            useLinkFacebook = item.suDung;
        }
        if (item.ma === "zalo") {
            linkZalo = item.linkLienKet;
            useLinkZalo = item.suDung
        }
        if (item.ma === "dvcQuocGia") {
            linkDvcQG = item.linkLienKet;
            useLinkDvcQG = item.suDung
        }
    })

    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGoToTop(true)
            }
            else {
                setShowGoToTop(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const chatBotConfig = useMemo((): {
        show: boolean,
        botId: number,
        line1: string,
        line2: string,
        welcomeMessage: string,
        inputplaceholder: string,
        zIndex: number,
        defaultStepId: number
    } => {
        const config = publicModule?.find(x => x.code == "chatbot_config")?.content
        return config ? JSON.parse(config) : null
    }, [publicModule])

    const MouseEnterHandler = (id: any) => {
        const ele: any = document.querySelector(`#${id}BlockAlert`)
        ele.style.display = 'inline-block'

    }
    const MouseLeaveHandler = (id: any) => {
        const ele: any = document.querySelector(`#${id}BlockAlert`)
        ele.style.display = 'none'
    }

    const chatbotRef = useRef(null)

    useEffect(() => {

        const chatbotElement: any = chatbotRef.current;

        if (chatbotElement) {
            const shadowRoot = chatbotElement.shadowRoot;

            if (shadowRoot) {
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes pulse {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.1);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                    .live-chat-button {
                        right: 2px !important;
                        width: ${CHATBOT_WIDTH}px !important;
                        padding: 0;
                        height: ${CHATBOT_WIDTH}px !important;
                        box-shadow: none !important;
                        background-color: transparent !important;
                        position: relative;
                        overflow: visible !important;
                    }
                    .live-chat-button > img[alt="chat-button"]{
                        display: none;
                    }
                    .live-chat-button::after {
                        animation: pulse 0.6s infinite;
                        position: absolute;
                        inset: 0 0 0 0;
                        display: block;
                        border-radius:5px;
                        content: "";
                        width: 100%;
                        height:100%;
                        background-image: url("/images/chatbot.jpg");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size:contain;
                    }
                    .animate-open {
                        display: none;
                    }
                    `;
                shadowRoot.appendChild(style);
            }
        }
    }, [chatbotRef.current]);


    return (
        <div className='expandItem' style={{ zIndex: 0 }}>

            <div className='expandItem_support' style={{ zIndex: 0, bottom: CHATBOT_WIDTH + 30 }} id="chatBotWidgets">
                {showGoToTop && (
                    <a className='cd-top cd-is-visible goHead' href='#' title='Lên đầu trang'>
                        <img className='UpIcon' id="goTop" src={upIcon} title='Lên đầu trang' />
                    </a>
                )}

                {
                    linkDvcQG && useLinkDvcQG &&
                    <Link className='connectWidget' id='dvcQGBlock' to={linkDvcQG} target="_blank"
                        onMouseOver={(e: any) => MouseEnterHandler(e.target.id)}
                        onMouseOut={(e: any) => MouseLeaveHandler(e.target.id)}
                    >
                        <div id="dvcQGBlockAlert" className="blockAlert">
                            Cổng Dịch vụ công Quốc gia
                        </div>
                        <img className="iconWidget" id='dvcQG' src='/images/dvcLogo.png' alt="Cổng Dịch vụ công Quốc gia" />
                    </Link>
                }
                {
                    linkFacebook && useLinkFacebook &&
                    <Link className='connectWidget' id='fbBlock' to={linkFacebook} target="_blank"
                        onMouseOver={(e: any) => MouseEnterHandler(e.target.id)}
                        onMouseOut={(e: any) => MouseLeaveHandler(e.target.id)}
                    >
                        <div id="fbBlockAlert" className="blockAlert">
                            Facebook
                        </div>
                        <img className="iconWidget" id='fb' src='/images/fbThanhHoa.png' alt="" />
                    </Link>
                }
                {
                    linkZalo && useLinkZalo &&
                    <Link className='connectWidget' id='zaloBlock' to={linkZalo} target="_blank"
                        onMouseOver={(e: any) => MouseEnterHandler(e.target.id)}
                        onMouseOut={(e: any) => MouseLeaveHandler(e.target.id)}
                    >
                        <div id="zaloBlockAlert" className="blockAlert">
                            Zalo
                        </div>
                        <img className="iconWidget" id='zalo' src='/images/zaloThanhHoa.png' />
                    </Link>

                }
                {chatBotConfig && chatBotConfig?.show ? <div id="chatbot">
                    <td-chatbot logo="chatblue" line1={chatBotConfig.line1 || ""} line2={chatBotConfig.line2 || ""}
                        welcomemessage={chatBotConfig.welcomeMessage} bot_id={chatBotConfig.botId}
                        inputplaceholder={chatBotConfig.inputplaceholder} zIndex={chatBotConfig?.zIndex} ref={chatbotRef} defaultStepId={chatBotConfig.defaultStepId}>

                    </td-chatbot>

                </div> : null}

            </div>




        </div>
    );
}

export default ExpandItem;