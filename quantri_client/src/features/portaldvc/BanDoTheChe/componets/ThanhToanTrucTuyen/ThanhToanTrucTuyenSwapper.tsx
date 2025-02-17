import { useEffect, useState } from "react"
import { useSoLieuBaoCaoContext } from "../../contexts"
import AverageThongKeBlock from "../Common/AverageThongKeBlock"
import TyLeGiaoDichThanhToanTrucTuyen from "./TyLeThuTucGiaoDichTrucTuyen"
import TyLeThuTucYeuCauNghiaVuTaiChinh from "./TyLeThuTucYeuCauNghiaVuTaiChinh"
import TyLeHoSoThanhToanTrucTuyen from "./TyLeHoSoThanhToanTrucTuyen"

function ThanhToanTrucTuyenSwapper() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [contentAvarageThanhToanTrucTuyen, setContentAvarageThanhToanTrucTuyen] = useState<string>('')

    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {

            const scoreThanhToanTrucTuyen = soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemThanhToanTrucTuyen ?? 0) * 100) / 100 : 0
            setContentAvarageThanhToanTrucTuyen(`${scoreThanhToanTrucTuyen}/10 Điểm`)
        }
    }, [soLieuContext.soLieuTheoKy])

    return (<>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 5', gridRow: '1 / 2', padding: 0, maxHeight: 50, boxShadow: '0px 4px 12px #D2D2D2' }} >
            <AverageThongKeBlock titleText='Điểm đánh giá' contentText={contentAvarageThanhToanTrucTuyen} colorTitle='#ed5050' />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 4', gridRow: '2 / 4' }} >
            <TyLeGiaoDichThanhToanTrucTuyen />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '4 / 5', gridRow: '2 / 3' }} >
            <TyLeThuTucYeuCauNghiaVuTaiChinh />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }} >
            <TyLeHoSoThanhToanTrucTuyen />
        </div>

    </>);
}

export default ThanhToanTrucTuyenSwapper;