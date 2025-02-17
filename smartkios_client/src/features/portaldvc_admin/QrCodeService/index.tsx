import { Button, Col, Divider, Row } from "antd";
import './index.scss'
import { QrCodeServiceProvider, useQrCodeServiceContext } from "./context/QrCodeService";
import QrCodeServiceTable from "./components/QrCodeTable";
const QrCodeService = () => {
    const QrCodeServiceContext = useQrCodeServiceContext()
    

    return (
        <div className="QrService">
            <Button className="button" htmlType="submit" onClick={()=> QrCodeServiceContext.setCreatQrCodeService(true)}>Thêm mới Qr Code</Button>
            <QrCodeServiceTable/>
        </div>
    );
};



function DanhMucThuTucPortalWrapper() {
    return (
      <QrCodeServiceProvider>
        <QrCodeService />
      </QrCodeServiceProvider>
    );
  }
export default DanhMucThuTucPortalWrapper