import { useState } from "react"
import { SearchNhungCauHoiThuongGap } from "./components/SearchNhungCauHoiThuongGap"
import { WrapperListNhungCauHoiThuongGap } from "./components/WrapperListNhungCauHoiThuongGap"

const NhungCauHoiThuongGap = () => {

    return (
        <div className="container mt-5">
            <SearchNhungCauHoiThuongGap></SearchNhungCauHoiThuongGap>
            <WrapperListNhungCauHoiThuongGap></WrapperListNhungCauHoiThuongGap>
        </div>
    )
}

export default NhungCauHoiThuongGap