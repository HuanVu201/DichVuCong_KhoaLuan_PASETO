import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { AntdModal } from "@/lib/antd/components";
import { lazy } from "@/utils/lazyLoading";
import { Spin } from "antd";
import { Suspense } from "react";
const TruongHopThuTucTableWrapperLazy = lazy(
  () => import("@/features/truonghopthutuc/components/TruongHopThuTucTable")
);

export const TruongHopModal = () => {
  const thuTucContext = useThuTucContext();
  const handlerCancel = () => {
    thuTucContext.setTruongHopThuTucModalVisible(false);
  };
  return (
    <AntdModal
      footer={null}
      fullsize
      visible={true}
      title="Danh sách trường hợp thủ tục"
      handlerCancel={handlerCancel}
    >
      <Suspense fallback={<Spin spinning={true}></Spin>}>
        <TruongHopThuTucTableWrapperLazy />
      </Suspense>
    </AntdModal>
  );
};
