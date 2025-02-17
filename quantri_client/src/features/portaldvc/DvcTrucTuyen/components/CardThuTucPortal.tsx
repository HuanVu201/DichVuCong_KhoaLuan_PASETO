import { IThuTuc } from "@/features/thutuc/models";
import { Service } from "@/services";
import { FileTextOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDvcTrucTuyenPortalContext } from "../context/DvcTrucTuyenPortalContext";
import { useMemo } from "react";
import { MUCDO_THUTUC } from "@/features/thutuc/data";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { togglerLoginModalVisible } from "@/lib/redux/GlobalState";

export const ThuTucItem = ({ thuTuc, index, showIndex }: { thuTuc: IThuTuc, index: number, showIndex: boolean }) => {
  const {
    datas: thuTucs,
    count,
    loading: loadingThuTucs,
    pageSize,
    currentPages,
  } = useAppSelector((state) => state.thutuc);

  return <div className="d-flex align-items-start my-2" role='button'>
    <FileTextOutlined style={{ color: "#ce7a58" }} className="mt-2 mx-2 " />
    <p style={{ fontWeight: 400, fontSize: '17px' }} >{showIndex ? ((currentPages || 0) - 1) * (pageSize || 0) + index + 1 + '.': ''} {thuTuc.tenTTHC}
      {/* <p style={{ fontWeight: 400, fontSize: '17px' }} >{thuTuc.tenTTHC} */}
      {thuTuc.mucDo ?
        <>
          <span style={{ background: 'rgba(255, 247, 230, 0.5)', color: '#d46b08', padding: '1px 5px', marginLeft: '5px', border: '1px solid #ffd591', borderRadius: '5px' }}>
            {MUCDO_THUTUC[thuTuc.mucDo]}
          </span>
        </> : ""}</p>
  </div>
}


export const CardThuTucPortal = ({ thuTuc, index, showIndex }: { thuTuc: IThuTuc, index: number, showIndex: boolean }) => {
  const dichVuCongTrucTuyenContext = useDvcTrucTuyenPortalContext();
  const { data: user } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
  const hasCapThucHien = useMemo(() => {
    return dichVuCongTrucTuyenContext.searchParams.has("capThucHien")
  }, [dichVuCongTrucTuyenContext.searchParams.get("capThucHien")])
  const linkTo = thuTuc.mucDo != "3" && thuTuc.mucDo != "4" ? "#" : Service.primaryRoutes.portaldvc.nopHoSoTrucTuyen +
    `?${dichVuCongTrucTuyenContext.searchParams.toString()}&maTTHC=${thuTuc.maTTHC}${!hasCapThucHien && dichVuCongTrucTuyenContext.capThucHien ? `&capThucHien=${dichVuCongTrucTuyenContext.capThucHien}` : ""}`
  return (
    <div className="text-dark" onClick={(e) => {
        navigate(linkTo)
    }}>
      <ThuTucItem index={index} showIndex={showIndex} thuTuc={thuTuc} />
    </div>
  );
};
