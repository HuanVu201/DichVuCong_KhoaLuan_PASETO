import { AntdAutoComplete, AntdButton, AntdModal, AntdSelect, AntdSelectProps, AntdSpace, AntdUpLoad } from "@/lib/antd/components"
import { useTruongHopThuTucContext } from "../../contexts/TruongHopThuTucContext"
import { Col, Form, Input, InputNumber, Row, AutoComplete  } from "antd"
import { LOAIDULIEUKETNOI_QUYTRINH_OPTIONS, LOAITHOIGIANTHUCHIEN_OPTIONS } from "../../data"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCallback, useEffect, useState} from 'react'
import { SearchNhomNguoiDung } from "@/features/nhomnguoidung/redux/action"
import { SearchTrangThaiHoSo } from "@/features/trangthaihoso/redux/action"
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models"
import { AddQuyTrinhXuLy, GetQuyTrinhXuLy, UpdateQuyTrinhXuLy, UpdateQuyTrinhXuLyWithoutSearch } from "@/features/quytrinhxuly/redux/action"
import {Node} from 'reactflow'
import {v4 as uuid} from 'uuid'
import { resetData } from "@/features/quytrinhxuly/redux/slice"
import { SearchBuocXuLy } from "@/features/buocxuly/redux/action"
import { IBuocXuLy } from "@/features/buocxuly/models"

const GUIEMAIL_OPTIONS: AntdSelectProps<never>["options"] = [
    {
        label: "Gửi email",
        value: true as any,
    },
    {
        label: "Không gửi email",
        value: false as any,
    },
]
const GUIESMS_OPTIONS: AntdSelectProps<never>["options"] = [
    {
        label: "Gửi SMS",
        value: true as any,
    },
    {
        label: "Không gửi SMS",
        value: false as any,
    },
]
const GUIELIENTHONGQLVB_OPTIONS: AntdSelectProps<never>["options"] = [
    {
        label: "Gửi liên thông quản lý văn bản",
        value: true as any,
    },
    {
        label: "Không gửi liên thông quản lý văn bản",
        value: false as any,
    },
]
const LABUOCTUCHUYEN_OPTIONS: AntdSelectProps<never>["options"] = [
    {
        label: "Bước tự chuyển",
        value: true as any,
    },
    {
        label: "Không phải bước tự chuyển",
        value: false as any,
    },
]
export const LOAIBUOC_OPTIONS: AntdSelectProps<never>["options"] = [
    {
        label: "Nhận nội bộ",
        value: 'Nhận nội bộ',
    },
    {
        label: "Nhận liên thông lên",
        value: 'Nhận liên thông lên',
    },
    {
        label: "Nhận liên thông xuống",
        value: 'Nhận liên thông xuống',
    },
]

export interface AddNodeModalProps {
    addNode: (id: string, params: IQuyTrinhXuLy) => void,
    onChangeNode: (id: string, data: IQuyTrinhXuLy) => void,
    nodes: Node<any, string | undefined>[]
}

