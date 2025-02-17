import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdModal } from "@/lib/antd/components"
import { PhieuTiepNhanHoSo } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTiepNhanHoSo/PhieuTiepNhanHoSo"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf"
import { Button, Spin } from "antd";
import { fillSoChungThuc, generateDocxWithImages } from "@/utils/common";
import { XuLyHoSoProvider, useXuLyHoSoContext } from "../../contexts/XuLyHoSoContext";
import { MA_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA, TEN_PHIEU_TIEP_NHAN_VA_HEN_TRA_KET_QUA } from "@/pages/dvc/MauPhieu/documents/pdf";
import { btnSignClick } from "@/utils/common";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NGUOI_TIEP_NHAN_HO_SO } from "../../data/signData";
import { CURRENTTIME } from "@/data";
import { LoadingOutlined } from "@ant-design/icons";
import { saveAs } from 'file-saver'
import KyDienTuModal from "./KyDienTuModal";
import { PhieuHuongDanNopTrucTiep } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuHuongDanNopTrucTiep/PhieuHuongDanNopTrucTiep";
import { IHoSo } from "../../models";


const PhieuHuongDanNopTrucTiepModalVisible = ({ noiDungHuongDan, hoSo }:
    {
        noiDungHuongDan: string | undefined, hoSo: IHoSo | undefined,
        
    }) => {
    const buttonActionContext = useButtonActionContext()
    const xuLyHoSoContext = useXuLyHoSoContext()
    const { publicModule: config } = useAppSelector(state => state.config)
    const [xuatWord, setXuatWord] = useState<boolean>(false)

    const [xuatDocx, setXuatDocx] = useState<boolean>(false)
    const [kyDienTuCongDan, setKyDienTuCongDan] = useState<boolean>(false)

    useEffect(() => {
        config?.map((item: any) => {
            if (item.code == 'xuat-docx' && item.content == '1')
                setXuatDocx(true)
            if (item.code == 'ky-dien-tu-cong-dan' && item.content == '1')
                setKyDienTuCongDan(true)
        })
    }, [config])

    const handlerCancel = () => {
        buttonActionContext.setInHuongDanNopTrucTiepModalVisible(false)
    }

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

    const xuatLaiPhieuAction = () => {
        if (buttonActionContext.inPhieuTiepNhanHoSoModalVisible) {
            xuLyHoSoContext.setBase64ChuKyDienTu(xuLyHoSoContext.base64transparent)
            xuLyHoSoContext.handlerXuatLaiPhieu()
        }

    }

    const kySo = async () => {
        xuLyHoSoContext.handlerKySo(NGUOI_TIEP_NHAN_HO_SO);
    }

    return <AntdModal okText="Tải phiếu" visible={buttonActionContext.inHuongDanNopTrucTiepModalVisible}
        title={"Phiếu hướng dẫn hoàn thiện hồ sơ"} fullsizeScrollable handlerCancel={handlerCancel}
        footer={[

            <Button
                type="primary"
                onClick={() => setXuatWord(true)}
                hidden={!xuatDocx}
                disabled={xuLyHoSoContext.loading}
            >
                Xuất phiếu word
            </Button>,
            <Button
                type="primary"
                onClick={taiPhieu} //In tương tự Window + P
                disabled={xuLyHoSoContext.loading}
            >
                In phiếu
            </Button>,
            // <Button
            //     type="primary"
            //     onClick={kySo}
            //     disabled={xuLyHoSoContext.loading}
            // >
            //     Ký số
            // </Button>,
            <Button key="back" onClick={handlerCancel} >
                Hủy
            </Button>


        ]}
    >
        <Spin spinning={xuLyHoSoContext.loading}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
            <PhieuHuongDanNopTrucTiep noiDungHuongDan={noiDungHuongDan} hoSo={hoSo} xuatWord={xuatWord} setXuatWord={setXuatWord}/>

        </Spin>
    </AntdModal>
}
const PhieuHuongDanNopTrucTiepModal = ({ noiDungHuongDan, hoSo }:
    {
        noiDungHuongDan: string | undefined, hoSo: IHoSo | undefined,
    }) => (
    <XuLyHoSoProvider>
        <PhieuHuongDanNopTrucTiepModalVisible noiDungHuongDan={noiDungHuongDan} hoSo={hoSo} />
    </XuLyHoSoProvider>
);


export default PhieuHuongDanNopTrucTiepModal