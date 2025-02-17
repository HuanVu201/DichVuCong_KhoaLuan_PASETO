import { IThuTuc } from "@/features/thutuc/models";
import { Service } from "@/services";
import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { MUCDO_THUTUC } from "@/features/thutuc/data";
import { toast } from "react-toastify";
import { useDvcTrucTuyenPortalContext } from "@/features/portaldvc/DvcTrucTuyen/context/DvcTrucTuyenPortalContext";

export const ThuTucItemSmartKiosk = ({ thuTuc }: { thuTuc: IThuTuc }) => {
  return <div className="d-flex align-items-start my-2" role='button'>
    <FileTextOutlined style={{ color: "#ce7a58" }} className="mt-2 mx-2 " />
    <p style={{ fontWeight: 400, fontSize: '18px', textDecoration: 'none' }} >{thuTuc.tenTTHC}
      {thuTuc.mucDo ?
        <>
          <span style={{ background: 'rgba(255, 247, 230, 0.5)', color: '#d46b08', padding: '1px 5px', marginLeft: '2px', border: '1px solid #ffd591', borderRadius: '5px', }}>
            {MUCDO_THUTUC[thuTuc.mucDo]}
          </span>
        </> : ""}</p>
  </div>
}


export const CardThuTucSmartKiosk = ({ thuTuc }: { thuTuc: IThuTuc }) => {
  const dichVuCongTrucTuyenContext = useDvcTrucTuyenPortalContext();
  // const redirect = useMemo(() => {
  //   const maTTHC = "&maTTHC=" + thuTuc.maTTHC;
  //   if (thuTuc.soLuongTruongHopThuTuc === 1) {
  //     return (
  //       Service.primaryRoutes.portaldvc.nopHoSoTrucTuyen +
  //       "?" +
  //       dichVuCongTrucTuyenContext.searchParams.toString() +
  //       maTTHC
  //     );
  //   }
  //   return (
  //     Service.primaryRoutes.portaldvc.dvcTrucTuyen +
  //     "?" +
  //     dichVuCongTrucTuyenContext.searchParams.toString() +
  //     maTTHC
  //   );
  // }, [thuTuc, dichVuCongTrucTuyenContext.searchParams]);
  return (
    <Link style={{ textDecoration: 'none' }} className="text-dark" to={Service.primaryRoutes.smartkiosk.nopHoSoTrucTuyen +
      "?maTTHC=" + thuTuc.maTTHC}>
      <ThuTucItemSmartKiosk thuTuc={thuTuc} />
    </Link>
  );
};