export const AddNodeModal = ({addNode, nodes, onChangeNode} : AddNodeModalProps) => {
    const [form] = Form.useForm<IQuyTrinhXuLy>()
    const showThoiGianTuChuyen = Form.useWatch("laBuocTuChuyen", form)
    const showGuiEmail = Form.useWatch("guiEmail", form)
    const showGuiSMS = Form.useWatch("guiSMS", form)
    
    const truongHopThuTucContext = useTruongHopThuTucContext()
    const {datas: nhomNguoiDungs} = useAppSelector(state => state.nhomnguoidung)
    const {datas: trangThaiHoSos} = useAppSelector(state => state.trangthaihoso)
    const {data: quytrinhxuly} = useAppSelector(state => state.quytrinhxuly)
    const {datas: buocXuLys} = useAppSelector(state => state.buocxuly)
    const dispatch = useAppDispatch()
    const handlerCancel = () => {
        form.resetFields()
        dispatch(resetData())
        truongHopThuTucContext.setQuyTrinhId(undefined)
        truongHopThuTucContext.setAddNodeModalVisible(false)
    }
    const onFinish = useCallback(async () => {
        const formData: IQuyTrinhXuLy = await form.validateFields()
        const nhomNguoiDung = nhomNguoiDungs?.find(x => x.id === formData.nhomNguoiDungId)
        const trangThaiHoSo = trangThaiHoSos?.find(x => x.ma == formData.maTrangThaiHoSo)
        
        const updateData: IQuyTrinhXuLy= {...formData, tenNhomNguoiDung: nhomNguoiDung?.ten || "", tenTrangThaiHoSo: trangThaiHoSo?.ten || ""}
        if(!truongHopThuTucContext.quyTrinhId){
            const id = uuid()
            if(truongHopThuTucContext.truongHopThuTucId)
            addNode(id, {...updateData, truongHopId:truongHopThuTucContext.truongHopThuTucId, id})
        } else {
            if(truongHopThuTucContext.truongHopThuTucId)
            onChangeNode(truongHopThuTucContext.quyTrinhId,{...updateData, truongHopId:truongHopThuTucContext.truongHopThuTucId})
            if(quytrinhxuly){
                dispatch(UpdateQuyTrinhXuLyWithoutSearch({id: truongHopThuTucContext.quyTrinhId, data: updateData}))
            }
        }
        handlerCancel()
    }, [nhomNguoiDungs, trangThaiHoSos, quytrinhxuly])
    useEffect(() => {
        if(nhomNguoiDungs === undefined){
            dispatch(SearchNhomNguoiDung({pageNumber:1, pageSize:500}) )
        }
    }, [nhomNguoiDungs])
    useEffect(() => {
        if(trangThaiHoSos === undefined){
            dispatch(SearchTrangThaiHoSo({laTrangThaiQuyTrinh:true}) )
        }
    }, [trangThaiHoSos])
    useEffect(() => {
        if(buocXuLys === undefined){
            dispatch(SearchBuocXuLy({}) )
        }
    }, [buocXuLys])

    useEffect(() => {
        if(truongHopThuTucContext.quyTrinhId){
            dispatch(GetQuyTrinhXuLy(truongHopThuTucContext.quyTrinhId))
        }
    }, [truongHopThuTucContext.quyTrinhId])
    useEffect(() => {
        if(quytrinhxuly){
            form.setFieldsValue(quytrinhxuly)
        } else {
            const node = nodes?.find(x => x.id === truongHopThuTucContext.quyTrinhId)
            form.setFieldsValue(node?.data)
        }
    }, [quytrinhxuly])
    return <AntdModal title="Thêm bước quy trình" onOk={onFinish} okText={"Lưu"}
        cancelText={"Đóng"} visible={true} handlerCancel={handlerCancel} width={1000}>
        <Form name='TruongHopThuTuc_Addnode'
                initialValues={{laBuocTuChuyen : false, guiEmail: false, guiSMS: false, guiLienThongQLVB: false, maTrangThaiHoSo: "4", thoiGianXuLy: 4,
                thoiGianThucHienTrucTuyen: 4,
                loaiThoiGian: "Ngày làm việc", loaiBuoc: "Nhận nội bộ"}}
                layout="vertical" onFinish={onFinish} 
                form={form} 
                requiredMark={truongHopThuTucContext.truongHopThuTucId !== null} >
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên bước xử lý"
                            name="tenBuocXuLy"
                            hasFeedback
                            rules={[{ required: true, message: 'Vui lòng nhập bước xử lý' }]}
                        >
                            <AntdAutoComplete generateOptions={{model: buocXuLys, value: "tenBuoc", label:"tenBuoc"}} >
                                <Input />
                            </AntdAutoComplete>

                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Loại bước"
                            hasFeedback
                            name="loaiBuoc"
                            rules={[{ required: true, message: 'Vui lòng chọn loại bước' }]}
                        >
                            <AntdSelect options={LOAIBUOC_OPTIONS} />
                        </Form.Item>
                    </Col>
                    
                    <Col md={6} span={12}>
                        <Form.Item
                            label="Thời gian xử lý trực tiếp (giờ)"
                            name="thoiGianXuLy"
                            hasFeedback
                            rules={[
                                {  
                                    required: true, 
                                    message: 'Vui lòng nhập thời gian xử lý trực tiếp' 
                                }]}
                        >
                            <InputNumber min={1}/>
                        </Form.Item>
                    </Col>
                    <Col md={6} span={12}>
                        <Form.Item
                            label="Thời gian xử lý trực tiếp (phút)"
                            
                        >
                            <InputNumber min={1}/>
                        </Form.Item>
                    </Col>
                    <Col md={6} span={12}>
                        <Form.Item
                            label="Thời gian xử lý trực tuyến (giờ)"
                            name="thoiGianThucHienTrucTuyen"
                            hasFeedback
                            rules={[
                                {  
                                    required: true, 
                                    message: 'Vui lòng nhập thời gian xử lý trực tuyến' 
                                }]}
                        >
                            <InputNumber min={1}/>
                        </Form.Item>
                    </Col>
                    <Col md={6} span={12}>
                        <Form.Item
                            label="Thời gian xử lý trực tuyến (phút)"
                        >
                            <InputNumber min={1}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Loại thời gian thực hiện"
                            hasFeedback
                            name="loaiThoiGian"
                            rules={[{ required: true, message: 'Vui lòng chọn loại thời gian thực hiện' }]}
                        >
                            <AntdSelect options={LOAITHOIGIANTHUCHIEN_OPTIONS} />
                        </Form.Item>
                    </Col>
                   
                    <Col md={12} span={24}>
                        <Form.Item
                            hasFeedback
                            label="Nhóm người dùng"
                            name="nhomNguoiDungId"
                            rules={[{ required: true, message: 'Vui lòng chọn nhóm người dùng' }]}
                        >
                            <AntdSelect allowClear showSearch generateOptions={{model: nhomNguoiDungs, label: "ten", value: "id"}} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={12}>
                        <Form.Item
                            label="Trạng thái"
                            hasFeedback
                            name="maTrangThaiHoSo"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                        >
                            <AntdSelect generateOptions={{model: trangThaiHoSos, label: "ten", value: "ma"}}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Loại dữ liệu kết nối"
                            hasFeedback
                            name="loaiDuLieuKetNoi"
                        >
                            <AntdSelect options={LOAIDULIEUKETNOI_QUYTRINH_OPTIONS} allowClear showSearch/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trạng thái chi tiết"
                            hasFeedback
                            name="trangThaiChiTiet"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col md={showThoiGianTuChuyen ? 7 : 12} span={24}>
                        <Form.Item
                            label="Là bước tự chuyển"
                            name="laBuocTuChuyen"
                            // rules={[{ required: true, message: 'Vui lòng nhập loại bước' }]}
                        >
                            <AntdSelect options={LABUOCTUCHUYEN_OPTIONS} />
                        </Form.Item>
                    </Col>
                    {showThoiGianTuChuyen ? <Col md={5} span={24}>
                        <Form.Item
                            label="Thời gian tự chuyển (giờ)"
                            name="thoiGianTuChuyen"
                            hasFeedback
                            rules={[
                                {  
                                    required: true, 
                                    message: 'Vui lòng nhập thời gian xử lý' 
                                }]}
                        >
                            <InputNumber min={1}/>
                        </Form.Item>
                    </Col>: null} */}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Gửi email"
                            name="guiEmail"
                            // rules={[{ required: true, message: 'Vui lòng nhập loại bước' }]}
                        >
                            <AntdSelect options={GUIEMAIL_OPTIONS} />
                        </Form.Item>
                    </Col>
                    {showGuiEmail ? <Col md={24} span={24}>
                        <Form.Item
                            label="Nội dung email"
                            name="bieuMauEmail"
                            hasFeedback
                            rules={[
                                {  
                                    required: true, 
                                    message: 'Vui lòng nhập nội dung email' 
                            }]}
                        >
                            <Input.TextArea rows={5}/>
                        </Form.Item>
                    </Col>: null}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Gửi SMS"
                            name="guiSMS"
                            // rules={[{ required: true, message: 'Vui lòng nhập loại bước' }]}
                        >
                            <AntdSelect options={GUIESMS_OPTIONS} />
                        </Form.Item>
                    </Col>
                    {showGuiSMS ? <Col md={24} span={24}>
                        <Form.Item
                            label="Nội dung SMS"
                            name="bieuMauSMS"
                            hasFeedback
                            rules={[
                                {  
                                    required: true, 
                                    message: 'Vui lòng nhập nội dung SMS' 
                            }]}
                        >
                            <Input.TextArea rows={5}/>
                        </Form.Item>
                    </Col>: null}
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Gửi liên thông QLVB"
                            name="guiLienThongQLVB"
                            // rules={[{ required: true, message: 'Vui lòng nhập loại bước' }]}
                        >
                            <AntdSelect options={GUIELIENTHONGQLVB_OPTIONS} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
    </AntdModal>
}