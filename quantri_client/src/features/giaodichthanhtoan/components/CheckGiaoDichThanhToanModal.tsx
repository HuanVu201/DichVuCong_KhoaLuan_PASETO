import { Col, Form, Input, InputNumber, Row, SelectProps, Space, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IGiaoDichThanhToan, ISearchGiaoDichThanhToan } from "../models"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { AddGiaoDichThanhToan, CheckConfirmGiaoDichThanhToan, GetGiaoDichThanhToan, SearchGiaoDichThanhToan, UpdateGiaoDichThanhToan } from "../redux/action"
import { useGiaoDichThanhToanContext } from "../contexts/GiaoDichThanhToanContext"
import { resetData } from "@/features/linhvuc/redux/slice"
import { toast } from "react-toastify"

export const CheckGiaoDichThanhToanModal = ({ searchParams }: { searchParams: ISearchGiaoDichThanhToan }) => {
    const dispatch = useAppDispatch()

    const giaoDichThanhToanContext = useGiaoDichThanhToanContext()
    const [form] = Form.useForm<IGiaoDichThanhToan>()
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const handleCancel = () => {
        form.resetFields();
        giaoDichThanhToanContext.setCheckGiaoDichThanhToanModalVisible(false)
        giaoDichThanhToanContext.setGiaoDichThanhToanId([])
    };
    useEffect(() => {
        if (giaoDichThanhToanContext.giaoDichThanhToanId && giaoDichThanhToanContext.giaoDichThanhToanId.length > 0) {
            dispatch(GetGiaoDichThanhToan(giaoDichThanhToanContext.giaoDichThanhToanId[0].toString()))
        }
    }, [giaoDichThanhToanContext.giaoDichThanhToanId])
    useEffect(() => {
        console.log(giaoDichThanhToanContext.checkGiaoDichThanhToanModalVisible);

    }, [giaoDichThanhToanContext.checkGiaoDichThanhToanModalVisible])
    const onFinish = async () => {
        if (giaoDichThanhToanContext?.giaoDichThanhToanId) {
            setIsSubmiting(true);
            var res = await dispatch(CheckConfirmGiaoDichThanhToan(giaoDichThanhToanContext?.giaoDichThanhToanId[0].toString())).unwrap();
            if (res.succeeded && res.data) {
                var result = res.data as any;
                if (result.maLoi == "00")
                    if (result.trangThaiGD == "1") {
                        toast.success("Xác nhận thanh toán thành công");
                        await dispatch(SearchGiaoDichThanhToan(searchParams))
                    }

                if (result.trangThaiGD == "3")
                    toast.warning("Payment Platform chưa biết trạng thái cuối của GD");
                if (result.trangThaiGD == "4") {
                    toast.error("Thanh toán thất bại")
                    await dispatch(SearchGiaoDichThanhToan(searchParams))
                }
            }
            setIsSubmiting(false);
            handleCancel()
        }
    }
    return (
        <AntdModal title="Xác nhận kiểm tra trạng thái thanh toán trực tuyến?" visible={giaoDichThanhToanContext.checkGiaoDichThanhToanModalVisible} handlerCancel={handleCancel} footer={null} >
            <Form name='GiaoDichThanhToan' layout="vertical" onFinish={onFinish} form={form} requiredMark={giaoDichThanhToanContext.giaoDichThanhToanId !== null}
                disabled={false}
            >

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space >
                        <AntdButton type="primary" onClick={onFinish} loading={isSubmiting} disabled={isSubmiting}>
                            Xác nhận
                        </AntdButton>
                        <AntdButton type="default" onClick={handleCancel}>
                            Đóng
                        </AntdButton>
                    </Space>
                </Form.Item>
            </Form>
        </AntdModal>
    )
}
