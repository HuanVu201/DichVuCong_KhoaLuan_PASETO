import "./index.scss";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { ThanhToanProvider, UseThanhToanContext } from "@/features/portaldvc/ThanhToan/context/UseThanhToanContext";
import { InitPayment } from "@/features/portaldvc/ThanhToan/redux/action";
import { SearchHoSoPortal } from "./Search";
import { DanhSachYeuCauThanhToan } from "./DanhSachYeuCauThanhToan";
const ThanhToanContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const thanhToanContext = UseThanhToanContext();
  const { datas: yeuCauThanhToans, giaoDichThanhToan } = useAppSelector(
    (state) => state.portalThanhToan
  );
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  useEffect(() => {
    (async () => {
      if (thanhToanContext.maYeuCauThanhToan) {
        const postData = {
          id: thanhToanContext.maYeuCauThanhToan,
        };
        await dispatch(InitPayment(postData));
      }
    })();
  }, [thanhToanContext.maYeuCauThanhToan]);
  useEffect(() => {
    if (giaoDichThanhToan) {
      thanhToanContext.setMaYeuCauThanhToan("");
      if (
        giaoDichThanhToan.maGiaoDichThanhToan &&
        giaoDichThanhToan.duongDanThanhToan
      ) {
        location.href = giaoDichThanhToan.duongDanThanhToan;
      } else {
        toast.warning("Tạo giao dịch thanh toán thất bại!");
      }
    }
  }, [giaoDichThanhToan]);

  return (
    <div className="containerThanhToan">
      <SearchHoSoPortal />
      {yeuCauThanhToans && yeuCauThanhToans.length > 0 && hoSo ? (
        <DanhSachYeuCauThanhToan
          yeuCauThanhToans={yeuCauThanhToans}
          hoSoInfo={hoSo}
        />
      ) : null}
      {/* <DetailThanhToan /> */}
    </div>
  );
};
const ThanhToanPortalWrapper = () => {
  return (
    <ThanhToanProvider>
      <ThanhToanContainer />
    </ThanhToanProvider>
  );
};
export default ThanhToanPortalWrapper;
