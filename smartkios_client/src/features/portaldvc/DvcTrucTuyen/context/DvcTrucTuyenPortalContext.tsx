import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";

import { NavigateOptions, SetURLSearchParams, useSearchParams } from "react-router-dom";
import { IThuTuc } from "@/features/thutuc/models";
import { ITruongHopThuTuc } from "@/features/truonghopthutuc/models";
import { IDonViThuTuc } from "@/features/donvithutuc/models";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
export type DonViThuTucGroup = IDonViThuTuc & Pick<ICoCauToChuc, "ofGroupCode" | "ofGroupName">

const DvcTrucTuyenPortalContext =
  createContext<IDvcTrucTuyenPortalContext | null>(null);
export interface IDvcTrucTuyenPortalContext {
  thuTuc: IThuTuc | undefined;
  setThuTuc: React.Dispatch<React.SetStateAction<IThuTuc | undefined>>;
  donViThuTucs: DonViThuTucGroup[] | undefined;
  setDonViThuTucs: React.Dispatch<React.SetStateAction<DonViThuTucGroup[] | undefined>>;
  truongHopThuTucs: ITruongHopThuTuc[] | undefined;
  setTruongHopThuTucs: React.Dispatch<React.SetStateAction<ITruongHopThuTuc[] | undefined>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  handleUrlQueryStringChange: (formData: Record<string, string>, navOpts?: NavigateOptions ) => void;
  maTinh: DonViThuTucGroup[];
  setMaTinh: React.Dispatch<React.SetStateAction<DonViThuTucGroup[]>>;
  maHuyen: DonViThuTucGroup[];
  setMaHuyen: React.Dispatch<React.SetStateAction<DonViThuTucGroup[]>>;
  maXa: DonViThuTucGroup[];
  setMaXa: React.Dispatch<React.SetStateAction<DonViThuTucGroup[]>>;
}
export const useDvcTrucTuyenPortalContext = () => {
  const context = useContext(DvcTrucTuyenPortalContext);
  if (!context)
    throw new Error(
      "DvcTrucTuyenPortalContext must be used inside DvcTrucTuyenPortalContext.Provider"
    );
  return context;
};

export const DvcTrucTuyenPortalProvider = ({ children }: IWithChildren) => {
  const [thuTuc, setThuTuc] = useState<IThuTuc>();
  const [truongHopThuTucs, setTruongHopThuTucs] = useState<ITruongHopThuTuc[]>();
  const [donViThuTucs, setDonViThuTucs] = useState<DonViThuTucGroup[]>();
  const [maTinh, setMaTinh] = useState<DonViThuTucGroup[]>([]);
  const [maHuyen, setMaHuyen] = useState<DonViThuTucGroup[]>([]);
  const [maXa, setMaXa] = useState<DonViThuTucGroup[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({pageSize: '50', pageNumber:'1'})
  const handleUrlQueryStringChange = (formData: Record<string, string>, navOpts?: NavigateOptions) => {
    setSearchParams((curr) => {
      const urlQuery: Record<string, string> = {}
      curr.forEach((value, key) => {
        if(value !== undefined){
          urlQuery[key] = value
        }
      });

      Object.keys(formData).map((key) => {
        if(formData[key]){
          if(["maTinh", "maHuyen", "maXa"].includes(key)){
            urlQuery["donVi"] = formData[key] 
          } else {
            urlQuery[key] = formData[key] 
          }
        } else {
          delete urlQuery[key]
        }
      })
      return urlQuery
    }, navOpts)
  }
  
  return (
    <DvcTrucTuyenPortalContext.Provider
      value={{
        maTinh,
        setMaTinh,
        maHuyen,
        setMaHuyen,
        maXa,
        setMaXa,
        thuTuc,
        setThuTuc,
        donViThuTucs,
        setDonViThuTucs,
        truongHopThuTucs,
        setTruongHopThuTucs,
        searchParams,
        setSearchParams,
        handleUrlQueryStringChange
      }}
    >
      {children}
    </DvcTrucTuyenPortalContext.Provider>
  );
};
