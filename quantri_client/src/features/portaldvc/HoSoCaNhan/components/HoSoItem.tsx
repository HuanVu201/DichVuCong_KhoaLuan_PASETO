import iconXemThongTin from "../../../../assets/images/xemGiayTo.svg"
import iconGuiPhanAnhKienNghi from "../../../../assets/images/guiPhanAnhKienNghi.svg"
import iconThanhToan from "../../../../assets/images/thanhToan.svg"
import { IHoSo, ISearchHoSo, TRANGTHAITHUPHI } from "@/features/hoso/models"
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData"
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { IDanhGiaHaiLongCongDan } from "../../DanhGiaHaiLong/models"
import { SetStateAction, useEffect, useState, } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { danhGiaHaiLongServices } from "../../DanhGiaHaiLong/services/DanhGiaHaiLong"
import { IParseUserToken } from "@/models"
import { parseJwt } from "@/utils/common"
import { toast } from "react-toastify"
import { Form, Input, Modal, Typography } from 'antd';
import { GetHoSo, SearchHoSo } from "@/features/hoso/redux/action"
import { CheckCircleOutlined, DollarOutlined, IssuesCloseOutlined, LinkOutlined, MailOutlined, RollbackOutlined } from "@ant-design/icons"
import { HoSoFormData } from "./DichVuCongComponent"
import { BoSungHoSoModal } from "./BoSungHoSo/BoSungHoSoModal"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import DanhGiaHaiLongPortalModal from "@/features/hoso/components/actions/traKetQuaVaDanhGiaHaiLong/DanhGiaHaiLongPortalModal"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { Service } from "@/services"
import ViewHoSoModal from "./ViewHoSo/ViewHoSoModal"
import { GetByMHS } from "@/features/logthongkedghlcongdan/redux/action"
import { ReactCustomer } from "./ReactCustomers/ReactCustomer"
import DangKyNhanKetQuaBCCIModalPortal from "./DangKiNhanKetQuaBCCI/DangKiNhanKetQuaBCCIPortal"
import { ThuHoiHoSoCongDanModal } from "./ThuHoiHoSoCongDan/ThuHoiHoSoCongDanModal"
import { callApiAndDisplayFile } from "@/utils"
import { AntdSpace } from "@/lib/antd/components"

const date = new Date();
const currentDate = date.toISOString();

