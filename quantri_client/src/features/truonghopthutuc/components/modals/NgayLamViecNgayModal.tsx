import { AntdModal } from "@/lib/antd/components"
import { AddNodeModalProps } from "./AddNodeModal"
import { useTruongHopThuTucContext } from "../../contexts/TruongHopThuTucContext"
import { Radio } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch } from "@/lib/redux/Hooks"
import { resetData } from "@/features/truonghopthutuc/redux/slice";
import { Edge } from "reactflow"
import { GetTruongHopThuTuc, UpdateTruongHopThuTucWithoutSearch } from "../../redux/action"
import { toast } from "react-toastify"

export const NgayLamViecNgayModal = ({ addNode, nodes, onChangeNode, edges }: AddNodeModalProps & { edges: Edge<any>[] }) => {
    const truongHopThuTucContext = useTruongHopThuTucContext()
    const [optionState, setOptionState] = useState('')
    const dispatch = useAppDispatch()

    const ChangeNodesToNgayLamViecNgay = useCallback(() => {
        return nodes.map(item => {
            return {
                ...item,
                data: {
                    ...item.data,
                    loaiThoiGian: optionState
                }
            };
        });
    }, [optionState, nodes])


    const onFinish = (async () => {
        const newNodes = ChangeNodesToNgayLamViecNgay();
        const res = await dispatch(UpdateTruongHopThuTucWithoutSearch({
            id: truongHopThuTucContext.truongHopThuTucId,
            data: { nodeQuyTrinh: JSON.stringify(newNodes), edgeQuyTrinh: JSON.stringify(edges) }
        })).unwrap()
        if (res.succeeded) {
            toast.success("Cập nhật thành công")
            truongHopThuTucContext.setNgayLamViecNgayModalVisible(false)
            dispatch(GetTruongHopThuTuc(truongHopThuTucContext.truongHopThuTucId as any))
        }
        else {
            toast.warning("Cập nhật thất bại")
        }
    }
    )
    const handlerCancel = () => {
        truongHopThuTucContext.setNgayLamViecNgayModalVisible(false)
        // dispatch(resetData())

    }
    const onChangeOption = (e: any) => {
        setOptionState(e.target.value)
    }

    return <AntdModal title="Chuyển đổi Ngày, Ngày làm việc" onOk={onFinish} okText={"Lưu"}
        cancelText={"Đóng"} visible={true} handlerCancel={handlerCancel} width={500}>
        <div>
            <div>
                <i>Lưu ý: Khi chọn Ngày hoặc Ngày làm việc, toàn bộ giờ "Thời gian xử lý" trong nodes sẽ thay đổi theo lựa chọn.</i>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
                <Radio.Group onChange={onChangeOption} name="radiogroup" defaultValue={1}>
                    <Radio value={"Ngày"}>Ngày</Radio>
                    <Radio value={"Ngày làm việc"}>Ngày làm việc</Radio>
                </Radio.Group>
            </div>
        </div>
    </AntdModal>


}