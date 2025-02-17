import { GetKenhTin, UpdateKenhTin as DispatchUpdateKenhTin, DeleteKenhTin } from "@/features/portaldvc_admin/kenhtin/redux/action"
import { SearchKieuNoiDung } from "@/features/portaldvc_admin/kieunoidung/redux/action"
import { AntdButton, AntdModal, AntdSelect, AntdSpace, AntdUpLoad, } from "@/lib/antd/components"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { MyCkEditor } from "@/lib/ckeditor/CkEditor5"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { Button, Col, Form, FormProps, Input, InputNumber, Popconfirm, Row, SelectProps, Space } from "antd"
import { useEffect, useMemo, useRef } from "react"

const suDungPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];

export const KenhTinChiTiet = () => {
    const { data: KenhTin } = useAppSelector((state: { kenhtin: any }) => state.kenhtin)
    const { datas: kieunoiDungs } = useAppSelector(state => state.kieunoidung)
    const [form] = Form.useForm()
    const currentSelectedKieuNoiDung = Form.useWatch<string>("kieuNoiDungId", form)
    const editorRef = useRef<ClassicEditor | null>(null)
    const dinhKem = Form.useWatch("imageUrl", form)
    const dispatch = useAppDispatch()
        
    const onFinish = async () => {
        const formData = form.getFieldsValue()
        const noiDung = editorRef.current?.getData() // giá trị nội dung mới ở đây
        
        if (KenhTin?.id) {
            dispatch(DispatchUpdateKenhTin({ id: KenhTin.id, data: {...formData,noiDung } }))
            
        }
    }
    const handleCancel = () => {
        form.resetFields()
    }
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
    useEffect(() => {
        if (kieunoiDungs == undefined)
            dispatch(SearchKieuNoiDung({}))
    }, [kieunoiDungs])
    useEffect(() => {
        if (KenhTin) {
            form.setFieldsValue(KenhTin)
            form.setFieldValue("kieuNoiDungId", KenhTin.kieuNoiDung?.id)
        }
    }, [KenhTin])

    return (

        <Form name='KenhTinAction' layout="vertical" onFinish={onFinish} form={form} requiredMark={true} >
            <Space wrap direction="horizontal" style={{ marginBottom: '20px' }}>
                <AntdButton size="small" type="primary" onClick={onFinish} icon={<EditOutlined></EditOutlined>}>Lưu</AntdButton>
                <Popconfirm
                    title='Xoá?'
                    onConfirm={() => {
                        dispatch(DeleteKenhTin({ id: KenhTin?.id, forceDelete: false }))
                    }}
                    okText='Xoá'
                    cancelText='Huỷ'
                >
                    <Button size="small" type="primary" danger icon={<DeleteOutlined></DeleteOutlined>}>Xóa</Button>
                </Popconfirm>
            </Space>
            <Row gutter={[8, 8]}>
                <Col md={12} span={24}>
                    <Form.Item
                        label="Tên kênh tin"
                        name="tenKenhTin"
                    >
                        <Input />
                    </Form.Item>
                </Col>
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
                        <AntdSelect defaultValue={KenhTin?.kieuNoiDung?.tenNoiDung} generateOptions={{ model: kieunoiDungs, label: 'tenNoiDung', value: 'id' }} />
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
                                {/* <AntdUpLoad formInstance={form} folderName="KenhTin" fieldName="imageUrl" accept="image/png, image/jpeg" listType="picture" /> */}
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
                            valuePropName="data" 
                        >
                            <MyCkEditor ref={editorRef}></MyCkEditor>
                        </Form.Item>
                    </Col> : <></>
                }
            </Row>
        </Form>
    )
}
