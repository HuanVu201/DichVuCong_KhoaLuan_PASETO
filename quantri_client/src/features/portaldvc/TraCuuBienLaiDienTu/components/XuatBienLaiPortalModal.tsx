import { IBienLaiThanhToanPortal } from "../model";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from 'file-saver'
import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components"
import { BienLaiDetailPortal } from "./BienLaiDetailPortal";
import { Button, Spin } from "antd";
import { LoadingOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";
import { useTraCuuBienLaiDienTuContext } from "../context/TraCuuBienLaiDienTuProvider";


export const XuatBienLaiPortalModal = () => {
    const traCuuContext = useTraCuuBienLaiDienTuContext()

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn Ctrl+P
                taiPhieu(); // Gọi hàm in PDF
            }
        };
        // Nghe sự kiện keydown trên cả trang web
        document.addEventListener('keydown', handleKeyPress);
        // Xóa bỏ sự kiện khi component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    const taiPhieu = async () => {
        const iframe: any = document.getElementById('iframePdf')
        if (iframe) {
            iframe.contentWindow.print(); // Gọi hàm in của iframe
        }
    }


    const handleCancel = () => {
        traCuuContext.setViewBienLaiThanhToanVisible(false)
        traCuuContext.setGetBienLaiParams({})
        traCuuContext.setBienLaiDetail(undefined)

    }
    return (<>
        <AntdModal title={`Thông tin biên lai điện tử`} width={"100%"} visible={traCuuContext.bienLaiDetail?.loaiBienLaiThanhToan == 'local' ? true : false} fullsizeScrollable handlerCancel={handleCancel}
            footer={
                <AntdSpace direction="horizontal">
                    <AntdButton key={1} onClick={handleCancel}>Đóng</AntdButton>
                </AntdSpace>
            }
        >
            <Spin spinning={traCuuContext.loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <BienLaiDetailPortal />
            </Spin>
        </AntdModal>
    </>)
}