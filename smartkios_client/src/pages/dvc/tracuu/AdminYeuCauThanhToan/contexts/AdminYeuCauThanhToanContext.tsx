import { IGiayToSoHoa } from "@/features/giaytosohoa/models";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

const AdminYeuCauThanhToanContext =
  createContext<IAdminYeuCauThanhToanContext | null>(null);

export interface IAdminYeuCauThanhToanContext {
  viewYeuCauThanhToanVisible: boolean;
  setViewYeuCauThanhToanVisible: React.Dispatch<React.SetStateAction<boolean>>;

  selectedIds: React.Key[];
  setSelectedIds: React.Dispatch<React.SetStateAction<React.Key[]>>;
}

export const useAdminYeuCauThanhToanContext = () => {
  const context = useContext(AdminYeuCauThanhToanContext);
  if (!context)
    throw new Error(
      "AdminYeuCauThanhToanContext must be used inside AdminYeuCauThanhToanContext.Provider"
    );
  return context;
};

export const AdminYeuCauThanhToanProvider = ({ children }: IWithChildren) => {
  const [viewYeuCauThanhToanVisible, setViewYeuCauThanhToanVisible] =
    useState<boolean>(false);

  const [selectedIds, setSelectedIds] = useState<React.Key[]>([]);
  return (
    <AdminYeuCauThanhToanContext.Provider
      value={{
        viewYeuCauThanhToanVisible,
        setViewYeuCauThanhToanVisible,
        selectedIds,
        setSelectedIds,
      }}
    >
      {children}
    </AdminYeuCauThanhToanContext.Provider>
  );
};
