import { useState } from "react"
import { SearchNhungCauHoiThuongGap } from "./components/SearchNhungCauHoiThuongGap"
import { WrapperListNhungCauHoiThuongGap } from "./components/WrapperListNhungCauHoiThuongGap"
import { NhungCauHoiThuongGapProvider } from "./contexts/NhungCauHoiThuongGapContext"

const NhungCauHoiThuongGapWrapper = () => {

    return (
        <div className=" mt-5 commonBackgroundTrongDong" style={{width: '90%', margin: 'auto', paddingBottom: 50}}>
            <SearchNhungCauHoiThuongGap></SearchNhungCauHoiThuongGap>
            <WrapperListNhungCauHoiThuongGap></WrapperListNhungCauHoiThuongGap>
        </div>
    )
}
const NhungCauHoiThuongGap = () => (<NhungCauHoiThuongGapProvider>
    <NhungCauHoiThuongGapWrapper />
</NhungCauHoiThuongGapProvider>)
export default NhungCauHoiThuongGap