import React, { useEffect, useState } from 'react';
import { useDanhMucThuTucPortalContext } from '../context/DanhMucThuTucPortalContext';
import { AntdModal } from '@/lib/antd/components';
import { Button } from 'antd';

const VideoPlayerTutorial = ({ videoTutorial }: { videoTutorial: string }) => {
    const thuTucPortalContext = useDanhMucThuTucPortalContext();

    const handlerCancel = () => {
        // setVideoTutorial("");
        thuTucPortalContext.setViewTutorialModal(false)
        // const iframe: any = document.querySelector('.video-player-wrapper iframe');
        // if (iframe) {
        //     iframe.src = ''; 
        // }
    }

    // useEffect(() => {
    //     const iframe: any = document.querySelector('.video-player-wrapper iframe');
    //     if (iframe && thuTucPortalContext.urlVideoTutorial) {
    //         iframe.src = thuTucPortalContext.urlVideoTutorial;
    //     }

    // }, [thuTucPortalContext.urlVideoTutorial])

    
    return (
        <AntdModal visible={thuTucPortalContext.viewTutorialModal} title={"Thông tin hướng dẫn nộp hồ sơ"} fullsizeScrollable handlerCancel={handlerCancel}
            footer={[
                <Button key="back" onClick={handlerCancel}>
                    Đóng
                </Button>
            ]}
        >
            <div className="video-player-wrapper" style={{ display: 'flex', }}>
                <div style={{ margin: 'auto' }} dangerouslySetInnerHTML={{ __html: videoTutorial || 'Không có video hướng dẫn cho thủ tục này!' }} />
            </div>

        </AntdModal>
    );
};

export default VideoPlayerTutorial;
