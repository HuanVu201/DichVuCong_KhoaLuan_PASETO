
import { DollarCircleOutlined } from "@ant-design/icons"
import iconMoney from "../../../../../assets/images/money.svg"
import { useEffect, useState } from "react"
import { ISearchYeuCauThanhToan, IYeuCauThanhToan, YEUCAUTHANHTOAN_TRANGTHAI, YEUCAUTHANHTOAN_TRANGTHAI_TYPE } from "@/features/yeucauthanhtoan/models"
import { yeuCauThanhToanApi } from "@/features/yeucauthanhtoan/services"
import { useAppSelector } from "@/lib/redux/Hooks"
import { Pagination, PaginationProps } from "antd"
import { AntdTable } from "@/lib/antd/components"
import { useYeuCauThanhToan } from "./hooks/useYeuCauThanhToanColumn"
import "../TaiLieuDienTuComponent.scss"

type FormData = {
    trangThai?: string,
    maHoSo?: string,
    nguoiGui?: string;
}

const ThanhToanPhiLePhi = () => {
    const [formData, setFormData] = useState<FormData>()
    const { data: user } = useAppSelector(state => state.user)
    const [yeuCauThanhToans, setYeuCauThanhToans] = useState<IYeuCauThanhToan[]>()
    const [count, setCount] = useState<number>()
    const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({ pageNumber: 1, pageSize: 20 })
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((curr) => ({
            ...curr,
            [e.target.id]: e.target.value
        }))
    }
    const { columns } = useYeuCauThanhToan({ dataSource: yeuCauThanhToans })
    const onSearch = async () => {
        const res = await yeuCauThanhToanApi.Search({ ...searchParams, ...formData })
        setYeuCauThanhToans(res.data.data)
        setCount(res.data.totalCount)
    }
    useEffect(() => {
        if (user)
            setSearchParams(cur => ({ ...cur, nguoiGui: user?.userName }))
    }, [user])

    return <div className="taiLieuDienTu">
        <div className="main-title">
            <div className="icon">
                <img src={iconMoney} />
            </div>
            <div className="title">Thanh toán phí lệ phí</div>

        </div>
        <div className="form form-group">
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <div className="form-group">
                        <label htmlFor="maHoSo" className="label-text">Mã hồ sơ</label>
                        <input type="text" className="form-control" placeholder="Nhập mã hồ sơ" name="maHoSo" id="maHoSo" onChange={onFormChange} />
                    </div>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="form-group">
                        <label htmlFor="trangThai" className="label-text">Trạng thái yêu cầu</label>
                        <div className="select-custom">
                            <select name="trangThai" value={formData?.trangThai} onChange={onFormChange} id="trangThai" className="form-control select2-hidden-accessible trangThaiSearch" aria-hidden="true">
                                <option value="" className="trangThaiSearch_item">-- Chọn trạng thái yêu cầu --</option>
                                {(Object.keys(YEUCAUTHANHTOAN_TRANGTHAI) as Array<YEUCAUTHANHTOAN_TRANGTHAI_TYPE>).filter(x => x != "Chưa thanh toán").map((trangThaiKey, index) => {
                                    return <option value={trangThaiKey} className="trangThaiSearch_item" key={index}> {YEUCAUTHANHTOAN_TRANGTHAI[trangThaiKey]} </option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row center btnSearch">
                <button className="btn btnSearchAction" onClick={onSearch} style={{ marginBottom: '25px' }}>Tìm kiếm</button>
            </div>
        </div>
        <div>
            {searchParams.nguoiGui ?
                <AntdTable
                    className="tableSwapper"
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    columns={columns}
                    pagination={{ total: count }}
                    dataSource={yeuCauThanhToans}
                    onSearch={onSearch}
                /> : <></>
            }

        </div>
    </div>
}

export default ThanhToanPhiLePhi