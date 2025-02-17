import { IWithChildren } from "@/types";
import { createContext, useContext, useState } from "react";
import { 
  IThongKeHoSoTrucTuyenCapTinhParams, 
  IThongKeHoSoTrucTuyenCacSoBanNganhParams, 
  IThongKeHoSoTrucTuyenCapHuyenParams, 
  IThongKeHoSoTrucTuyenCapXaParams, 
} from "../models/TiepNhanHoSoTrucTuyenSearch";

//Cấp tỉnh
const ThongKeHoSoTrucTuyenCapTinhContext =
  createContext<IThongKeHoSoCapTinhContext | null>(null);
export interface IThongKeHoSoCapTinhContext {
  search: IThongKeHoSoTrucTuyenCapTinhParams;
  setSearch: React.Dispatch<React.SetStateAction<IThongKeHoSoTrucTuyenCapTinhParams>>;
}

export const useThongKeHoSoTrucTuyenCapTinhContext = () => {
  const context = useContext(ThongKeHoSoTrucTuyenCapTinhContext);
  if (!context)
    throw new Error(
      "ThongKeHoSoTrucTuyenContext must be used inside ThongKeHoSoTrucTuyenContext.Provider"
    );
  return context;
};

export const ThongKeHoSoTrucTuyenCapTinhProvider = ({ children }: IWithChildren) => {
  const [search, setSearch] = useState<IThongKeHoSoTrucTuyenCapTinhParams>({});
  return (
    <ThongKeHoSoTrucTuyenCapTinhContext.Provider
      value={{ search, setSearch }}
    >
      {children}
    </ThongKeHoSoTrucTuyenCapTinhContext.Provider>
  );
};





//Cấp các sở
const ThongKeHoSoTrucTuyenCacSoBanNganhContext =
  createContext<IThongKeHoSoCacSoBanNganhContext | null>(null);
export interface IThongKeHoSoCacSoBanNganhContext {
  search: IThongKeHoSoTrucTuyenCacSoBanNganhParams;
  setSearch: React.Dispatch<React.SetStateAction<IThongKeHoSoTrucTuyenCacSoBanNganhParams>>;
}

export const useThongKeHoSoTrucTuyenCacSoBanNganhContext = () => {
  const context = useContext(ThongKeHoSoTrucTuyenCacSoBanNganhContext);
  if (!context)
    throw new Error(
      "ThongKeHoSoTrucTuyenContext must be used inside ThongKeHoSoTrucTuyenContext.Provider"
    );
  return context;
};

export const ThongKeHoSoTrucTuyenCacSoBanNganhProvider = ({ children }: IWithChildren) => {
  const [search, setSearch] = useState<IThongKeHoSoTrucTuyenCacSoBanNganhParams>({catalog: 'so-ban-nganh'});
  return (
    <ThongKeHoSoTrucTuyenCacSoBanNganhContext.Provider
      value={{ search, setSearch }}
    >
      {children}
    </ThongKeHoSoTrucTuyenCacSoBanNganhContext.Provider>
  );
};





//Cấp huyện
const ThongKeHoSoTrucTuyenCapHuyenContext =
  createContext<IThongKeHoSoCapHuyenContext | null>(null);
export interface IThongKeHoSoCapHuyenContext {
  search: IThongKeHoSoTrucTuyenCapHuyenParams;
  setSearch: React.Dispatch<React.SetStateAction<IThongKeHoSoTrucTuyenCapHuyenParams>>;
}

export const useThongKeHoSoTrucTuyenCapHuyenContext = () => {
  const context = useContext(ThongKeHoSoTrucTuyenCapHuyenContext);
  if (!context)
    throw new Error(
      "ThongKeHoSoTrucTuyenContext must be used inside ThongKeHoSoTrucTuyenContext.Provider"
    );
  return context;
};

export const ThongKeHoSoTrucTuyenCapHuyenProvider = ({ children }: IWithChildren) => {
  const [search, setSearch] = useState<IThongKeHoSoTrucTuyenCapHuyenParams>({catalog: 'quan-huyen'});
  return (
    <ThongKeHoSoTrucTuyenCapHuyenContext.Provider
      value={{ search, setSearch }}
    >
      {children}
    </ThongKeHoSoTrucTuyenCapHuyenContext.Provider>
  );
};





//Cấp xã
const ThongKeHoSoTrucTuyenCapXaContext =
  createContext<IThongKeHoSoCapXaContext | null>(null);
export interface IThongKeHoSoCapXaContext {
  search: IThongKeHoSoTrucTuyenCapXaParams;
  setSearch: React.Dispatch<React.SetStateAction<IThongKeHoSoTrucTuyenCapXaParams>>;
}

export const useThongKeHoSoTrucTuyenCapXaContext = () => {
  const context = useContext(ThongKeHoSoTrucTuyenCapXaContext);
  if (!context)
    throw new Error(
      "ThongKeHoSoTrucTuyenContext must be used inside ThongKeHoSoTrucTuyenContext.Provider"
    );
  return context;
};

export const ThongKeHoSoTrucTuyenCapXaProvider = ({ children }: IWithChildren) => {
  const [search, setSearch] = useState<IThongKeHoSoTrucTuyenCapXaParams>({});
  return (
    <ThongKeHoSoTrucTuyenCapXaContext.Provider
      value={{ search, setSearch }}
    >
      {children}
    </ThongKeHoSoTrucTuyenCapXaContext.Provider>
  );
};
