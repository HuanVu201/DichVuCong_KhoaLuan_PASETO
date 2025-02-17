import { useCallback, CSSProperties } from 'react';
import { Handle, Position, Node } from 'reactflow';
import { Typography } from 'antd';
import { IQuyTrinhXuLy } from '@/features/quytrinhxuly/models';
import { AntdSpace } from '@/lib/antd/components';
import { getLoaiThoiGianLamViec } from '../../data';
import { EditOutlined } from '@ant-design/icons';
import { useTruongHopThuTucContext } from '../../contexts/TruongHopThuTucContext';
import { DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR } from '@/data';
const { Paragraph, Text, Title } = Typography;


// K được phép dùng context ở đây
export const EndNode = ({id, data, onEdit, highlightId}: Node<IQuyTrinhXuLy> & {onEdit?: (id: string) => void, highlightId?: string}) => {
    return <div className='custom-node-thtt-react-flow' style={{backgroundColor: highlightId === id ? DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR : "#b34b62" }}>
        <Handle type="target" style={{width:12,height:12, backgroundColor:"#71d1c4"}} position={Position.Top} id='target-top'/>
        <Handle type="target" style={{width:12,height:12, backgroundColor:"#71d1c4"}} position={Position.Left} id='target-left'/>
        <div style={{width:"100%", height:"100%", textAlign:"center", }}>
        <AntdSpace direction="vertical">
            {data.tenNhomNguoiDung ? <Title level={3} >{data.tenNhomNguoiDung}</Title> : null}
            {data.tenBuocXuLy ? <Text type="success" style={{fontSize:"1.25rem"}}>{data.tenBuocXuLy}</Text> : null}
            <Text italic style={{fontSize:"1.25rem"}}>Thời gian: {data.thoiGianXuLy} (giờ {data.loaiThoiGian ? `Theo ${getLoaiThoiGianLamViec(data.loaiThoiGian)}` : ""})</Text>
            {data.tenTrangThaiHoSo ? <Text type="warning" style={{fontSize:"1.25rem"}}>{data.tenTrangThaiHoSo}</Text> : null}
        </AntdSpace>
        </div>
        <Handle type="source" style={{width:12,height:12, backgroundColor:"#de3e5b"}} position={Position.Bottom} id='source-bottom'/>
        <Handle type="source" style={{width:12,height:12, backgroundColor:"#de3e5b"}} position={Position.Right} id='source-right'/>
        {onEdit ? <EditOutlined onClick={() => onEdit(id)} style={{color:"#000", position:"absolute", top:0, right:0, padding:5, fontSize:16}}/> : null}
    </div>
}