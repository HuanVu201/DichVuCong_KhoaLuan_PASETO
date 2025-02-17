import { AntdAutoComplete, AntdButton, AntdDivider, AntdModal, AntdSelect, AntdSpace } from "@/lib/antd/components"
import { Col, DatePicker, Form, Input, Row } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CapNhatKetQuaHoSo, CapNhatKetQuaNhieuHoSo, GetHoSo } from "@/features/hoso/redux/action"
import { ElementRef, Ref, useEffect, useRef, useState } from "react"
import { RegularUpload, RegularUploadRef, TrichXuatOCRMode } from "@/lib/antd/components/upload/RegularUpload"
import { KetQuaLienQuanWrapper } from "@/features/ketqualienquan/components/KetQuaLienQuan"
import { ChonTepThanhPhanHoSo } from "../../ChonTepThanhPhanHoSo"
import { useUploadTable } from "@/lib/antd/components/upload/hooks/useUploadTable"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"
import { FORMAT_DATE, FORMAT_DATE_ISO, FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { SelectOutlined } from "@ant-design/icons"
import dayjs from 'dayjs'
import { userService } from "@/features/user/services"
import { DefaultOptionType } from "antd/es/select"
import { LOAI_KET_QUA_OPTIONS } from "@/features/hoso/data/formData"
import { formatISOtoDate } from "@/utils"
import { resetData } from "@/features/hoso/redux/slice"
import { hoSoApi } from "@/features/hoso/services"
import { toast } from "react-toastify"

const loaiKetQuas = [
    { label: 'Kết quả', value: 'Kết quả' },
    { label: 'Bổ sung', value: 'Bổ sung' },
    { label: 'Trả lại/Xin rút', value: 'Trả lại/Xin rút' },
]

const CapNhatKetQuaXuLyNhieuHoSoModal = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [form] = Form.useForm<IHoSo>()
    const buttonActionContext = useButtonActionContext()
    const [users, setUsers] = useState<DefaultOptionType[]>()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const dinhKem: string | undefined = Form.useWatch("dinhKemKetQua", form)
    const dispatch = useAppDispatch()
    const { data: user } = useAppSelector(state => state.user)
    const ref = useRef<ElementRef<typeof RegularUpload>>(null)
    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        (async () => {
            if (user?.officeCode && user?.groupCode) {
                const res = await userService.SearchNhomLanhDao({ officeCode: user.officeCode, groupCode: user.groupCode })

                setUsers(res.data.data.map(x => {
                    const title = `${x.fullName} - ${x.positionName} `
                    return {
                        label: title,
                        value: x.userName,
                        title,
                        fullName: x.fullName
                    }
                }));
            }
        })()
    }, [])


    const handleCancel = () => {
        buttonActionContext.setCapNhatKetQuaXuLyNhieuHoSoModalVisible(false)
        form.resetFields()
        dispatch(resetData())
    }

    const onOk = async () => {
        setButtonLoading(true)
        try {
            const formData = await form.validateFields()
            if (buttonActionContext.selectedHoSos.length) {
                var sltHoSos = buttonActionContext.selectedHoSos.map((i) => i.toString());
                // const res = await dispatch(CapNhatKetQuaNhieuHoSo({
                //     ...formData,
                //     ids: sltHoSos,
                //     ngayBanHanhKetQua: formatISOtoDate(formData.ngayBanHanhKetQua),
                //     ngayKyKetQua: formatISOtoDate(formData.ngayKyKetQua),
                // })).unwrap()

                // if (res.succeeded) {

                //     setSearchParams((curr) => ({ ...curr }))
                //     handleCancel()
                // }

            }
            setButtonLoading(false)
        } catch (error) {
            console.log(error);
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                coQuanBanHanhKetQua: user.officeName
            })
        }
    }, [user])


    return <>
        <AntdModal title={`Cập nhật kết quả xử lý nhiều hồ sơ (${buttonActionContext.selectedHoSos.length} hồ sơ)`} visible={true} handlerCancel={handleCancel} width={1500}
            footer={<AntdSpace>
                <AntdButton onClick={handleCancel} key={"1"} loading={buttonLoading}>Đóng</AntdButton>
                <AntdButton onClick={onOk} key={"3"} type="primary" loading={buttonLoading}>Cập nhật</AntdButton>
            </AntdSpace>}>
            <Form form={form} layout="vertical" name="CapNhatKetQuaHoSoModal" spellCheck>
                <Row gutter={8}>
                    <Col span={24}>
                        <RenderTitle title="Kết quả xử lý hồ sơ" />
                        <Row gutter={[4, 8]}>
                            <Col span={24} md={6}>
                                <Form.Item name="loaiVanBanKetQua" label="Loại văn bản kết quả">
                                    <AntdAutoComplete generateOptions={{ model: LOAI_KET_QUA_OPTIONS, value: 'value', label: 'label' }} maxLength={150}>
                                        <Input placeholder="Nhập hoặc chọn loại kết quả" showCount />
                                    </AntdAutoComplete>
                                </Form.Item>
                            </Col>
                            <Col span={24} md={6}>
                                <Form.Item name="soKyHieuKetQua" label="Số ký hiệu" >
                                    <Input maxLength={100} showCount />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={6}>
                                <Form.Item name="nguoiKyKetQua" label="Người ký">
                                    <AntdAutoComplete generateOptions={{ model: users, value: 'fullName', label: 'title' }} maxLength={300}>
                                        <Input placeholder="Chọn người ký" showCount />
                                    </AntdAutoComplete>
                                </Form.Item>
                            </Col>
                            <Col span={24} md={6}>
                                <Form.Item name="coQuanBanHanhKetQua" label="Cơ quan ban hành">
                                    <Input maxLength={300} showCount />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="trichYeuKetQua" label="Trích yếu kết quả">
                                    <Input.TextArea rows={3} maxLength={2000} showCount />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={8}>
                                <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả">
                                    <RegularUpload
                                        ref={ref}
                                        kySoToken
                                        dinhKem={dinhKem}
                                        fieldName={"dinhKemKetQua"}
                                        folderName={"dinhKemKetQuaNhieuHoSo"}
                                        scanPC={true}
                                        form={form} />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={4}>
                                <Form.Item name="ngayBanHanhKetQua" label="Ngày ban hành">
                                    <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={4}>
                                <Form.Item name="ngayKyKetQua" label="Ngày hết hiệu lực">
                                    <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="LoaiKetQua" label="Loại kết quả">
                                    <AntdSelect
                                        virtual={true}
                                        generateOptions={{
                                            model: loaiKetQuas,
                                            label: "label",
                                            value: "value",
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <p style={{ textAlign: 'right', color: 'tomato', position: 'relative', top: 30 }}>
                                    <i>Lưu ý: Thực hiện "Đính kèm kết quả" sẽ ghi đè hết tất cả đính kèm kết quả hiện tại!</i>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </AntdModal>
        {/* {buttonActionContext.chonTepTuThanhPhanHoSoVisible && hoSo?.maHoSo ? <ChonTepThanhPhanHoSo maHoSo={hoSo.maHoSo} onSubmit={onSubmitDinhKemThanhPhanHoSo} /> : null} */}
    </>
}

export default CapNhatKetQuaXuLyNhieuHoSoModal
