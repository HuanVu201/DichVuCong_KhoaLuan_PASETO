import { IHoSo } from "@/features/hoso/models";
import { Col, Form, FormInstance, Input, Row, Switch, Typography } from "antd";
import { useEffect } from "react";

import { AntdDivider } from "@/lib/antd/components";
import { INPUT_RULES } from "../data/formRules";

export const UyQuyen = ({form}: {form: FormInstance<IHoSo>}) => {
    const uyQuyenHoSo = Form.useWatch("uyQuyen", form)
    useEffect(() => {
        if (!uyQuyenHoSo) {
            form.setFieldValue("nguoiUyQuyen", undefined)
            form.setFieldValue("soGiayToNguoiUyQuyen", undefined)
            form.setFieldValue("soDienThoaiNguoiUyQuyen", undefined)
        }
    }, [uyQuyenHoSo])
    return <>
    {uyQuyenHoSo ? <Row gutter={[8, 0]}>
        <Col md={8} span={24}>
            <Form.Item name="nguoiUyQuyen" label="Họ và tên"
                rules={uyQuyenHoSo ? INPUT_RULES.chuHoSo : []}
                hasFeedback={uyQuyenHoSo}
                required={uyQuyenHoSo}>
                <Input placeholder="Nhập họ và tên" />
            </Form.Item>
        </Col>
        <Col md={8} span={24}>
            <Form.Item name="soGiayToNguoiUyQuyen" label="Số căn cước công dân"
                rules={uyQuyenHoSo ? INPUT_RULES.soGiayToChuHoSo : []}
                hasFeedback={uyQuyenHoSo}
                required={uyQuyenHoSo}>
                <Input placeholder="Nhập số căn cước công dân" />
            </Form.Item>
        </Col>
        <Col md={8} span={24}>
            <Form.Item name="soDienThoaiNguoiUyQuyen" label="Số điện thoại"
                rules={uyQuyenHoSo ? INPUT_RULES.soDienThoaiChuHoSo : []}
                hasFeedback={uyQuyenHoSo}
                required={uyQuyenHoSo}>
                <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
        </Col>
    </Row> : null}
    <AntdDivider />
</>
}