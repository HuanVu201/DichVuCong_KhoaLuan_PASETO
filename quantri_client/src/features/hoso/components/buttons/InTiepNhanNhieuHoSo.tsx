import { AntdButton } from "@/lib/antd/components";
import { useCallback, useEffect, useState } from "react";
import { useButtonActionContext } from "../../contexts/ButtonActionsContext";
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { toast } from "react-toastify";
import { BaseActionProps } from "./type";
import { ICON_HOLDER } from "@/data";
import { useAppSelector } from "@/lib/redux/Hooks";
import { IHoSo } from "../../models";

export interface InTiepNhanNhieuHoSoProps extends BaseActionProps {
    actionName: string;
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const InTiepNhanNhieuHoSoWrapper = (props: InTiepNhanNhieuHoSoProps) => {
    return <InTiepNhanNhieuHoSo {...props}></InTiepNhanNhieuHoSo>;
};

const InTiepNhanNhieuHoSo = ({
    actionName,
    colorCode,
    iconName,
}: InTiepNhanNhieuHoSoProps) => {
    const buttonActionContext = useButtonActionContext();
    const { data: hoSo, loading, datas: hoSos } = useAppSelector(state => state.hoso)

    const onClick = () => {
        const chuHoSo = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])?.chuHoSo?.toLowerCase()
        let checkChuHoSo = true
        buttonActionContext.selectedHoSos.forEach((item: any) => {
            if (hoSos?.find(x => x.id == item)?.chuHoSo?.toLowerCase() != chuHoSo) {
                checkChuHoSo = false
            }
        });

        if (buttonActionContext.selectedHoSos.length) {
            if (checkChuHoSo) {
                buttonActionContext.setInTiepNhanNhieuHoSoModalVisible(true);
            } else {
                toast.error("Vui lòng chọn các hồ sơ có cùng chủ hồ sơ!")
            }
        } else {
            toast.info("Vui lòng chọn hồ sơ trước");
        }
    };
    return (
        <AntdButton
            onClick={onClick}
            style={{ backgroundColor: colorCode, color: "#fff" }}
            icon={iconName ? ICON_HOLDER[iconName] : undefined}
        >
            {actionName}
        </AntdButton>
    );
};
