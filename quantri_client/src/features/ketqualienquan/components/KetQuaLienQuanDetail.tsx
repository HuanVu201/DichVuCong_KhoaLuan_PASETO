import { Checkbox, Col, DatePicker, Form, Input, Row } from "antd"
import { IKetQuaLienQuan, ISearchKetQuaLienQuan } from "../models"
import { useEffect, useState } from "react"
import { AntdAutoComplete, AntdModal } from "../../../lib/antd/components"
import { useKetQuaLienQuanContext } from "../contexts/KetQuaLienQuanProvider"
import { ketQuaLienQuanService } from "../services"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"
import dayjs from 'dayjs'
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { formatISOtoDate } from "@/utils"
import { LOAI_KET_QUA_OPTIONS } from "@/features/hoso/data/formData"
import { DefaultOptionType } from "antd/es/select"
import { userService } from "@/features/user/services"

export const KetQuaLienQuanDetail = ({ maHoSo, searchParams }: { maHoSo: string, searchParams: ISearchKetQuaLienQuan }) => {
    const ketQuaLienQuanContext = useKetQuaLienQuanContext()
    const { data: user } = useAppSelector(state => state.user)
    const [form] = Form.useForm<IKetQuaLienQuan>()
    const [ketQuaLienQuan, setKetQuaLienQuan] = useState<IKetQuaLienQuan>()
    const coQuanBanHanh = Form.useWatch("coQuanBanHanh", form)
    const dinhKem = Form.useWatch("dinhKem", form)
    const [btnLoading, setBtnLoading] = useState(false)
    const [users, setUsers] = useState<DefaultOptionType[]>()

    useEffect(() => {
        (async () => {
            if (user?.officeCode && user?.groupCode) {
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
    }, [])

    const onFinish = async () => {
        setBtnLoading(true)
        const formData = form.getFieldsValue() as IKetQuaLienQuan
        const formatedFormdata = {
            ...formData,
            ngayCoHieuLuc: formatISOtoDate(formData.ngayCoHieuLuc),
            ngayHetHieuLuc: formatISOtoDate(formData.ngayHetHieuLuc),
            ngayKy: formatISOtoDate(formData.ngayKy),
        }
        if (ketQuaLienQuanContext?.ketQuaLienQuanId) {
            await ketQuaLienQuanContext.onUpdate(ketQuaLienQuanContext.ketQuaLienQuanId, formatedFormdata, searchParams)
        } else {
            await ketQuaLienQuanContext.onAdd(formatedFormdata, searchParams)
        }
        setBtnLoading(false)
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields();
        ketQuaLienQuanContext.setKetQuaLienQuanModalVisible(false)
        ketQuaLienQuanContext.setKetQuaLienQuanId(undefined)
    };
    useEffect(() => {
        (async () => {
            if (ketQuaLienQuanContext.ketQuaLienQuanId) {
                const res = await ketQuaLienQuanService.Get(ketQuaLienQuanContext.ketQuaLienQuanId)
                const ketQuaLienQuan = res.data.data
                if (ketQuaLienQuan) {
                    setKetQuaLienQuan({
                        ...ketQuaLienQuan,
                        ngayKy: ketQuaLienQuan.ngayKy ? dayjs(ketQuaLienQuan.ngayKy) : undefined,
                        ngayCoHieuLuc: ketQuaLienQuan.ngayCoHieuLuc ? dayjs(ketQuaLienQuan.ngayCoHieuLuc) : undefined,
                        ngayHetHieuLuc: ketQuaLienQuan.ngayHetHieuLuc ? dayjs(ketQuaLienQuan.ngayHetHieuLuc) : undefined,

                    } as any)
                }
            } else {
                form.setFieldValue("coQuanBanHanh", user?.officeName)
            }
        })()

    }, [ketQuaLienQuanContext.ketQuaLienQuanId])
    useEffect(() => {
        if (maHoSo) {
            form.setFieldValue("maHoSo", maHoSo)
        }
        if (ketQuaLienQuan) {
            form.setFieldsValue({ ...ketQuaLienQuan })
        }
    }, [ketQuaLienQuan, maHoSo])

    return (
        <AntdModal title="Thêm mới kết quả liên quan" width={1200} confirmLoading={btnLoading} visible={true} handlerCancel={handleCancel} okText="Xác nhận" onOk={onFinish}>
            <Form name='KetQuaLienQuan' layout="vertical" onFinish={onFinish} form={form} requiredMark={ketQuaLienQuanContext.ketQuaLienQuanId !== null} >
                <Form.Item hidden name="maHoSo"><Input /></Form.Item>
                <Row gutter={8}>
                    <Col span={24}>
                        <Row gutter={[4, 8]}>
                            <Col span={24} md={6}>
                                <Form.Item name="loaiKetQua" label="Loại kết quả">
                                    <AntdAutoComplete generateOptions={{ model: LOAI_KET_QUA_OPTIONS, value: 'value', label: 'label' }} maxLength={150}>
                                        <Input placeholder="Nhập hoặc chọn loại kết quả" showCount />
                                    </AntdAutoComplete>
                                </Form.Item>
                            </Col>
                            <Col span={24} md={6}>
                                <Form.Item name="soKyHieu" label="Số ký hiệu" >
                                    <Input maxLength={100} showCount />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={6}>
                                <Form.Item name="nguoiKy" label="Người ký">
                                    <AntdAutoComplete generateOptions={{ model: users, value: 'fullName', label: 'title' }} maxLength={300}>
                                        <Input placeholder="Chọn người ký" showCount />
                                    </AntdAutoComplete>
                                </Form.Item>
                            </Col>
                            <Col span={24} md={6}>
                                <Form.Item name="coQuanBanHanh" label="Cơ quan ban hành">
                                    <Input maxLength={300} showCount />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="trichYeu" label="Trích yếu kết quả">
                                    <Input.TextArea rows={3} maxLength={2000} showCount />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={4}>
                                <Form.Item
                                    label="Đính kèm"
                                    name="dinhKem"
                                >
                                    {maHoSo ? <RegularUpload
                                        kySoToken
                                        dinhKem={dinhKem}
                                        fieldName={"dinhKem"}
                                        folderName={maHoSo}
                                        form={form} /> : null}

                                </Form.Item>
                            </Col>
                            <Col span={24} md={4}>
                                <Form.Item name="ngayKy" label="Ngày ký">
                                    <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={4}>
                                <Form.Item name="ngayCoHieuLuc" label="Ngày ban hành">
                                    <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                                </Form.Item>
                            </Col>
                            <Col span={24} md={4}>
                                <Form.Item name="ngayHetHieuLuc" label="Ngày hết hiệu lực">
                                    <DatePicker format={FORMAT_DATE_WITHOUT_TIME} />
                                </Form.Item>
                            </Col>


                        </Row>
                    </Col>
                </Row>
            </Form>
        </AntdModal>
    )
}