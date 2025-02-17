import {ComponentProps} from 'react'
import ThemMoiTiepNhanHoSoModal from '../themMoiHoSo/ThemMoiTiepNhanHoSoModal'
import { Checkbox, Col, Form } from 'antd'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { ThemHoSoChungThucTrucTiep } from '@/features/hoso/redux/action'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { IResult } from '@/models'
import { RenderTitle } from '@/components/common'
import { KetQuaThuTucChungThuc, ThanhPhanChungThucHoSo } from './ThanhPhanHoSo'
import { PhiLePhi } from '../../PhiLePhi'
import { LOAIPHILEPHI_CHUNGTHUC_OPTIONS } from '@/features/hoso/data/formData'
import { IPhiLePhi } from '@/features/philephi/models'
import { PhiLePhiChungThuc } from './PhiLePhiChungThuc'
import { SearchDanhMucGiayToChungThuc } from '@/features/danhmucgiaytochungthuc/redux/action'
import { IThanhPhanHoSo } from '@/features/thanhphanhoso/models'
import { toast } from 'react-toastify'
import { allItemHasFile } from './utils/validate'

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
                    const thanhPhanHoSos = formData.thanhPhanHoSos as KetQuaThuTucChungThuc[]
                    const chuaChonLoaiGiayTo = thanhPhanHoSos?.findIndex(x => !x.maGiayTo || !x.ten)
                    
                    if(chuaChonLoaiGiayTo != -1){
                        toast.warn("Có thành phần hồ sơ chưa chọn nội dung/ tên giấy tờ")
                        return;
                    }
                    return await dispatch(ThemHoSoChungThucTrucTiep({...formData, laHoSoChungThuc: true})).unwrap()
                } catch (error) {
                    console.error(error)                                        
                }
            }}
            extraSearchThuTuc= {{laThuTucChungThuc: true}}
            remove={true}
            handlerCloseModal={handlerCancel}
            validateFilesOnSubmit={(thanhPhanHoSos) => {
                return {
                    state: allItemHasFile(thanhPhanHoSos, "dinhKem"),
                    message: "Vui lòng đính kèm tệp vào từng thành phần chứng thực"
                }
            }}
        />
    </>

}

export default ThemMoiHoSoChungThuc;