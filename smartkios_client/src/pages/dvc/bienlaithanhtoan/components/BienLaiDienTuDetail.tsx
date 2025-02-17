import { useEffect, useState } from "react";
import { AntdModal } from "@/lib/antd/components";
import { IGetBienLaiThanhToan } from "../models/IBienLaiThanhToan";
import { bienLaiThanhToanApi } from "../services";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
export const BienLaiDienTuDetail = ({
  bienLai,
  handleCancel,
}: {
  bienLai: IGetBienLaiThanhToan;
  handleCancel: () => void;
}) => {
  const [bienLaiContent, setBienLaiContent] = useState<string>("");
  const [isLoadingBienLai, setIsLoadingBienLai] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoadingBienLai(true);
      try {
        var res = (await bienLaiThanhToanApi.GetBienLai(bienLai)).data;

        if (res && res.succeeded) {
          setBienLaiContent(res.data?.bienLaiDienTu);
        }
      } catch (exception: any) {
        toast.warning(exception?.response.data);
        // handleCancel();
      }

      setIsLoadingBienLai(false);
    })();
  }, [bienLai]);
  return (
    <AntdModal
      title="Thanh toán"
      visible={true}
      handlerCancel={handleCancel}
      fullsizeScrollable
    >
      <Spin spinning={isLoadingBienLai}>
        {bienLaiContent
          ? <div dangerouslySetInnerHTML={{__html: bienLaiContent}}>

          </div>
          : "Không có thông tin biên lai"}
      </Spin>
    </AntdModal>
  );
};
