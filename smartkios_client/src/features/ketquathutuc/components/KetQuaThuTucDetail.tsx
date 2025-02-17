import { Col, Form, Input, Row, InputNumber, Space, Spin, Upload, Select, Modal } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { useKetQuaThuTucContext } from "../contexts/KetQuaThuTucProvider"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { ketQuaThuTucService } from "../services"
import EformModal from "./modals/Eform"
import { toast } from "react-toastify"



export const KetQuaThuTucDetail = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchKetQuaThuTuc>> }) => {
    const ketQuaThuTucContext = useKetQuaThuTucContext()
    const thuTucContext = useThuTucContext()
    const [form] = Form.useForm<IKetQuaThuTuc>()
    const [ketQuaThuTuc, setKetQuaThuTuc] = useState<IKetQuaThuTuc>()
    const eFormKetQua = Form.useWatch("eFormKetQua", form)

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        if (ketQuaThuTucContext?.maKetQuaThuTuc) {
            const res = await ketQuaThuTucService.Update({ id: ketQuaThuTucContext.maKetQuaThuTuc, data: formData })
            if(res.data.succeeded){
                toast.success("Cập nhật thành công")
            }
        } else {
            if (thuTucContext.thuTucId) {
                //thuTucContext.thuTucId là matthc / xem usecolumn ở /thutuc
                const res = await ketQuaThuTucService.Create({ ...formData, maTTHC: thuTucContext.thuTucId })
                if(res.data.succeeded){
                    toast.success("Thêm mới thành công")
                }
            }
        }
        setSearchParams(cur => ({ ...cur, thuTucId: thuTucContext.thuTucId }))
        resetState()
    }
    const resetState = () => {
        form.resetFields();
        ketQuaThuTucContext.setKetQuaThuTucModalVisible(false)
        ketQuaThuTucContext.setMaKetQuaThuTuc(undefined)
    }
    const handleCancel = () => {
        resetState()
    };
    useEffect(() => {
        (async () => {
            if (ketQuaThuTucContext.maKetQuaThuTuc) {
                const res = await ketQuaThuTucService.Get(ketQuaThuTucContext.maKetQuaThuTuc)
                setKetQuaThuTuc(res.data.data)
            }
        })()
    }, [ketQuaThuTucContext.maKetQuaThuTuc])

    useEffect(() => {
        if (ketQuaThuTuc) {
            form.setFieldsValue({ ...ketQuaThuTuc })
        }
    }, [ketQuaThuTuc])

    return (
       <>
        <AntdModal title="Thêm mới kết quả thủ tục" visible={true} handlerCancel={handleCancel} footer={<>
            <AntdButton key={"1"} onClick={(handleCancel)}>Đóng</AntdButton>
            <AntdButton key={"2"} onClick={() => ketQuaThuTucContext.setEFormVisible(true)}>Sửa Eform</AntdButton>
            <AntdButton key={"3"} type="primary" onClick={onFinish}>Lưu kết quả</AntdButton>
        </>}>
            <Form name='ketquathutuc' layout="vertical" form={form} requiredMark={ketQuaThuTucContext.maKetQuaThuTuc !== null}
                initialValues={{thoiHanMacDinh: 6, loaiThoiHan: "month"}}>
                <Form.Item
                    name="eFormKetQua"
                    hidden
                >
                    <Input />
                </Form.Item>
                <Row gutter={[8, 8]}>
                    <Col md={24} span={24}>
                        <Form.Item
                            label="Tên kết quả"
                            name="tenKetQua"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã kết quả"
                            name="maKetQua"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Mã nhận diện OCR"
                            name="maNhanDienOCR"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thời hạn xử lý mặc định"
                            name="thoiHanMacDinh"
                        >
                            <InputNumber min={0}/>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Loại thời hạn xử lý"
                            name="loaiThoiHan"
                        >
                            <Select options={[{value: "day", label:"Ngày"}, {value: "month", label:"Tháng"}, {value:"year", label:"year"}]} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </AntdModal>
        <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
            {ketQuaThuTucContext.eFormVisible ? <EformModal form={form} eFormData={eFormKetQua}/> : null}
        </Suspense>
        </>
    )
}