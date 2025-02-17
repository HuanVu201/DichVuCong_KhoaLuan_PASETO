import PhanAnhKienNghiChuaTraLoiTable from "./components/PaknChuaTraLoiTable";
import { PhanAnhKienNghiProvider } from "./contexts/PhanAnhKienNghiContext";

const PaknChuaTraLoiWrapper = () => (<PhanAnhKienNghiProvider>
    <PhanAnhKienNghiChuaTraLoiTable />
</PhanAnhKienNghiProvider>)

export default PaknChuaTraLoiWrapper

