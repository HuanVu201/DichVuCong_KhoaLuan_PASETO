import QuanLyDanhMucNganhTable from "@/features/portaldvc_admin/DanhMucNganh/components/DanhMucNganhTable";
import { DanhMucNganhProvider } from "@/features/portaldvc_admin/DanhMucNganh/contexts/DanhMucNganhContext";

const QuanLyDanhMucNganhWrapper = () => (<DanhMucNganhProvider>
    <QuanLyDanhMucNganhTable />
</DanhMucNganhProvider>)

export default QuanLyDanhMucNganhWrapper
