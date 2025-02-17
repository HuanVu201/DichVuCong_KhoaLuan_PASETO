import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useMemo } from "react";

import { Button, Divider, Popconfirm, Tag } from "antd";
import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Service } from "@/services";
import { SearchTruongHopThuTuc } from "@/features/truonghopthutuc/redux/action";
import { AntdDivider } from "@/lib/antd/components";
import { DANG_NHAP_SSO_URL } from "@/data";
import { MUCDO_THUTUC } from "@/features/thutuc/data";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { useDvcTrucTuyenPortalContext } from "@/features/portaldvc/DvcTrucTuyen/context/DvcTrucTuyenPortalContext";
import { ITruongHopThuTucPortal } from "@/features/portaldvc/TruongHopThuTuc/models/TruongHopThuTucPortal";


const CardTruongHopThuTuc = ({ truongHopThuTuc }: { truongHopThuTuc: ITruongHopThuTucPortal }) => {
  const [searchParams] = useSearchParams()
  const { data: user } = useAppSelector((state) => state.user)
  const dvcTrucTuyenContext = useDvcTrucTuyenPortalContext();
  const navigate = useNavigate()
  const confirm = () => {
    if (dvcTrucTuyenContext.donViThuTucs && dvcTrucTuyenContext.donViThuTucs.length == 1 && dvcTrucTuyenContext.donViThuTucs[0].urlRedirect) {
      window.open(dvcTrucTuyenContext.donViThuTucs[0].urlRedirect, '_blank')?.focus()
      return
    }
    if (!searchParams.get("donVi")) {
      if (dvcTrucTuyenContext.donViThuTucs?.length) {
        searchParams.set("donVi", dvcTrucTuyenContext.donViThuTucs[0].donViId)
      }
      else {
        toast.warning("Vui lòng chọn đơn vị thực hiện");
        return
      }
    }
    if (user) {
      searchParams.append("truongHopId", truongHopThuTuc.ma as string)
      navigate(Service.primaryRoutes.portaldvc.nopHoSoTrucTuyen + "?" + searchParams.toString())
    } else {
      location.href = DANG_NHAP_SSO_URL
    }
  };
  return (
    <div className="d-flex justify-content-between my-4">
      <p className="fs-6">{truongHopThuTuc.ten}</p>
      <Button onClick={confirm} className="buttonSearchPortal">Nộp hồ sơ</Button>
    </div>
  );
};

export const DetailThuTucSmartKiosk = () => {
  // const { data: user } = useAppSelector((state) => state.user)
  const { maHuyen, maTinh, maXa } = useAppSelector((state) => state.cocautochuc)
  const navigate = useNavigate()
  const dvcTrucTuyenContext = useDvcTrucTuyenPortalContext();

  const coQuanThucHien = useMemo(() => {
    const donVi = dvcTrucTuyenContext.searchParams.get("donVi")
    let currentDonVis: ICoCauToChuc[] = []
    maXa?.length ? currentDonVis = currentDonVis.concat(maXa) : null
    maHuyen?.length ? currentDonVis = currentDonVis.concat(maHuyen) : null
    maTinh?.length ? currentDonVis = currentDonVis.concat(maTinh) : null

    return currentDonVis?.find(x => x.groupCode == donVi)?.groupName
  }, [maHuyen, maTinh, maXa, dvcTrucTuyenContext.searchParams])
  // useEffect(() => {
  //   if (dvcTrucTuyenContext.truongHopThuTucs?.length == 1) {
  //     if (user) {
  //       let donVi = dvcTrucTuyenContext.searchParams.get("donVi")
  //       if (!donVi && dvcTrucTuyenContext.donViThuTucs && dvcTrucTuyenContext.donViThuTucs.length == 1) {
  //         donVi = dvcTrucTuyenContext.donViThuTucs[0].donViId
  //       }
  //       // navigate(renderDVCRouteParams({truongHopId: dvcTrucTuyenContext.truongHopThuTucs[0]?.ma, donVi: donVi || "", maTTHC: dvcTrucTuyenContext.searchParams.get("maTTHC") || ""},Service.primaryRoutes.portaldvc.nopHoSoTrucTuyen))
  //     } else {
  //       location.href = DANG_NHAP_SSO_URL
  //     }
  //   }
  // }, [dvcTrucTuyenContext.truongHopThuTucs, user]);

  // if(dvcTrucTuyenContext.thuTuc && dvcTrucTuyenContext.truongHopThuTucs === undefined){
  //   return <>
  //     <h4>{dvcTrucTuyenContext.thuTuc?.tenTTHC}</h4>
  //     <span>Xem chi tiết</span>
  //     <AntdDivider/>
  //     <h4>Lĩnh vực</h4>
  //     <span>{dvcTrucTuyenContext.thuTuc?.linhVucChinh}</span>
  //     <AntdDivider/>
  //     <h4>Cơ quan thực hiện</h4>
  //     <span>{dvcTrucTuyenContext.thuTuc?.coQuanThucHienChinh}</span>
  //   </> 
  // } else if(dvcTrucTuyenContext.thuTuc === undefined && dvcTrucTuyenContext.truongHopThuTucs && ){
  //   return (
  //     <div>
  //       {dvcTrucTuyenContext.truongHopThuTucs?.map((truongHopThuTuc, index) =>
  //         <CardTruongHopThuTuc truongHopThuTuc={truongHopThuTuc} key={index} />
  //       )}

  //     </div>
  //   );
  // }
  if (dvcTrucTuyenContext.truongHopThuTucs && dvcTrucTuyenContext.truongHopThuTucs.length > 1) {
    return (
      <div>
        {dvcTrucTuyenContext.truongHopThuTucs?.map((truongHopThuTuc, index) =>
          <CardTruongHopThuTuc truongHopThuTuc={truongHopThuTuc} key={index} />
        )}
      </div>
    )
  } else if (dvcTrucTuyenContext.truongHopThuTucs && dvcTrucTuyenContext.thuTuc?.mucDo && dvcTrucTuyenContext.truongHopThuTucs.length == 1) {
    return <>
      <h4>Danh sách dịch vụ công</h4>
      {dvcTrucTuyenContext.thuTuc ?
        <Tag color="orange"> Mức độ: {MUCDO_THUTUC[dvcTrucTuyenContext.thuTuc.mucDo]}</Tag> : null}
      <Tag color="orange">Cơ quan thực hiện: {coQuanThucHien}</Tag>
      {dvcTrucTuyenContext.donViThuTucs && dvcTrucTuyenContext.donViThuTucs.length == 1 && ["3","4"].includes(dvcTrucTuyenContext.thuTuc?.mucDo) && dvcTrucTuyenContext.donViThuTucs[0].urlRedirect ?
        <Tag color="orange"> Bạn sẽ được chuyển tiếp sang một trang mới</Tag> : null}
      {["3","4"].includes(dvcTrucTuyenContext.thuTuc?.mucDo) ? <CardTruongHopThuTuc truongHopThuTuc={dvcTrucTuyenContext.truongHopThuTucs[0]} /> : null}
      <Divider />
      <h4>{dvcTrucTuyenContext.thuTuc?.tenTTHC}</h4>
      <Link
        to={`/portaldvc/danh-muc-tthc?MaThuTuc=${dvcTrucTuyenContext.thuTuc?.maTTHC}`}
        target="_blank" style={{ color: "#CE7A58", textDecoration: "underline" }}
      >
        Xem chi tiết
      </Link>
      <Divider />
      <h4>Lĩnh vực</h4>
      <span>{dvcTrucTuyenContext.thuTuc?.linhVucChinh}</span>
    </>
  }
  return <></>
};
