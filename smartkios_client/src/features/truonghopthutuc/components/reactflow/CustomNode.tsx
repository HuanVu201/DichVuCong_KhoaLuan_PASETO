import { Handle, Position } from "reactflow";
import { Popconfirm, Space, Typography } from "antd";
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models";
import { AntdSpace } from "@/lib/antd/components";
import { getLoaiThoiGianLamViec } from "../../data";
import { Node } from "reactflow";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
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
            <Text type="success">{data.tenBuocXuLy}</Text>
          ) : null}
          <Text italic>
            Thời gian: {data.thoiGianXuLy} (giờ{" "}
            {data.loaiThoiGian
              ? `Theo ${getLoaiThoiGianLamViec(data.loaiThoiGian)}`
              : ""}
            )
          </Text>
          {data.tenTrangThaiHoSo ? (
            <Text type="warning">
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
                fontSize: 16,
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
                  fontSize: 16,
                }}
              />
            </Popconfirm>
          ) : null}
        </Space>
      </div>
    </div>
  );
};
