import {ComponentProps, useEffect, useState} from 'react'
import ThemMoiTiepNhanHoSoModal from '../themMoiHoSo/ThemMoiTiepNhanHoSoModal'
import { useAppDispatch } from '@/lib/redux/Hooks'
import { AddHoSoPhiDiaGioi, AddHoSoTrucTiep } from '@/features/hoso/redux/action'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { IResult } from '@/models'
import { LOAIPHILEPHI_CHUNGTHUC_OPTIONS } from '@/features/hoso/data/formData'
import { ICoCauToChuc } from '@/features/cocautochuc/models'
import { lazy } from '@/utils/lazyLoading'
const DonViPhiDiaGioi = lazy(() => import("./DonViPhiDiaGioi"))

const ThemMoiHoSoPhiDiaGioiModal = (props: Omit<ComponentProps<typeof ThemMoiTiepNhanHoSoModal>, "hoSoChungThucElement">) => {
    const dispatch = useAppDispatch();
    const buttonActionContext = useButtonActionContext()
    const handlerCancel = () => {
        buttonActionContext.setThemMoiHoSoPhiDiaGioiModalVisible(false)
    }
    return <>
        <ThemMoiTiepNhanHoSoModal 
            {...props} 
            modalTitle="THÊM MỚI HỒ SƠ PHI ĐỊA GIỚI"
            phiLePhiOptions={LOAIPHILEPHI_CHUNGTHUC_OPTIONS}
            submitHandler={async (formData: any): Promise<IResult<any> | undefined> => {
                console.log(formData);
                try {
                    return await dispatch(AddHoSoPhiDiaGioi({...formData })).unwrap()
                } catch (error) {
                    console.error(error)                                        
                }
            }}
            donViPhiDiaGioiElement={(form) => <DonViPhiDiaGioi form={form}>
            </DonViPhiDiaGioi>}
            extraSearchThuTuc= {{laPhiDiaGioi: true}}
            remove={false}
            handlerCloseModal={handlerCancel}
        />
    </>
}

export default ThemMoiHoSoPhiDiaGioiModal;