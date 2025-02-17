import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, SelectProps, Space, Spin, Upload } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad, AntdUploadPublicFile } from "../../../lib/antd/components"
import { resetData } from "@/features/quanlymauphoi/redux/slice"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { SearchLinhVuc } from "@/features/linhvuc/redux/action"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { toast } from "react-toastify"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useDuThaoXuLyHoSoContext } from "../contexts/DuThaoXuLyHoSoContext"
import { DUTHAOXULYHOSO_LOAI, IDuThaoXuLyHoSo, ISearchDuThaoXuLyHoSo } from "../models"
import { GetDuThaoXuLyHoSo, UpdateDuThaoXuLyHoSo } from "../redux/action"
import { CreateDuThaoXuLyHoSo, duThaoXuLyHoSoApi } from "../services"
import { userRolesService } from "@/features/userroles/services"
import { DefaultOptionType } from "antd/es/select"
import { LoadingOutlined, StepBackwardFilled, StepForwardOutlined } from "@ant-design/icons"
import { FORMAT_DATE } from "@/data"
import dayjs from 'dayjs'
import { formatISOtoDate } from "@/utils"
import { IUser } from "@/features/user/models"

type CreateDuThaoXuLyHoSoData = CreateDuThaoXuLyHoSo
export const DuThaoXuLyHoSoDetail = ({ searchParams, setSearchParams, extraSearchParams }: {

    extraSearchParams: ISearchDuThaoXuLyHoSo,
    searchParams: ISearchDuThaoXuLyHoSo,
    setSearchParams: React.Dispatch<React.SetStateAction<ISearchDuThaoXuLyHoSo>>

}) => {
    const dispatch = useAppDispatch()
    const duThaoContext = useDuThaoXuLyHoSoContext()
    const [duThaoData, setDuThaoData] = useState<IDuThaoXuLyHoSo>()
    const [form] = Form.useForm<IDuThaoXuLyHoSo>()
    const dinhKem = Form.useWatch('fileDinhKem', form)
    const { publicModule: config } = useAppSelector(state => state.config)
    const { data: user } = useAppSelector(state => state.user)
    const [lanhDaos, setLanhDaos] = useState<DefaultOptionType[]>()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<IUser[]>()

    const onFinish = async () => {


    }
    const handleCancel = () => {
        form.resetFields();
        setDuThaoData(undefined)
        duThaoContext.setDuThaoId(undefined)
        duThaoContext.setDuThaoXuLyHoSoModalVisible(false)

    };
    useEffect(() => {
        (async () => {
            if (duThaoContext.duThaoId && !duThaoData) {
                setLoading(true)
                const res: any = await dispatch(GetDuThaoXuLyHoSo(duThaoContext.duThaoId))
                if (res.payload.data) {
                    setDuThaoData(res.payload.data)
                    searchLanhDao()
                } else {
                    toast.error("Lỗi: " + res.payload.message)
                }
                setLoading(false)
            }
        })()
    }, [duThaoContext.duThaoId])

    useEffect(() => {
        if (duThaoData) {
            form.setFieldsValue({
                ...duThaoData,
                nguoiXuLy: duThaoData.taiKhoanLanhDaoKy ? duThaoData.taiKhoanLanhDaoKy : '',
                ngayHenTraMoi: duThaoData.ngayHenTraMoi ? dayjs(duThaoData.ngayHenTraMoi) : undefined as any,

            })
        }
    }, [duThaoData])

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
                setUsers(resLanhDao.data.data as any)
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

    const updateDuThao = async (type: number = 1) => {
        if (duThaoContext?.duThaoId) {
            const formData = await form.validateFields()
            if (formData) {
                setLoading(true)
            }

            const res: any = await dispatch(UpdateDuThaoXuLyHoSo({
                id: duThaoContext.duThaoId,
                data: {
                    fileDinhKem: formData.fileDinhKem,
                    trichYeu: formData.trichYeu,
                    ngayHenTraMoi: formData.ngayHenTraMoi ? formatISOtoDate(formData.ngayHenTraMoi) : undefined,
                    tenLanhDaoKy: formData.nguoiXuLy && users ? users?.filter(x => x.userName == formData.nguoiXuLy)[0].fullName : '',
                    taiKhoanLanhDaoKy: formData.nguoiXuLy
                }
            }))
            if (type == 1) {
                if (res.payload.succeeded) {
                    setSearchParams({
                        ...searchParams,
                        ...extraSearchParams,
                        reFetch: true
                    })
                    toast.success("Cập nhật dự thảo thành công!")
                    handleCancel()
                }

                setLoading(false)
            }

        }
    }

    const duyetThongQuaHandler = () => {
        (async () => {
            if (duThaoContext.duThaoId) {
                setLoading(true)
                updateDuThao(2)

                const res = await duThaoXuLyHoSoApi.DuyetThongQua({
                    id: duThaoContext.duThaoId
                })
                if (res.status == 200) {
                    setSearchParams({
                        ...searchParams,
                        ...extraSearchParams,
                        reFetch: true
                    })
                    toast.success("Duyệt thông qua thành công!")
                    handleCancel()
                } else {
                    console.log(res.data.message)
                    toast.error(`Lỗi: ${res.data.message}`)
                }

                setLoading(false)
            } else {
                toast.error("Không có thông tin dự thảo!")
                return
            }
        })()
    }

    const tuChoiDuThaoHandler = () => {
        (async () => {
            if (duThaoContext.duThaoId) {
                setLoading(true)
                updateDuThao(2)
                const res = await duThaoXuLyHoSoApi.TuChoiDuThao({
                    id: duThaoContext.duThaoId
                })
                if (res.status == 200) {
                    setSearchParams({
                        ...searchParams,
                        ...extraSearchParams,
                        reFetch: true
                    })
                    toast.success("Đã từ chối dự thảo!")
                    handleCancel()
                } else {
                    console.log(res.data.message)
                    toast.error(`Lỗi: ${res.data.message}`)
                }

                setLoading(false)
            } else {
                toast.error("Không có thông tin dự thảo!")
                return
            }
        })()
    }


    return (
        <AntdModal title={`Cập nhật dự thảo: ${duThaoData?.maHoSo} (${duThaoData?.loai})`} visible={duThaoContext.duThaoXuLyHoSoModalVisible} handlerCancel={handleCancel} width={900}
            footer={[

                <Button
                    type="primary"
                    onClick={() => updateDuThao()}
                >
                    Cập nhật
                </Button>,
                <Button
                    style={{ backgroundColor: '#4472a3', color: '#fff' }}
                    // type="primary"
                    onClick={duyetThongQuaHandler}
                >
                    Duyệt thông qua
                </Button>,
                <Button
                    style={{ backgroundColor: '#cc3729', color: '#fff' }}
                    onClick={tuChoiDuThaoHandler}
                >
                    Từ chối
                </Button>,

                <Button key="back" onClick={handleCancel} >
                    Hủy
                </Button>
            ]}
        >
            <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            >
                <Form name='DuThaoXuLyHoSo' layout="vertical" onFinish={onFinish} form={form} requiredMark={duThaoContext.duThaoId !== null}
                    initialValues={{ uuTien: 1 }}>
                    <Row gutter={[8, 8]}>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Chủ hồ sơ"
                                name="chuHoSo"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Số giấy tờ chủ hồ sơ"
                                name="soGiayToChuHoSo"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Số điện thoại"
                                name="soDienThoaiChuHoSo"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Email"
                                name="emailChuHoSo"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Tên thủ tục"
                                name="tenTTHC"
                            >
                                <Input.TextArea disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Trích yếu dự thảo"
                                name="trichYeu"
                                rules={[{ message: "Vui lòng nhập trích yếu dự thảo", required: true }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                label="Người trình ký"
                                name="tenNguoiXuLy"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item<CreateDuThaoXuLyHoSoData>
                                name="nguoiXuLy" label="Lãnh đạo ký duyệt"
                                rules={[{ message: "Vui lòng chọn lãnh đạo xử lý", required: true }]}
                            >
                                <AntdSelect showSearch options={lanhDaos} />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12} hidden={duThaoData?.loai == DUTHAOXULYHOSO_LOAI["Xin lỗi"] ? false : true}>
                            <Form.Item name="ngayHenTraMoi" label="Ngày hẹn trả mới"
                                rules={[{
                                    message: "Vui lòng chọn ngày hẹn trả mới",
                                    required: duThaoData?.loai == DUTHAOXULYHOSO_LOAI["Xin lỗi"] ? true : false
                                }]}
                            >
                                <DatePicker format={FORMAT_DATE} showTime />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                            <Form.Item<CreateDuThaoXuLyHoSoData> name="fileDinhKem" label="Tệp đính kèm" rules={[{ message: "Vui lòng chọn tệp đính kèm", required: true }]}>
                                <RegularUpload
                                    kySoToken
                                    // useSoHoa
                                    dinhKem={dinhKem}
                                    fieldName={"fileDinhKem"}
                                    folderName={duThaoData?.maHoSo || 'DuThao'}
                                    // scanPC={true}
                                    form={form} />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Spin>
        </AntdModal>
    )
}