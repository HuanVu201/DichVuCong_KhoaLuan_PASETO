import DichVuTrucTuyen from "./DvcTrucTuyen";
import ThongKeTongHop766 from "./Diem766";
import KetQuaXuLyHoSo from "../Common/KetQuaXuLyHoSo";
import TyLeNopHoSoTrucTuyen from "../Common/NopHoSoTrucTuyen";
import DvcTrucTuyen from "./DvcTrucTuyen";

function ThongKeTongHopSwapper() {
    return (<>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 5', gridRow: '1 / 4' }}>
            <ThongKeTongHop766 />
        </div>
      
        <div className=" thongKeBlock" style={{ gridColumn: '1 / 2' }}>
            <TyLeNopHoSoTrucTuyen color1="#f09844" color2="#dae1e4"/>
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '2 / 3' }}>
            <DvcTrucTuyen />
        </div>
        <div className=" thongKeBlock" style={{ gridColumn: '3 / 5' }}>
            <KetQuaXuLyHoSo />
        </div>
    </>);
}

export default ThongKeTongHopSwapper;