import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdAutoComplete, AntdDivider, AntdModal, AntdSelect } from "@/lib/antd/components"
import { Col, DatePicker, Form, Input, Row } from "antd"
import { RenderTitle } from "@/components/common/RenderTitle"
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
import { DanhSachQuyTrinh } from "../chuyenBuocXuLy/DanhSachQuyTrinh"

const yKienChuyenXuLyOptions = [
    { value: 'Kính trình lãnh đạo phân công', label: 'Kính trình lãnh đạo phân công' },
    { value: 'Kính trình lãnh đạo ký duyệt', label: 'Kính trình lãnh đạo ký duyệt' },
    { value: 'Chuyển phòng chuyên môn', label: 'Chuyển phòng chuyên môn' },
    { value: 'Chuyển chuyên viên tham mưu, giải quyết hồ sơ', label: 'Chuyển chuyên viên tham mưu, giải quyết hồ sơ' },
    { value: 'Chuyển hồ sơ liên thông', label: 'Chuyển hồ sơ liên thông' },
    { value: 'Yêu cầu xử lý lại', label: 'Yêu cầu xử lý lại' },
];

type ChuyenBuocXuLyChungThucModalProps = {
    setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
    onClose?: () => void;
} & Pick<ComponentProps<typeof DanhSachQuyTrinh>, "submitHandler" | "submitMultipleHandler">

const ChuyenBuocXuLyChungThucModal = ({ setSearchHoSoParams, onClose, submitHandler, submitMultipleHandler }: ChuyenBuocXuLyChungThucModalProps) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<ChuyenBuocXuLyHoSo>()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const { data: user } = useAppSelector(state => state.user)
    const modalTitle = buttonActionContext.chuyenBuocXuLyNhieuHoSoModalVisible && buttonActionContext.selectedHoSoKeyByTHTTs.length > 1? "CHUYỂN BƯỚC XỬ LÝ NHIỀU HỒ SƠ" : "CHUYỂN BƯỚC XỬ LÝ HỒ SƠ:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`
    const dispatch = useAppDispatch()
    const handleCancel = () => {
        form.resetFields()
        // buttonActionContext.setSelectedHoSos([])
        dispatch(resetData())
        buttonActionContext.setChuyenBuocXuLyChungThucModalVisible(false)
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
                // dinhKemYKienNguoiChuyenXuLy: undefined,
                // ngayBanHanhKetQua: hoSo.ngayBanHanhKetQua ? dayjs(hoSo.ngayBanHanhKetQua) : undefined,
                // ngayKyKetQua: hoSo.ngayKyKetQua ? dayjs(hoSo.ngayKyKetQua) : undefined,
                // coQuanBanHanhKetQua: user?.officeName

            } as any)
        }
    }, [hoSo, user])

    return <AntdModal visible={true} title={modalTitle} fullsizeScrollable handlerCancel={handleCancel} footer={null}>
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
                <Col span={12}>
                    <Form.Item label="Ý kiến chuyển xử lý" name="yKienNguoiChuyenXuLy" >
                        <AntdAutoComplete generateOptions={{ model: yKienChuyenXuLyOptions, value: 'value', label: 'label' }}>
                            <Input placeholder="Nhập ý kiến chuyển xử lý" />
                        </AntdAutoComplete>
                    </Form.Item>
                </Col> 
                <Col span={24}>
                    <RenderTitle title="Chuyển người xử lý tiếp" />
                    <DanhSachQuyTrinh form={form} setSearchHoSoParams={setSearchHoSoParams} submitHandler={submitHandler} submitMultipleHandler={submitMultipleHandler}/>
                </Col>
            </Row>: null}
        </Form>
    </AntdModal>
}

export default ChuyenBuocXuLyChungThucModal
