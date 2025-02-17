import { Handle, Position } from "reactflow";
import { Popconfirm, Space, Tooltip, Typography } from "antd";
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models";
import { AntdSpace } from "@/lib/antd/components";
import { getLoaiThoiGianLamViec } from "../../data";
import { Node } from "reactflow";
import { CheckCircleOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR } from "@/data";
const { Paragraph, Text, Title } = Typography;

// K được phép dùng context ở đây
export const CustomNode = ({
  id,
  data,
  onEdit,
  highlightId,
  onSelected,
}: Node<IQuyTrinhXuLy> & {
  onEdit?: (id: string) => void;
  highlightId?: string;
  onSelected?: () => void;
}) => {
  return (
    <div
      className="custom-node-thtt-react-flow"
      style={{
        paddingTop: 16,
        backgroundColor:
          highlightId === id ? DEFAULT_HIGHLIGHT_CURRENT_NODE_COLOR : undefined,
      }}
    >
      <Handle
        type="target"
        style={{ width: 12, height: 12, backgroundColor: "#71d1c4" }}
        position={Position.Top}
        id="target-top"
      />
      <Handle
        type="target"
        style={{ width: 12, height: 12, backgroundColor: "#71d1c4" }}
        position={Position.Left}
        id="target-left"
      />
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <AntdSpace direction="vertical">
          {data.tenNhomNguoiDung ? (
            <Title level={4}>{data.tenNhomNguoiDung}</Title>
          ) : null}
          {data.tenBuocXuLy ? (
            <Text type="success" style={{fontSize:"1.25rem"}}>{data.tenBuocXuLy}</Text>
          ) : null}
          <Text italic style={{fontSize:"1.25rem"}}>
            Thời gian xử lý (giờ{" "}
            {data.loaiThoiGian
              ? `Theo ${getLoaiThoiGianLamViec(data.loaiThoiGian)}`
              : ""}
            ): Trực tiếp {data.thoiGianXuLy} (giờ) | Trực tuyến {data.thoiGianThucHienTrucTuyen} (giờ)
          </Text>
          {data.tenTrangThaiHoSo ? (
            <Text type="warning" style={{fontSize:"1.25rem"}}>
              Trạng thái: {data.tenTrangThaiHoSo}{" "}
              {data.loaiBuoc ? `(${data.loaiBuoc})` : ""}
            </Text>
          ) : null}
        </AntdSpace>
      </div>
      <Handle
        type="source"
        style={{ width: 12, height: 12, backgroundColor: "#de3e5b" }}
        position={Position.Bottom}
        id="source-bottom"
      />
      <Handle
        type="source"
        style={{ width: 12, height: 12, backgroundColor: "#de3e5b" }}
        position={Position.Right}
        id="source-right"
      />
      <div style={{
          color: "#000",
          position: "absolute",
          top: 5,
          left: 5,
          padding: 5,
        }}>
          {data.guiLienThongQLVB ? <Tooltip title="Bước liên thông quản lý văn bản">
            <SendOutlined style={{color:"green", fontSize:"1.25rem"}}/>
          </Tooltip>: null}
      </div>
      <div
        style={{
          color: "#000",
          position: "absolute",
          top: 0,
          right: 0,
          padding: 5,
        }}
      >
        <Space>
          {onEdit ? (
            <EditOutlined
              onClick={() => onEdit(id)}
              style={{
                fontSize: "1.3rem",
              }}
            />
          ) : null}
          {onSelected ? (
            <Popconfirm
              title="Chọn bước quy trình"
              onConfirm={() => onSelected()}
              okText="Xác nhận"
            >
              <CheckCircleOutlined
                style={{
                  fontSize: "1.3rem",
                }}
              />
            </Popconfirm>
          ) : null}
        </Space>
      </div>
    </div>
  );
};
