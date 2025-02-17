import { useEffect } from "react";
import { DanhSachThuTucsPortal } from "./components/DanhMucThuTucPortal";
import { DetailThuTucPortal } from "./components/DetailThuTucPortal";
import { SearchThuTuc } from "./components/SearchThuTuc";
import {
  DvcTrucTuyenPortalProvider,
  useDvcTrucTuyenPortalContext,
} from "./context/DvcTrucTuyenPortalContext";
import { SearchDonViThuTuc } from "./components/SearchDonViThuTuc";
import { DichVuCongNoiBat } from "./components/DichVuCongNoiBat";
import { useSearchParams } from "react-router-dom";
import "./DvcTrucTuyen.scss"

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
            <DanhSachThuTucsPortal />
          </div>
        </div>
        <div className="col-3 col-md-4 container">
          {/* {dvcTrucTuyenContext.searchParams.get("maTTHC") ? (
            <SearchDonViThuTuc />
          ) : null} */}
          <DichVuCongNoiBat />
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
