
import iconDVC from "../../../../../assets/images/info-white.svg"
import { DiaChi, IUser } from "@/features/user/models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useEffect, useMemo, useState } from "react";
import { TSTypeHelpers } from "@/lib/typescripts";
import { Button, Select, Space, Spin } from 'antd';
import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components";
import { ISearchHoSoNhap } from "@/features/hosonhap/models";
import { SearchHoSoNhap } from "@/features/hosonhap/redux/action";
// import { KhoTaiLieuDienTuDetail } from "./KhoTaiLieuDienTuDetail";
import { TiepNhanHoSoProvider } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { IKhoTaiLieuDienTu, ISearchKhoTaiLieuDienTu } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/models/KhoTaiLieuDienTuModel";
import { KhoTaiLieuDienTuApi } from "@/features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/services/KhoTaiLieuDienTuService";
import { toast } from "react-toastify";
import { LoadingOutlined, PlusOutlined, ShareAltOutlined } from "@ant-design/icons";
import '../../../../../features/portaldvc/HoSoCaNhan/components/KhoTaiLieuDienTu/components/KhoTaiLieuDienTu.scss'
import '../../../../../features/portaldvc/HoSoCaNhan/components/TaiLieuDienTuComponent.scss'
import { useKhoTaiLieuDienTuManagerContext } from "../../contexts/KhoTaiLieuDienTuManagerContext";
import { useColumnKhoTaiLieuDienTuManager } from "../../hooks/useColumnKhoTaiLieuDienTuManager";
import { useThongKeKhoTaiLieuContext } from "../../contexts";
import { DanhSachGiayToTrongKhoModalManager } from "./DanhSachGiayToTrongKhoModalManager";
import { KhoTaiLieuDienTuDetailManager } from "./FormKhoTaiLieuDienTuManager";
import { useQuanLyDinhDanhContext } from "@/features/quanlydinhdanhcongdan/context/quanLyDinhDanhCongDanContext";

export default function KhoTaiLieuDienTuTabeleManager({ soDinhDanh, setSoDinhDanh, khoTaiLieuDienTuModalVisible, setKhoTaiLieuDienTuModalVisible }:
    {
        soDinhDanh: string | undefined,
        setSoDinhDanh: (value: string | undefined) => void,
        khoTaiLieuDienTuModalVisible: boolean,
        setKhoTaiLieuDienTuModalVisible: (val: boolean) => void
    }) {
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuManagerContext()
    // const thongKeKhoTaiLieuContext = useThongKeKhoTaiLieuContext()
    const [searchParams, setSearchParams] = useState<ISearchKhoTaiLieuDienTu>({ pageNumber: 1, pageSize: 10 })
    const columns = useColumnKhoTaiLieuDienTuManager()
    const dispatch = useAppDispatch()
    const [listKho, setListKho] = useState<IKhoTaiLieuDienTu[]>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (soDinhDanh && soDinhDanh != '') {
            khoTaiLieuDienTuContext.setSoDinhDanh(soDinhDanh)
        }
        if (khoTaiLieuDienTuModalVisible) {
            khoTaiLieuDienTuContext.setKhoTaiLieuDienTuModalVisible(khoTaiLieuDienTuModalVisible)
        }
    }, [soDinhDanh, khoTaiLieuDienTuModalVisible])
    useEffect(() => {
        (async () => {
            setLoading(true)
            if (khoTaiLieuDienTuContext.soDinhDanh
                && khoTaiLieuDienTuModalVisible
                && !khoTaiLieuDienTuContext.danhSachGiayToTrongKhoModalVisible
                && !khoTaiLieuDienTuContext.themGiayToVaoKhoModalVisible && !khoTaiLieuDienTuContext.detailKhoTaiLieuModalVisible) {
                var res = await KhoTaiLieuDienTuApi.Search({ soDinhDanh: khoTaiLieuDienTuContext.soDinhDanh })
                if (res.status == 200) {
                    setListKho(res.data.data as any)
                }
            }
            setLoading(false)

        })()
    }, [khoTaiLieuDienTuContext.soDinhDanh, khoTaiLieuDienTuContext.reload, khoTaiLieuDienTuContext.danhSachGiayToTrongKhoModalVisible])

    const AddKhoHandeler = () => {
        if (listKho && listKho?.length >= 5) {
            toast.error("Tối đa 5 kho tài liệu!")
        } else {
            khoTaiLieuDienTuContext.setDetailKhoTaiLieuModalVisible(true)
        }
    }

    const handleCancel = () => {
        setKhoTaiLieuDienTuModalVisible(false)
        setSoDinhDanh(undefined)
        khoTaiLieuDienTuContext.setSoDinhDanh(undefined)
        khoTaiLieuDienTuContext.setKhoTaiLieuDienTuModalVisible(false)
    }


    return (
        <AntdModal title={`Danh sách kho tài liệu điện tử`} visible={khoTaiLieuDienTuModalVisible} handlerCancel={handleCancel} fullsizeScrollable
        footer={[
            <Button key="back" onClick={handleCancel}>
                Đóng
            </Button>
        ]}
        >

            <AntdSpace direction="vertical" style={{ width: "100%" }} >
                <div className="taiLieuDienTu">
                    <Spin spinning={loading}
                        indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
                    >
                        <div className="content">
                            <span style={{ fontWeight: 700 }}>Danh sách kho tài liệu điện tử</span>

                            <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'right', gap: 10 }}
                                hidden={khoTaiLieuDienTuContext.soDinhDanh ? false : true}
                            >
                                <div className="buttonAddKho" onClick={() => AddKhoHandeler()}>
                                    <PlusOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Thêm mới
                                </div>
                            </div>
                            <AntdTable
                                bordered
                                className="tableSwapper"
                                columns={columns}
                                dataSource={listKho}
                                searchParams={searchParams}
                                setSearchParams={setSearchParams}
                                onSearch={(params) => { }}
                            />
                        </div>
                        <DanhSachGiayToTrongKhoModalManager />
                        <KhoTaiLieuDienTuDetailManager />

                    </Spin>
                </div>
            </AntdSpace>
        </AntdModal>

    );
}
