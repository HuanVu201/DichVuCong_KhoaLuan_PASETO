import { SearchThuTucNoiBat } from "@/features/thutuc/redux/action";
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

export const DichVuCongNoiBat = () => {
  const { thuTucNoiBats } = useAppSelector((state) => state.thutuc);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (thuTucNoiBats === undefined) {
      dispatch(
        SearchThuTucNoiBat({
          LaTieuBieu: true,
          suDung:true,
          // OrderBy: ["ThuTu ASC"],
        })
      );
    }
  }, [thuTucNoiBats]);

  return (
    <div className="rounded overflow-hidden border">
      <h5
        className="px-3 py-2 mb-0 "
        style={{ backgroundColor: "rgba(30, 47, 65, 0.1)", fontSize: 18 }}
      >
        Dịch vụ công nổi bật
      </h5>
      <div className="px-2 py-1">
        {thuTucNoiBats?.map((thuTuc, index) => {
          return <CardThuTucPortalNoiBat index={index} showIndex={false} key={index} thuTuc={thuTuc} />;
        })}
      </div>
    </div>
  );
};

const CardThuTucPortalNoiBat = ({thuTuc, index, showIndex}:{thuTuc: IThuTuc, index: number, showIndex: boolean} ) => {
  const {data: user} = useAppSelector(state => state.user)
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
  const linkTo = thuTuc.mucDo != "3" && thuTuc.mucDo != "4" ? "#" : Service.primaryRoutes.portaldvc.nopHoSoTrucTuyen + `?maTTHC=${thuTuc.maTTHC}` 
  return (
    <div className="text-dark" onClick={(e) => {
        navigate(linkTo)
    }}>
        <ThuTucItem index={index} showIndex={false} thuTuc={thuTuc}/>
    </div>
  );
};