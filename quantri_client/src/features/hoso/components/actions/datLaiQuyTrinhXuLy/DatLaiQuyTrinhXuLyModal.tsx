import { RenderTitle } from "@/components/common";
import {
  DatLaiNgayHenTra,
  DatLaiQuyTrinhXuLy,
} from "@/features/adminHoSo/redux/action";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models";
import {
  CustomEdge,
  CustomNode,
  EndNode,
  StartNode,
} from "@/features/truonghopthutuc/components/reactflow";
import { GetByHoSoId } from "@/features/truonghopthutuc/redux/action";
import { AntdDivider, AntdModal } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, DatePicker, Form, Input, Popconfirm, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import ReactFlow, { useEdgesState, useNodesState, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { ChonNguoiDungNhomNguoiDungModal } from "./ChonNguoiDungNhomNguoiDungModal";
export const DatLaiQuyTrinhXuLyModal = ({
  refreshTable,
}: {
  refreshTable?: () => void;
}) => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();

  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const { quyTrinhXuLy } = useAppSelector((state) => state.truonghopthutuc);
  const dispatch = useAppDispatch();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<string | undefined>();
  const [nhomNguoiDungId, setNhomNguoiDungId] = useState<string | undefined>();
  const [selectedDonViModalVisible, setSelectedDonViModalVisible] =
    useState(false);
  const [selectedNguoiXuLys, setSelectedNguoiXuLys] = useState<string[]>([]);
  const [btnLoading, setBtnLoading] = useState(false)
  const nodeTypes = useMemo(
    () => ({
      customNode: (props: Node<IQuyTrinhXuLy>) => (
        <CustomNode
          highlightId={selectedNode}
          onSelected={() => {
            setSelectedNode(props.id);
            setNhomNguoiDungId(props?.data?.nhomNguoiDungId);
            setSelectedDonViModalVisible(true);
          }}
          {...props}
        />
      ),
      startNode: (props: Node<IQuyTrinhXuLy>) => (
        <StartNode
          highlightId={selectedNode}
          {...props}
          onSelected={() => {
            setSelectedNode(props.id);
          }}
        />
      ),
      endNode: (props: Node<IQuyTrinhXuLy>) => (
        <EndNode highlightId={selectedNode} {...props} />
      ),
    }),
    [quyTrinhXuLy, selectedNode]
  );
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []);
  useEffect(() => {
    if (hoSo?.id) {
      dispatch(GetByHoSoId(hoSo.id));
    }
  }, [hoSo?.id]);
  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length) {
      dispatch(GetByHoSoId(buttonActionContext.selectedHoSos[0].toString()));
    }
  }, [hoSo?.id]);
  useEffect(() => {
    if (quyTrinhXuLy) {
      const nodes: Node[] = JSON.parse(quyTrinhXuLy.nodeQuyTrinh || "[]");

      const edges: Edge[] = JSON.parse(quyTrinhXuLy.edgeQuyTrinh || "[]");
      setSelectedNode(quyTrinhXuLy?.buocHienTai);
      setEdges(edges);
      setNodes(nodes);
    }
  }, [quyTrinhXuLy]);

  const handleCancel = () => {
    buttonActionContext.setDatLaiQuyTrinhXuLyModalVisible(false);
    form.resetFields();
    buttonActionContext.setSelectedHoSos([]);
    setBtnLoading(false)
  };
  const handleCancelChonNguoiXuLy = () => {
    setSelectedNode(quyTrinhXuLy?.buocHienTai);
    setSelectedDonViModalVisible(false);
  };
  const handleCloseChonNguoiXuLy = () => {
    setSelectedDonViModalVisible(false);
  };
  const onOk = async () => {
    if (buttonActionContext.selectedHoSos.length) {
      setBtnLoading(true)
      try {
        const res = await dispatch(
          DatLaiQuyTrinhXuLy({
            NguoiXuLys: selectedNguoiXuLys.filter(
              (x) => x.indexOf("parent") == -1
            ),
            NodeQuyTrinhId: selectedNode,
            HoSoId: buttonActionContext.selectedHoSos[0] as string,
          })
        ).unwrap();
        if (refreshTable) refreshTable();
        handleCancel();
      } catch (error) {
        setBtnLoading(false)
      } finally {
        setBtnLoading(false)
      }
    }
  };
  return (
    <AntdModal
      title={"Đặt lại quy trình xử lý"}
      visible={true}
      fullsize
      confirmLoading={btnLoading}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận"
    >
      <div
        style={{ width: "100%", height: "80dvh", border: "1px dashed black" }}
        className=" d-flex justify-content-center"
      >
        {nodes.length ? (
          <ReactFlow
            nodeTypes={nodeTypes as any}
            edgeTypes={edgeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            deleteKeyCode={[""]}
            fitView
            defaultEdgeOptions={{
              type: "customEdge",
              animated: true,
              style: { strokeWidth: 4, stroke: "black" },
            }}
          />
        ) : null}
      </div>
      {selectedDonViModalVisible ? (
        <ChonNguoiDungNhomNguoiDungModal
          handleCancel={handleCancelChonNguoiXuLy}
          handleClose={handleCloseChonNguoiXuLy}
          nhomNguoiDungId={nhomNguoiDungId}
          selectedNguoiXuLys={selectedNguoiXuLys}
          setSelectedNguoiXuLys={setSelectedNguoiXuLys}
        />
      ) : null}
    </AntdModal>
  );
};
