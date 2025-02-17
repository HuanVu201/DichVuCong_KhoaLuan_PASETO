import {
  ISearchBaoCaoDonVi,
  ISearchBaoCaoThuTuc,
} from "@/features/baocaotonghop/model";
import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";

//Tiến độ giải quyết
const BaoCaoTongHopContext = createContext<IThongKeBaoCaoTongHopContext | null>(
  null
);
export interface IThongKeBaoCaoTongHopContext {
  searchBaoCaoThuTuc: ISearchBaoCaoThuTuc;
  setSearchBaoCaoThuTuc: React.Dispatch<
    React.SetStateAction<ISearchBaoCaoThuTuc>
  >;
  searchBaoCaoTongHopDonVi: ISearchBaoCaoThuTuc;
  setSearchBaoCaoTongHopDonVi: React.Dispatch<
    React.SetStateAction<ISearchBaoCaoThuTuc>
  >;
  searchBaoCaoLinhVuc: ISearchBaoCaoThuTuc;
  setSearchBaoCaoLinhVuc: React.Dispatch<
    React.SetStateAction<ISearchBaoCaoThuTuc>
  >;
  searchBaoCaoDonVi: ISearchBaoCaoDonVi;
  setSearchBaoCaoDonVi: React.Dispatch<
    React.SetStateAction<ISearchBaoCaoDonVi>
  >;
}

export const useBaoCaoTongHopContext = () => {
  const context = useContext(BaoCaoTongHopContext);
  if (!context)
    throw new Error(
      "BaoCaoTongHopContext must be used inside BaoCaoTongHopContext.Provider"
    );
  return context;
};

export const BaoCaoTongHopProvider = ({ children }: IWithChildren) => {
  const [searchBaoCaoThuTuc, setSearchBaoCaoThuTuc] =
    useState<ISearchBaoCaoThuTuc>({});
  const [searchBaoCaoLinhVuc, setSearchBaoCaoLinhVuc] =
    useState<ISearchBaoCaoThuTuc>({});
  const [searchBaoCaoDonVi, setSearchBaoCaoDonVi] =
    useState<ISearchBaoCaoDonVi>({});
  const [searchBaoCaoTongHopDonVi, setSearchBaoCaoTongHopDonVi] =
    useState<ISearchBaoCaoDonVi>({});
  return (
    <BaoCaoTongHopContext.Provider
      value={{
        searchBaoCaoThuTuc,
        setSearchBaoCaoThuTuc,
        searchBaoCaoLinhVuc,
        setSearchBaoCaoLinhVuc,
        searchBaoCaoDonVi,
        setSearchBaoCaoDonVi,
        searchBaoCaoTongHopDonVi,
        setSearchBaoCaoTongHopDonVi,
      }}
    >
      {children}
    </BaoCaoTongHopContext.Provider>
  );
};
