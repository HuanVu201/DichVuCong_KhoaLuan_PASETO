import { useEffect, useState } from "react";
import { useSoLieuBaoCaoContext } from "../../contexts";
import AverageThongKeBlock from "../Common/AverageThongKeBlock";
import HoSoDaDongBoLenDVCQG from "./HoSoDaDongBo";
import ThuTucDuocCongKhai from "./ThuTucDuocCongKhai";

function CongKhaiMinhBachSwapper
    () {
    const soLieuContext = useSoLieuBaoCaoContext()
    const [contentAvarageCongKhaiMinhBach, setContentAvarageCongKhaiMinhBach] = useState<string>('')

    useEffect(() => {
        if (soLieuContext.soLieuTheoKy) {
            const scoreCongKhaiMinhBach = soLieuContext.soLieuTheoKy.length > 0 ? Math.round((JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu).DiemCongKhaiMinhBach ?? 0) * 100) / 100 : 0
            setContentAvarageCongKhaiMinhBach(`${scoreCongKhaiMinhBach}/6 Điểm`)
        }
    }, [soLieuContext.soLieuTheoKy])

    return (<>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 5', gridRow: '1 / 2', padding: 0, maxHeight: 50, boxShadow: '0px 4px 12px #D2D2D2' }} >
            <AverageThongKeBlock titleText='Điểm trung bình' contentText={contentAvarageCongKhaiMinhBach} colorTitle='#5CC488' />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 4', gridRow: '2 / 4' }}>
            <ThuTucDuocCongKhai />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '4 / 5', gridRow: '2 / 4' }}>
            <HoSoDaDongBoLenDVCQG />
        </div>
    </>);
}

export default CongKhaiMinhBachSwapper
    ;