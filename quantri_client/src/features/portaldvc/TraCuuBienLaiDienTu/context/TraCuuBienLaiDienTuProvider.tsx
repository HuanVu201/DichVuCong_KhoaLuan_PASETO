import { IHoSo } from "@/features/hoso/models";
import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { NavigateOptions, SetURLSearchParams, useSearchParams } from "react-router-dom";
import { IBienLaiDienTuPortal, IBienLaiThanhToanPortal, IGetBienLaiThanhToanPortal } from "../model";


const TraCuuBienLaiDienTuContext = createContext<ITraCuuBienLaiDienTuContext | null>(null)

export interface ITraCuuBienLaiDienTuContext {
  bienLai: IBienLaiDienTuPortal | undefined;
  setBienLai: React.Dispatch<React.SetStateAction<IBienLaiDienTuPortal | undefined>>;
  bienLaiDetail: IBienLaiThanhToanPortal | undefined;
  setBienLaiDetail: React.Dispatch<React.SetStateAction<IBienLaiThanhToanPortal | undefined>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  getBienLaiParams: IGetBienLaiThanhToanPortal | undefined;
  setGetBienLaiParams: React.Dispatch<React.SetStateAction<IGetBienLaiThanhToanPortal | undefined>>;
  handleUrlQueryStringChange: (formData: Record<string, string>, navOpts?: NavigateOptions) => void;
  viewBienLaiThanhToanVisible: boolean;
  setViewBienLaiThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  exsitedBienLai: boolean;
  setExsitedBienLai: React.Dispatch<React.SetStateAction<boolean>>;
  

}

export const useTraCuuBienLaiDienTuContext = () => {
  const context = useContext(TraCuuBienLaiDienTuContext)
  if (!context)
    throw new Error("TraCuuContext must be used inside TraCuuContext.Provider")
  return context
}

export const TraCuuBienLaiDienTuProvider = (props: IWithChildren) => {
  const [bienLai, setBienLai] = useState<IBienLaiDienTuPortal>()
  const [bienLaiDetail, setBienLaiDetail] = useState<IBienLaiThanhToanPortal>()
  const [viewBienLaiThanhToanVisible, setViewBienLaiThanhToanVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [exsitedBienLai, setExsitedBienLai] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [getBienLaiParams, setGetBienLaiParams] = useState<IGetBienLaiThanhToanPortal>()
  const handleUrlQueryStringChange = (formData: Record<string, string>, navOpts?: NavigateOptions) => {
    setSearchParams((curr) => {
      const urlQuery: Record<string, string> = {}
      curr.forEach((value, key) => {
        if (value !== undefined) {
          urlQuery[key] = value
        }
      });

      Object.keys(formData).map((key) => {
        if (formData[key]) {
          if (["maTinh", "maHuyen", "maXa"].includes(key)) {
            urlQuery["donVi"] = formData[key]
          } else {
            urlQuery[key] = formData[key]
          }
        } else {
          delete urlQuery[key]
        }
      })
      return { ...urlQuery }
    }, navOpts)
  }
  return <TraCuuBienLaiDienTuContext.Provider value={{
    bienLai, setBienLai,
    viewBienLaiThanhToanVisible, setViewBienLaiThanhToanVisible,
    loading, setLoading,
    exsitedBienLai, setExsitedBienLai,
    getBienLaiParams, setGetBienLaiParams,
    bienLaiDetail, setBienLaiDetail,
    searchParams,
    setSearchParams,
    handleUrlQueryStringChange
  }}>
    {props.children}
  </TraCuuBienLaiDienTuContext.Provider>
}