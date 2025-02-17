import { AntdButton } from "@/lib/antd/components";
import { useCallback } from "react";
import { useButtonActionContext } from "../../contexts/ButtonActionsContext";
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { toast } from "react-toastify";
import { BaseActionProps } from "./type";
import { ICON_HOLDER } from "@/data";

export interface BanGiaoKetQuaProps extends BaseActionProps {
  actionName: string;
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const BanGiaoKetQuaWrapper = (props: BanGiaoKetQuaProps) => {
  return <BanGiaoKetQua {...props}></BanGiaoKetQua>;
};

const BanGiaoKetQua = ({
  actionName,
  colorCode,
  iconName,
}: BanGiaoKetQuaProps) => {
  const buttonActionContext = useButtonActionContext();
  const onClick = () => {
    if (buttonActionContext.selectedHoSos.length) {
      if (buttonActionContext.selectedHoSos.length > 100) {
        toast.error("Bàn giao tối đa 100 hồ sơ/lần!")
        return
      }
      buttonActionContext.setBanGiaoKetQuaModalVisible(true);
    } else {
      toast.info("Vui lòng chọn hồ sơ trước");
    }
  };

  return (
    <AntdButton
      onClick={onClick}
      style={{ backgroundColor: colorCode, color: "#fff" }}
      icon={iconName ? ICON_HOLDER[iconName] : undefined}
      disabled={actionName == 'Chuyển đổi bản giấy' ? true : false}
    >
      {actionName}
    </AntdButton>
  );
};
