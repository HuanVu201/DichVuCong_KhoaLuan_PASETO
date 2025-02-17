import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { 
  ITienDoGiaiQuyetParams,
    ITheoDoiChiTieuDVCTrucTuyenParams,
    IThanhToanTrucTuyenParams,
} from "../models/ThongKeQD766Search";
//Tiến độ giải quyết
const TienDoGiaiQuyetContext =
  createContext<IThongKeTienDoGiaiQuyetContext | null>(null);
export interface IThongKeTienDoGiaiQuyetContext {
  search: ITienDoGiaiQuyetParams;
  setSearch: React.Dispatch<React.SetStateAction<ITienDoGiaiQuyetParams>>;
}

export const useTienDoGiaiQuyetContext = () => {
  const context = useContext(TienDoGiaiQuyetContext);
  if (!context)
    throw new Error(
      "TienDoGiaiQuyetContext must be used inside TienDoGiaiQuyetContext.Provider"
    );
  return context;
};

export const TienDoGiaiQuyetContextProvider = ({ children }: IWithChildren) => {
  const [search, setSearch] = useState<ITienDoGiaiQuyetParams>({});
  return (
    <TienDoGiaiQuyetContext.Provider
      value={{ search, setSearch }}
    >
      {children}
    </TienDoGiaiQuyetContext.Provider>
  );
};



//Theo dõi chỉ tiêu DVC trực tuyến
const TheoDoiChiTieuDVCTrucTuyenContext =
  createContext<IThongKeContext | null>(null);
export interface IThongKeContext {
  search: ITheoDoiChiTieuDVCTrucTuyenParams;
  setSearch: React.Dispatch<React.SetStateAction<ITheoDoiChiTieuDVCTrucTuyenParams>>;
}

export const useTheoDoiChiTieuDVCTrucTuyenContext = () => {
  const context = useContext(TheoDoiChiTieuDVCTrucTuyenContext);
  if (!context)
    throw new Error(
      "TheoDoiChiTieuDVCTrucTuyenContext must be used inside TheoDoiChiTieuDVCTrucTuyenContext.Provider"
    );
  return context;
};

export const TheoDoiChiTieuDVCTrucTuyenContextProvider = ({ children }: IWithChildren) => {
  const [search, setSearch] = useState<ITheoDoiChiTieuDVCTrucTuyenParams>({});
  return (
    <TheoDoiChiTieuDVCTrucTuyenContext.Provider
      value={{ search, setSearch }}
    >
      {children}
    </TheoDoiChiTieuDVCTrucTuyenContext.Provider>
  );
};


//Thanh toán trực tuyến
const ThanhToanTrucTuyenContext =
  createContext<IThanhToanTrucTuyenContext | null>(null);
export interface IThanhToanTrucTuyenContext {
  search: IThanhToanTrucTuyenParams;
  setSearch: React.Dispatch<React.SetStateAction<IThanhToanTrucTuyenParams>>;
}

export const useThanhToanTrucTuyenContext = () => {
  const context = useContext(ThanhToanTrucTuyenContext);
  if (!context)
    throw new Error(
      "ThanhToanTrucTuyenContext must be used inside ThanhToanTrucTuyenContext.Provider"
    );
  return context;
};

export const ThanhToanTrucTuyenContextProvider = ({ children }: IWithChildren) => {
  const [search, setSearch] = useState<IThanhToanTrucTuyenParams>({});
  return (
    <ThanhToanTrucTuyenContext.Provider
      value={{ search, setSearch }}
    >
      {children}
    </ThanhToanTrucTuyenContext.Provider>
  );
};




