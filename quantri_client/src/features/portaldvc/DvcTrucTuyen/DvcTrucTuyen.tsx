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
import { DichVuCongDanhChoBan } from "./components/DichVuCongDanhChoBan";

const DvcTrucTuyenContainer = () => {
  const dvcTrucTuyenContext = useDvcTrucTuyenPortalContext();
  return (
    <div className="containerDVCTrucTuyen commonBackgroundTrongDong">
      <div className="row">
        <div className="col-12 container row">
          {/* <NopHoSoDVCTrucTuyen /> */}
        </div>
        <div className="col-12 col-lg-8" style={{marginBottom: 20}}>
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
        <div className="col-12 col-lg-4">
          {/* {dvcTrucTuyenContext.searchParams.get("maTTHC") ? (
            <SearchDonViThuTuc />
          ) : null} */}
          
          <DichVuCongNoiBat />
          <br/>
          <DichVuCongDanhChoBan />
        </div>
      </div>
    </div>
  );
};
const DvcTrucTuyenWrapper = () => {
  return (
    <><DvcTrucTuyenPortalProvider>
      <DvcTrucTuyenContainer />
    </DvcTrucTuyenPortalProvider></>
  );
};
export default DvcTrucTuyenWrapper;
