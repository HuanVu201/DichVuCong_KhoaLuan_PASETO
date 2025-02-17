import "../../TaiLieuDienTuComponent.scss"
import iconDVC from "../../../../../../assets/images/info-white.svg"
import { DiaChi, IUser } from "@/features/user/models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useEffect, useMemo, useState } from "react";
import { TSTypeHelpers } from "@/lib/typescripts";
import { Select, Space } from 'antd';
import { AntdTable } from "@/lib/antd/components";
import { ISearchHoSoNhap } from "@/features/hosonhap/models";
import { useHoSoLuuTruColumn } from "../hooks/useColumn";
import { HoSoLuuTruProvider, useHoSoLuuTruContext } from "../contexts/HoSoLuuTruContext";
import { SearchHoSoNhap } from "@/features/hosonhap/redux/action";
import { HoSoLuuTruDetail } from "./HoSoLuuTruDetail";
import { TiepNhanHoSoProvider } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";

function HoSoLuuTruComponent() {
    const hoSoLuuTruContext = useHoSoLuuTruContext()
    const { data: user } = useAppSelector(state => state.user)
    const { datas: hoSoNhaps, count } = useAppSelector(state => state.hosonhap)
    const [searchParams, setSearchParams] = useState<ISearchHoSoNhap>({ pageNumber: 1, pageSize: 10, reFetch: true })
    const columns = useHoSoLuuTruColumn()
    const dispatch = useAppDispatch()
    // useEffect(() => {
    //     if (user) {
    //         setSearchParams((curr) => ({ ...curr, byNguoiGui: true }))
    //     }
    // }, [user])

    return (
        <div className="taiLieuDienTu">
            <div className="main-title">
                <div className="icon">
                    <img src={iconDVC} />
                </div>
                <div className="title">Hồ sơ chưa gửi</div>
            </div>
            <div className="content">
                <span style={{ fontWeight: 700 }}>Danh sách hồ sơ chưa gửi</span>
               <AntdTable
                    bordered
                    className="tableSwapper"
                    columns={columns}
                    dataSource={hoSoNhaps}
                    pagination={{
                        total: count
                    }}
                    // rowSelection={{
                    //     ...rowSelection,
                    // }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchHoSoNhap(params))}
                    position={["bottomRight"]}
                /> 
            </div>
            {hoSoLuuTruContext.maHoSoLuuTruModalVisible ? <HoSoLuuTruDetail /> : null}

        </div>

    );
}

const HoSoLuuTruWrapper = () =>
(<TiepNhanHoSoProvider>
    <HoSoLuuTruProvider>
        <HoSoLuuTruComponent />
    </HoSoLuuTruProvider>
</TiepNhanHoSoProvider>

)

export default HoSoLuuTruWrapper;