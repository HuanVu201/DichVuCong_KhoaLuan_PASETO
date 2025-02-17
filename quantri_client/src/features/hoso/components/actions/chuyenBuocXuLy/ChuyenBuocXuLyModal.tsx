import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdAutoComplete, AntdDivider, AntdModal, AntdSelect } from "@/lib/antd/components"
import { Col, DatePicker, Form, Input, Row } from "antd"
import { RenderTitle } from "@/components/common/RenderTitle"
import { DanhSachQuyTrinh } from "./DanhSachQuyTrinh"
import { ChuyenBuocXuLyHoSo, GetHoSoParam } from "@/features/hoso/services"
import React, { ComponentProps, useEffect, useState } from "react"
import { GetHoSo } from "@/features/hoso/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { FormInstance } from "antd/lib"
import { get } from "http"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { resetData } from "@/features/hoso/redux/slice"
import { KetQuaLienQuanWrapper } from "@/features/ketqualienquan/components/KetQuaLienQuan"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import dayjs from 'dayjs'
import { userService } from "@/features/user/services"
import { DefaultOptionType } from "antd/es/select"
import { CATALOG, LOAI_KET_QUA_OPTIONS, TRANGTHAIHOSO } from "@/features/hoso/data/formData"

const yKienChuyenXuLyOptions = [
    { value: 'Kính trình lãnh đạo phân công', label: 'Kính trình lãnh đạo phân công' },
    { value: 'Kính trình lãnh đạo ký duyệt', label: 'Kính trình lãnh đạo ký duyệt' },
    { value: 'Chuyển phòng chuyên môn', label: 'Chuyển phòng chuyên môn' },
    { value: 'Chuyển chuyên viên tham mưu, giải quyết hồ sơ', label: 'Chuyển chuyên viên tham mưu, giải quyết hồ sơ' },
    { value: 'Chuyển hồ sơ liên thông', label: 'Chuyển hồ sơ liên thông' },
    { value: 'Yêu cầu xử lý lại', label: 'Yêu cầu xử lý lại' },
];

type ChuyenBuocXuLyModalProps = {
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
    onClose?: () => void;
} & Pick<ComponentProps<typeof DanhSachQuyTrinh>, "submitHandler" | "submitMultipleHandler">

