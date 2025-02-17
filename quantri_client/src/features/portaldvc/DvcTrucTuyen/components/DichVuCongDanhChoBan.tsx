
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { FileTextOutlined } from "@ant-design/icons";
import { useEffect, useMemo } from "react";
import { CardThuTucPortal, ThuTucItem } from "./CardThuTucPortal";
import { IThuTuc } from "@/features/thutuc/models";
import { useDvcTrucTuyenPortalContext } from "../context/DvcTrucTuyenPortalContext";
import { Service } from "@/services";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { togglerLoginModalVisible } from "@/lib/redux/GlobalState";
import { toast } from "react-toastify";

export const DichVuCongDanhChoBan = () => {
  const { datas: thuTucs } = useAppSelector((state: any) => state.thutuc);


  const thuTucDanhChoBans = useMemo(() => {
    if (thuTucs && thuTucs.length > 0) {
      var thuTucToanTrinhs = thuTucs.filter((x: IThuTuc) => x.mucDo == '4')
      const randomIndices: IThuTuc[] = [];
      var count = 0;
      if (thuTucToanTrinhs && thuTucToanTrinhs.length > 0 && thuTucToanTrinhs.length <= 5) return thuTucToanTrinhs;
      while (randomIndices.length < 5 && thuTucToanTrinhs.length >= 5 && count <= 1000) {
        count++
        const randomIndex = Math.floor(Math.random() * thuTucToanTrinhs?.length);
        if (!randomIndices.includes(thuTucToanTrinhs[randomIndex])) {
          randomIndices.push(thuTucToanTrinhs[randomIndex]);
        }

      }
      return randomIndices
    }
    return []
  }, [thuTucs])
  return (
    <div className="rounded overflow-hidden border">
      <h5
        className="px-3 py-2 mb-0 "
        style={{ backgroundColor: "rgba(30, 47, 65, 0.1)", fontSize: 18 }}
      >
        Dịch vụ công gợi ý cho bạn
      </h5>
      <div className="px-2 py-1">
        {thuTucDanhChoBans?.map((thuTuc: any, index: number) => {
          return <CardThuTucPortalDanhChoBan key={index} thuTuc={thuTuc} index={index} showIndex={false} />;
        })}
      </div>
    </div>
  );
};

const CardThuTucPortalDanhChoBan = ({ thuTuc, index, showIndex }: { thuTuc: IThuTuc, index: number, showIndex: boolean }) => {
  const { data: user } = useAppSelector(state => state.user)
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const redirect = useMemo(() => {
  // let maTTHC = ""
  // if(!searchParams.has("maTTHC", thuTuc.maTTHC)){
  //   if(searchParams.has("maTTHC")){
  //     searchParams.set("maTTHC", thuTuc.maTTHC)
  //   } else {
  //     maTTHC = "&maTTHC=" + thuTuc.maTTHC
  //   }
  // }
  // console.log(thuTuc);
  // if(thuTuc.soLuongTruongHopThuTuc === 1){
  //   return Service.primaryRoutes.portaldvc.nopHoSoTrucTuyen + "?" + searchParams.toString() + maTTHC
  // }
  // return Service.primaryRoutes.portaldvc.dvcTrucTuyen + "?" + searchParams.toString() + maTTHC
  // }, [thuTuc,searchParams])
  const linkTo = thuTuc.mucDo != "3" && thuTuc.mucDo != "4" ? "#" : Service.primaryRoutes.portaldvc.nopHoSoTrucTuyen + `?${searchParams.toString()}&maTTHC=${thuTuc.maTTHC}`
  return (
    <div className="text-dark" onClick={(e) => {
      navigate(linkTo)
    }}>
      <ThuTucItem thuTuc={thuTuc} index={index} showIndex={showIndex} />

    </div>
  );
};

