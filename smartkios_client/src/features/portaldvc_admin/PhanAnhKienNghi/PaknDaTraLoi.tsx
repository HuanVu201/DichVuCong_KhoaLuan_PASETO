import PhanAnhKienNghiDaTraLoiTable from "./components/PaknDaTraLoiTable";
import { PhanAnhKienNghiProvider } from "./contexts/PhanAnhKienNghiContext";

const PaknDaTraLoiWrapper = () => (<PhanAnhKienNghiProvider>
    <PhanAnhKienNghiDaTraLoiTable />
</PhanAnhKienNghiProvider>)

export default PaknDaTraLoiWrapper

