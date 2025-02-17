import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { ITinBai } from "../models"
import { useEffect, useMemo, useRef } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddTinBai, GetTinBai, UpdateTinBai } from "../redux/action"
import { SearchTrangThai } from "../../trangthai/redux/action"
import dayjs from 'dayjs'
import { resetData } from "../redux/slice"
import { useTinBaiContext } from "../contexts/TinBaiContext"
import { SearchKenhTin } from "../../kenhtin/redux/action"
import { CheckboxChangeEvent } from "antd/es/checkbox"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { MyCkEditor } from "@/lib/ckeditor/CkEditor5"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { formatISOtoDate } from "@/utils"

export const TinBaiDetail = () => {
    const dispatch = useAppDispatch()
    const { data: tinBai } = useAppSelector(state => state.tinbai)
    const tinBaiContext = useTinBaiContext()
    const { datas: trangThais } = useAppSelector(state => state.trangthai)
    const { data: kenhTin, datas: kenhTins } = useAppSelector(state => state.kenhtin)
    const [form] = Form.useForm<ITinBai>()
    const editorRef = useRef<ClassicEditor | null>(null)
    const fileDinhKem = Form.useWatch("fileDinhKem", form)
    const anhDaiDien = Form.useWatch("anhDaiDien", form)
    const kenhTinUseWatch = Form.useWatch("kenhTin", form)
    const trangThaiUseWatch = Form.useWatch("trangThai", form)

    const onFinish = async () => {
        const formData = form.getFieldsValue()
        const noiDung = editorRef.current?.getData() // giá trị nội dung mới ở đây
        console.log(formData);

        if (tinBaiContext?.maTinBai) {

            dispatch(UpdateTinBai(
                {
                    id: tinBaiContext.maTinBai,
                    data: {
                        ...formData, noiDung, kenhTin: formData.kenhTin as any == tinBai?.kenhTin.tenKenhTin ? tinBai?.kenhTin.id : formData.kenhTin as any,
                        trangThai: formData.trangThai as any == tinBai?.trangThai.tenTrangThai ? tinBai?.trangThai.id : formData.trangThai as any,
                        ngayBanHanh: formatISOtoDate(formData.ngayBanHanh as any) as any
                    },

                }))
        }
        else {
            dispatch(AddTinBai({ ...formData, noiDung: noiDung as any, ngayBanHanh: formatISOtoDate(formData.ngayBanHanh as any) as any }))
        }
        handleCancel()
    }

    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())
        tinBaiContext.setMaTinBaiModalVisible(false)
        tinBaiContext.setMaTinBai(undefined)
    };
    useEffect(() => {
        if (tinBaiContext.maTinBai) {
            dispatch(GetTinBai(tinBaiContext.maTinBai))
        }
    }, [tinBaiContext.maTinBai])
    useEffect(() => {
        if (!kenhTins?.length) {
            dispatch(SearchKenhTin({}))
        }
    }, [kenhTins])

    useEffect(() => {
        if (!trangThais?.length) {
            dispatch(SearchTrangThai({}))
        }
    }, [trangThais])

    useEffect(() => {
        if (tinBai) {
            const cloneTinBai: ITinBai = { ...tinBai, ngayBanHanh: tinBai.ngayBanHanh ? dayjs(tinBai.ngayBanHanh) : null, kenhTin: tinBai.kenhTin.tenKenhTin as any, trangThai: tinBai.trangThai.tenTrangThai as any }
            form.setFieldsValue(cloneTinBai)
        }
    }, [tinBai])

    const trangThaiOptions = useMemo((): SelectProps["options"] => {
        return trangThais?.map((item) => ({
            label: item.tenTrangThai,
            value: item.id
        }))
    }, [trangThais])

    const kenhTinOptions = useMemo((): SelectProps["options"] => {
        return kenhTins?.map((item) => ({
            label: item.tenKenhTin,
            value: item.id
        }))
    }, [kenhTins])
    const onChange = (e: CheckboxChangeEvent) => {
        // console.log(`checked = ${e.target.checked}`);
    };


    return (
        <AntdModal title={tinBaiContext.maTinBai ? "Cập nhật tin bài" : "Thêm mới tin bài"} visible={tinBaiContext.maTinBaiModalVisible} handlerCancel={handleCancel} footer={null} fullsizeScrollable>
            <Form name='tinBai' layout="vertical" onFinish={onFinish} form={form} requiredMark={tinBaiContext.maTinBai == null} initialValues={{ thuTu: 1 }}>
                <Row gutter={[8, 8]}>
                    <Col style={{ display: 'flex', flexDirection: 'row' }} span={24}>
                        <Col>
                            <Form.Item
                                label="Cho phép bình luận"
                                name="choPhepBinhLuan"
                                valuePropName="checked"
                            >
                                <Checkbox onChange={onChange}  ></Checkbox>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                label="Hiển thị lên trang chủ"
                                name="hienThiLenTrangChu"
                                valuePropName="checked"
                            >
                                <Checkbox onChange={onChange} ></Checkbox>
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Tin nổi bật"
                                name="tinNoiBat"
                                valuePropName="checked"
                            >
                                <Checkbox onChange={onChange} ></Checkbox>
                            </Form.Item>
                        </Col>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Tệp đính kèm "
                            name="fileDinhKem"
                        >
                            <RegularUpload
                                dinhKem={fileDinhKem}
                                fieldName={"fileDinhKem"}
                                folderName={"TinBai"}
                                form={form} />
                            {/* <AntdUpLoad formInstance={form} fieldName="fileDinhKem" folderName="TinBai" listType="text" showUploadList={true} /> */}
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tiêu đề"
                            name="tieuDe"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item
                            label="Nguồn tin"
                            name="nguonTin"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='ngayBanHanh'
                            label="Ngày ban hành"
                        >
                            <DatePicker
                                placeholder="Chọn ngày"
                                style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Tác giả"
                            name="tacgia"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Trạng thái"
                            name="trangThai"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                        >
                            <AntdSelect options={trangThaiOptions} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Kênh tin"
                            name="kenhTin"
                            rules={[{ required: true, message: 'Vui lòng chọn kênh tin' }]}
                        >
                            <AntdSelect options={kenhTinOptions} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Trích yếu"
                            name="trichYeu"
                        >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item
                            label="Nội dung"
                            name="noiDung"
                            valuePropName="data"

                        >
                            <MyCkEditor ref={editorRef}></MyCkEditor>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Ảnh đại diện"
                            name="anhDaiDien"
                        >
                            <RegularUpload
                                dinhKem={anhDaiDien}
                                fieldName={"anhDaiDien"}
                                folderName={"TinBai"}
                                form={form} />
                            {/* <AntdUpLoad formInstance={form} fieldName="anhDaiDien" folderName="TinBai" accept="image/png, image/jpge" listType="picture" /> */}
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ display: 'flex', justifyContent: 'center' }}>
                <Space>
                    <AntdButton type="primary" onClick={onFinish}>
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            </Form.Item>
        </AntdModal>
    )
}