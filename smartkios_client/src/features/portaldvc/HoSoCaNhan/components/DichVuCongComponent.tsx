import "./DichVuCongComponent.scss"
import iconDVC from "../../../../assets/images/info-white.svg"

import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { SearchHoSo } from "@/features/hoso/redux/action"
import { HoSoItem } from "./HoSoItem"
import { resetDatas } from "@/features/hoso/redux/slice"
import { Pagination, PaginationProps } from "antd"
import { useSearchParams } from "react-router-dom"
import { IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models"
import { yeuCauThanhToanApi } from "@/features/yeucauthanhtoan/services"

export type HoSoFormData = Partial<Pick<IHoSo, "tenTTHC" | "maHoSo">> & {
    maTrangThai?: string;
}

function DichVuCongComponent() {
    const dispatch = useAppDispatch()
    const { datas: hoSos, count } = useAppSelector(state => state.hoso)
    const [formData, setFormData] = useState<HoSoFormData>()
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10 })

    useEffect(() => {
        dispatch(SearchHoSo({ ...searchParams, byNguoiGui: true }))
    }, [searchParams])

    useEffect(() => {
        return () => {
            dispatch(resetDatas())
        }
    }, [])

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((curr) => ({
            ...curr,
            [e.target.id]: e.target.value
        }))
    }

    const onSearch = () => {
        onChangeTrangThai(formData?.maTrangThai)
        dispatch(SearchHoSo({ ...formData, byNguoiGui: true }))
    }

    const onChangePagination: PaginationProps["onChange"] = (page, pageSize) => {
        setSearchParams((curr) => ({ ...curr, pageSize, pageNumber: page }))
    }

    const onChangeTrangThai = async (maTrangThai?: string) => {
        document.querySelectorAll('.navbar_item').forEach(item => {
            item.classList.remove('active')
        })
        if (!maTrangThai) {
            document.getElementById(`tatCa`)?.classList.add('active')
        }
        else {
            document.getElementById(`${maTrangThai}`)?.classList.add('active')
        }
        setFormData((curr) => ({ ...curr, maTrangThai }))
        setSearchParams((curr) => ({ ...curr, maTrangThai }))
    }

    return (
        <div className="dichVuCongCuaToi">
            <div className="main-title">
                <div className="icon">
                    <img src={iconDVC} />
                </div>
                <div className="title">Dịch vụ công của tôi</div>
            </div>

            <div className="form form-group">
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="tenTTHC" className="label-text">Tên thủ tục</label>
                        <input type="text" className="form-control" placeholder="Nhập tên Thủ tục hành chính" name="tenTTHC" id="tenTTHC" onChange={onFormChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="maHoSo" className="label-text">Mã hồ sơ</label>
                            <input type="text" className="form-control" placeholder="Nhập mã hồ sơ" name="maHoSo" id="maHoSo" onChange={onFormChange} />
                        </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label htmlFor="maTrangThai" className="label-text">Trạng thái hồ sơ</label>
                            <div className="select-custom">
                                <select name="maTrangThai" value={formData?.maTrangThai} onChange={onFormChange} id="maTrangThai" className="form-control select2-hidden-accessible trangThaiSearch" aria-hidden="true">
                                    <option value="" className="trangThaiSearch_item">-- Chọn trạng thái hồ sơ --</option>
                                    {Object.keys(TRANGTHAIHOSO).filter(x => x!="6").map((trangThaiKey, index) => {
                                        return <option value={trangThaiKey} className="trangThaiSearch_item" key={index}> {TRANGTHAIHOSO[trangThaiKey]} </option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row center btnSearch">
                    <button className="btn" onClick={onSearch} style={{ marginBottom: '25px' }}>Tìm kiếm</button>
                </div>
            </div>
            <div className="navbar">
                <div className="navbar_item active" id="tatCa"
                    onClick={() => onChangeTrangThai()}
                >
                    Tất cả
                </div>
                <div className="navbar_item" id="5"
                    onClick={() => onChangeTrangThai("5")}
                >
                    Bổ sung hồ sơ
                </div>
                {/* <div className="navbar_item" id="6"
                    // onClick={() => onChangeTrangThai("6")}
                >
                    Thanh toán phí, lệ phí
                </div> */}
                <div className="navbar_item" id="10"
                    onClick={() => onChangeTrangThai("10")}
                >
                    Đã trả kết quả
                </div>
                <div className="navbar_item" id="3"
                    onClick={(e) => onChangeTrangThai("3")}
                >
                    Không được tiếp nhận
                </div>
            </div>


            <div className="mydvc-list">
                <table className="table-dvc" id="tableListDVC">
                    <tbody>
                        {hoSos?.map((hoSo, index) => {
                            return <HoSoItem key={index} hoSo={hoSo} setSearchParams={setSearchParams} formData={formData} />
                        })}

                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination total={count} defaultCurrent={1} defaultPageSize={10} onChange={onChangePagination} />
                </div>
            </div>
        </div >
    );
}

export default DichVuCongComponent;