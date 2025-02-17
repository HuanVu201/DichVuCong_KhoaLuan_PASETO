import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
// import PhiLePhiTableWrapper from "@/features/philephi/components/phiLePhiTable"
import { AntdModal } from "@/lib/antd/components";
import DonViThuTucTableWrapper from "@/features/donvi/components/DonViTable";
import { Suspense, useState } from "react";
import { Spin } from "antd";
import { ISearchDonVi } from "@/features/donvi/models";
import { useAppSelector } from "@/lib/redux/Hooks";
import { lazy } from "@/utils/lazyLoading";
const DonViThuTucTableWrapperLazy = lazy(
  () => import("@/features/donvithutuc/components/DonViThuTucTable")
);

export const DonViThuTucModal = () => {
  const thuTucContext = useThuTucContext();
  const handlerCancel = () => {
    thuTucContext.setDonViThuTucModalVisible(false);
  };
  return (
    <AntdModal
      footer={null}
      fullsizeScrollable
      visible={true}
      title={
        thuTucContext.tenThuTuc
          ? "Đơn vị thực hiện: " + thuTucContext.tenThuTuc
          : "Danh sách đơn vị thực hiện"
      }
      handlerCancel={handlerCancel}
    >
      <Suspense fallback={<Spin spinning={true}></Spin>}>
        <DonViThuTucTableWrapperLazy />
      </Suspense>
    </AntdModal>
  );
};
