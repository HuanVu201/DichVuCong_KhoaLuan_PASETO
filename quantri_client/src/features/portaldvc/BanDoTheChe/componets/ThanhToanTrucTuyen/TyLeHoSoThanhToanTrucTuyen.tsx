import { useMemo } from "react";
import { useSoLieuBaoCaoContext } from "../../contexts";
import { toast } from "react-toastify";
import { Badge } from "antd";
import { getCurrencyThongKe } from "@/utils";

function TyLeHoSoThanhToanTrucTuyen() {
    const soLieuContext = useSoLieuBaoCaoContext()

    const [hoSoCoThuPhiThanhToanTrucTuyen, hoSoConLai,
        tyLeThanhToanTrucTuyen, tyLeConLai
    ] = useMemo(() => {
        if (soLieuContext.soLieuTheoKy) {
            const data = soLieuContext.soLieuTheoKy ? JSON.parse(soLieuContext.soLieuTheoKy[0].soLieu) : undefined

            const hoSoCoThuPhiThanhToanTrucTuyen = data.HoSoCoThuPhiThanhToanTrucTuyen
            const hoSoConLai = data.HoSoCoThuPhi - data.HoSoCoThuPhiThanhToanTrucTuyen


            const tyLeThanhToanTrucTuyen = Math.round((data.HoSoCoThuPhiThanhToanTrucTuyenTyLe ?? 0) * 100) / 100
            const tyLeConLai = tyLeThanhToanTrucTuyen > 0 ? Math.round((100 - tyLeThanhToanTrucTuyen) * 100) / 100 : 0


            return [hoSoCoThuPhiThanhToanTrucTuyen, hoSoConLai, tyLeThanhToanTrucTuyen, tyLeConLai];
        }
        return [null, null, null, null]
    }, [soLieuContext.soLieuTheoKy]);

    return (<>
        <b style={{ textAlign: 'center', minHeight: 50 }}>TỶ LỆ HỒ SƠ THANH TOÁN TRỰC TUYẾN</b>

        <div className="chart-progress-box">
            <div className="percent-val-first"
                style={{
                    flex: tyLeThanhToanTrucTuyen ?? 1,
                    borderTopRightRadius: tyLeThanhToanTrucTuyen && tyLeThanhToanTrucTuyen == 100 ? 6 : 'unset',
                    borderBottomRightRadius: tyLeThanhToanTrucTuyen && tyLeThanhToanTrucTuyen == 100 ? 6 : 'unset',
                }}
            >
                {tyLeThanhToanTrucTuyen && tyLeThanhToanTrucTuyen > 0 ? '1' : null}
            </div>
            <div className="percent-val-last"
                style={{
                    flex: tyLeConLai ?? 1,
                    borderTopLeftRadius: tyLeConLai && tyLeConLai == 100 ? 6 : 0,
                    borderBottomLeftRadius: tyLeConLai && tyLeConLai == 100 ? 6 : 0,
                }}
            >
                {tyLeConLai && tyLeConLai > 0 ? '0' : null}
            </div>
        </div>
        <div>
            <p>
                <Badge color='#5899DA' text={`Thanh toán trực tuyến`} />
                <p style={{ color: '#5899DA', fontSize: '1.1rem' }}><b>{getCurrencyThongKe(hoSoCoThuPhiThanhToanTrucTuyen)} hồ sơ ({tyLeThanhToanTrucTuyen}%)</b></p>
            </p>
            <p>
                <Badge color='#ed5050' text={`Thanh toán trực tiếp và hình thức khác`} />
                <p style={{ color: '#ed5050', fontSize: '1.1rem' }}><b>{getCurrencyThongKe(hoSoConLai ?? 0)} hồ sơ ({tyLeConLai}%)</b></p>
            </p>
        </div>
    </>);
}

export default TyLeHoSoThanhToanTrucTuyen;