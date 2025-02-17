import {ComponentProps} from 'react'
import ThemMoiTiepNhanHoSoModal from '../themMoiHoSo/ThemMoiTiepNhanHoSoModal'
import { Checkbox, Col, Form } from 'antd'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { ThemHoSoChungThucTrucTiep } from '@/features/hoso/redux/action'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { IResult } from '@/models'
import { RenderTitle } from '@/components/common'
import { ThanhPhanChungThucHoSo } from './ThanhPhanHoSo'
import { PhiLePhi } from '../../PhiLePhi'
import { LOAIPHILEPHI_CHUNGTHUC_OPTIONS } from '@/features/hoso/data/formData'
import { IPhiLePhi } from '@/features/philephi/models'
import { PhiLePhiChungThuc } from './PhiLePhiChungThuc'
import { SearchDanhMucGiayToChungThuc } from '@/features/danhmucgiaytochungthuc/redux/action'

const ThemMoiHoSoChungThuc = (props: Omit<ComponentProps<typeof ThemMoiTiepNhanHoSoModal>, "hoSoChungThucElement">) => {
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setThemMoiHoSoChungThucModalVisible(false)
    }
    return <>
        <ThemMoiTiepNhanHoSoModal 
            {...props} 
            modalTitle="THÊM MỚI HỒ SƠ CHỨNG THỰC"
            tepDinhKemElement={(form, duLieuThemHoSo) => <>
                <Col span={24}>
                    <ThanhPhanChungThucHoSo form={form}/>
                    <Form.Item valuePropName='checked' hidden name="laHoSoChungThuc"><Checkbox defaultChecked/></Form.Item>
                </Col>
            </>}
            defaultSelectedPhiLePhi = "Thu sau"
            phiLePhiOptions={LOAIPHILEPHI_CHUNGTHUC_OPTIONS}
            // phiLePhiElement={(form, duLieuThemHoSo) => <PhiLePhiChungThuc form={form} phiLePhis={duLieuThemHoSo?.phiLePhis}/>}
            submitHandler={async (formData: any): Promise<IResult<any> | undefined> => {
                try {
                    return await dispatch(ThemHoSoChungThucTrucTiep({...formData, laHoSoChungThuc: true})).unwrap()
                } catch (error) {
                    console.error(error)                                        
                }
            }}
            extraSearchThuTuc= {{laThuTucChungThuc: true}}
            remove={true}
            handlerCloseModal={handlerCancel}
            validateFilesOnSubmit={(thanhPhanHoSos) => {
                if(thanhPhanHoSos){
                    return thanhPhanHoSos.every(x => x.dinhKem)
                }
                return true
            }}
        />
    </>

}

export default ThemMoiHoSoChungThuc;