import { ID_SEPARATE } from "@/data";
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models";
import { CustomEdge, CustomNode, EndNode, StartNode } from "@/features/truonghopthutuc/components/reactflow";
import { GetByHoSoId } from "@/features/truonghopthutuc/redux/action";
import { AntdSpace } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { callApiAndDisplayFile } from "@/utils";
import { LinkOutlined } from "@ant-design/icons";
import { useEffect, useMemo } from "react";
import ReactFlow, { Node, MarkerType, useNodesState, useEdgesState, Edge } from "reactflow"
import 'reactflow/dist/style.css';

const QuyTrinhXuLy = () => {
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const { quyTrinhXuLy } = useAppSelector(state => state.truonghopthutuc)
    const dispatch = useAppDispatch()
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const nodeTypes = useMemo(() => ({
        customNode: (props: Node<IQuyTrinhXuLy>) => <CustomNode highlightId={quyTrinhXuLy?.buocHienTai} {...props} />,
        startNode: (props: Node<IQuyTrinhXuLy>) => <StartNode highlightId={quyTrinhXuLy?.buocHienTai} {...props} />,
        endNode: (props: Node<IQuyTrinhXuLy>) => <EndNode highlightId={quyTrinhXuLy?.buocHienTai} {...props} />
    }
    ), [quyTrinhXuLy]);
    const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []);

    useEffect(() => {
        if (hoSo?.id) {
            dispatch(GetByHoSoId(hoSo.id))
        }
    }, [hoSo?.id])
    useEffect(() => {
        if (quyTrinhXuLy) {
            const nodes: Node[] = JSON.parse(quyTrinhXuLy.nodeQuyTrinh || "[]")
            const edges: Edge[] = JSON.parse(quyTrinhXuLy.edgeQuyTrinh || "[]")
            setEdges(edges)
            setNodes(nodes)
        }
    }, [quyTrinhXuLy])


    return <div style={{ width: "100%", height: "80dvh", border: "1px dashed black", position: "relative" }} className=" d-flex justify-content-center">

        {
            nodes.length ? <ReactFlow
                nodeTypes={nodeTypes as any}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                deleteKeyCode={[""]}
                fitView
                defaultEdgeOptions={{ type: "customEdge", animated: true, style: { strokeWidth: 4, stroke: "black" } }}
            /> : null
        }
        {quyTrinhXuLy?.quyetDinh && (
            <div style={{ position: "absolute", bottom: "10px", left: "10px", backgroundColor: "white", padding: "10px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ fontWeight: '500', marginBottom: '5px', width: '500px' }}>
                    - Quyết định: {quyTrinhXuLy.quyetDinh}
                </div>
                {quyTrinhXuLy.dinhKemQuyetDinh && (
                    <div style={{ fontWeight: '500', alignItems: 'center', display: 'flex' }}>
                        <span>- Đính kèm:</span>
                        {quyTrinhXuLy.dinhKemQuyetDinh?.split(ID_SEPARATE).map((dinhKem, idx) => (
                            <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                                 {' '}  <LinkOutlined style={{ color: "yellowgreen" }} role="button" title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                            </AntdSpace>
                        ))}
                    </div>
                )}
            </div>
        )}
    </div >
}
export default QuyTrinhXuLy