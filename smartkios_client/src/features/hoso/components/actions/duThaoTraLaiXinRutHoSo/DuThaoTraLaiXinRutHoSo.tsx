import { DUTHAOXULYHOSO_LOAI, IDuThaoXuLyHoSo } from "@/features/duthaoxulyhoso/models"
import { CreateDuThaoXuLyHoSo, duThaoXuLyHoSoApi } from "@/features/duthaoxulyhoso/services"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { IUser, SearchNhomLanhDaoResponse } from "@/features/user/models"
import { userService } from "@/features/user/services"
import { AntdModal, AntdSelect } from "@/lib/antd/components"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, Row } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { useEffect, useMemo, useState } from "react"
type CreateDuThaoXuLyHoSoData = CreateDuThaoXuLyHoSo
const DuThaoTraLaiXinRutHoSo = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<CreateDuThaoXuLyHoSoData>()
    const [users, setUsers] = useState<DefaultOptionType[]>()
    const buttonActionContext = useButtonActionContext()
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const dinhKem = Form.useWatch("fileDinhKem", form)
    const {data: user} = useAppSelector(state => state.user)
    useEffect(() => {
        (async () => {
            if(user?.officeCode && user?.groupCode){
                const res = await userService.SearchNhomLanhDao({officeCode: user.officeCode, groupCode: user.groupCode})
                setUsers(res.data.data.map(x => ({
                    label:`${x.fullName} - ${x.name} ${x.groupName ? `(Phòng: ${x.groupName})` : ''} ${x.officeName ? `(Đơn vị: ${x.officeName})` : ''} `,
                    value:x.id
                })));
            }
        })()
    }, [])
    const handlerCancel = () => {
        buttonActionContext.setDuThaoTraLaiXinRutHoSoModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    
    const maHoSo = useMemo(() => {
        if(hoSos?.length && buttonActionContext.selectedHoSos.length){
            return hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])?.maHoSo
        }
    }, [hoSos, buttonActionContext.selectedHoSos])

    const onOk = async() => {
        const formData = await form.validateFields()
        // if(buttonActionContext.selectedHoSos.length){
        //     const res = await duThaoXuLyHoSoApi.Create({id: buttonActionContext.selectedHoSos[0] as string, data: {...formData, loai: DUTHAOXULYHOSO_LOAI["Trả lại/Xin rút"]}})
        //     if(res.data.succeeded){
        //         setSearchHoSoParams((curr) => ({...curr}))
        //         handlerCancel();
        //     }
        // }
    }
    return (
        <AntdModal visible={true} width={1280} title="DỰ THẢO TRẢ LẠI/XIN RÚT HỒ SƠ" handlerCancel={handlerCancel} onOk={onOk}>
            <Form layout="vertical" form={form}>
                <Row gutter={8}>
                    <Col span={24}>
                        <Form.Item<CreateDuThaoXuLyHoSoData> name="trichYeu" label="Trích yếu">
                            <Input.TextArea rows={4} maxLength={1000} showCount/>
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item<CreateDuThaoXuLyHoSoData> name="nguoiXuLy" label="Lãnh đạo xử lý" rules={[{message:"Vui lòng chọn lãnh đạo xử lý", required:true}]}>
                            <AntdSelect allowClear showSearch options={users}/>
                        </Form.Item>
                    </Col>
                    {maHoSo ? <Col span={24} md={12}>
                        <Form.Item<CreateDuThaoXuLyHoSoData> name="fileDinhKem" label="Tệp đính kèm" rules={[{message:"Vui lòng chọn tệp đính kèm", required:true}]}>
                            <RegularUpload fieldName="fileDinhKem" folderName={maHoSo} form={form} dinhKem={dinhKem} />
                        </Form.Item>
                    </Col>: null}
                </Row>
            </Form>
        </AntdModal>
    )
}
export default DuThaoTraLaiXinRutHoSo
