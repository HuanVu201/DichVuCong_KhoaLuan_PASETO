import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components";
import ReactFlow, { ReactFlowProps, Node, MarkerType, useNodesState, useEdgesState, OnConnect, addEdge, ReactFlowProvider, OnNodesDelete, Edge, EdgeProps, NodeProps } from "reactflow"
import { useTruongHopThuTucContext } from "../../contexts/TruongHopThuTucContext";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { AddNodeModal } from "./AddNodeModal";
import { CustomNode, EndNode, StartNode, CustomEdge } from "../reactflow";
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { GetTruongHopThuTuc, UpdateTruongHopThuTucWithoutSearch } from "../../redux/action";
import { AddQuyTrinhXuLys } from "@/features/quytrinhxuly/redux/action";
import { ChangeEdgeModal } from "./ChangeEdgeModal";
import { resetData } from "@/features/truonghopthutuc/redux/slice";
import 'reactflow/dist/style.css';
import {v4 as uuid} from 'uuid'
import { useUpdateNodeInternals } from "reactflow";
import { toast } from "react-toastify";
import { EditStartNodeModal } from "./EditStartNodeModal";
export interface CustomReactFlowProps extends ReactFlowProps {
}

const ReactFlowInner = (props: CustomReactFlowProps) => {
    const truongHopThuTucContext = useTruongHopThuTucContext()
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [elementChanged, setElementChanged] = useState(false)
    const newNodes = useRef<Node<IQuyTrinhXuLy>["data"][]>([])
    const updateNodeInternals = useUpdateNodeInternals();
    const dispatch = useAppDispatch()
    const {data: truongHopThuTuc, loading} = useAppSelector(state => state.truonghopthutuc)
    const [defaultNodes, setDefaultNodes] = useState<Node[]>([])
    const [defaultEdges, setDefaultEdges] = useState<Edge[]>([])
    const onEdgeClick = useCallback((evt: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string, label: string) => {
        evt.stopPropagation();
        truongHopThuTucContext.setChangeEdgeModalVisible(true)
        truongHopThuTucContext.setEdgeId(id)
        truongHopThuTucContext.setEdgeLabel(label)
    }, [])
    const onEdit = useCallback((id: string) => {
        truongHopThuTucContext.setAddNodeModalVisible(true)
        truongHopThuTucContext.setQuyTrinhId(id)
    }, [])
    const onEditStartNode = useCallback((id: string) => {
        truongHopThuTucContext.setEditStartModalVisible(true)
        truongHopThuTucContext.setQuyTrinhId(id)
    }, [])
    const nodeTypes = useMemo(() => ({ customNode: (props: Node<IQuyTrinhXuLy>) => <CustomNode onEdit={onEdit} {...props}/>,
        startNode: (props: Node<IQuyTrinhXuLy>) => <StartNode onEdit={onEditStartNode} {...props}/>, endNode: EndNode }), []);
    const edgeTypes = useMemo(() => ({ customEdge: (props: EdgeProps) => <CustomEdge onEdgeClick={onEdgeClick} {...props}/> }), []);
    useEffect(() => {
        if(truongHopThuTucContext.truongHopThuTucId) dispatch(GetTruongHopThuTuc(truongHopThuTucContext.truongHopThuTucId))
    }, [truongHopThuTucContext.truongHopThuTucId])

    useEffect(() => {
        if(truongHopThuTuc){
            const nodes : Node[]= JSON.parse(truongHopThuTuc.nodeQuyTrinh || "[]")
            const edges : Edge[] = JSON.parse(truongHopThuTuc.edgeQuyTrinh || "[]")
            if(nodes.length == 0){ // đây là dữ liệu đồng bộ nên chưa có các node mặc định
                const quyTrinhStartId = uuid()
                const quyTrinhEndId = uuid()
                const quyTrinhStart : Pick<IQuyTrinhXuLy, "truongHopId" | "tenBuocXuLy" | "thoiGianXuLy" | "loaiThoiGian" | "id"| "maTrangThaiHoSo"> = {
                    id: quyTrinhStartId,
                    truongHopId: truongHopThuTuc.id,
                    tenBuocXuLy: "Tiếp nhận hồ sơ",
                    maTrangThaiHoSo: "2",
                    thoiGianXuLy: 4,
                    loaiThoiGian: "Ngày làm việc"
                }
                const quyTrinhEnd : Pick<IQuyTrinhXuLy, "truongHopId" | "tenBuocXuLy" | "thoiGianXuLy" | "loaiThoiGian"| "id" | "maTrangThaiHoSo"> = {
                    id: quyTrinhEndId,
                    truongHopId: truongHopThuTuc.id,
                    tenBuocXuLy: "Chờ trả kết quả",
                    maTrangThaiHoSo: "9",
                    thoiGianXuLy: 0,
                    loaiThoiGian: "Ngày làm việc"
                }
                const startNode : Node = {
                    deletable: false,
                    id: quyTrinhStartId,
                    data: quyTrinhStart,
                    position: {x: 500, y: 50},
                    type: "startNode"
                }
                const endNode : Node = {
                    deletable: false,
                    id: quyTrinhEndId,
                    data: quyTrinhEnd,
                    position: {x: 500, y: 700},
                    type: "endNode"
                }
                const newNodes :Node[] = [startNode, endNode]
                dispatch(AddQuyTrinhXuLys({quyTrinhs: [quyTrinhStart, quyTrinhEnd]}))
                dispatch(UpdateTruongHopThuTucWithoutSearch({id: truongHopThuTuc.id, 
                    data: {nodeQuyTrinh: JSON.stringify(newNodes)}}))
                setNodes(newNodes)
                setDefaultNodes(newNodes)
            } else {
                setEdges(edges)
                setNodes(nodes)
                setDefaultNodes(nodes)
                setDefaultEdges(edges)
            }
        }
    }, [truongHopThuTuc])
    const onCleanState = () => {
        truongHopThuTucContext.setFlowModalVisible(false)
        truongHopThuTucContext.setTruongHopThuTucId(undefined)
        dispatch(resetData())
    }
    const handlerCancel = useCallback(() => {
        if(elementChanged){
            Modal.confirm({
                title: "Có thay đổi trên quy trình, xác nhận đóng?",
                cancelText: "Bỏ qua và đóng",
                okText: "Lưu và đóng",
                onOk: async () => {
                    await onSaveQuyTrinh()
                    onCleanState()
                },
                onCancel: () => {
                    onCleanState()
                }
            })  
        } else{
            onCleanState()
        }
        
    }, [elementChanged])
    const onAddNode = useCallback((id: string, data: IQuyTrinhXuLy) => {
        const newNode: Node = {
            id,
            position: {
              x: Math.random() * 500,
              y: Math.random() * 500,
            },
            data,
            type: "customNode"
        };
        setNodes((curr) => curr.concat(newNode))
        newNodes.current?.push(data)
        setElementChanged(true)
    }, [])
    const onChangeNode = useCallback((id: string, data: IQuyTrinhXuLy) => {
        const newData = nodes.map(node => {
            if(node.id === id){
                return {...node, data: {...node.data, ...data}}
            }
            return node
        })
        setNodes(newData)
        dispatch(UpdateTruongHopThuTucWithoutSearch({id: truongHopThuTucContext.truongHopThuTucId, data: {nodeQuyTrinh: JSON.stringify(newData)}}))
        // setElementChanged(true)
    }, [nodes])
    const onDeleteNode : OnNodesDelete = useCallback((nodes) => {
        if(newNodes.current.length){
            const _newNodes = nodes.filter(( node ) => !newNodes.current.map(x=>x.id)?.includes(node.id) );
            newNodes.current = _newNodes.map(x => x.data)
        }
    }, [])
    const onChangeEdge = useCallback((id:string, label:string) => {
        setEdges((edges) => {
            return edges.map(edge => {
                if(edge.id === id){
                    return {...edge, label}
                }
                return edge
            })
        })
        setElementChanged(true)
    },[])
    const onConnect: OnConnect = useCallback(
        (connection) => {
            setEdges((eds) => addEdge({...connection, label:"Chuyển xử lý"}, eds))
            setElementChanged(true)
        },
        [setEdges]
    );
    const onSaveQuyTrinh = useCallback(async () => {
        // const newNode = nodes?.filter(x => x.type == "customNode")?.map(x => x.data)
        if(newNodes.current.length){
            const res = await dispatch(AddQuyTrinhXuLys({quyTrinhs: newNodes.current})).unwrap()
            if(res.succeeded){
                newNodes.current = []
            }
        }
        dispatch(UpdateTruongHopThuTucWithoutSearch({
            id: truongHopThuTucContext.truongHopThuTucId, 
            data: {nodeQuyTrinh: JSON.stringify(nodes), edgeQuyTrinh: JSON.stringify(edges)}
        }))
        toast.success("Lưu thành công")
        setNodes(nodes)
        setEdges(edges)
        setDefaultEdges(edges)
        setDefaultNodes(nodes)
        setElementChanged(false)
    }, [nodes, edges])
    const onRestoreQuyTrinh = useCallback(() => {
        setEdges(defaultEdges)
        setNodes(defaultNodes)
    }, [defaultEdges, defaultNodes])
    return <>
    <AntdModal visible={true} title="Chỉnh sửa quy trình" fullsize footer={null} handlerCancel={handlerCancel} afterOpenChange={(open) => {
        open ? updateNodeInternals(nodes.map(x => x.id)) : null
    }}>
        <AntdSpace direction="horizontal" style={{marginBottom:12}}>
            <AntdButton type="primary"  onClick={() => truongHopThuTucContext.setAddNodeModalVisible(true)}>Thêm bước</AntdButton>
            <AntdButton type="dashed" style={{marginBottom:6}} onClick={onSaveQuyTrinh}>Lưu quy trình</AntdButton>
            <AntdButton style={{marginBottom:6}} onClick={onRestoreQuyTrinh}>Khôi phục quy trình gốc</AntdButton>
        </AntdSpace>
        <div style={{width:"100%", height:"80dvh", border:"1px dashed black"}}  >
            {nodes.length && loading === false? <ReactFlow 
                nodeTypes={nodeTypes as any}
                edgeTypes={edgeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesDelete={onDeleteNode}
                deleteKeyCode={["Backspace","Delete"]}
                fitView
                defaultEdgeOptions={{type:"customEdge", markerEnd: {type: MarkerType.ArrowClosed}, animated:true, style:{strokeWidth:4, stroke:"black"}}}
            />: null}
        </div>
    </AntdModal>
    {truongHopThuTucContext.addNodeModalVisible ? <AddNodeModal addNode={onAddNode} onChangeNode={onChangeNode} nodes={nodes}/> : null}
    {truongHopThuTucContext.editStartModalVisible ? <EditStartNodeModal onChangeNode={onChangeNode} nodes={nodes}/> : null}
    {truongHopThuTucContext.changeEdgeModalVisible ? <ChangeEdgeModal changeEdge={onChangeEdge}/> : null}
    </>
    
}
const ReactFlowModal = (props: any) => {
    return (
        <ReactFlowProvider>
            <ReactFlowInner {...props} />
        </ReactFlowProvider>
      );
}
export default ReactFlowModal