export const HoSoItem = ({ hoSo, setSearchParams, formData }: { hoSo: IHoSo; setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>; formData: HoSoFormData | undefined }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [maHoSo, setMaHoSo] = useState('');
    const [danhGia, setDanhGia] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [displayTextArea, setDisplayTextArea] = useState('none')
    const [form] = Form.useForm()
    const { data: auth } = useAppSelector((state) => state.auth);
    const { data: phieuKhaoSat } = useAppSelector(state => state.phieukhaosat)
    const [boSungModalVisible, setBoSungModalVisible] = useState<boolean>(false)
    const [detailHoSoVisible, setDetailHoSoVisible] = useState<boolean>(false)
    const [danhGiaHaiLongModalVisible, setDanhGiaHaiLongModalVisible] = useState<boolean>(false)
    const [dangKiNhanKetQuaHoSoBCCI, setDangKiNhanKetQuaHoSoBCCI] = useState<boolean>(false)
    const [thuHoiHoSoModalVisible, setThuHoiHoSoModalVisible] = useState<boolean>(false)
    const [searchQuerys, setSearchQuerys] = useSearchParams();
    const showDetailMaHoSo = searchQuerys.get('MaHoSo')
    const showBCCIMaHoSo = searchQuerys.get('showBCCIMaHoSo')
    const trangThaiHoSoId = searchQuerys.get("TrangThaiHoSo")
    let userData: IParseUserToken
    if (auth !== undefined) {
        userData = parseJwt(auth.token)
    }



    const handleOk = async () => {
        if (maHoSo != '') {
            if (danhGia == 'KHÔNG HÀI LÒNG') {
                if (!form.getFieldValue('lyDoKhongHaiLong')) {
                    toast.warning("Vui lòng điền lý do KHÔNG HÀI LÒNG!")
                }
                else {
                    const res = await danhGiaHaiLongServices.Create({
                        maHoSo: maHoSo,
                        loaiDanhGia: userData.typeUser,
                        nguoiDanhGia: userData.uid,
                        thoiGianDanhGia: currentDate,
                        danhGia: danhGia,
                        noiDungDanhGia: form.getFieldValue('lyDoKhongHaiLong')
                    })
                    if (res.status == 201) {
                        setSearchParams((curr) => ({ ...curr }))
                        setOpenModal(false);
                        toast.success("Đánh giá thành công!")
                    }
                }
            }
            else {
                const res = await danhGiaHaiLongServices.Create({
                    maHoSo: maHoSo,
                    loaiDanhGia: userData.typeUser,
                    nguoiDanhGia: userData.uid,
                    thoiGianDanhGia: currentDate,
                    danhGia: danhGia,
                    noiDungDanhGia: ''
                })
                if (res.status == 201) {
                    setSearchParams((curr) => ({ ...curr }))
                    setOpenModal(false);
                    toast.success("Đánh giá thành công!")
                }
            }

        }
    }

    const handleCancel = () => {
        setOpenModal(false);
    };

    const togglerBoSungModalVisible = () => {
        setBoSungModalVisible(curr => !curr)
    }
    const togglerViewDetailHSoVisible = () => {
        setDetailHoSoVisible(curr => !curr)
        const updatedSearchParams = new URLSearchParams(searchQuerys);
        updatedSearchParams.set('showDetail', 'true');
        updatedSearchParams.set('MaHoSo', hoSo.maHoSo);

        setSearchQuerys(updatedSearchParams.toString());
    }
    const togglerDanhGiaHaiLongModalVisible = () => {
        setDanhGiaHaiLongModalVisible(curr => !curr)
    }
    const togglerDangKiNhanKetQuaBCCIModalVisible = () => {
        setDangKiNhanKetQuaHoSoBCCI(curr => !curr)
        setSearchQuerys({ showBCCIMaHoSo: hoSo.maHoSo });
    }
    const togglerThuHoiHoSoModalVisible = () => {
        setThuHoiHoSoModalVisible(curr => !curr)
    }

    const laTrangThaiBoSung = (trangThaiHoSoId == "5" || hoSo.trangThaiHoSoId == "5") && (hoSo.trangThaiBoSung == "Yêu cầu công dân bổ sung" || hoSo.trangThaiBoSung == "Chờ bổ sung tiếp nhận")

    return <>
        <tr className="table-dvc_item" >
            <th className="head">
                <Typography.Title level={5}
                    ellipsis={{ rows: 3, expandable: true, symbol: <span style={{ color: "cadetblue" }}>Xem thêm</span> }}
                >
                    {hoSo.tenTTHC}
                </Typography.Title>
                <div className="status -replied">
                    {hoSo.trangThaiHoSoId == "5" && !laTrangThaiBoSung ? "Chờ xác nhận yêu cầu bổ sung" : TRANGTHAIHOSO[hoSo.trangThaiHoSoId]}
                </div>
            </th>
            <td className="row detail">
                <div className="row">
                    <div className="col-2 column">
                        <span className="thick key" style={{ fontWeight: 600 }}>
                            Mã hồ sơ
                        </span>
                        <span className="data">{hoSo.maHoSo}</span>
                    </div>
                    <div className="col-2 column">
                        <span className="thick key" style={{ fontWeight: 600 }}>
                            Đơn vị thực hiện
                        </span>
                        <span className="data">{hoSo.tenDonVi}</span>
                    </div>

                    {trangThaiHoSoId !== '6' ?
                        <>
                            <div className="col-2 column">
                                <span className="thick key" style={{ fontWeight: 600 }}>
                                    {hoSo.trangThaiHoSoId == "1" ? "Ngày nộp hồ sơ " : "Ngày tiếp nhận"}
                                </span>
                                {hoSo.trangThaiHoSoId == "1" ?
                                    <span className="data">{hoSo.ngayNopHoSo ? dayjs(hoSo.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span> :
                                    <span className="data">{hoSo.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                                }

                            </div>
                            <div className="col-2 column">
                                <span className="thick key" style={{ fontWeight: 600 }}>
                                    Ngày hẹn trả
                                </span>
                                <span className="data">{hoSo.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                            </div>
                            {hoSo.trangThaiHoSoId == "3" ?
                                <></> : <div className="col-2 column">
                                    <span className="thick key" style={{ fontWeight: 600 }}>
                                        Trạng thái thu phí
                                    </span>
                                    <span className="data">{hoSo.trangThaiThuPhi}</span>
                                </div>
                            }

                        </> :
                        <>
                            <div className="col-2 column">
                                <span className="thick key" style={{ fontWeight: 600 }}>
                                    Phí
                                </span>
                                <span className="data">{hoSo?.phi ? parseInt(hoSo.phi).toLocaleString('en-US') : '0'} VNĐ</span>
                            </div>
                            <div className="col-2 column">
                                <span className="thick key" style={{ fontWeight: 600 }}>
                                    Lệ phí
                                </span>
                                <span className="data">{hoSo?.lePhi ? parseInt(hoSo.lePhi).toLocaleString('en-US') : '0'} VNĐ</span>
                            </div>
                        </>
                    }

                    {hoSo.trangThaiHoSoId == "3" ?
                        <div className="col-2 column">
                            <span className="thick key" style={{ fontWeight: 600 }}>
                                Đính kèm nội dung
                            </span>
                            <span className="data">{hoSo.dinhKemTuChoi?.split(ID_SEPARATE).map((dinhKem, idx) =>
                                <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                    {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                                </AntdSpace>
                            )}</span>
                        </div> : <></>
                    }

                    <div className="col-2 column d-flex align-items-center">
                        <p className="thick key" style={{ fontWeight: 600 }}>
                            {trangThaiHoSoId == "6" ? "Thanh toán" : "Thao tác"}
                        </p>
                        <div className="actions nowrap">
                            {trangThaiHoSoId != '6' ?
                                <div title="Xem giấy tờ" className="btn-img"
                                    onClick={togglerViewDetailHSoVisible}
                                >
                                    <img src={iconXemThongTin} alt="" />
                                </div> : <></>
                            }
                            {trangThaiHoSoId != '6' && trangThaiHoSoId != '5' ?
                                <Link title="Gửi phản ánh kiến nghị" className="btn-img" to={"https://dichvucong.gov.vn/p/phananhkiennghi/pakn-gui-pakn.html"} target="_blank">
                                    <img src={iconGuiPhanAnhKienNghi} alt="" />
                                </Link> : <></>
                            }
                            {/* {trangThaiHoSoId == '6' || trangThaiHoSoId == undefined || trangThaiHoSoId == null ?
                            <a title="Thanh toán phí lệ phí hồ sơ" href="#" className="btn-img"
                            onClick={() => {
                                navigate(Service.primaryRoutes.portaldvc.thanhToan + `?maHoSo=${hoSo.maHoSo}`)
                            }}
                            >
                                <DollarOutlined style={{ color: '#ce7a58' }} />
                            </a> : <></>
                        } */}

                            {laTrangThaiBoSung ? <span className="btn-img" role="button" title="Bổ sung hồ sơ" onClick={togglerBoSungModalVisible}>
                                <IssuesCloseOutlined style={{ color: "#ce7a58" }} />
                            </span> : null}
                            {hoSo.dangKyNhanHoSoQuaBCCIData ?
                                <></> :
                                hoSo?.trangThaiHoSoId == "3" || hoSo?.trangThaiHoSoId == "10" || hoSo?.trangThaiHoSoId == "9" || hoSo.dangKyNhanHoSoQuaBCCIData ? null : <span className="btn-img" role="button" title="Đăng ký nhận kết quả hồ sơ qua BCCI" onClick={togglerDangKiNhanKetQuaBCCIModalVisible}>
                                    <MailOutlined style={{ color: "#ce7a58" }} />
                                </span>
                            }
                            {
                                hoSo.hoanThanhDanhGia == true ?
                                    <></> :
                                    hoSo?.trangThaiHoSoId == "9" || hoSo?.trangThaiHoSoId == "10" ? <span className="btn-img" role="button" title="Đánh giá hài lòng" onClick={togglerDanhGiaHaiLongModalVisible}>
                                        <CheckCircleOutlined style={{ color: "#ce7a58" }} />
                                    </span> : null
                            }
                            {
                                hoSo.trangThaiThuPhi == TRANGTHAITHUPHI["Chờ thanh toán"] ?
                                    <>
                                        <span className="btn-img" role="button" title="Thanh toán" onClick={() => {
                                            navigate(Service.primaryRoutes.portaldvc.thanhToan + "?maHoSo=" + hoSo.maHoSo)
                                        }}>
                                            <DollarOutlined style={{ color: "#ce7a58" }} />
                                        </span>

                                    </>
                                    : null
                            }
                            {
                                hoSo.trangThaiHoSoId == "1" && hoSo.trangThaiThuPhi !== TRANGTHAITHUPHI["Đã thanh toán"] ?
                                    <span className="btn-img" role="button" title="Thu hồi hồ sơ" onClick={togglerThuHoiHoSoModalVisible}>
                                        <RollbackOutlined style={{ color: "#ce7a58" }} />
                                    </span> : null

                            }

                        </div>
                    </div>
                </div>
            </td>

            <div className="reactCustomer actions">
                {
                    (hoSo.trangThaiHoSoId == '10' || hoSo.trangThaiHoSoId == '9')
                        ?
                        !hoSo.hoanThanhDanhGia
                            ?
                            <ReactCustomer donViHoSo={hoSo.donViId} maHoSo={hoSo.maHoSo}></ReactCustomer>
                            :
                            <></>
                        : <></>
                }
            </div>

        </tr>

        {boSungModalVisible ? <BoSungHoSoModal closeModal={togglerBoSungModalVisible} hoSoId={hoSo.id} maHoSo={hoSo.maHoSo} setSearchHoSoParams={setSearchParams} /> : null}
        {detailHoSoVisible || showDetailMaHoSo == hoSo.maHoSo ? <ViewHoSoModal closeModal={togglerViewDetailHSoVisible} hoSoId={hoSo.id} maHoSo={hoSo.maHoSo} setDetailHoSoVisible={setDetailHoSoVisible} /> : null}
        {dangKiNhanKetQuaHoSoBCCI || showBCCIMaHoSo == hoSo.maHoSo ? <DangKyNhanKetQuaBCCIModalPortal setDangKiNhanKetQuaHoSoBCCI={setDangKiNhanKetQuaHoSoBCCI} closeModal={togglerDangKiNhanKetQuaBCCIModalVisible} hoSoId={hoSo.id} maHoSo={hoSo.maHoSo} setSearchHoSoParams={setSearchParams} /> : null}
        {danhGiaHaiLongModalVisible ? <DanhGiaHaiLongPortalModal closeModal={togglerDanhGiaHaiLongModalVisible} maHoSoNguoiDungNhap={hoSo.maHoSo} id={hoSo.id} donViId={hoSo.donViId} setDanhGiaHaiLongModalVisible={function (value: SetStateAction<boolean>): void {
            throw new Error("Function not implemented.")
        }} ></DanhGiaHaiLongPortalModal> : null}
        {thuHoiHoSoModalVisible ? <ThuHoiHoSoCongDanModal hoSoId={hoSo.id} closeModal={togglerThuHoiHoSoModalVisible}></ThuHoiHoSoCongDanModal> : null}
    </>

}
