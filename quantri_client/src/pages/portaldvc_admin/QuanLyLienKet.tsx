import QuanLyLienKetTable from "@/features/portaldvc_admin/QuanLyLienKet/components/QuanLyLienKetTable";
import { QuanLyLienKetProvider } from "@/features/portaldvc_admin/QuanLyLienKet/contexts/QuanLyLienKetContext";

const QuanLyLienKetWrapper = () => (<QuanLyLienKetProvider>
    <QuanLyLienKetTable />
</QuanLyLienKetProvider>)

export default QuanLyLienKetWrapper
