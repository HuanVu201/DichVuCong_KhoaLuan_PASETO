import { FORMAT_DATE } from "@/data"
import { DUTHAOXULYHOSO_LOAI, IDuThaoXuLyHoSo } from "@/features/duthaoxulyhoso/models"
import { CreateDuThaoXuLyHoSo, duThaoXuLyHoSoApi } from "@/features/duthaoxulyhoso/services"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { IUser, SearchNhomLanhDaoResponse } from "@/features/user/models"
import { userService } from "@/features/user/services"
import { userRolesService } from "@/features/userroles/services"
import { AntdModal, AntdSelect } from "@/lib/antd/components"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppSelector } from "@/lib/redux/Hooks"
import { formatISOtoDate } from "@/utils"
import { LoadingOutlined } from "@ant-design/icons"
import { Col, DatePicker, Form, Input, Row, Spin } from "antd"
import { DefaultOptionType, SelectProps } from "antd/es/select"
import { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
type CreateDuThaoXuLyHoSoData = CreateDuThaoXuLyHoSo
const DuThaoXinLoi = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const [form] = Form.useForm<CreateDuThaoXuLyHoSoData>()
    const [users, setUsers] = useState<DefaultOptionType[]>()
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos } = useAppSelector(state => state.hoso)
    const dinhKem = Form.useWatch("fileDinhKem", form)
    const { data: user } = useAppSelector(state => state.user)
    const [btnLoading, setBtnLoading] = useState(false)
    const [lanhDaoThongQuas, setLanhDaoThongQuas] = useState<DefaultOptionType[]>()
    const [lanhDaos, setLanhDaos] = useState<DefaultOptionType[]>()
    const [loading, setLoading] = useState(false)


    // useEffect(() => {
    //     (async () => {
    //         if(user?.officeCode && user?.groupCode){
    //             const res = await userService.SearchNhomLanhDao({officeCode: user.officeCode, groupCode: user.groupCode})
    //             setUsers(res.data.data.map(x => {
    //                 const title = `${x.fullName} - ${x.name} ${x.groupName ? `(Phòng: ${x.groupName})` : ''} ${x.officeName ? `(Đơn vị: ${x.officeName})` : ''} `
    //                 return {
    //                     label:title,
    //                     value:x.userName,
    //                     title,
    //                     fullName: x.fullName
    //                 }
    //             }));
    //         }
    //     })()
    // }, [])
    const handlerCancel = () => {
        buttonActionContext.setDuThaoXinLoiHoSoModalVisible(false)
        // buttonActionContext.setSelectedHoSos([])
    }

    const hoSo = useMemo(() => {
        if (hoSos?.length && buttonActionContext.selectedHoSos.length) {
            return hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
        }
    }, [hoSos, buttonActionContext.selectedHoSos])

    const onOk = async () => {
        try {
            setBtnLoading(true)
            const formData = await form.validateFields()
            if (buttonActionContext.selectedHoSos.length && user?.maDinhDanh) {
                const res = await duThaoXuLyHoSoApi.Create({ ...formData, loai: DUTHAOXULYHOSO_LOAI["Xin lỗi"], id: buttonActionContext.selectedHoSos[0] as string, maDinhDanhOfficeCode: user?.maDinhDanh, ngayHenTraMoi: formatISOtoDate(formData.ngayHenTraMoi) })
                // const res = await duThaoXuLyHoSoApi.Create({id: buttonActionContext.selectedHoSos[0] as string, data: {...formData, loai: DUTHAOXULYHOSO_LOAI["Trả lại/Xin rút"]}})
                if (res.data.succeeded) {
                    setSearchHoSoParams((curr) => ({ ...curr }))
                    handlerCancel();
                    buttonActionContext.setSelectedHoSos([])
                    toast.success("Dự thảo thành công")
                }
            } else {
                console.error("user không có mã định danh office code")
            }
            setBtnLoading(false)
        } catch (error) {
            console.log(error);
            setBtnLoading(false)
        } finally {
            setBtnLoading(false)
        }
    }

    const searchLanhDaoThongQua = async () => {
        if (user?.officeCode && user?.groupCode) {
            setLoading(true)
            const resLanhDaoThongQua = await userRolesService.SearchUserWithRoles({
                roleNames: ["Lãnh đạo phòng"],
                officeCode: user.officeCode,
                groupCode: user.groupCode,
                // isActive: true,
                pageNumber: 1,
                pageSize: 1000
            })

            if (resLanhDaoThongQua.data.data) {
                setLanhDaoThongQuas(resLanhDaoThongQua.data.data.map(x => {
                    const title = `${x.fullName} - ${x.name}`
                    return {
                        label: title,
                        value: x.id,
                        title,
                        fullName: x.fullName
                    }
                }));
            } else
                toast("Lỗi lấy thông tin người dùng!")
            setLoading(false)
        }

    }

    const searchLanhDao = async () => {
        if (user?.officeCode && user?.groupCode) {
            setLoading(true)
            const resLanhDao = await userRolesService.SearchUserWithRoles({
                roleNames: ["Lãnh đạo phòng", "Lãnh đạo đơn vị"],
                officeCode: user.officeCode,
                groupCode: user.groupCode,
                // isActive: true,
                pageNumber: 1,
                pageSize: 1000
            })


            if (resLanhDao.data.data) {
                setLanhDaos(resLanhDao.data.data.map(x => {
                    const title = `${x.fullName} - ${x.name}`
                    return {
                        label: title,
                        value: x.userName,
                        title,
                        fullName: x.fullName
                    }
                }));
            } else
                toast("Lỗi lấy thông tin người dùng!")
            setLoading(false)
        }
    }

    const onChange: SelectProps<any>["onChange"] = (value, option) => {
        if ("fullName" in option) {
            form.setFieldValue("tenNguoiXuLy", option.fullName)
        }
    }
    return (
        <AntdModal confirmLoading={btnLoading} visible={true} width={1280} title={"DỰ THẢO XIN LỖI CHỦ HỒ SƠ:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} handlerCancel={handlerCancel} onOk={onOk}>
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item<CreateDuThaoXuLyHoSo> name="tenNguoiXuLy" hidden>
                        <Input />
                    </Form.Item>
                    <Row gutter={8}>
                        <Col span={24}>
                            <Form.Item<CreateDuThaoXuLyHoSoData> name="trichYeu" label="Trích yếu">
                                <Input.TextArea rows={4} maxLength={1000} showCount />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item<CreateDuThaoXuLyHoSoData>
                                name="lanhDaoThongQua" label="Lãnh đạo thông qua"
                            >
                                <AntdSelect allowClear showSearch options={lanhDaoThongQuas}
                                    onClick={() => {
                                        if (lanhDaoThongQuas?.length == 0 || lanhDaoThongQuas?.length == undefined) {
                                            searchLanhDaoThongQua()
                                        }
                                    }} />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item<CreateDuThaoXuLyHoSoData>
                                name="nguoiXuLy" label="Lãnh đạo ký duyệt"
                                rules={[{ message: "Vui lòng chọn lãnh đạo xử lý", required: true }]}
                            >
                                <AntdSelect allowClear showSearch options={lanhDaos} onChange={onChange}
                                    onClick={() => {
                                        if (lanhDaos?.length == 0 || lanhDaos?.length == undefined) {
                                            searchLanhDao()
                                        }
                                    }} />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} >
                            <Form.Item name="ngayHenTraMoi" label="Ngày hẹn trả mới" rules={[{ message: "Vui lòng chọn ngày hẹn trả mới", required: true }]}>
                                <DatePicker format={FORMAT_DATE} showTime />
                            </Form.Item>
                        </Col>
                        {hoSo?.maHoSo ? <Col span={24} md={12}>
                            <Form.Item<CreateDuThaoXuLyHoSoData> name="fileDinhKem" label="Tệp đính kèm" rules={[{ message: "Vui lòng chọn tệp đính kèm", required: true }]}>
                                <RegularUpload fieldName="fileDinhKem" folderName={hoSo.maHoSo} form={form} dinhKem={dinhKem} kySoToken/>
                            </Form.Item>
                        </Col> : null}
                    </Row>
                </Form>
            </Spin>
        </AntdModal>
    )
}
export default DuThaoXinLoi
