import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { ISearchDanhMucThuTucPortal } from "../models/DanhMucThuTucPortal";
import { ISearchLinhVuc } from "@/features/linhvuc/models";
import { NavigateOptions, SetURLSearchParams, useSearchParams } from "react-router-dom";


const DanhMucThuTucPortalContext =
  createContext<IThuTucContext | null>(null);


export interface IThuTucContext {
  thuTucId: string | null;
  setThuTucId: React.Dispatch<React.SetStateAction<string | null>>;
  maThuTuc: string | null;
  setMaThuTuc: React.Dispatch<React.SetStateAction<string | null>>;
  search: ISearchDanhMucThuTucPortal;
  setSearch: React.Dispatch<React.SetStateAction<ISearchDanhMucThuTucPortal>>;
  searchPortal: ISearchLinhVuc;
  setSearchPortal: React.Dispatch<React.SetStateAction<ISearchLinhVuc>>;

  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  handleUrlQueryStringChange: (formData: Record<string, string>, navOpts?: NavigateOptions) => void;
}


export const useDanhMucThuTucPortalContext = () => {
  const context = useContext(DanhMucThuTucPortalContext);
  if (!context)
    throw new Error(
      "DanhMucThuTucPortalContext must be used inside DanhMucThuTucPortalContext.Provider"
    );
  return context;
};


export const DanhMucThuTucPortalProvider = ({ children }: IWithChildren) => {
  const [thuTucId, setThuTucId] = useState<string | null>("");
  const [maThuTuc, setMaThuTuc] = useState<string | null>("");
  const [searchPortal, setSearchPortal] = useState<ISearchLinhVuc>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [searchParams, setSearchParams] = useSearchParams()
  const handleUrlQueryStringChange = (formData: Record<string, string>, navOpts?: NavigateOptions) => {
    setSearchParams((curr) => {
      const urlQuery: Record<string, string> = {}
      curr.forEach((value, key) => {
        if (value !== undefined) {
          urlQuery[key] = value
        }
      });

      Object.keys(formData).map((key:any) => {
        if (formData[key]) {
          urlQuery[key] = formData[key]
        } else {
          delete urlQuery[key]
        }
      })
      return { ...urlQuery }
    }, navOpts)
  }
  const [search, setSearch] = useState<ISearchDanhMucThuTucPortal>({
    pageNumber: 1,
    pageSize: 10,
  });
  return (
    <DanhMucThuTucPortalContext.Provider
      value={{
        thuTucId, setThuTucId,
        maThuTuc, setMaThuTuc,
        search, setSearch,
        searchPortal, setSearchPortal,
        searchParams, setSearchParams,
        handleUrlQueryStringChange
      }}
    >
      {children}
    </DanhMucThuTucPortalContext.Provider>
  );
};
