import iconXemThongTin from "../../../../assets/images/xemGiayTo.svg"
import iconGuiPhanAnhKienNghi from "../../../../assets/images/guiPhanAnhKienNghi.svg"
import iconThanhToan from "../../../../assets/images/thanhToan.svg"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { TRANGTHAIHOSO } from "@/features/hoso/data/formData"
import dayjs from 'dayjs'
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { IDanhGiaHaiLongCongDan } from "../../DanhGiaHaiLong/models"
import { useEffect, useState, } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { danhGiaHaiLongServices } from "../../DanhGiaHaiLong/services/DanhGiaHaiLong"
import { IParseUserToken } from "@/models"
import { parseJwt } from "@/utils/common"
import { toast } from "react-toastify"
import { Form, Input, Modal } from 'antd';
import { SearchHoSo } from "@/features/hoso/redux/action"
import { DollarOutlined, IssuesCloseOutlined } from "@ant-design/icons"
import { HoSoFormData } from "./DichVuCongComponent"
import { BoSungHoSoModal } from "./BoSungHoSo/BoSungHoSoModal"
import { Link, useNavigate } from "react-router-dom"

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
    const [boSungModalVisible, setBoSungModalVisible] = useState<boolean>(false)

    let userData: IParseUserToken
    if (auth !== undefined) {
        userData = parseJwt(auth.token)
    }

    const togglerBoSungModalVisible = () => {
        setBoSungModalVisible(curr => !curr)
    }

    return <>
        <tr className="table-dvc_item" >
            <th className="head">
                <a href="" className="title" >
                    {hoSo.tenTTHC}
                </a>
                <div className="status -replied">
                    {TRANGTHAIHOSO[hoSo.trangThaiHoSoId]}
                </div>
            </th>
            <td className="row detail">
                <div className="col-3 column">
                    <span className="thick key" style={{ minWidth: "84px", fontWeight: 600 }}>
                        Mã hồ sơ
                    </span>
                    <a href="" className="data">{hoSo.maHoSo}</a>
                </div>
                <div className="col-3 column">
                    <span className="thick key" style={{ minWidth: "84px", fontWeight: 600 }}>
                        Đơn vị thực hiện
                    </span>
                    <span className="data">{hoSo.tenDonVi}</span>
                </div>

                {formData?.maTrangThai !== '6' ?
                    <>
                        <div className="col-2 column">
                            <span className="thick key" style={{ minWidth: "84px", fontWeight: 600 }}>
                                Ngày tiếp nhận
                            </span>
                            {hoSo.trangThaiHoSoId == "1" ?
                                <span className="data">{hoSo.ngayNopHoSo ? dayjs(hoSo.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span> :
                                <span className="data">{hoSo.ngayTiepNhan ? dayjs(hoSo.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                            }

                        </div>
                        <div className="col-2 column">
                            <span className="thick key" style={{ minWidth: "84px", fontWeight: 600 }}>
                                Ngày hẹn trả
                            </span>
                            <span className="data">{hoSo.ngayHenTra ? dayjs(hoSo.ngayHenTra).format(FORMAT_DATE_WITHOUT_TIME) : ""}</span>
                        </div>
                    </> :
                    <>
                        <div className="col-2 column">
                            <span className="thick key" style={{ minWidth: "84px", fontWeight: 600 }}>
                                Phí
                            </span>
                            <span className="data">{hoSo?.phi ? parseInt(hoSo.phi).toLocaleString('en-US') : '0'} VNĐ</span>
                        </div>
                        <div className="col-2 column">
                            <span className="thick key" style={{ minWidth: "84px", fontWeight: 600 }}>
                                Lệ phí
                            </span>
                            <span className="data">{hoSo?.lePhi ? parseInt(hoSo.lePhi).toLocaleString('en-US') : '0'} VNĐ</span>
                        </div>
                    </>
                }
                <div className="col-2 column d-flex justify-content-center align-items-center">
                    <p className="thick key" style={{ minWidth: "84px", fontWeight: 600 }}>
                        {formData?.maTrangThai == "6" ? "Thanh toán" : "Thao tác"}
                    </p>
                    <div className="actions nowrap">
                        {formData?.maTrangThai != '6' ?
                            <a title="Xem giấy tờ" href="#" className="btn-img">
                                <img src={iconXemThongTin} alt="" />
                            </a> : <></>
                        }
                        {formData?.maTrangThai != '6' && formData?.maTrangThai != '5' ?
                            <Link title="Gửi phản ánh kiến nghị" className="btn-img" to={"https://dichvucong.gov.vn/p/phananhkiennghi/pakn-gui-pakn.html"} target="_blank">
                                <img src={iconGuiPhanAnhKienNghi} alt="" />
                            </Link> : <></>
                        }
                        {formData?.maTrangThai == '6' || formData?.maTrangThai == undefined || formData?.maTrangThai == null ?
                            <a title="Thanh toán phí lệ phí hồ sơ" href="#" className="btn-img">
                                <DollarOutlined style={{ color: '#ce7a58' }} />
                            </a> : <></>
                        }

                        {formData?.maTrangThai == "5" ? <span className="btn-img" role="button" title="Bổ sung hồ sơ" onClick={togglerBoSungModalVisible}>
                            <IssuesCloseOutlined style={{ color: "#ce7a58" }} />
                        </span> : null}
                    </div>
                </div>
            </td>

        </tr>
        {boSungModalVisible ? <BoSungHoSoModal closeModal={togglerBoSungModalVisible} hoSoId={hoSo.id} maHoSo={hoSo.maHoSo} setSearchHoSoParams={setSearchParams} /> : null}
    </>

}