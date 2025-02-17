import { AntdButton } from "@/lib/antd/components";
import { useCallback } from "react";
import { useButtonActionContext } from "../../contexts/ButtonActionsContext";
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { toast } from "react-toastify";
import { BaseActionProps } from "./type";
import { ICON_HOLDER } from "@/data";

export interface ChuyenTraKetQuaHCCProps extends BaseActionProps {
  actionName: string;
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const ChuyenTraKetQuaHCCWrapper = (props: ChuyenTraKetQuaHCCProps) => {
  return <ChuyenTraKetQuaHCC {...props}></ChuyenTraKetQuaHCC>;
};

const ChuyenTraKetQuaHCC = ({
  actionName,
  colorCode,
  iconName,
}: ChuyenTraKetQuaHCCProps) => {
  const buttonActionContext = useButtonActionContext();
  const onClick = () => {
    if (buttonActionContext.selectedHoSos.length) {
      buttonActionContext.setChuyenTraKqHCCModalVisible(true);
    } else {
      toast.info("Vui lòng chọn hồ sơ trước");
    }
  };
  return (
    <AntdButton
      onClick={onClick}
      style={{ backgroundColor: colorCode, color: "#000" }}
      icon={iconName ? ICON_HOLDER[iconName] : undefined}
    >
      {actionName}
    </AntdButton>
  );
};
