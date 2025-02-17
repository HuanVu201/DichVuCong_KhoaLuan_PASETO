import { useEffect, useState } from "react";
import { AntdModal, AntdSpace } from "@/lib/antd/components";
import { IGetBienLaiThanhToan } from "../models/IBienLaiThanhToan";
import { bienLaiThanhToanApi } from "../services";
import { Button, Spin } from "antd";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { downloadPhieuPdf } from "../../MauPhieu/documents/pdf/ExportHtmlToPdf";
import { FilePdfOutlined, PrinterOutlined } from "@ant-design/icons";

import { IBienLaiThanhToan } from "../models/IBienLaiThanhToan";
import { XuatBienLaiModal } from "./XuatBienLaiModal";
import { LoadingOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";

export const BienLaiDienTuDetail = ({
  bienLai,
  handleCancel,
}: {
  bienLai: IGetBienLaiThanhToan;
  handleCancel: () => void;
}) => {
  const [bienLaiContent, setBienLaiContent] = useState<string>("");
  const [bienLaiData, setBienLaiData] = useState<IBienLaiThanhToan>();
  const [isLoadingBienLai, setIsLoadingBienLai] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoadingBienLai(true);
      try {
        var res = (await bienLaiThanhToanApi.GetBienLai(bienLai)).data;

        if (res && res.succeeded) {
          setBienLaiData(res.data);
          setBienLaiContent(res.data?.bienLaiDienTu);
        } else {
          handleCancel();
          toast.warning("Không có thông tin biên lai!");
        }
      } catch (exception: any) {
        toast.warning(exception?.response.data);
        // handleCancel();
      }
    })();
  }, [bienLai]);
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn Ctrl+P
        taiPhieu(); // Gọi hàm in PDF
      }
    };
    // Nghe sự kiện keydown trên cả trang web
    document.addEventListener("keydown", handleKeyPress);
    // Xóa bỏ sự kiện khi component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const taiPhieu = async () => {
    const iframe: any = document.getElementById("ContainerSwapper1")?.innerHTML;
    let fakeIFrame = window.document.createElement("iframe");
    fakeIFrame.style.display = "none";
    document.body.appendChild(fakeIFrame);
    let fakeContent = fakeIFrame.contentWindow;
    if (fakeContent) {
      fakeContent.document.open();
      fakeContent.document.write(iframe);
      fakeContent.document.close();
      fakeContent.focus();
      fakeContent.print();
      document.body.removeChild(fakeIFrame);
    }
  };
  useEffect(() => {
    if (bienLaiData && bienLaiData.loaiBienLaiThanhToan != "local") {
      setIsLoadingBienLai(false);
      toast.success("Xuất biên lai thành công!");
    }
  }, [bienLaiData]);

  return (
    <>
      {bienLaiData?.loaiBienLaiThanhToan == "vnpt" ? (
        <AntdModal
          title="Thông tin biên lai điện tử"
          visible={bienLaiData?.loaiBienLaiThanhToan == "vnpt" ? true : false}
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
            {bienLaiContent ? (
              <>
                <AntdSpace direction="horizontal">
                  <Button onClick={() => taiPhieu()} disabled={false}>
                    <PrinterOutlined style={{ color: "#4B8DF8" }} /> In biên lai
                  </Button>
                </AntdSpace>

                <div
                  id="ContainerSwapper1"

                  dangerouslySetInnerHTML={{ __html: bienLaiContent }}
                ></div>
              </>
            ) : (
              "Không có thông tin biên lai"
            )}
          </Spin>
        </AntdModal>
      ) : bienLaiData?.loaiBienLaiThanhToan == "viettel" ? (
        <AntdModal
          title="Thông tin biên lai điện tử"
          visible={bienLaiData?.loaiBienLaiThanhToan == "viettel" ? true : false}
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
            {bienLaiContent ? (
              <>
                <iframe src={`data:application/pdf;base64,${bienLaiContent}`} height="700" width="100%"></iframe>
              </>
            ) : (
              "Không có thông tin biên lai"
            )}
          </Spin>
        </AntdModal>
      ) : (
        <XuatBienLaiModal
          loaiPhi={bienLai.loaiPhi || ""}
          handleCancel={handleCancel}
          bienLaiData={bienLaiData}
        />
      )}
    </>
  );
};
