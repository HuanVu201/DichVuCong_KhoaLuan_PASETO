import { AntdButton } from "@/lib/antd/components";
import { useCallback } from "react";
import { useButtonActionContext } from "../../contexts/ButtonActionsContext";
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { toast } from "react-toastify";
import { BaseActionProps } from "./type";
import { ICON_HOLDER } from "@/data";

export interface ChuyenPhiDiaGioiProps extends BaseActionProps {
  actionName: string;
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const ChuyenPhiDiaGioiWrapper = (props: ChuyenPhiDiaGioiProps) => {
  return <ChuyenPhiDiaGioi {...props}></ChuyenPhiDiaGioi>;
};

const ChuyenPhiDiaGioi = ({
  actionName,
  iconName,
  colorCode,
}: ChuyenPhiDiaGioiProps) => {
  const buttonActionContext = useButtonActionContext();
  const onClick = () => {
    if ((buttonActionContext.selectedHoSos.length = 1)) {
      buttonActionContext.setChuyenPhiDiaGioiModalVisible(true);
    } else if (buttonActionContext.selectedHoSos.length > 1) {
      toast.info("Vui lòng chọn một hồ sơ");
    } else {
      toast.info("Vui lòng chọn hồ sơ trước");
    }
  };
  return (
    <AntdButton
      onClick={onClick}
      style={{ backgroundColor: colorCode, color: "#fff" }}
      icon={iconName ? ICON_HOLDER[iconName] : undefined}
      disabled={buttonActionContext.selectedHoSos.length > 1}
    >
      {actionName}
    </AntdButton>
  );
};
