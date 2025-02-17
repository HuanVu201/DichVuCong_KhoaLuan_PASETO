import "./TaiLieuDienTuComponent.scss"
import iconDVC from "../../../../assets/images/info-white.svg"
import { DiaChi, IUser } from "@/features/user/models";
import { IUserPortal } from "../../UserPortal/models/UserPortal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data";
import { useEffect, useMemo, useState } from "react";
import { TSTypeHelpers } from "@/lib/typescripts";
import { Select, Space } from 'antd';
import { AntdTable } from "@/lib/antd/components";
import { ISearchGiayToSoHoa } from "@/features/giaytosohoa/models";
import { useGiayToSoHoaColumn } from "@/features/hoso/hooks/useGiayToSoHoaColumn";
import { SearchGiayToSoHoa } from "@/features/giaytosohoa/redux/action";

function TaiLieuDienTuComponent() {
    const {data: user} = useAppSelector(state => state.user)
    const {datas: giayToSoHoas, count} = useAppSelector(state => state.giaytosohoa)
    const [searchParams, setSearchParams] = useState<ISearchGiayToSoHoa>({ pageNumber: 1, pageSize: 10, reFetch: true})
    const columns = useGiayToSoHoaColumn()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(user){
            setSearchParams((curr) => ({...curr, maDinhDanh: user.soDinhDanh}))
        }
    }, [user])
    
    return (
        <div className="taiLieuDienTu">
            <div className="main-title">
                <div className="icon">
                    <img src={iconDVC} />
                </div>
                <div className="title">Kho dữ liệu cá nhân</div>
            </div>

            <div className="head">
                {/* <h5>Danh sách giấy tờ</h5>
                <div className="selectBlock" style={{ marginTop: '20px' }}>
                    <span>Danh mục giấy tờ</span>
                    <Select
                        defaultValue="none"
                        style={{ width: '100' }}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </div> */}
            </div>
            <div className="content">
                <span style={{fontWeight: 500}}>Danh sách các giấy tờ</span>
                {searchParams.maDinhDanh ?  <AntdTable
                    columns={columns}
                    dataSource={giayToSoHoas}
                    pagination={{
                        total: count
                    }}
                    // rowSelection={{
                    //     ...rowSelection,
                    // }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchGiayToSoHoa(params))}
                />: null}

            </div>
        </div>
    );
}

export default TaiLieuDienTuComponent;