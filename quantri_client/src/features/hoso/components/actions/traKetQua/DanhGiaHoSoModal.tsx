import { AntdButton, AntdDivider, AntdModal, AntdSelect, AntdSpace, AntdTab, AntdUpLoad } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Input, Row, Form, DatePicker, TabsProps, Spin, Button } from "antd"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { Suspense, useEffect, useState } from "react"
import dayjs from 'dayjs'
import { GetHoSo } from "@/features/hoso/redux/action"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { resetData } from "@/features/hoso/redux/slice"
import { resetDatas } from "@/features/thanhphanhoso/redux/slice"
import './DanhGiaHoSoModal.scss'
import { toast } from "react-toastify"
import { danhGiaHaiLongServices } from "@/features/portaldvc/DanhGiaHaiLong/services/DanhGiaHaiLong"
import { IParseUserToken } from "@/models"
import { parseJwt } from "@/utils/common"
import { IDanhGiaHaiLongCongDan } from "@/features/portaldvc/DanhGiaHaiLong/models"

interface ICheckDanhGiaHaiLong {
    maHoSo?: string
    kenhThucHien?: string
    daDanhGia?: boolean

}

const DanhGiaHoSoModal = ({ setSearchHoSoParams }: { setSearchHoSoParams?: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const dispatch = useAppDispatch()
    const { data: hoSo, datas: hoSos } = useAppSelector(state => state.hoso)
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<IHoSo>()
    const [danhGia, setDanhGia] = useState('')
    const [displayTextArea, setDisplayTextArea] = useState('none')
    const [data, setData] = useState<ICheckDanhGiaHaiLong>()

    useEffect(() => {
        if (buttonActionContext.selectedHoSos)
            (async () => {
                const res = await danhGiaHaiLongServices.CheckDGHL(buttonActionContext.selectedHoSos[0] as string)
                if (res) {
                    setData(res.data.data)
                } else {
                    toast.error('Kiểm tra Đánh giá hài lòng thất bại!')
                }
            })()

    }, [buttonActionContext.selectedHoSos])



    const boQuaDanhGia = async () => {
        buttonActionContext.setTraKetQuaModalVisible(true)
        buttonActionContext.setDanhGiaHoSoModalVisible(false)
    }
    useEffect(() => {
        if (data?.kenhThucHien == '2') {
            boQuaDanhGia()
        }
        else {
            if (data?.daDanhGia) {
                toast.info('Hồ sơ đã được đánh giá!')
                boQuaDanhGia()
            }
        }
    }, [data])

    const handleCancel = async () => {
        form.resetFields();
        dispatch(resetData())
        dispatch(resetDatas())
        buttonActionContext.setDanhGiaHoSoModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    };
    let userData: IParseUserToken
    const { data: auth } = useAppSelector((state) => state.auth);
    if (auth !== undefined) {
        userData = parseJwt(auth.token)
    }
    const date = new Date();
    const currentDate = date.toISOString();
    const handleNext = async () => {
        if (danhGia != null) {
            if (danhGia == 'KHÔNG HÀI LÒNG') {
                if (!form.getFieldValue('lyDoKhongHaiLong')) {
                    toast.warning("Vui lòng điền lý do KHÔNG HÀI LÒNG!")
                }
                else {
                    const res = await danhGiaHaiLongServices.Create({
                        maHoSo: hoSo?.maHoSo,
                        loaiDanhGia: userData.typeUser,
                        nguoiDanhGia: userData.uid,
                        thoiGianDanhGia: currentDate,
                        danhGia: danhGia,
                        noiDungDanhGia: form.getFieldValue('lyDoKhongHaiLong')
                    })
                    if (res.status == 201) {
                        toast.success("Đánh giá thành công!")
                        buttonActionContext.setDanhGiaHoSoModalVisible(false)
                        buttonActionContext.setTraKetQuaModalVisible(true)
                    }
                }
            }
            else {
                const res = await danhGiaHaiLongServices.Create({
                    maHoSo: data?.maHoSo,
                    loaiDanhGia: userData.typeUser,
                    nguoiDanhGia: userData.uid,
                    thoiGianDanhGia: currentDate,
                    danhGia: danhGia,
                    noiDungDanhGia: ''
                })
                if (res.status == 201) {
                    toast.success("Đánh giá thành công!")
                    buttonActionContext.setDanhGiaHoSoModalVisible(false)
                    buttonActionContext.setTraKetQuaModalVisible(true)
                }
            }
        } else {
            toast.warning('Vui lòng đánh giá!')
            return
        }
    };
    return (
        <AntdModal title={"Đánh giá hồ sơ: " + data?.maHoSo} visible={true} handlerCancel={handleCancel}
            footer={<AntdSpace direction="horizontal" >
                <Button type="primary" onClick={handleNext}>Xác nhận</Button>
                <AntdButton onClick={handleCancel}>Đóng</AntdButton>
            </AntdSpace>}>
            <>
                <Col span={24}>
                    {data?.maHoSo
                        ?
                        <>
                            <div className="reactCustomer">
                                <button className="btn sohappy" onClick={() => {
                                    setDanhGia('RẤT HÀI LÒNG')
                                    setDisplayTextArea('none')
                                    document.querySelector('.sohappy')?.classList.add('actived')
                                    document.querySelector('.happy')?.classList.remove('actived')
                                    document.querySelector('.nohappy')?.classList.remove('actived')
                                }}>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                    <span>RẤT HÀI LÒNG</span>
                                </button>
                                <button className="btn happy" onClick={() => {
                                    setDanhGia('HÀI LÒNG')
                                    setDisplayTextArea('none')
                                    document.querySelector('.happy')?.classList.add('actived')
                                    document.querySelector('.sohappy')?.classList.remove('actived')
                                    document.querySelector('.nohappy')?.classList.remove('actived')
                                }}>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                    <span>HÀI LÒNG</span>
                                </button>
                                <button className="btn nohappy" onClick={() => {
                                    setDanhGia('KHÔNG HÀI LÒNG')
                                    setDisplayTextArea('block')
                                    document.querySelector('.nohappy')?.classList.add('actived')
                                    document.querySelector('.sohappy')?.classList.remove('actived')
                                    document.querySelector('.happy')?.classList.remove('actived')
                                }}>
                                    <i className="fa-solid fa-thumbs-down"></i>
                                    <span>KHÔNG HÀI LÒNG</span>
                                </button>
                                <br />
                            </div>
                            <Form form={form} layout="vertical" name="LyDoKhongHaiLong" style={{ display: displayTextArea }} >
                                <Form.Item name="lyDoKhongHaiLong" label="Lý do không hài lòng:">
                                    <Input.TextArea
                                        rows={3}
                                        placeholder="Vui lòng nhập..."
                                    />
                                </Form.Item>
                            </Form>
                        </>
                        : ""
                    }
                </Col>
            </>
        </AntdModal>
    )
}
export default DanhGiaHoSoModal