import { ComponentProps } from "react"
import TiepNhanHoSoTrucTuyenModal from "../tiepNhanHoSoTrucTuyen/TiepNhanHoSoTrucTuyenModal"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { TiepNhanHoSoChungThuc, TiepNhanNhieuHoSoChungThuc } from "@/features/hoso/redux/action"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IResult } from "@/models"
import { Col, Input,Form } from "antd"
import { RenderTitle } from "@/components/common"
import { ThanhPhanChungThucHoSo } from "./ThanhPhanHoSo"
import { toast } from "react-toastify"
import { TiepNhanNhieuHoSoChungThucParams } from "@/features/hoso/services"
import { allItemHasFile } from "../themMoiHoSoChungThuc/utils/validate"
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models"



const TiepNhanHoSoChungThucModal = (props: Pick<ComponentProps<typeof TiepNhanHoSoTrucTuyenModal>, "setSearchHoSoParams">) => {
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()
    const handleCloseModal = () => {
        buttonActionContext.setTiepNhanHoSoChungThucModalVisible(false)
    }
    

    return <>
        <TiepNhanHoSoTrucTuyenModal 
        {...props} 
        handleCloseModal={handleCloseModal}
        tiepNhanHoSoChungThucElement={(form) => <>
            <Col span={24}>
                <Form.Item name="thanhPhanHoSos" hidden><Input/></Form.Item>
                <ThanhPhanChungThucHoSo form={form}/>
            </Col>
        </>}
        remove={true}
        submitHandler={async (formData: TiepNhanNhieuHoSoChungThucParams): Promise<IResult<any> | undefined> =>{
            try{
                if("thanhPhanHoSos" in formData){
                    if(!allItemHasFile(formData.thanhPhanHoSos as IThanhPhanHoSo[], "dinhKem")){
                        toast.warn("Vui lòng đính kèm tệp vào từng thành phần hồ sơ")
                        return
                    }
                }
                const res = await dispatch(TiepNhanNhieuHoSoChungThuc(formData)).unwrap()
                return res;
            }catch(error){
                console.error(error)
            }
        }}
        />
    </>
}

export default TiepNhanHoSoChungThucModal