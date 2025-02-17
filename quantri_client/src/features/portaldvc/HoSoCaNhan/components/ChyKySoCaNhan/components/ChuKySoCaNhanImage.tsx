import { Checkbox, Col, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "@/lib/antd/components"

import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { LoadingOutlined } from "@ant-design/icons"
import { useChuKySoCaNhanContext } from "../context"
import { IChuKySoCaNhan } from "../model"
import { ChuKySoCaNhanApi } from "../service"
import { fileApi } from "@/features/file/services"

export const ChuKySoCaNhanImage = () => {
    const dispatch = useAppDispatch()
    const chuKySoCaNhanContext = useChuKySoCaNhanContext()
    const [form] = Form.useForm<IChuKySoCaNhan>()
    const dinhKem = Form.useWatch("hinhAnh", form)
    const { publicModule: config } = useAppSelector(state => state.config)
    const { data: user } = useAppSelector(state => state.user)
    const [dataChuKy, setDataChuKy] = useState<IChuKySoCaNhan>()
    const [loading, setLoading] = useState<boolean>(false)
    const [chuKyBlob, setChuKyBlob] = useState<Blob>()


    const handleCancel = () => {
        form.resetFields();
        chuKySoCaNhanContext.setChuKySoCaNhanDetailModalVisible(false)
        chuKySoCaNhanContext.setChuKySoCaNhanItem(undefined)
    };

    useEffect(() => {
        if (chuKySoCaNhanContext.chuKySoCaNhanItem?.hinhAnh && chuKySoCaNhanContext.chuKySoCaNhanDetailModalVisible) {
            const valueGetDocx = fileApi.GetFileByte({ path: chuKySoCaNhanContext.chuKySoCaNhanItem?.hinhAnh || '' })
            valueGetDocx.then(function (result) {
                console.log(result.data)
                setChuKyBlob(result.data)
            }).catch(function (error) {
                toast.error("Có lỗi khi đọc chữ ký!")
                console.log(error);
            });
        }

    }, [chuKySoCaNhanContext.chuKySoCaNhanItem])



    return (
        <AntdModal title={"Thông tin hình ảnh"}
            visible={chuKySoCaNhanContext.chuKySoCaNhanDetailModalVisible} handlerCancel={handleCancel} width={780}
            footer={[
                <Space >
                    <AntdButton type="default" onClick={handleCancel}>
                        Đóng
                    </AntdButton>
                </Space>
            ]}
        >
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form name='chuKySoCaNhan' layout="vertical" form={form}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>

                        <Col span={24}>
                            <Form.Item
                                label=""
                                name="hinhAnh"
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center', alignItems: 'center', minHeight: '100px'
                                }}>
                                    {chuKyBlob ?
                                        <img
                                            src={URL.createObjectURL(chuKyBlob as any || "")} alt="Chữ ký số"
                                            style={{ margin: 'auto', width: '100%', objectFit: 'contain' }}
                                        />
                                        :
                                        <div style={{ border: '1px solid #333', borderRadius: '8px' }}>
                                            <center><b>(Không có)</b></center>
                                        </div>
                                    }
                                </div>
                            </Form.Item>
                        </Col>

                    </Row>

                </Form>
            </Spin>
        </AntdModal>
    )
}