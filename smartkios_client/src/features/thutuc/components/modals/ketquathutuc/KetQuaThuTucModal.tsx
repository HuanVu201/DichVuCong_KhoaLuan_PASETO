import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { AntdModal } from "@/lib/antd/components"
import { Spin } from "antd";
import React, { Suspense } from "react"

const LoaiKetQuaThuTucWrapperLazy = React.lazy(() => import("../../../../ketquathutuc/components/KetQuaThuTucTable"))

const KetQuaThuTucModal = () => {
    const thuTucContext = useThuTucContext();
    const handlerCancel = () => {
      thuTucContext.setKetQuaThuTucModalVisible(false);
    };

    return <AntdModal
    footer={null}
    fullsize
    visible={true}
    title={"DANH SÁCH KẾT QUẢ THỦ TỤC"}
    handlerCancel={handlerCancel}
  >
    <Suspense fallback={<Spin rootClassName="suspense-spin" spinning={true}></Spin>}>
      <LoaiKetQuaThuTucWrapperLazy />
    </Suspense>
  </AntdModal>
}

export default KetQuaThuTucModal