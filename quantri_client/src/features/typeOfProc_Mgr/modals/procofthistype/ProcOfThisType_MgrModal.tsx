import { useTypeOfProc_MgrContext } from "../../contexts/TypeOfProc_MgrContext";
import { AntdModal } from "@/lib/antd/components";
import { lazy } from "@/utils/lazyLoading";
import { Spin } from "antd";
import { Suspense } from "react";
const ProcOfThisType_MgrTableTableWrapperLazy = lazy(
  () => import("@/features/procofthistype_mgr/components/ProcOfThisType_MgrTable")
);

export const ProcOfThisType_MgrModal = () => {
  const typeOfProc_MgrContext = useTypeOfProc_MgrContext();
  const handlerCancel = () => {
    typeOfProc_MgrContext.setList_ProcOfThisTyPeModalVisible(false);
  };
  return (
    <AntdModal
      footer={null}
      fullsize
      visible={true}
      title="Danh sách thủ tục"
      handlerCancel={handlerCancel}
    >
      <Suspense fallback={<Spin spinning={true}></Spin>}>
        <ProcOfThisType_MgrTableTableWrapperLazy/>
      </Suspense> 
    </AntdModal>
   );
};
