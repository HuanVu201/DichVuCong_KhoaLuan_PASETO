import { AntdButton } from "@/lib/antd/components";
import { useCallback } from "react";
import { useButtonActionContext } from "../../contexts/ButtonActionsContext";
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { toast } from "react-toastify";
import { BaseActionProps } from "./type";
import { ICON_HOLDER, ID_SEPARATE } from "@/data";
import { fileApi } from "@/features/file/services";
import { useAppSelector } from "@/lib/redux/Hooks";

export interface TraKetQuaVaThuLaiBanGocProps extends BaseActionProps {
  actionName: string;
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const TraKetQuaVaThuLaiBanGocWrapper = (props: TraKetQuaVaThuLaiBanGocProps) => {
  return <TraKetQuaVaThuLaiBanGoc {...props}></TraKetQuaVaThuLaiBanGoc>;
};

const TraKetQuaVaThuLaiBanGoc = ({
  actionName,
  colorCode,
  iconName,
}: TraKetQuaVaThuLaiBanGocProps) => {
  const buttonActionContext = useButtonActionContext()
  const { data: hoSo, loading, datas: hoSos } = useAppSelector(state => state.hoso)

  const onClick = async () => {
    let checkThuPhi = true;
    let checkDinhKemKetQua = true;
    let checkKySo = true;

    const promises = buttonActionContext.selectedHoSos.map(async (item) => {
      const hoSo = hoSos?.find(x => x.id === item);

      if (hoSo?.trangThaiThuPhi?.toLowerCase() === 'chờ thanh toán' || hoSo?.trangThaiThuPhi?.toLowerCase() === 'chưa thanh toán') {
        checkThuPhi = false;
      }

      if (hoSo?.batBuocDinhKemKetQua) {
        if (!hoSo?.dinhKemKetQua) {
          checkDinhKemKetQua = false;
        } else if (hoSo?.batBuocKySoKetQua) {
          const dinhKemKetQua = hoSo?.dinhKemKetQua || '';
          try {
            const { data: { data: { hasDigitalSinature } } } = await fileApi.VerifyDigitalSignature(dinhKemKetQua.split(ID_SEPARATE), true);
            if (!hasDigitalSinature) {
              checkKySo = false;
            }
          } catch {
            toast.warn('Có lỗi khi kiểm tra ký số!');
          }
        }
      }
    });

    // Đợi tất cả các promises hoàn thành
    await Promise.all(promises);

    if (!checkThuPhi) {
      toast.error("Vui lòng thu phí, lệ phí trước khi trả!");
    }
    if (!checkDinhKemKetQua) {
      toast.error("Thủ tục bắt buộc cập nhật kết quả điện tử trước khi trả!");
    }
    if (!checkKySo) {
      toast.error("Tệp đính kèm kết quả chưa được ký số!");
    }



    if (buttonActionContext.selectedHoSos.length) {
      if (checkThuPhi && checkDinhKemKetQua && checkKySo) {
        buttonActionContext.setTraKetQuaVaThuLaiBanGocModalVisible(true)
      }
    } else {
      toast.info("Vui lòng chọn hồ sơ trước")
    }
  }
  return (
    <AntdButton
      onClick={onClick}
      style={{ backgroundColor: colorCode, color: "#000" }}
      icon={iconName ? ICON_HOLDER[iconName] : undefined}
      disabled={buttonActionContext.selectedHoSos.length > 1}
    >
      {actionName}
    </AntdButton>
  );
};
