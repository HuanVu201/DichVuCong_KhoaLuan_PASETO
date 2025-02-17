import "./DichVuCongComponent.scss"
import iconDVC from "../../../../assets/images/info-white.svg"

import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useMemo, useState } from "react"
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData"
import { IHoSo, ISearchHoSo, TRANGTHAITHUPHI } from "@/features/hoso/models"
import { SearchHoSo, SearchHoSoByNguoiGui, SearchHoSoPortal } from "@/features/hoso/redux/action"
import { HoSoItem } from "./HoSoItem"
import { resetDatas } from "@/features/hoso/redux/slice"
import { Pagination, PaginationProps, Spin } from "antd"
import { useNavigate, useSearchParams } from "react-router-dom"
import { IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models"
import { yeuCauThanhToanApi } from "@/features/yeucauthanhtoan/services"
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext"
import { ID_SEPARATE } from "@/data"
import { LoadingOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"
import { SearchPublicConfig } from "@/features/config/redux/action"

export type HoSoFormData = Partial<Pick<IHoSo, "tenTTHC" | "maHoSo">> & {
    maTrangThai?: string;
    maHoSo?: string;
    tenTTHC?: string;
}

function DichVuCongComponent() {
    const dispatch = useAppDispatch()
    const { datas: hoSos, count } = useAppSelector(state => state.hoso)
    const { publicModule } = useAppSelector(state => state.config)
    const { data: auth } = useAppSelector(state => state.auth)
    const [loading, setLoading] = useState<boolean>(true)
    const [formData, setFormData] = useState<HoSoFormData>()
    const [searchQuerys, setSearchQuerys] = useSearchParams();
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 10 })
    const maHoSoQueryString = searchQuerys.get('MaHoSo')
    const showDetailHoSo = searchQuerys.get('showDetail')

    const encodeToBase64 = (str: string) => {
        const utf8Bytes = new TextEncoder().encode(str);
        const binaryString = Array.from(utf8Bytes).map(byte => String.fromCharCode(byte)).join('');
        return window.btoa(binaryString);
    };
    //https://sso.dancuquocgia.gov.vn/auth?response_type=code&client_id=dvc-thanhhoa-web&redirect_uri=https://apidvc.thanhhoa.gov.vn/vneidsso/callback&scope=openid&state=aHR0cHM6Ly9kaWNodnVjb25nLnRoYW5oaG9hLmdvdi52bi9wb3J0YWxkdmMvaG9tZQ==
    useEffect(() => {
        dispatch(SearchPublicConfig())
    }, [])

    const [client_id_vneid, redirect_uri_vneid] = useMemo(() => {
        return [publicModule?.find(x => x.code == 'client_id_vneid'), publicModule?.find(x => x.code == 'redirect_uri_vneid')]
    }, [publicModule])

    useEffect(() => {
        dispatch(SearchHoSoByNguoiGui({ ...searchParams, byNguoiGui: true, searchAllType: true }))
        setLoading(false)
    }, [searchParams])
    let urlState = window.location.origin + "/portaldvc/ho-so-ca-nhan/dvc-dich-vu-cong-cua-toi?showDetail=" + showDetailHoSo + "&MaHoSo=" + maHoSoQueryString;
    let urlStateDecode = encodeToBase64(urlState)
    const urlLoginVneid = `https://sso.dancuquocgia.gov.vn/auth?response_type=code&client_id=${client_id_vneid?.content}&redirect_uri=${redirect_uri_vneid?.content}/vneidsso/callback&scope=openid&state=` + urlStateDecode

    useEffect(() => {
        if (!auth && client_id_vneid && redirect_uri_vneid)
            window.location.href = urlLoginVneid
    }, [auth, client_id_vneid, redirect_uri_vneid])

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
        setLoading(true)
        const maHoSoInput = document.querySelector('#maHoSo') as HTMLInputElement
        const tenTTHCInput = document.querySelector('#tenTTHC') as HTMLInputElement
        const maTrangThaiInput = document.querySelector('#maTrangThai') as HTMLInputElement
        const newSearchParams: any = {};

        if (maHoSoInput.value) {
            newSearchParams.MaHoSoSearch = maHoSoInput.value;
        }

        if (tenTTHCInput.value) {
            newSearchParams.TenTTHC = tenTTHCInput.value;
        }
        if (maTrangThaiInput.value) {
            newSearchParams.TrangThaiHoSo = maTrangThaiInput.value;
        }

        setSearchQuerys((prev) => ({ ...prev, ...newSearchParams }));

        setSearchParams({
            ...searchParams,
            pageNumber: 1,
            pageSize: 10,
            maHoSo: maHoSoInput.value,
            tenTTHC: tenTTHCInput.value,
            maTrangThai: maTrangThaiInput.value
        })

        // onChangeTrangThai(maTrangThaiInput.value)

    }

    const onChangePagination: PaginationProps["onChange"] = (page, pageSize) => {
        setSearchParams((curr) => ({ ...curr, pageSize, pageNumber: page }))
    }

    const onChangeTrangThai = async (maTrangThai?: string) => {
        setLoading(true)

        document.querySelectorAll('.navbar_item').forEach(item => {
            item.classList.remove('active')
        })
        if (!maTrangThai) {
            document.getElementById(`tatCa`)?.classList.add('active')
        }
        else {
            document.getElementById(`${maTrangThai}`)?.classList.add('active')
        }
        setSearchParams((curr) => ({ ...curr, maTrangThai: maTrangThai || "" }))
        setSearchQuerys((prev) => {
            const currentQueryString = {} as any
            prev.forEach((value, key) => {
                currentQueryString[key] = value
            })
            return ({ ...currentQueryString, TrangThaiHoSo: maTrangThai || "" })
        });



    }

    return (
        <div className="dichVuCongCuaToi">
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />} >
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
                            <input type="text" className="form-control" placeholder="Nhập tên Thủ tục hành chính" name="tenTTHC" id="tenTTHC" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="maHoSo" className="label-text">Mã hồ sơ</label>
                                <input type="text" className="form-control" placeholder="Nhập mã hồ sơ" name="maHoSo" id="maHoSo" />
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="maTrangThai" className="label-text">Trạng thái hồ sơ</label>
                                <div className="select-custom">
                                    <select name="maTrangThai" value={formData?.maTrangThai} id="maTrangThai" className="form-control select2-hidden-accessible trangThaiSearch" aria-hidden="true">
                                        <option value="" className="trangThaiSearch_item">-- Chọn trạng thái hồ sơ --</option>
                                        {Object.keys(TRANGTHAIHOSO).filter(x => x != "6").map((trangThaiKey, index) => {
                                            return <option value={trangThaiKey} className="trangThaiSearch_item" key={index}> {TRANGTHAIHOSO[trangThaiKey]} </option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="maTrangThai" className="label-text">Hồ sơ điện tử</label>
                                <div className="select-custom">
                                    <select name="hoSoDienTu" className="form-control select2-hidden-accessible trangThaiSearch" aria-hidden="true">
                                        <option value="" className="trangThaiSearch_item">Có</option>
                                        <option value="" className="trangThaiSearch_item">Không</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row center btnSearch">
                        <button className="btn btnSearchAction" onClick={onSearch} style={{ margin: ' 10px auto 25px auto' }}>Tìm kiếm</button>
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
                        Không được tiếp nhận/thu hồi
                    </div>
                </div>


                <div className="mydvc-list tableSwapper">
                    <table className="table-dvc" id="tableListDVC">
                        <tbody>
                            {hoSos?.map((hoSo, index) => {
                                let trangThai = hoSo?.trangThaiThuPhi
                                let trangThais = trangThai?.split(ID_SEPARATE)
                                let displayTrangThai = ''
                                if (trangThais && trangThais?.length > 0) {
                                    const trangThaiConLai = trangThais.filter(
                                        (x) => x != TRANGTHAITHUPHI['Đã thanh toán']
                                    )
                                    displayTrangThai =
                                        trangThaiConLai && trangThaiConLai.length > 0
                                            ? trangThaiConLai[0]
                                            : trangThais[0]
                                }
                                return <HoSoItem key={index} hoSo={{ ...hoSo, trangThaiThuPhi: displayTrangThai }} setSearchParams={setSearchParams} formData={formData} />
                            })}

                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <Pagination total={count} defaultCurrent={1} defaultPageSize={10} onChange={onChangePagination} />
                    </div>
                </div>
            </Spin>
        </div >
    );
}



export default DichVuCongComponent;