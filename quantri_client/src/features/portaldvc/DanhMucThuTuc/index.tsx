import { DanhMucThuTucPortal } from "./components/DanhMucThuTucPortal";
import HeaderContainerTTHC, { QUAN_HUYEN, SO_BAN_NGANH, XA_PHUONG } from "./components/HeaderContainerTTHC";
import "./index.scss";
import {
  DanhMucThuTucPortalProvider,
  useDanhMucThuTucPortalContext,
} from "./context/DanhMucThuTucPortalContext";
import { useEffect } from "react";
import DetailThuTucPortal from "./components/DetailThuTucPortal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  SearchDanhMucTTHC,
  SearchThuTuc,
} from "@/features/thutuc/redux/action";
import SidebarDanhMucThuTuc from "./components/SidebarTTHC";
import { ThuTucService } from "@/features/thutuc/services";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const DanhMucThuTucContainer = () => {
  const dispatch = useAppDispatch();
  const thuTucContext = useDanhMucThuTucPortalContext();
  let maThuTuc = thuTucContext.searchParams.get("MaThuTuc");
  // const

  useEffect(() => {
    (async () => {
      dispatch(
        SearchDanhMucTTHC({
          ...thuTucContext.searchPortal,
          laTTHCTrucTuyen: true,
          maLinhVuc: thuTucContext.searchParams.get("MaLinhVuc") || undefined,
          hasThuTuc: true,
          tuKhoa: thuTucContext.searchParams.get("TuKhoa") || undefined,
          mucDo: thuTucContext.searchParams.get('MucDo') || undefined,
          doiTuongThucHien: thuTucContext.searchParams.get('DoiTuongThucHien') || undefined,
          donViId: thuTucContext.searchParams.get('DonViThucHien') || undefined,
          thucHienTaiBoPhanMotCua: thuTucContext.searchParams.get('ThucHienTaiBoPhanMotCua') == '1' ? true
            : thuTucContext.searchParams.get('ThucHienTaiBoPhanMotCua') == '0' ? false : undefined,

          hasThuTucCapTinh:
            thuTucContext.searchParams.get("CapThucHien") == SO_BAN_NGANH
              ? true
              : undefined,
          hasThuTucCapHuyen:
            thuTucContext.searchParams.get("CapThucHien") == QUAN_HUYEN
              ? true
              : undefined,
          hasThuTucCapXa:
            thuTucContext.searchParams.get("CapThucHien") == XA_PHUONG
              ? true
              : undefined,
        })
      );
    })();
  }, [
    thuTucContext.searchPortal,
    thuTucContext.searchParams,
    thuTucContext.handleUrlQueryStringChange,
  ]);

  const setIdThuTuc = async () => {
    const res: any = await dispatch(
      SearchThuTuc({ maTTHC: maThuTuc?.toString() })
    );
    const idThuTuc: string = res?.payload.data[0].id;
    thuTucContext.setThuTucId(idThuTuc);
  };
  useEffect(() => {
    if (maThuTuc) setIdThuTuc();
  }, []);

  return (
    <div className="DanhMucTTHC_Swapper commonBackgroundTrongDong" style={{ marginTop: "50px" }}>
      <div className="row DanhMucTTHC_Block ">
        <div className="col-12 col-lg-3">
          <SidebarDanhMucThuTuc />
        </div>
        <div className="col-12 col-lg-9 container">
          <HeaderContainerTTHC />
          <div>
            <div>
              {!thuTucContext.thuTucId ? (
                <DanhMucThuTucPortal />
              ) : (
                <DetailThuTucPortal />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function DanhMucThuTucPortalWrapper() {
  return (
    <DanhMucThuTucPortalProvider>
      <DanhMucThuTucContainer />
    </DanhMucThuTucPortalProvider>
  );
}

export default DanhMucThuTucPortalWrapper;
