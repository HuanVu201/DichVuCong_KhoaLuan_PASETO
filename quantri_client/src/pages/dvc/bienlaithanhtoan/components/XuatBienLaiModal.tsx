import { IBienLaiThanhToan } from "../models/IBienLaiThanhToan";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components";
import { BienLaiDetailView } from "./BienLai";
import { Button, Spin } from "antd";
import { LoadingOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";

export const XuatBienLaiModal = ({
  loaiPhi,
  bienLaiData,
  handleCancel,
}: {
  loaiPhi: string;
  bienLaiData: IBienLaiThanhToan | undefined;
  handleCancel: () => void;
}) => {
  const [pdfBlob, setPdfBlob] = useState<Blob>();
  const [docxBlob, setDocxBlob] = useState<Blob>();
  const { publicModule: config } = useAppSelector((state) => state.config);
  const [xuatDocx, setXuatDocx] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == "xuat-docx" && item.content == "1") setXuatDocx(true);
    });
  }, [config]);

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
    const iframe: any = document.getElementById("iframePdf");
    if (iframe) {
      iframe.contentWindow.print(); // Gọi hàm in của iframe
    }
  };

  const exportWord = () => {
    if (docxBlob) {
      saveAs(docxBlob, "Biên lai thu phí, lệ phí.docx");
    } else {
      toast.error("Không có dữ liệu để xuất phiếu word!");
    }
  };
  return (
    <>
      <AntdModal
        title={`Thông tin biên lai điện tử`}
        width={"100%"}
        visible={bienLaiData?.loaiBienLaiThanhToan == "local" ? true : false}
        fullsizeScrollable
        handlerCancel={handleCancel}
        footer={
          <AntdSpace direction="horizontal">
            <AntdButton key={2} onClick={() => exportWord()} hidden={!xuatDocx}>
              Xuất word
            </AntdButton>
            <AntdButton key={1} onClick={handleCancel}>
              Đóng
            </AntdButton>
          </AntdSpace>
        }
      >
        <Spin
          spinning={loading}
          indicator={
            <LoadingOutlined style={{ fontSize: 50, color: "#f0ad4e" }} spin />
          }
        >
          {bienLaiData ? <BienLaiDetailView
            loaiPhi={loaiPhi}
            bienLaiData={bienLaiData}
            pdfBlob={pdfBlob}
            setPdfBlob={setPdfBlob}
            docxBlob={docxBlob}
            setDocxBlob={setDocxBlob}
            loading={loading}
            setLoading={setLoading}
          /> : null}

        </Spin>
      </AntdModal>
    </>
  );
};
