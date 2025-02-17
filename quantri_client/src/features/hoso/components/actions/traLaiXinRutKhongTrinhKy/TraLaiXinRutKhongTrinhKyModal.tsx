import { TraLaiXinRutKhongKyDuyetParams, duThaoXuLyHoSoApi } from "@/features/duthaoxulyhoso/services"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { AntdModal } from "@/lib/antd/components"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, Row } from "antd"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
type TraLaiXinRutKhongKyDuyetData = TraLaiXinRutKhongKyDuyetParams["data"]
const TraLaiXinRutKhongTrinhKyHoSo = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<TraLaiXinRutKhongKyDuyetData>()
    // const [users, setUsers] = useState<DefaultOptionType[]>()
    const buttonActionContext = useButtonActionContext()
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const dinhKem = Form.useWatch("fileDinhKem", form)
    const [btnLoading, setBtnLoading] = useState(false)
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
        buttonActionContext.setTraLaiXinRutKhongTrinhKyHoSoModalVisible(false)
        // buttonActionContext.setSelectedHoSos([])
    }
    
    const hoSo = useMemo(() => {
        if(hoSos?.length && buttonActionContext.selectedHoSos.length){
            return hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
        }
    }, [hoSos, buttonActionContext.selectedHoSos])

    const onOk = async() => {
        try {
            setBtnLoading(true)
            const formData = await form.validateFields()
            if(buttonActionContext.selectedHoSos.length){
                const res = await duThaoXuLyHoSoApi.TraLaiXinRutKhongKyDuyet({ id: buttonActionContext.selectedHoSos[0] as string, data: {...formData}})
                // const res = await duThaoXuLyHoSoApi.Create({id: buttonActionContext.selectedHoSos[0] as string, data: {...formData, loai: DUTHAOXULYHOSO_LOAI["Trả lại/Xin rút"]}})
                if(res.data.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    handlerCancel();
                    buttonActionContext.setSelectedHoSos([])
                    toast.success(res.data.data ?? "Thao tác thành công")
                }
            } else {
                console.error("user không có mã định danh office code")
            }
            setBtnLoading(false)
        } catch (error) {
            setBtnLoading(false)
            console.log(error);
        } finally {
            setBtnLoading(false)
        }
    }
    // const onChange : SelectProps<any>["onChange"] = (value, option) => {
    //     if("fullName" in option){
    //         form.setFieldValue("tenNguoiXuLy", option.fullName)
    //     }
    // }
    return (
        <AntdModal visible={true} confirmLoading={btnLoading} width={1280} title={"Xin rút/trả lại hồ sơ:" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} handlerCancel={handlerCancel} onOk={onOk}>
            <Form layout="vertical" form={form}>
                {/* <Form.Item<CreateDuThaoXuLyHoSo> name="tenNguoiXuLy" hidden>
                    <Input />
                </Form.Item> */}
                <Row gutter={8}>
                    <Col span={24}>
                        <Form.Item<TraLaiXinRutKhongKyDuyetData> name="trichYeu" label="Trích yếu">
                            <Input.TextArea rows={4} maxLength={1000} showCount/>
                        </Form.Item>
                    </Col>
                    {/* <Col span={24} md={12}>
                        <Form.Item<CreateDuThaoXuLyHoSoData> name="nguoiXuLy" label="Lãnh đạo xử lý" rules={[{message:"Vui lòng chọn lãnh đạo xử lý", required:true}]}>
                            <AntdSelect allowClear showSearch options={users} onChange={onChange}/>
                        </Form.Item>
                    </Col> */}
                    {hoSo?.maHoSo ? <Col span={24} md={12}>
                        <Form.Item<TraLaiXinRutKhongKyDuyetData> name="fileDinhKem" label="Tệp đính kèm" rules={[{message:"Vui lòng chọn tệp đính kèm", required:true}]}>
                            <RegularUpload fieldName="fileDinhKem" folderName={hoSo.maHoSo} form={form} dinhKem={dinhKem} />
                        </Form.Item>
                    </Col>: null}
                </Row>
            </Form>
        </AntdModal>
    )
}
export default TraLaiXinRutKhongTrinhKyHoSo
