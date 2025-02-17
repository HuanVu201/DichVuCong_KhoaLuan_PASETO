import { Form, Input, Space, Row, Col } from "antd"
import { CollapseContent } from "../../../../components/common/CollapseContent"
import { AntdButton } from "../../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/Hooks"
import { useCallback } from "react"
import { ISearchUserRoles } from "@/features/userroles/models"
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext"
import { Dropdown, Menu, Button } from "antd";
import {
    FileExcelOutlined,
    FileWordOutlined,
    DownOutlined,
    PrinterOutlined,
  } from "@ant-design/icons";
  import * as XLSX from "xlsx";
import * as docx from "docx";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { saveAs } from "file-saver";
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

export const SearchUser = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchUserRoles>> }) => {
    const roleContext = useVaiTroModalContext();
    const [form] = Form.useForm()
    const onFinish = (values: ISearchUserRoles) => {
        setSearchParams((curr) => ({ ...curr, ...values }))
    }
    const resetSearchParams = useCallback(() => {
        form.resetFields()
        setSearchParams((curr) => ({ ...curr, fullName: undefined, userName: undefined }))
    }, [])
    const menu = (
        <Menu>
          <Menu.Item
            key="excel"
            icon={<FileExcelOutlined style={{ color: "#28A745" }} />} // Xanh lá cây
            onClick={() => exportToFile("excel")}
            style={{ color: "#28A745" }} // Xanh lá cây
          >
            Xuất Excel
          </Menu.Item>
          <Menu.Item
            key="word"
            icon={<FileWordOutlined style={{ color: "#1E90FF" }} />} // Xanh dương
            onClick={() => exportToFile("word")}
            style={{ color: "#1E90FF" }} // Xanh dương
          >
            Xuất Word
          </Menu.Item>
        </Menu>
      );
      const { datas: userroles } = useAppSelector(
        (state) => state.userroles
      );
      const exportToFile = (format: string) => {
        if (!userroles || userroles.length === 0) {
            toast.error("Không có dữ liệu để xuất.");
            return;
        }
    
        const formattedData = userroles.map(item => ({
            "Họ và tên": item.fullName || 'N/A',
            "Tên tài khoản": item.userName || 'N/A',
            "Chức vụ": item.positionName || 'N/A',
            "Đơn vị": item.officeName || 'N/A',
            "Nhóm": item.groupName || 'N/A',
        }));
    
        if (format === "excel") {
            const ws = XLSX.utils.json_to_sheet(formattedData, {
                header: ["Họ và tên", "Tên tài khoản", "Chức vụ", "Đơn vị", "Nhóm"],
            });
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Dữ liệu");
    
            // Căn chỉnh cột và định dạng bảng
            ws["!cols"] = [{ wpx: 150 }, { wpx: 120 }, { wpx: 100 }, { wpx: 200 }]; // Độ rộng cột
    
            const fileName = "Thống kê người dùng.xlsx";
            XLSX.writeFile(wb, fileName);
        } else if (format === "word") {
            const doc = new docx.Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            new docx.Paragraph({
                                text: "Dữ liệu thông tin người dùng",
                                heading: docx.HeadingLevel.HEADING_1,
                                alignment: docx.AlignmentType.CENTER, // Căn giữa tiêu đề
                            }),
                            new docx.Paragraph({
                                text: "Danh sách dữ liệu thông tin người dùng",
                                heading: docx.HeadingLevel.HEADING_2,
                                alignment: docx.AlignmentType.LEFT, // Căn trái tiêu đề phụ
                                spacing: { after: 200 }, // Khoảng cách dưới tiêu đề phụ
                            }),
                            new docx.Table({
                                rows: [
                                    new docx.TableRow({
                                        children: [
                                            new docx.TableCell({
                                                children: [new docx.Paragraph("Họ và tên")],
                                                shading: { fill: "D9EAD3" }, // Màu nền ô tiêu đề
                                                borders: {
                                                    top: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    left: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    bottom: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    right: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                },
                                            }),
                                            new docx.TableCell({
                                                children: [new docx.Paragraph("Tên tài khoản")],
                                                shading: { fill: "D9EAD3" },
                                                borders: {
                                                    top: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    left: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    bottom: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    right: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                },
                                            }),
                                            new docx.TableCell({
                                                children: [new docx.Paragraph("Chức vụ")],
                                                shading: { fill: "D9EAD3" },
                                                borders: {
                                                    top: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    left: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    bottom: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    right: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                },
                                            }),
                                            new docx.TableCell({
                                                children: [new docx.Paragraph("Đơn vị")],
                                                shading: { fill: "D9EAD3" },
                                                borders: {
                                                    top: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    left: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    bottom: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    right: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                },
                                            }),
                                            new docx.TableCell({
                                                children: [new docx.Paragraph("Nhóm")],
                                                shading: { fill: "D9EAD3" },
                                                borders: {
                                                    top: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    left: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    bottom: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                    right: { style: docx.BorderStyle.SINGLE, size: 1 },
                                                },
                                            }),
                                        ],
                                    }),
                                    ...userroles.map(item => new docx.TableRow({
                                        children: [
                                            new docx.TableCell({
                                                children: [new docx.Paragraph(item.fullName || 'N/A')],
                                            }),
                                            new docx.TableCell({
                                                children: [new docx.Paragraph(item.userName || 'N/A')],
                                            }),
                                            new docx.TableCell({
                                                children: [new docx.Paragraph(item.positionName || 'N/A')],
                                            }),
                                            new docx.TableCell({
                                                children: [new docx.Paragraph(item.officeName || 'N/A')],
                                            }),
                                            new docx.TableCell({
                                                children: [new docx.Paragraph(item.groupName || 'N/A')],
                                            }),
                                        ],
                                    })),
                                ],
                                width: { size: 100, type: docx.WidthType.PERCENTAGE }, // Đặt chiều rộng bảng
                                borders: {
                                    top: { style: docx.BorderStyle.SINGLE, size: 1 },
                                    left: { style: docx.BorderStyle.SINGLE, size: 1 },
                                    bottom: { style: docx.BorderStyle.SINGLE, size: 1 },
                                    right: { style: docx.BorderStyle.SINGLE, size: 1 },
                                },
                            }),
                        ],
                    },
                ],
            });
    
            docx.Packer.toBlob(doc).then((blob) => {
                const fileName = "Thống kê thông tin người dùng.docx";
                saveAs(blob, fileName);
            });
        }
    };
    return (
        <CollapseContent
        >
            <Form name='QuanLyLienKetSearch' layout="vertical" onFinish={onFinish} form={form}>
                <Row gutter={[8, 8]}>
                    <Col md={12}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                        >
                            <Input placeholder="Nhập họ tên" />
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            label="Tài khoản"
                            name="userName"
                        >
                            <Input placeholder="Nhập tài khoản" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Row justify="space-around">
                        <Space size="large">
                            <AntdButton type="primary" htmlType="submit" >
                                Xác nhận
                            </AntdButton>
                            <AntdButton type="default" onClick={resetSearchParams}>
                                Đặt lại
                            </AntdButton>
                            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                icon={<PrinterOutlined />}
                type="primary"
                style={{
                  backgroundColor: "rgb(0, 197, 220)", // Màu nền nút
                  borderColor: "rgb(0, 197, 220)", // Màu viền nút
                  color: "#fff", // Màu chữ trắng để tương phản với nền
                  fontWeight: "bold", // Để chữ nổi bật hơn
                  borderRadius: "4px", // Để nút có các góc bo tròn
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)", // Để nút có bóng nhẹ
                }}
              >
                Xuất Dữ Liệu <DownOutlined />
              </Button>
            </Dropdown>
                        </Space>
                    </Row>
                </Form.Item>
            </Form>
        </CollapseContent>
    )
}