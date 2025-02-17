import { useEffect, useState } from "react";
import { useSoLieuBaoCaoContext } from "../../contexts";
import AverageThongKeBlock from "../Common/AverageThongKeBlock";
import TyLeCungCapDvcTrucTuyen from "./CungCapDvcTrucTuyen";
import TyLeNopHoSoTrucTuyen from "../Common/NopHoSoTrucTuyen";
import KetQuaXuLyHoSoTrucTuyen from "./KetQuaXuLyHoSoTrucTuyen";
import ThuTucTrucTuyenPhatSinhHoSo from "./ThuTucTrucTuyenPhatSinhHoSo";

function DvcTrucTuyenSwapper() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [contentAvarageDvcTrucTuyen, setContentAvarageDvcTrucTuyen] = useState<string>('')

    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {
            const scoreDvcTrucTuyen = soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemCungCapDVCTT ?? 0) * 100) / 100 : 0
            setContentAvarageDvcTrucTuyen(`${scoreDvcTrucTuyen}/12 Điểm`)
        }
    }, [soLieuContext.soLieuTheoKy])

    return (<>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 5', gridRow: '1 / 2', padding: 0, maxHeight: 50, boxShadow: '0px 4px 12px #D2D2D2' }} >
            <AverageThongKeBlock titleText='Điểm đánh giá' contentText={contentAvarageDvcTrucTuyen} colorTitle='#ed5050' />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 5', gridRow: '2 / 3' }}>
            <TyLeCungCapDvcTrucTuyen />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 4', gridRow: '3 / 4' }}>
            <TyLeNopHoSoTrucTuyen color1="#5899da" color2="#ed5050" />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }}>
            <KetQuaXuLyHoSoTrucTuyen />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '1 / 3' }}>
            <ThuTucTrucTuyenPhatSinhHoSo />
        </div>
    </>);
}

export default DvcTrucTuyenSwapper;