const ChuyenBuocXuLyModal = ({ setSearchHoSoParams, onClose, submitHandler, submitMultipleHandler }: ChuyenBuocXuLyModalProps) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<ChuyenBuocXuLyHoSo>()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const { data: user } = useAppSelector(state => state.user)
    const dinhKem = Form.useWatch("dinhKemKetQua", form)
    const [users, setUsers] = useState<DefaultOptionType[]>()

    const hideCapNhatKetQua = hoSo?.laHoSoChungThuc === true || (hoSo?.trangThaiHoSoId == "2" && hoSo.catalog != CATALOG["xa-phuong"]) || submitMultipleHandler !== undefined
    
    const modalTitle = buttonActionContext.chuyenBuocXuLyNhieuHoSoModalVisible && buttonActionContext.selectedHoSoKeyByTHTTs.length > 1? "CHUYỂN BƯỚC XỬ LÝ NHIỀU HỒ SƠ" : "CHUYỂN BƯỚC XỬ LÝ HỒ SƠ:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`
    useEffect(() => {
        (async () => {
            if (user?.officeCode && user?.groupCode && hideCapNhatKetQua === false && hoSo !== undefined) {
                const res = await userService.SearchNhomLanhDao({ officeCode: user.officeCode, groupCode: user.groupCode })
                setUsers(res.data.data.map(x => {
                    const title = `${x.fullName} - ${x.name} ${x.groupName ? `(Phòng: ${x.groupName})` : ''} ${x.officeName ? `(Đơn vị: ${x.officeName})` : ''} `
                    return {
                        label: title,
                        value: x.userName,
                        title,
                        fullName: x.fullName
                    }
                }));
            }
        })()
    }, [hideCapNhatKetQua, hoSo])

    const dispatch = useAppDispatch()
    const handleCancel = () => {
        form.resetFields()
        // buttonActionContext.setSelectedHoSos([])
        dispatch(resetData())
        buttonActionContext.setChuyenBuocXuLyModalVisible(false)
        onClose ? onClose() : undefined
    }
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            if(buttonActionContext.chuyenBuocXuLyNhieuHoSoModalVisible && buttonActionContext.selectedHoSoKeyByTHTTs.length){
                dispatch(GetHoSo({ id: buttonActionContext.selectedHoSoKeyByTHTTs[0] as string, view: "chuyenBuocXuLy" }))
            }else {
                dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "chuyenBuocXuLy" }))
            }
        }
    }, [buttonActionContext.selectedHoSos, buttonActionContext.chuyenBuocXuLyNhieuHoSoModalVisible, buttonActionContext.selectedHoSoKeyByTHTTs])

    useEffect(() => {
        if (hoSo != undefined && user) {
            // const cungDonVi = user.officeCode === hoSo.donViChuyenXuLy;
            // const cloneHoSo = {...hoSo,
            //     dinhKemKetQua: cungDonVi ? hoSo.dinhKemKetQua : undefined,
            //     trichYeuKetQua: cungDonVi ? hoSo.trichYeuKetQua : undefined,
            //     yKienNguoiChuyenXuLy: undefined,
            //     dinhKemYKienNguoiChuyenXuLy: undefined, 
            //     loaiVanBanKetQua: cungDonVi ? hoSo.loaiVanBanKetQua : undefined,
            //     soKyHieuKetQua: cungDonVi ? hoSo.soKyHieuKetQua : undefined,
            //     nguoiKyKetQua: cungDonVi ? hoSo.nguoiKyKetQua : undefined,
            //     coQuanBanHanhKetQua: cungDonVi ? hoSo.coQuanBanHanhKetQua : undefined,
            //     ngayBanHanhKetQua: cungDonVi ? (hoSo.ngayBanHanhKetQua ? dayjs(hoSo.ngayBanHanhKetQua) : undefined) : undefined,
            //     ngayKyKetQua: cungDonVi ? (hoSo.ngayKyKetQua ? dayjs(hoSo.ngayKyKetQua) : undefined) : undefined,
            // }
            // form.setFieldsValue({...cloneHoSo} as any)
            form.setFieldsValue({
                ...hoSo,
                yKienNguoiChuyenXuLy: undefined,
                dinhKemYKienNguoiChuyenXuLy: undefined,
                ngayBanHanhKetQua: hoSo.ngayBanHanhKetQua ? dayjs(hoSo.ngayBanHanhKetQua) : undefined,
                ngayKyKetQua: hoSo.ngayKyKetQua ? dayjs(hoSo.ngayKyKetQua) : undefined,
                coQuanBanHanhKetQua: hoSo.coQuanBanHanhKetQua ||user?.officeName

            } as any)
        }
    }, [hoSo, user])

    return <AntdModal visible={true} title={modalTitle} fullsizeScrollable handlerCancel={handleCancel} footer={null} maskClosable={false}>
        <Form name="ChuyenBuocXuLyHoSo" form={form} layout="vertical">
            <Form.Item name="buocXuLyTiep" hidden><Input /></Form.Item>
            <Form.Item name="nguoiXuLyTiep" hidden><Input /></Form.Item>
            <Form.Item name="tenBuocHienTai" hidden><Input /></Form.Item>
            <Form.Item name="buocHienTai" hidden><Input /></Form.Item>
            <Form.Item name="trangThaiHoSoId" hidden><Input /></Form.Item>
            <Form.Item name="nodeQuyTrinh" hidden><Input /></Form.Item>
            <Form.Item name="thoiHanBuocXuLy" hidden><Input /></Form.Item>
            <Form.Item name="loaiThoiHanBuocXuLy" hidden><Input /></Form.Item>
            <Form.Item name="donViNguoiTiepNhanXuLy" hidden><Input /></Form.Item>
            {hoSo ? <Row gutter={8}>
                {hideCapNhatKetQua ?  
                <Col span={12}>
                    <Form.Item label="Ý kiến chuyển xử lý" name="yKienNguoiChuyenXuLy" >
                        <AntdAutoComplete generateOptions={{ model: yKienChuyenXuLyOptions, value: 'value', label: 'label' }}>
                            <Input placeholder="Nhập ý kiến chuyển xử lý" />
                        </AntdAutoComplete>
                    </Form.Item>
                </Col> :  <Col span={24}>
                    <RenderTitle title="Kết quả xử lý hồ sơ" />
                    <Row gutter={[4, 8]}>
                        <Col span={24} md={6}>
                            <Form.Item name="loaiVanBanKetQua" label="Loại kết quả">
                                <AntdAutoComplete generateOptions={{ model: LOAI_KET_QUA_OPTIONS, value: 'value', label: 'label' }} maxLength={150}>
                                    <Input placeholder="Nhập hoặc chọn loại kết quả" showCount/>
                                </AntdAutoComplete>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="soKyHieuKetQua" label="Số ký hiệu">
                                <Input maxLength={100} showCount/>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="nguoiKyKetQua" label="Người ký">
                                <AntdAutoComplete generateOptions={{ model: users, value: 'fullName', label: 'title' }} maxLength={300}>
                                    <Input placeholder="Chọn người ký" showCount/>
                                </AntdAutoComplete>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="coQuanBanHanhKetQua" label="Cơ quan ban hành">
                                <Input maxLength={300} showCount />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={8}>
                            <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                                <Input.TextArea rows={3} maxLength={2000} showCount/>
                            </Form.Item>
                        </Col>
                        <Col span={24} md={4}>
                            <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                                {hoSo?.maHoSo ? <RegularUpload
                                    kySoToken={true}
                                    dinhKem={dinhKem}
                                    fieldName={"dinhKemKetQua"}
                                    folderName={hoSo.maHoSo}
                                    form={form} /> : null}
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="ngayBanHanhKetQua" label="Ngày ban hành">
                                <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={6}>
                            <Form.Item name="ngayKyKetQua" label="Ngày ký">
                                <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <RenderTitle title="Kết quả liên quan (nếu có)" />
                            {hoSo ? <KetQuaLienQuanWrapper maHoSo={hoSo.maHoSo} /> : null}
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Ý kiến chuyển xử lý" name="yKienNguoiChuyenXuLy" >
                                <AntdAutoComplete generateOptions={{ model: yKienChuyenXuLyOptions, value: 'value', label: 'label' }} maxLength={2000}>
                                    <Input placeholder="Nhập ý kiến chuyển xử lý" showCount/>
                                </AntdAutoComplete>
                            </Form.Item>
                        </Col>
                    </Row>
                    <AntdDivider />
                </Col>}
                <Col span={24}>
                    <RenderTitle title="Chuyển người xử lý tiếp" />
                    <DanhSachQuyTrinh form={form} setSearchHoSoParams={setSearchHoSoParams} submitHandler={submitHandler} submitMultipleHandler={submitMultipleHandler}/>
                </Col>
            </Row>: null}
        </Form>
    </AntdModal>
}

export default ChuyenBuocXuLyModal
