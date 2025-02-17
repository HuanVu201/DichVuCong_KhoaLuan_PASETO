import { AntdAutoComplete, AntdButton, AntdDivider, AntdModal, AntdSelect, AntdSpace } from "@/lib/antd/components"
import { Col, DatePicker, Form, Input, Row } from "antd"
import { RenderTitle } from "../../../../../components/common/RenderTitle"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { CapNhatKetQuaHoSo, GetHoSo } from "@/features/hoso/redux/action"
import { ElementRef, Ref, useEffect, useMemo, useRef, useState } from "react"
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

const loaiKetQuas = [
    { label: 'Kết quả', value: 'Kết quả' },

    { label: 'Trả lại/Xin rút', value: 'Trả lại/Xin rút' },
]

const CapNhatKetQuaXuLyHoSoModal = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [form] = Form.useForm<IHoSo>()
    const buttonActionContext = useButtonActionContext()
    const [users, setUsers] = useState<DefaultOptionType[]>()
    const { data: hoSo, datas: hoSos } = useAppSelector(state => state.hoso)
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

    const loaiDuLieuKetNoi = useMemo(() => {
        const currentHoSo = hoSos?.find(x => x.id.toLowerCase() === hoSo?.id.toLowerCase());
        return currentHoSo?.loaiDuLieuKetNoi
    }, [hoSos, hoSo])

    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "capNhatKetQuaXuLyHoSo" }))
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        if (hoSo !== undefined && user) {
            form.setFieldsValue({
                ...hoSo,
                ngayBanHanhKetQua: hoSo.ngayBanHanhKetQua ? dayjs(hoSo.ngayBanHanhKetQua) : undefined,
                ngayKyKetQua: hoSo.ngayKyKetQua ? dayjs(hoSo.ngayKyKetQua) : undefined,
                coQuanBanHanhKetQua: hoSo.coQuanBanHanhKetQua || user.officeName

            } as any)
        }
    }, [hoSo, user])


    const handleCancel = () => {
        buttonActionContext.setCapNhatKetQuaXuLyHoSoModalVisible(false)
        form.resetFields()
        dispatch(resetData())
    }

    const onOk = async () => {
        setButtonLoading(true)
        try {
            const formData = await form.validateFields()
            if (buttonActionContext.selectedHoSos.length) {
                const res = await dispatch(CapNhatKetQuaHoSo({
                    ...formData,
                    ngayBanHanhKetQua: formatISOtoDate(formData.ngayBanHanhKetQua),
                    ngayKyKetQua: formatISOtoDate(formData.ngayKyKetQua),
                    id: buttonActionContext.selectedHoSos[0] as string
                })).unwrap()
                if (res.succeeded) {
                    // form.setFieldValue("dinhKemKetQua", undefined) // clean func của antdUpLoad sẽ xóa gọi api xóa file nếu dinhKemKetQua != undefined 
                    setSearchParams((curr) => ({ ...curr }))
                    handleCancel()
                }
            }
            setButtonLoading(false)
        } catch (error) {
            console.log(error);
            setButtonLoading(false)
        }
    }
    const onSubmitDinhKemThanhPhanHoSo = (value: string) => {
        const newDinhKems = dinhKem ? dinhKem + ID_SEPARATE + value : value
        form.setFieldValue("dinhKemKetQua", newDinhKems)
    }

    const hideUpload = loaiDuLieuKetNoi == "LLTPVneid" || loaiDuLieuKetNoi == "LLTPVneidUyQuyen" || loaiDuLieuKetNoi == "LTKS" || loaiDuLieuKetNoi == "LTKT"

    return <>
        <AntdModal title={"Cập nhật kết quả xử lý hồ sơ:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} visible={true} handlerCancel={handleCancel} width={1500}
            footer={<AntdSpace>
                <AntdButton onClick={handleCancel} key={"1"} loading={buttonLoading}>Đóng</AntdButton>
                {/* {eFormKetQuaData ? <AntdButton onClick={onExtractDataModify} key={"2"}>Sửa dữ liệu trích xuất OCR</AntdButton> : null} */}
                <AntdButton onClick={onOk} key={"3"} type="primary" loading={buttonLoading}>Cập nhật</AntdButton>
            </AntdSpace>} maskClosable={false}>
            <Form form={form} layout="vertical" name="CapNhatKetQuaHoSoModal" spellCheck>
                {/* <Form.Item name="eFormKetQuaData" hidden><Input/></Form.Item>
            <Form.Item name="eFormKetQua" hidden><Input/></Form.Item> */}
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
                                <Form.Item name="dinhKemKetQua" label="Đính kèm kết quả" tooltip={hideUpload ? "Hồ sơ liên thông sẽ tự động được cập nhật kết quả" : undefined}>
                                    {hoSo?.maHoSo ? <RegularUpload
                                        ref={ref}
                                        kySoToken
                                        useSoHoa
                                        dinhKemSoHoa={hoSo?.dinhKemSoHoa}
                                        dinhKem={dinhKem}
                                        maTTHC={hoSo?.maTTHC} //để tạm
                                        fieldName={"dinhKemKetQua"}
                                        folderName={hoSo.maHoSo}
                                        scanPC={true}
                                        hideUpload={hideUpload}
                                        extraElement={(loading) => ((hoSo as any)?.choPhepLayFileTuTHPS ?
                                            <AntdButton icon={<SelectOutlined />} loading={loading} onClick={() => buttonActionContext.setChonTepTuThanhPhanHoSoVisible(true)}>Chọn từ thành phần hồ sơ</AntdButton> : null)}
                                        form={form} /> : null}
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
                            <Col span={24}>
                                <RenderTitle title="Kết quả liên quan (nếu có)" />
                                {hoSo ? <KetQuaLienQuanWrapper maHoSo={hoSo.maHoSo} /> : null}
                            </Col>

                        </Row>
                        <AntdDivider />
                    </Col>
                </Row>
            </Form>
        </AntdModal>
        {buttonActionContext.chonTepTuThanhPhanHoSoVisible && hoSo?.maHoSo ? <ChonTepThanhPhanHoSo maHoSo={hoSo.maHoSo} onSubmit={onSubmitDinhKemThanhPhanHoSo} /> : null}
    </>
}

export default CapNhatKetQuaXuLyHoSoModal
