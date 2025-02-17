import {
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    SelectProps,
    Space,
    Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { IThuTuc } from "../../thutuc/models";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    AntdButton,
    AntdModal,
    AntdSelect,
    AntdUpLoad,
} from "../../../lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import { AddThuTuc, GetThuTuc, UpdateThuTuc } from "../../thutuc/redux/action";
import { useThuTucContext } from "../../thutuc/contexts/ThuTucContext";
import dayjs from "dayjs";
import ReactJson from "react-json-view";



const mucDoOptions: SelectProps["options"] = [
    { label: "Dịch vụ công", value: "2" },
    {
        label: "Dịch vụ công trực tuyến một phần",
        value: "3",
    },
    {
        label: "Dịch vụ công trực tuyến toàn trình",
        value: "4",
    },
];

const trangThaiPhiLePhiOptions: SelectProps["options"] = [
    { label: "Có", value: true as any },
    { label: "Không", value: false },
];

export const NguoiTiepNhanThuTucDetail = () => {
    const dispatch = useAppDispatch();
    const { data: ThuTuc, datas: ThuTucs } = useAppSelector(
        (state) => state.thutuc
    );
    const { datas: NguoiTiepNhanThuTucs, count } = useAppSelector(state => state.nguoitiepnhanthutuc)

    const NguoiTiepNhan = NguoiTiepNhanThuTucs?.find(x => x.id as any == ThuTuc?.id)



    const ThuTucContext = useThuTucContext();
    const [selectedDate, setSelectedDate] = useState(null);

    const [form] = Form.useForm<IThuTuc>();
    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };
 
    const handleCancel = () => {
        form.resetFields();
        // dispatch(resetData)
        ThuTucContext.setThuTucModalVisible(false);
        ThuTucContext.setThuTucId(undefined);
    };
    useEffect(() => {
        if (ThuTucContext.thuTucId) {
            dispatch(GetThuTuc(ThuTucContext.thuTucId));
        }
    }, [ThuTucContext.thuTucId]);

    useEffect(() => {
        if (ThuTuc) {
            form.setFieldsValue({
                ...ThuTuc,
                ngayCapNhat: ThuTuc.ngayCapNhat ? dayjs(ThuTuc.ngayCapNhat) : null,
            } as any);
        }
    }, [ThuTuc]);

    return (
        <AntdModal
            title="Chi tiết thủ tục"
            visible={ThuTucContext.thuTucModalVisible}
            handlerCancel={handleCancel}
            footer={null}
            fullsizeScrollable
        >
            <Form
                name="ThuTuc"
                layout="vertical"
                form={form}
                requiredMark={ThuTucContext.thuTucId !== null}
                initialValues={{
                    soLuongThuTuc: 0,
                    soLuongThuTucCapTinh: 0,
                    soLuongThuTucCapHuyen: 0,
                    soLuongThuTucCapXa: 0,
                }}
            >
                <Row gutter={[8, 0]}>

                    <Col md={12} span={24}>
                        <Form.Item label="Trạng thái phí,lệ phí" name="trangThaiPhiLePhi">
                            <AntdSelect options={trangThaiPhiLePhiOptions} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Cán bộ Tiếp nhận" >
                            <Input value={NguoiTiepNhan?.nguoiTiepNhan} disabled={true} />
                        </Form.Item>
                    </Col>

                    <Col md={12} span={24}>
                        <Form.Item label="Ngày cập nhật" name="ngayCapNhat">
                            <DatePicker
                                disabled={true}
                                value={selectedDate}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                            ></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Mức độ" name="mucDo">
                            <Form.Item
                                name="mucDo"
                            // rules={[{ required: true, message: "Vui lòng chọn mức độ" }]}
                            >
                                <AntdSelect disabled={true} options={mucDoOptions}></AntdSelect>
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Hồ sơ phát sinh trong năm"
                            name="hoSoPhatSinhTrongNam"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="IDQG" name="idqg">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Lĩnh vực chính" name="linhVucChinh">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Mã lĩnh vực chính" name="maLinhVucChinh">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item
                            label="Cơ quan thực hiện chính"
                            name="coQuanThucHienChinh"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Mã kết quả chính" name="maKetQuaChinh">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Tên kết quả chính" name="tenKetQuaChinh">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Trạng thái" name="trangThai">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Tên thủ tục" name="tenTTHC">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Loại thủ tục" name="loaiTTHC">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Thời gian giải quyết" name="thoiGianGiaiQuyet">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col md={12} span={24}>
                        <Form.Item label="Liên thông" name="lienThong">
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Quyết định công bố" name="quyetDinhCongBo">
                            <Input.TextArea disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>


            </Form>
        </AntdModal>
    );
};
