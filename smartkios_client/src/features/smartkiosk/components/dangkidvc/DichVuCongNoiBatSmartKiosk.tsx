import { SearchThuTucNoiBat } from "@/features/thutuc/redux/action";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { FileTextOutlined } from "@ant-design/icons";
import { useEffect, useMemo } from "react";
import { IThuTuc } from "@/features/thutuc/models";
import { Service } from "@/services";
import { Link, useSearchParams } from "react-router-dom";
import { ThuTucItemSmartKiosk } from "./CardThuTucSmartKiosk";

export const DichVuCongNoiBatSmartKiosk = () => {
  const { thuTucNoiBats } = useAppSelector((state) => state.thutuc);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (thuTucNoiBats === undefined) {
      dispatch(
        SearchThuTucNoiBat({
          pageNumber: 1,
          pageSize: 10,
          LaTieuBieu: true,
          OrderBy: ["ThuTu ASC"],
        })
      );
    }
  }, [thuTucNoiBats]);

  return (
    <div className="rounded overflow-hidden border">
      <h5
        className="px-3 py-2 mb-0 "
        style={{ backgroundColor: "rgba(30, 47, 65, 0.1)" }}
      >
        Dịch vụ công nổi bật
      </h5>
      <div className="px-2 py-1">
        {thuTucNoiBats?.map((thuTuc, index) => {
          return <CardThuTucSmartKioskNoiBat key={index} thuTuc={thuTuc} />;
        })}
      </div>
    </div>
  );
};

const CardThuTucSmartKioskNoiBat = ({thuTuc}:{thuTuc: IThuTuc} ) => {
  // const [searchParams] = useSearchParams()
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
  return (
    <Link style={{textDecoration : 'none'}} className="text-dark" to={Service.primaryRoutes.smartkiosk.nopHoSoTrucTuyen + "?maTTHC=" + thuTuc.maTTHC }>
        <ThuTucItemSmartKiosk thuTuc={thuTuc}/>
    </Link>
  );
};