import { useEffect, useMemo, useState } from 'react'
import '../scss/Header.scss'
import { UserKioskModal } from './UserKioskModal'
import { socket } from '@/lib/socketio'
import { IUserKiosk } from '../models'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { SearchPublicConfig } from '@/features/config/redux/action'
import { ModalNotificationKisok } from './ModalNotificationKiosk'
import { message } from 'antd'
import { CheckCircleOutlined, ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons'
import { GetTokenKiosk } from '../redux/action'
import { logout, setUserData as setStoreDataUser, setUserKiosk } from "@/features/user/redux/Slice"
import { parseJwt } from '@/utils/common'

export const HeaderSmartKiost = () => {
    const [userKioskModalVisible, setUserKioskModalVisible] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const { publicModule } = useAppSelector(state => state.config)
    const { data: token, } = useAppSelector(state => state.auth)
    const { userKiosk } = useAppSelector(state => state.user)

    socket.connect()

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log('connected');

        }
        function onDisconnect() {
            setIsConnected(false);
            console.log('disconnected');

        }
        function onEvent(eventData: any) {
            console.log(eventData);

            const id: number = eventData.id
            if (!id) {
                return
            }
            switch (id) {
                case 2:
                    const data: IUserKiosk["data"] = eventData.data
                    dispatch(setUserKiosk(data))
                    break;
                default:
                    break;
            }
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('/event', onEvent)
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('/event', onEvent);
        }
    }, [])

    useEffect(() => {
        dispatch(SearchPublicConfig())
    }, [])

    useEffect(() => {
        (async () => {
            if (!userKiosk) return;
            //gọi api ở đây

        })()
    }, [userKiosk])



    const connectSocket = async () => {
        await dispatch(GetTokenKiosk(userKiosk as any))
        setUserKioskModalVisible(true)

    }

    // var tokenTest = "213"

    useEffect(() => {
        if (token) {
            var parseToken = parseJwt(token.token)
            dispatch(setStoreDataUser(parseToken))
            socket.connect()
            message.success({
                content: 'Phiên đăng nhập tồn tại trong 30 phút, vui lòng thoát ra nếu không sử dụng',
                className: 'custom-class',
                style: {
                    fontSize: '30px',
                    marginTop: '50px'
                },
                icon: <CheckCircleOutlined  style={{ color: 'green', fontSize: '24px', marginBottom: '5px' }} />
            });
            
        }
        else {
            message.warning({
                content: 'Vui lòng cho thẻ căn cước công dân vào thiết bị để đăng nhập',
                className: 'custom-class',
                style: {
                    fontSize: '30px',
                    marginTop: '50px'
                },
                icon: <ExclamationCircleOutlined style={{ color: 'red', fontSize: '24px', marginBottom: '5px' }} />
            });

        }
    }, [token])

    useEffect(() => {
        if (userKiosk)
            dispatch(GetTokenKiosk(userKiosk as any))
    }, [userKiosk])

    const disconnectSocket = () => {
        // if (!socket.disconnected) {
        socket.disconnect()
        setUserKioskModalVisible(false)
        // }
    }

    return (
        <>
            <header className="Header">
                <div className="container d-flex justify-content-between align-items-center py-3">
                    <div className='text-decoration-none d-inline-flex justify-content-start align-items-center gap-3'>
                        <div className='logo'>
                            <img src="/images/hccLogo.png" style={{ width: '48px', height: '48px' }} alt=""></img>
                        </div>
                        <div className="title">UBND TỈNH HÀ TĨNH - KIOSK</div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '20px' }}>
                            <button className="box-button-text px-4 btnLoginCCCD" onClick={connectSocket}>
                                <i className="fas fa-user-circle fa-lg me-2"></i><span>{userKiosk ? userKiosk.personName : 'Đăng nhập bằng CCCD'}</span>
                            </button>
                        </div>
                        {userKiosk ?
                            <div>
                                <button className="box-button-text px-4 btnLoginCCCD" onClick={() => dispatch(logout())}>
                                    <i className="fas fa-sign-out-alt fa-lg me-2"></i><span>Đăng xuất</span>
                                </button>
                            </div>
                            :
                            <></>
                        }
                    </div>


                </div>
            </header>
            {userKioskModalVisible && token ? <UserKioskModal handlerClose={disconnectSocket} /> : <></>}
        </>
    )
}