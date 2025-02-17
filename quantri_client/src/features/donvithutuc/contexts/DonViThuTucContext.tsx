import { IWithChildren } from "@/types";
import { DefaultOptionType } from "antd/es/select";
import React, { createContext, useContext, useState } from "react";

const DonViThuTucContext = createContext<IDonViThuTucContext | null>(null);

export interface IDonViThuTucContext {
  donViThuTucId: string | undefined;
  setDonViThuTucId: React.Dispatch<React.SetStateAction<string | undefined>>;
  donViThuTucModalVisible: boolean;
  setDonViThuTucModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUsers: string[] | undefined;
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>;

  AddMultiDonViThuTucModalVisible: boolean;
  setAddMultiDonViThuTucModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const useDonViThuTucContext = () => {
  const context = useContext(DonViThuTucContext);
  if (!context)
    throw new Error(
      "DonViThuTucContext must be used inside DonViThuTucContext.Provider"
    );
  return context;
};

export const DonViThuTucProvider = ({ children }: IWithChildren) => {
  const [donViThuTucId, setDonViThuTucId] = useState<string>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>();

  const [donViThuTucModalVisible, setDonViThuTucModalVisible] =
    useState<boolean>(false);
  const [AddMultiDonViThuTucModalVisible, setAddMultiDonViThuTucModalVisible] =
    useState<boolean>(false);
  // thêm các hàm search cho các tabs ở đây
  return (
    <DonViThuTucContext.Provider
      value={{
        donViThuTucId,
        setDonViThuTucId,
        donViThuTucModalVisible,
        setDonViThuTucModalVisible,
        selectedUsers,
        setSelectedUsers,
        AddMultiDonViThuTucModalVisible,
        setAddMultiDonViThuTucModalVisible,
      }}
    >
      {children}
    </DonViThuTucContext.Provider>
  );
};
