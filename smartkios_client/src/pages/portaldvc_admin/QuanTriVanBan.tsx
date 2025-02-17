import QuanLyVanBanTable from "@/features/portaldvc_admin/QuanLyVanBan/components/QuanLyVanBanTable";
import { QuanLyVanBanProvider } from "@/features/portaldvc_admin/QuanLyVanBan/contexts/QuanLyVanBanContext";

const QuanLyVanBanWrapper = () => (<QuanLyVanBanProvider>
    <QuanLyVanBanTable />
</QuanLyVanBanProvider>)

export default QuanLyVanBanWrapper
