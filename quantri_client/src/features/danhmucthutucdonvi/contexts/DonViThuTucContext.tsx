import { ISearchUser } from "@/features/user/models";
import { IWithChildren } from "@/types";
import { DefaultOptionType } from "antd/es/select";
import React, { createContext, useContext, useState } from "react";

const DonViThuTucContext = createContext<IDonViThuTucContext | null>(null);

export interface IDonViThuTucContext {
  donViThuTucId: string | undefined;
  setDonViThuTucId: React.Dispatch<React.SetStateAction<string | undefined>>;
  themCanBoTiepNhanModalVisible: boolean;
  setThemCanBoTiepNhanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  boSungCanBoTiepNhanModalVisible: boolean;
  setBoSungCanBoTiepNhanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  boCanBoTiepNhanModalVisible: boolean;
  setBoCanBoTiepNhanModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  chonMucDoModalVisible: boolean;
  setChonMucDoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

  updateTkThuHuongModalVisible: boolean;
  setUpdateTkThuHuongModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  selectedDonViThuTucs: string[];
  setSelectedDonViThuTucs: React.Dispatch<React.SetStateAction<string[]>>;

  searchTaiKhoans: ISearchUser;
  setSearchTaiKhoans: React.Dispatch<React.SetStateAction<ISearchUser>>;
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

  const [themCanBoTiepNhanModalVisible, setThemCanBoTiepNhanModalVisible] =
    useState<boolean>(false);
    const [boCanBoTiepNhanModalVisible, setBoCanBoTiepNhanModalVisible] =
    useState<boolean>(false);
  const [selectedDonViThuTucs, setSelectedDonViThuTucs] = useState<string[]>(
    []
  );
  const [chonMucDoModalVisible, setChonMucDoModalVisible] =
    useState<boolean>(false);
  const [updateTkThuHuongModalVisible, setUpdateTkThuHuongModalVisible] =
    useState<boolean>(false);
    const [boSungCanBoTiepNhanModalVisible, setBoSungCanBoTiepNhanModalVisible] =
    useState<boolean>(false);
  const [searchTaiKhoans, setSearchTaiKhoans] = useState<ISearchUser>({
    pageNumber: 1,
    pageSize: 20,
  });

  // thêm các hàm search cho các tabs ở đây
  return (
    <DonViThuTucContext.Provider
      value={{
        boCanBoTiepNhanModalVisible,
        setBoCanBoTiepNhanModalVisible,
        donViThuTucId,
        setDonViThuTucId,
        themCanBoTiepNhanModalVisible,
        setThemCanBoTiepNhanModalVisible,
        selectedDonViThuTucs,
        setSelectedDonViThuTucs,
        chonMucDoModalVisible,
        setChonMucDoModalVisible,
        updateTkThuHuongModalVisible,
        setUpdateTkThuHuongModalVisible,
        boSungCanBoTiepNhanModalVisible, 
        setBoSungCanBoTiepNhanModalVisible,
        searchTaiKhoans,
        setSearchTaiKhoans,
      }}
    >
      {children}
    </DonViThuTucContext.Provider>
  );
};
