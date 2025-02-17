import { useEffect, useState } from 'react'
import '../scss/Header.scss'
import { UserKioskModal } from './UserKioskModal'
import { socket } from '@/lib/socketio'
import { IUserKiosk } from '../models'

export const HeaderSmartKiost = () => {
    const [userKioskModalVisible, setUserKioskModalVisible] = useState<boolean>(false)
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUserKiosk["data"]>();
    
    
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
        function onDisconnect() {
            setIsConnected(false);
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
                    setUserData(data)
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
        (async () => {
            if (!userData) return;
            //gọi api ở đây

        })()
    }, [userData])

    const connectSocket = () => {
         if (!isConnected) {
            socket.connect()
            setUserKioskModalVisible(true)
         }
    }

    const disconnectSocket = () => {
        if (!socket.disconnected) {
            socket.disconnect()
            setUserKioskModalVisible(false)
        }
      
    }

    console.log(userData);
    

    return (
        <>
            <header className="Header">
                <div className="container d-flex justify-content-between align-items-center py-3">
                    <div className='text-decoration-none d-inline-flex justify-content-start align-items-center gap-3'>
                        <div className='logo'>
                            <img src="https://hanam-quantri-smartkiosk.fpt.com/Uploads/DonViLogo/2023/9/Logo.png" style={{ width: '48px', height: '48px' }} alt=""></img>
                        </div>
                        <div className="title">SMART KIOSK TỈNH HÀ NAM</div>
                    </div>
                    <div>
                        <button className="box-button-text px-4 btnLoginCCCD" onClick={connectSocket}>
                            <i className="fas fa-user-circle fa-lg me-2"></i><span>Đăng nhập bằng CCCD</span>
                        </button>
                    </div>
                </div>
            </header>
            {userKioskModalVisible ? <UserKioskModal handlerClose={disconnectSocket} userData={userData} /> : null}
        </>
    )
}