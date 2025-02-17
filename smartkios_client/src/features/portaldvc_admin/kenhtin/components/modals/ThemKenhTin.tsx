import { IKenhTin } from "@/features/portaldvc_admin/kenhtin/models"
import { AddKenhTin } from "@/features/portaldvc_admin/kenhtin/redux/action"
import { AntdButton, AntdModal, AntdSelect, AntdSpace, AntdUpLoad, } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, FormProps, Input, InputNumber, Row, SelectProps } from "antd"
import { Rule } from "antd/es/form"
import { useKenhTinContext } from "../../contexts/KenhTinContext"
import { useEffect, useMemo } from "react"
import { SearchKieuNoiDung } from "@/features/portaldvc_admin/kieunoidung/redux/action"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"

const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];
export const ThemKenhTin = ({ handlerClose, visible }: { handlerClose: () => void, visible: boolean }) => {
    const dispatch = useAppDispatch()
    const { datas: KenhTins } = useAppSelector(state => state.kenhtin)
    const { datas: kieunoiDungs } = useAppSelector(state => state.kieunoidung)
    const [form] = Form.useForm()
    const kenhtinContext = useKenhTinContext()
    const currentSelectedKieuNoiDung = Form.useWatch<string>("kieuNoiDungId", form)
    const dinhKem = Form.useWatch("imageUrl", form)
    const onFinish: FormProps["onFinish"] = (values) => {
        dispatch(AddKenhTin(values))
        handleCancel()
    }
    const handleCancel = () => {
        form.resetFields()
        kenhtinContext.setMaKenhTin(undefined)
        handlerClose()
    }
    useEffect(() => {
        if (kieunoiDungs == undefined)
            dispatch(SearchKieuNoiDung({}))
    }, [kieunoiDungs])
    const [hideLienKet, hideNoiDung] = useMemo((): boolean[] => {
        const opt = kieunoiDungs?.find(x => x.id == currentSelectedKieuNoiDung)
        if (opt?.choPhepNhapLoaiLienKet) {
            return [true, false]
        }
        if (opt?.choPhepNhapNoiDung) {
            return [false, true]
        }
        return [false, false]

    }, [currentSelectedKieuNoiDung, kieunoiDungs])

    return (
        <AntdModal title="Thêm mới kênh tin" handlerCancel={handleCancel} visible={visible} footer={null}
            // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
            destroyOnClose>
            <Form name='KenhTinAdd' layout="vertical" onFinish={onFinish} form={form} requiredMark={true} >
                <Row gutter={[8, 8]}>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tên kênh tin"
                            name="tenKenhTin"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col md={12} span={24}>
                        <Form.Item
                            label="Mã kênh tin cha"
                            name="maKenhTinCha"
                        >
                            <AntdSelect options={suDungPhiLePhiOptions} />
                        </Form.Item>
                    </Col> */}
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tóm tắt"
                            name="tomTat"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Thứ tự"
                            name="thuTu"
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Kiểu nội dung"
                            name="kieuNoiDungId"
                        >
                            <AntdSelect generateOptions={{ model: kieunoiDungs, label: 'tenNoiDung', value: 'id' }} />
                        </Form.Item>
                    </Col>
                    {hideLienKet ?
                        <>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Loại mở liên kết"
                                    name="loaiMoLienKet"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Liên kết ngoài"
                                    name="lienKetNgoai"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={12} span={24}>
                                <Form.Item
                                    label="Ảnh đại diện"
                                    name="imageUrl"
                                >
                                     <RegularUpload 
                                        dinhKem={dinhKem}
                                        fieldName={"imageUrl"} 
                                        folderName={"KenhTin"} 
                                        form={form}/>
                                    {/* <AntdUpLoad editing = {visible !== undefined} formInstance={form} folderName="KenhTin" fieldName="imageUrl" accept="image/png, image/jpeg" listType="picture" /> */}
                                </Form.Item>
                            </Col>
                        </>
                        : <></>
                    }
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị menu chính"
                            name="hienThiMenuChinh"
                        >
                            <AntdSelect options={suDungPhiLePhiOptions} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị menu dọc"
                            name="hienThiMenuDoc"
                        >
                            <AntdSelect options={suDungPhiLePhiOptions} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hiển thị menu phụ"
                            name="hienThiMenuPhu"
                        >
                            <AntdSelect options={suDungPhiLePhiOptions} />
                        </Form.Item>
                    </Col>
                    {hideNoiDung ?
                        <Col span={24}>
                            <Form.Item
                                label="Nội dung"
                                name="noiDung"
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col> : <></>
                    }
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <AntdSpace >
                        <AntdButton type="primary" htmlType="submit">
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </AntdSpace>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}
