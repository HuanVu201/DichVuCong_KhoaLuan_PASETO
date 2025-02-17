import "../../TaiLieuDienTuComponent.scss"
import iconDVC from "../../../../../../assets/images/info-white.svg"
import { DiaChi, IUser } from "@/features/user/models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useEffect, useMemo, useState } from "react";
import { TSTypeHelpers } from "@/lib/typescripts";
import { Button, Select, Space, Spin } from 'antd';
import { AntdTable } from "@/lib/antd/components";
import { ISearchHoSoNhap } from "@/features/hosonhap/models";
import { useColumnKhoTaiLieuDienTu } from "../hooks/useColumnKhoTaiLieuDienTu";
import { KhoTaiLieuDienTuProvider, useKhoTaiLieuDienTuContext } from "../contexts/index";
import { SearchHoSoNhap } from "@/features/hosonhap/redux/action";
// import { KhoTaiLieuDienTuDetail } from "./KhoTaiLieuDienTuDetail";
import { TiepNhanHoSoProvider } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { IKhoTaiLieuDienTu, ISearchKhoTaiLieuDienTu } from "../models/KhoTaiLieuDienTuModel";
import { KhoTaiLieuDienTuApi } from "../services/KhoTaiLieuDienTuService";
import { toast } from "react-toastify";
import { LoadingOutlined, PlusOutlined, SendOutlined, ShareAltOutlined } from "@ant-design/icons";
import './KhoTaiLieuDienTu.scss'
import { KhoTaiLieuDienTuDetail } from "./FormKhoTaiLieuDienTu";
import { DanhSachGiayToTrongKhoModal } from "./DanhSachGiayToTrongKhoModal";
import { ThemGiayToVaoKhoModal } from "./ThemGiayToVaoKhoModal";
import { TaiLieuDienTuTrongKhoDetail } from "./TaiLieuDienTuTrongKhoDetail";
import { TaiLieuDuocChiaSeModal } from "./TaiLieuDuocChiaSeModal";
import { TaiLieuDaChiaSeModal } from "./TaiLieuDaChiaSeModal";

function KhoTaiLieuDienTuComponent() {
    const khoTaiLieuDienTuContext = useKhoTaiLieuDienTuContext()
    const { data: user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState<ISearchKhoTaiLieuDienTu>({ pageNumber: 1, pageSize: 10 })
    const columns = useColumnKhoTaiLieuDienTu()
    const dispatch = useAppDispatch()
    const [listKho, setListKho] = useState<IKhoTaiLieuDienTu[]>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        (async () => {
            setLoading(true)
            if (user?.soDinhDanh && !khoTaiLieuDienTuContext.danhSachGiayToTrongKhoModalVisible
                && !khoTaiLieuDienTuContext.themGiayToVaoKhoModalVisible && !khoTaiLieuDienTuContext.detailKhoTaiLieuModalVisible) {
                var res = await KhoTaiLieuDienTuApi.Search({ soDinhDanh: user?.soDinhDanh })
                if (res.status == 200) {
                    setListKho(res.data.data as any)
                }
            }
            setLoading(false)

        })()
    }, [user, khoTaiLieuDienTuContext.reload, khoTaiLieuDienTuContext.danhSachGiayToTrongKhoModalVisible])

    const AddKhoHandeler = () => {
        if (listKho && listKho?.length >= 5) {
            toast.error("Tối đa 5 kho tài liệu!")
        } else {
            khoTaiLieuDienTuContext.setDetailKhoTaiLieuModalVisible(true)
        }
    }

    return (
        <div className="taiLieuDienTu">
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <div className="main-title">
                    <div className="icon">
                        <img src={iconDVC} />
                    </div>
                    <div className="title">Kho tài liệu điện tử</div>
                </div>
                <div className="content">
                    <span style={{ fontWeight: 700 }}>Danh sách kho tài liệu điện tử</span>

                    <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'right', gap: 10 }}
                        hidden={user?.soDinhDanh ? false : true}
                    >
                        <div className="buttonAddKho" onClick={() => AddKhoHandeler()}>
                            <PlusOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Thêm mới
                        </div>
                        <div className="buttonToShare" onClick={() => khoTaiLieuDienTuContext.setTaiLieuDuocChiaSeModalVisible(true)}>
                            <ShareAltOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Tài liệu được chia sẻ
                        </div>
                        <div className="buttonShared" onClick={() => khoTaiLieuDienTuContext.setTaiLieuDaChiaSeModalVisible(true)}>
                            <SendOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Tài liệu đã chia sẻ
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
                        position={["bottomRight"]}
                    />
                </div>
                <KhoTaiLieuDienTuDetail />
                <TaiLieuDuocChiaSeModal />
                <TaiLieuDaChiaSeModal />
                <DanhSachGiayToTrongKhoModal />
                <ThemGiayToVaoKhoModal />

            </Spin>
        </div>

    );
}

const KhoTaiLieuDienTuWrapper = () =>
(
    <KhoTaiLieuDienTuProvider>
        <KhoTaiLieuDienTuComponent />
    </KhoTaiLieuDienTuProvider>
)

export default KhoTaiLieuDienTuWrapper;