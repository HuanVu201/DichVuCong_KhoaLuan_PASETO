import { useEffect, useState } from "react";
import { AntdModal, AntdSpace } from "@/lib/antd/components";
import { IGetBienLaiThanhToanPortal } from "../model";
import { bienLaiThanhToanApi } from "@/pages/dvc/bienlaithanhtoan/services";
import { Button, Spin } from "antd";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { FilePdfOutlined, PrinterOutlined } from "@ant-design/icons";
// import './BienLaiDienTuDetail.scss'
import { IBienLaiThanhToanPortal } from "../model";
import { XuatBienLaiPortalModal } from "./XuatBienLaiPortalModal";
import { LoadingOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";
import { downloadPhieuPdf } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToPdf";
import { useTraCuuBienLaiDienTuContext } from "../context/TraCuuBienLaiDienTuProvider";

export const BienLaiDienTuPortalDetail = () => {
  const traCuuBienLaiDienTuContext = useTraCuuBienLaiDienTuContext()

  const [bienLaiContent, setBienLaiContent] = useState<string>("");
  useEffect(() => {
    (async () => {
      traCuuBienLaiDienTuContext.setLoading(true);
      if (traCuuBienLaiDienTuContext.getBienLaiParams) {
        try {
          var res = (await bienLaiThanhToanApi.GetBienLai(traCuuBienLaiDienTuContext.getBienLaiParams as any)).data;

          if (res && res.succeeded) {
            traCuuBienLaiDienTuContext.setBienLaiDetail(res.data)
            setBienLaiContent(res.data?.bienLaiDienTu);
          }else{
            toast.warning("Không tìm thấy thông tin biên lai!")
            handleCancel()
          }
        } catch (exception: any) {
          toast.warning(exception?.response.data);
          // handleCancel();
        }
      }

    })();
  }, [traCuuBienLaiDienTuContext.getBienLaiParams]);


  useEffect(() => {
    if (traCuuBienLaiDienTuContext.bienLaiDetail && traCuuBienLaiDienTuContext.bienLaiDetail.loaiBienLaiThanhToan != 'local') {
      traCuuBienLaiDienTuContext.setLoading(false);
      traCuuBienLaiDienTuContext.setExsitedBienLai(true)

      toast.success('Xuất biên lai thành công!')
    }
  }, [traCuuBienLaiDienTuContext.bienLaiDetail])

  const handleCancel = () => {
    traCuuBienLaiDienTuContext.setGetBienLaiParams({})
    traCuuBienLaiDienTuContext.setViewBienLaiThanhToanVisible(false)
    traCuuBienLaiDienTuContext.setBienLaiDetail(undefined)
  }
  // useEffect(() => {
  //   setTimeout(function () {
  //     if (!traCuuBienLaiDienTuContext.exsitedBienLai) {
  //       console.log(traCuuBienLaiDienTuContext.exsitedBienLai)
        
  //     }
  //   }, 5000);

  // }, [])

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

  return (
    <>
      {traCuuBienLaiDienTuContext.bienLaiDetail?.loaiBienLaiThanhToan != 'local'
        ?
        <AntdModal
          title="Thông tin biên lai điện tử"
          visible={traCuuBienLaiDienTuContext.bienLaiDetail?.loaiBienLaiThanhToan != 'local' ? true : false}
          handlerCancel={handleCancel}
          fullsizeScrollable
          footer={null}
        >
          <Spin spinning={traCuuBienLaiDienTuContext.loading}
            indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />} >
            {bienLaiContent ? (
              <>
                <AntdSpace direction="vertical">
                <Button onClick={() => taiPhieu()} style={{backgroundColor: '#fff'}}>
                    <PrinterOutlined style={{ color: "#4B8DF8" }} /> In biên lai
                  </Button>
                </AntdSpace>

                <div
                  id="ContainerSwapper1"
                  style={{
                    fontSize: "13px",
                  }}
                  dangerouslySetInnerHTML={{ __html: bienLaiContent }}
                ></div>
              </>
            ) : (
              "Không có thông tin biên lai"
            )}
          </Spin>
        </AntdModal>
        :
        <XuatBienLaiPortalModal />
      }
    </>
  );
};
