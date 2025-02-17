import { useEffect, useState } from "react";
import AverageThongKeBlock from "../Common/AverageThongKeBlock";
import { useSoLieuBaoCaoContext } from "../../contexts";
import TyLeHoSoCapKetQuaDienTu from "./TyLeHoSoCapKetQuaDienTu";
import TyLeSoHoaHoSoKetQua from "./TyLeSoHoaHoSoKetQua";
import TruyVanCSDLDanCu from "./TruyVanCSDLDanCu";

function SoHoaHoSoSwapper() {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [contentAvarageSoHoaHoSo, setContentAvarageSoHoaHoSo] = useState<string>('')


    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {

            const scoreSoHoaHoSo = soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemSoHoa ?? 0) * 100) / 100 : 0
            setContentAvarageSoHoaHoSo(`${scoreSoHoaHoSo}/12 Điểm`)
        }
    }, [soLieuContext.soLieuTheoKy])

    return (<>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 5', gridRow: '1 / 2', padding: 0, maxHeight: 50, boxShadow: '0px 4px 12px #D2D2D2' }} >
            <AverageThongKeBlock titleText='Điểm trung bình' contentText={contentAvarageSoHoaHoSo} colorTitle='#ed5050' />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }} >
            <TyLeHoSoCapKetQuaDienTu />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '4 / 5', gridRow: '2 / 3' }} >
            <TyLeSoHoaHoSoKetQua />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 4', gridRow: '3 / 4' }} >
            <TruyVanCSDLDanCu />
        </div>
        {/* <div className=" thongKeBlock" style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }} >

        </div> */}


    </>);
}

export default SoHoaHoSoSwapper;