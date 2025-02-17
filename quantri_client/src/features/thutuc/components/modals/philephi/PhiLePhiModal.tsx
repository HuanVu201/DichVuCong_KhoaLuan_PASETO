import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import PhiLePhiTableWrapper from "@/features/philephi/components/phiLePhiTable"
import { AntdModal } from "@/lib/antd/components"

export const PhiLePhiModal = () => {
    const thuTucContext = useThuTucContext()
    const handlerCancel = () => {
        thuTucContext.setPhiLePhiModalVisible(false)
    }
    return <AntdModal footer={null} fullsize visible={true} title="Danh sách phí, lệ phí" handlerCancel={handlerCancel}>
        <PhiLePhiTableWrapper />
    </AntdModal>
}