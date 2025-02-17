import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import "./index.scss"
import { DvcTrucTuyenPortalProvider, useDvcTrucTuyenPortalContext } from "@/features/portaldvc/DvcTrucTuyen/context/DvcTrucTuyenPortalContext";
import { SearchThuTuc } from "./SearchThuTucSmartKiosk";
import { DanhSachThuTucsSmartKiosk } from "./DanhMucThuTucSmartKiosk";
import { DichVuCongNoiBatSmartKiosk } from "./DichVuCongNoiBatSmartKiosk";

const DvcTrucTuyenContainer = () => {
  const dvcTrucTuyenContext = useDvcTrucTuyenPortalContext();
  return (
    <div className="container containerDVCTrucTuyen" style={{marginTop : '50px'}}>
      <div className="row">
        <div className="col-12 container">
          {/* <NopHoSoDVCTrucTuyen /> */}
        </div>
        <div className="col-12 col-md-8 container mb-4">
          <SearchThuTuc />
          <div>
            {/* {dvcTrucTuyenContext.searchParams.get("maTTHC") ? (
              <>
              <DetailThuTucPortal />
              </>
            ) : (
              <DanhSachThuTucsPortal />
            )} */}
            <DanhSachThuTucsSmartKiosk />
          </div>
        </div>
        <div className="col-3 col-md-4 container">
          {/* {dvcTrucTuyenContext.searchParams.get("maTTHC") ? (
            <SearchDonViThuTuc />
          ) : null} */}
          <DichVuCongNoiBatSmartKiosk />
        </div>
      </div>
    </div>
  );
};
const DvcTrucTuyenWrapper = () => {
  return (
    <DvcTrucTuyenPortalProvider>
      <DvcTrucTuyenContainer />
    </DvcTrucTuyenPortalProvider>
  );
};
export default DvcTrucTuyenWrapper;
