import { AntdButton } from "@/lib/antd/components";
import { useCallback } from "react";
import { useButtonActionContext } from "../../contexts/ButtonActionsContext";
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { toast } from "react-toastify";
import { BaseActionProps } from "./type";
import { ICON_HOLDER } from "@/data";

export interface XacNhanKetQuaProps extends BaseActionProps {
  actionName: string;
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const XacNhanKetQuaWrapper = (props: XacNhanKetQuaProps) => {
  return <XacNhanKetQua {...props}></XacNhanKetQua>;
};

const XacNhanKetQua = ({
  actionName,
  colorCode,
  iconName,
}: XacNhanKetQuaProps) => {
  const buttonActionContext = useButtonActionContext();
  const onClick = () => {
    if (buttonActionContext.selectedHoSos.length) {
      buttonActionContext.setXacNhanKetQuaModalVisible(true);
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
