import { useProcGroup_MgrContext } from "../../contexts/ProcGroup_MgrContext";
import { AntdModal } from "@/lib/antd/components";
import { lazy } from "@/utils/lazyLoading";
import { Spin } from "antd";
import { Suspense } from "react";
const TypeOfProc_MgrTableTableWrapperLazy = lazy(
  () => import("@/features/typeOfProc_Mgr/components/TypeOfProc_MgrTable")
);

export const TypeOfProc_MgrModal = () => {
  const procGroup_MgrContext = useProcGroup_MgrContext();
  const handlerCancel = () => {
    procGroup_MgrContext.setList_TypeOfProc_MgrModalVisible(false);
  };
  return (
    <AntdModal
      footer={null}
      fullsize
      visible={true}
      title="Danh sách loại thủ tục"
      handlerCancel={handlerCancel}
    >
       <Suspense fallback={<Spin spinning={true}></Spin>}>
        <TypeOfProc_MgrTableTableWrapperLazy/>
      </Suspense> 
    </AntdModal>
   );
};
