import { ComponentProps } from "react"
import TiepNhanHoSoTrucTuyenModal from "../tiepNhanHoSoTrucTuyen/TiepNhanHoSoTrucTuyenModal"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { TiepNhanHoSoChungThuc } from "@/features/hoso/redux/action"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IResult } from "@/models"
import { DinhKemChungThuc } from "./DinhKemChungThuc"
import { Col } from "antd"
import { RenderTitle } from "@/components/common"



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
                <RenderTitle title={"Tài liệu chứng thực"}/>
                <DinhKemChungThuc form={form}/>
            </Col>
        </>}
        modalTitle="Tiếp nhận hồ sơ chứng thực"
        submitHandler={async (formData: any): Promise<IResult<any> | undefined> =>{
            try{
                return await dispatch(TiepNhanHoSoChungThuc(formData)).unwrap()
            }catch(error){
                console.error(error)
            }
        }}
        />
    </>
}

export default TiepNhanHoSoChungThucModal