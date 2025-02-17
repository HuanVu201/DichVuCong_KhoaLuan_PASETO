import "../../TaiLieuDienTuComponent.scss"
import iconDVC from "../../../../../../assets/images/info-white.svg"
import { DiaChi, IUser } from "@/features/user/models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useEffect, useMemo, useState } from "react";
import { Button, Select, Space, Spin } from 'antd';
import { AntdTable } from "@/lib/antd/components";
import { TiepNhanHoSoProvider } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { toast } from "react-toastify";
import { LoadingOutlined, PlusOutlined, ShareAltOutlined } from "@ant-design/icons";
import '../../KhoTaiLieuDienTu/components/KhoTaiLieuDienTu.scss'
import { ChuKySoCaNhanProvider, useChuKySoCaNhanContext } from "../context";
import { IChuKySoCaNhan } from "../model";
import { useChuKySoCaNhanColumn } from "../hook";
import { ChuKySoCaNhanApi } from "../service";
import { ChuKySoCaNhanDetail } from "./ChuKySoCaNhanDetail";
import { ChuKySoCaNhanImage } from "./ChuKySoCaNhanImage";

function ChuKySoCaNhanComponent() {
    const chuKySoCaNhanContext = useChuKySoCaNhanContext()
    const { data: user } = useAppSelector(state => state.user)
    const [searchParams, setSearchParams] = useState({ pageNumber: 1, pageSize: 10 })
    const columns = useChuKySoCaNhanColumn()
    const dispatch = useAppDispatch()
    const [listChuKy, setListChuKy] = useState<IChuKySoCaNhan[]>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        (async () => {
            setLoading(true)
            if (user) {
                var res = await ChuKySoCaNhanApi.Search({ userName: user?.userName })
                if (res.status == 200) {
                    setListChuKy(res.data.data as any)
                } else {
                    toast.error("Lấy danh sách thất bại!")
                }
            }
            setLoading(false)

        })()
    }, [user, chuKySoCaNhanContext.reload])

    const AddChuKyHandeler = () => {
        if (listChuKy && listChuKy?.length >= 5) {
            toast.error("Tối đa 5 chữ ký!")
        } else {
            chuKySoCaNhanContext.setAddChuKyCaNhanModalVisible(true)
            // chuKySoCaNhanContext.setDetailKhoTaiLieuModalVisible(true)
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
                    <div className="title">Chữ ký số cá nhân</div>
                </div>
                <div className="content">
                    <span style={{ fontWeight: 700 }}>Danh sách chữ ký số cá nhân</span>

                    <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'right', gap: 10 }}>
                        <div className="buttonAddKho" onClick={() => AddChuKyHandeler()}>
                            <PlusOutlined style={{ marginRight: "5px", fontSize: "14px" }} />Thêm mới
                        </div>

                    </div>
                    <AntdTable
                        bordered
                        className="tableSwapper"
                        columns={columns}
                        dataSource={listChuKy}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        onSearch={(params) => { }}
                        position={["bottomRight"]}
                    />
                    <ChuKySoCaNhanDetail />
                    <ChuKySoCaNhanImage/>
                </div>

            </Spin>
        </div>

    );
}

const ChuKySoCaNhanWrapper = () =>
(
    <ChuKySoCaNhanProvider>
        <ChuKySoCaNhanComponent />
    </ChuKySoCaNhanProvider>
)

export default ChuKySoCaNhanWrapper;