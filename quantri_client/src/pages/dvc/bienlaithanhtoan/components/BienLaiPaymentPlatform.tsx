import { useEffect, useState } from "react";
import { AntdModal, AntdSpace } from "@/lib/antd/components";
import { IGetBienLaiThanhToan } from "../models/IBienLaiThanhToan";
import { bienLaiThanhToanApi } from "../services";
import { Button, Col, Row, Spin } from "antd";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { downloadPhieuPdf } from "../../MauPhieu/documents/pdf/ExportHtmlToPdf";
import { FilePdfOutlined, PrinterOutlined } from "@ant-design/icons";

import { IBienLaiThanhToan } from "../models/IBienLaiThanhToan";
import { XuatBienLaiModal } from "./XuatBienLaiModal";
import { LoadingOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";
import { giaoDichThanhToanApi } from "@/features/giaodichthanhtoan/services";
import { IGiaoDichThanhToanDetailPortal } from "@/features/portaldvc/ThanhToan/models/GiaoDichThanhToan";

export const BienLaiPaymentPlatformDetail = ({
  maGiaoDich,
  handleCancel,
}: {
  maGiaoDich: string;
  handleCancel: () => void;
}) => {
  const [bienLaiData, setBienLaiData] = useState<IGiaoDichThanhToanDetailPortal>();
  const [isLoadingBienLai, setIsLoadingBienLai] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoadingBienLai(true);
      try {
        var res = (await giaoDichThanhToanApi.GetByMaThamChieu(maGiaoDich)).data;

        if (res && res.succeeded) {
          setBienLaiData(res?.data)
        } else {
          handleCancel();
          toast.warning("Không có thông tin biên lai!");
        }
      } catch (exception: any) {
        toast.warning(exception?.response.data);
        // handleCancel();
      }
    })();
  }, [maGiaoDich]);



  useEffect(() => {
    if (bienLaiData) {
      setIsLoadingBienLai(false);

      if (!bienLaiData?.duongDanBienLai) {
        toast.warning("Không có thông tin biên lai")
        handleCancel()
      } else {
        toast.success("Xuất biên lai thành công!");
      }
    }
  }, [bienLaiData]);

  return (
    <>
      <AntdModal
        title="Thông tin biên lai điện tử"
        visible={true}
        handlerCancel={handleCancel}
        fullsizeScrollable
        footer={null}
      >
        <Spin
          spinning={isLoadingBienLai}
          indicator={
            <LoadingOutlined
              style={{ fontSize: 50, color: "#f0ad4e" }}
              spin
            />
          }
        >
          <Row gutter={[8, 8]}>
            <Col span={24} style={{ textAlign: "center" }}>
              <iframe
                src={`${window.location.origin}${bienLaiData?.duongDanBienLai}`}
                width="100%"
                height="600px"
              ></iframe>
            </Col>
          </Row>
        </Spin>
      </AntdModal>

    </>
  );
};
