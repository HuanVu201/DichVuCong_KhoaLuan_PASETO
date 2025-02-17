import HoiDapTable from "@/features/portaldvc_admin/HoiDap/components/HoiDapTable";
import { HoiDapProvider } from "@/features/portaldvc_admin/HoiDap/contexts/HoiDapContext";

const HoiDapWrapper = () => (<HoiDapProvider>
    <HoiDapTable />
</HoiDapProvider>)

export default HoiDapWrapper