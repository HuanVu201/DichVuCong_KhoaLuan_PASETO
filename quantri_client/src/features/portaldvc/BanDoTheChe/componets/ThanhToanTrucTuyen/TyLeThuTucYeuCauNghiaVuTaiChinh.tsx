import { useMemo } from "react";
import { useSoLieuBaoCaoContext } from "../../contexts";
import { toast } from "react-toastify";
import { Badge } from "antd";

function TyLeThuTucYeuCauNghiaVuTaiChinh() {
    const soLieuContext = useSoLieuBaoCaoContext()

    const [
        tyLeCungCapDVCQG, tyLeConLai
    ] = useMemo(() => {
        if (soLieuContext.soLieuTheoKy) {
            const tyLeCungCapDVCQG = 100
            const tyLeConLai = tyLeCungCapDVCQG > 0 ? 100 - tyLeCungCapDVCQG : 0


            return [tyLeCungCapDVCQG, tyLeConLai];
        }
        return [null, null, null, null]
    }, [soLieuContext.soLieuTheoKy]);

    return (<>
        <b style={{ textAlign: 'center', minHeight: 50 }}>TỶ LỆ TTHC CÓ YÊU CẦU NGHĨA VỤ TÀI CHÍNH ĐƯỢC CUNG CẤP TRÊN CỔNG DVC QG</b>

        <div className="chart-progress-box">
            <div className="percent-val-first"
                style={{
                    flex: tyLeCungCapDVCQG ?? 1,
                    borderTopRightRadius: tyLeCungCapDVCQG && tyLeCungCapDVCQG == 100 ? 6 : 0,
                    borderBottomRightRadius: tyLeCungCapDVCQG && tyLeCungCapDVCQG == 100 ? 6 : 0,
                }}
            >
                {tyLeCungCapDVCQG && tyLeCungCapDVCQG > 0 ? tyLeCungCapDVCQG : null}
            </div>
            <div className="percent-val-last"
                style={{
                    flex: tyLeConLai ?? 1,
                    borderTopLeftRadius: tyLeConLai && tyLeConLai == 100 ? 6 : 0,
                    borderBottomLeftRadius: tyLeConLai && tyLeConLai == 100 ? 6 : 0,
                }}
            >
                {tyLeConLai && tyLeConLai > 0 ? tyLeConLai : null}
            </div>
        </div>
        <div>
            <p>
                <Badge color='#5899DA' text={`Cung cấp trên cổng DVCQG`} />
                <p style={{ color: '#5899DA', fontSize: '1.1rem' }}><b>{tyLeCungCapDVCQG}%</b></p>
            </p>
            <p>
                <Badge color='#ed5050' text={`Chưa tích hợp, cung cấp dịch vụ thanh toán trực tuyến`} />
                <p style={{ color: '#ed5050', fontSize: '1.1rem' }}><b>{tyLeConLai}%</b></p>
            </p>
        </div>
    </>);
}

export default TyLeThuTucYeuCauNghiaVuTaiChinh;