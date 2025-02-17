import { useEffect, useState } from "react";
import { useSoLieuBaoCaoContext } from "../../contexts";
import AverageThongKeBlock from "../Common/AverageThongKeBlock";
import KetQuaXuLyHoSo from "../Common/KetQuaXuLyHoSo";

function TienDoGiaiQuyetSwapper() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [contentAvarageTienDo, setContentAvarageTienDo] = useState<string>('')
    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {
            const scoreTienDo = soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemTienDoGiaiQuyet ?? 0) * 100) / 100 : 0
            setContentAvarageTienDo(`${scoreTienDo}/20 Điểm`)

        }
    }, [soLieuContext.soLieuTheoKy])

    return (<>
        <div className="thongKeBlock" style={{ gridColumn: '3 / 5', gridRow: '1 / 2', padding: 0, maxHeight: 50, boxShadow: '0px 4px 12px #D2D2D2' }} >
            <AverageThongKeBlock titleText='Điểm trung bình' contentText={contentAvarageTienDo} colorTitle='#219553' />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 5', gridRow: '2 / 4' }}>
            <KetQuaXuLyHoSo />
        </div>
    </>);
}

export default TienDoGiaiQuyetSwapper;