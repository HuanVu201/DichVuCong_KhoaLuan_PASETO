import { Form, Input, Space, Row, Col, DatePicker, Select } from "antd";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { useAppSelector } from "../../../lib/redux/Hooks";
import { ISearchLogCSDLDanCuDoanhNghiep } from "../models";
import { ILogCSDLDanCuDoanhNghiep } from "../models";
import { useCallback } from "react";
import * as XLSX from "xlsx";
import * as docx from "docx";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { saveAs } from "file-saver";
import {
  FileExcelOutlined,
  FileWordOutlined,
  DownOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Button } from "antd";
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

const { Option } = Select;

interface LogCSDLDanCuDoanhNghiepSearchProps {
  setSearchParams: (params: ISearchLogCSDLDanCuDoanhNghiep) => void;
}

export const LogCSDLDanCuDoanhNghiepSearch = ({
  setSearchParams,
}: LogCSDLDanCuDoanhNghiepSearchProps) => {
  const { datas: donVis } = useAppSelector((state) => state.cocautochuc);
  const { datas: logcsdldancudoanhnghieps } = useAppSelector(
    (state) => state.logcsdldancudoanhnghiep
  );
  const [form] = Form.useForm();

  const exportToFile = (format: string) => {
    if (!logcsdldancudoanhnghieps || logcsdldancudoanhnghieps.length === 0) {
      toast.error("Không có dữ liệu để xuất.");
      return;
    }

    const formattedData = logcsdldancudoanhnghieps.map((item) => ({
      "Tên tài khoản": item.taiKhoan,
      "Thời gian": item.thoiGian
        ? dayjs(item.thoiGian).format("DD/MM/YYYY")
        : "N/A",
      Loại: item.loai,
      "Đơn vị": item.groupName,
    }));

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedData, {
        header: ["Tên tài khoản", "Thời gian", "Loại", "Đơn vị"],
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Dữ liệu");

      // Căn chỉnh cột và định dạng bảng
      ws["!cols"] = [{ wpx: 150 }, { wpx: 120 }, { wpx: 100 }, { wpx: 200 }]; // Độ rộng cột

      const fileName = "Thống kê_truy_vấn_cơ_sở_dữ_liệu_dân_cư.xlsx";
      XLSX.writeFile(wb, fileName);
    } else if (format === "word") {
      const doc = new docx.Document({
        sections: [
          {
            properties: {},
            children: [
              new docx.Paragraph({
                text: "Dữ liệu truy vấn cơ sở dữ liệu dân cư Dân Cư Doanh Nghiệp",
                heading: docx.HeadingLevel.HEADING_1,
                alignment: docx.AlignmentType.CENTER, // Căn giữa tiêu đề
              }),
              new docx.Paragraph({
                text: "Danh sách dữ liệu:",
                heading: docx.HeadingLevel.HEADING_2,
                alignment: docx.AlignmentType.LEFT, // Căn trái tiêu đề phụ
                spacing: { after: 200 }, // Khoảng cách dưới tiêu đề phụ
              }),
              new docx.Table({
                rows: [
                  new docx.TableRow({
                    children: [
                      new docx.TableCell({
                        children: [new docx.Paragraph("Tên tài khoản")],
                        shading: { fill: "D9EAD3" }, // Màu nền ô tiêu đề
                        borders: {
                          top: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          left: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          bottom: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          right: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                        },
                      }),
                      new docx.TableCell({
                        children: [new docx.Paragraph("Thời gian")],
                        shading: { fill: "D9EAD3" },
                        borders: {
                          top: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          left: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          bottom: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          right: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                        },
                      }),
                      new docx.TableCell({
                        children: [new docx.Paragraph("Loại")],
                        shading: { fill: "D9EAD3" },
                        borders: {
                          top: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          left: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          bottom: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          right: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                        },
                      }),
                      new docx.TableCell({
                        children: [new docx.Paragraph("Đơn vị")],
                        shading: { fill: "D9EAD3" },
                        borders: {
                          top: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          left: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          bottom: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                          right: {
                            style: docx.BorderStyle.SINGLE,
                            size: 1,
                            space: 0,
                          },
                        },
                      }),
                    ],
                  }),
                  ...logcsdldancudoanhnghieps.map(
                    (item) =>
                      new docx.TableRow({
                        children: [
                          new docx.TableCell({
                            children: [new docx.Paragraph(item.taiKhoan)],
                          }),
                          new docx.TableCell({
                            children: [
                              new docx.Paragraph(
                                item.thoiGian
                                  ? dayjs(item.thoiGian).format("DD/MM/YYYY")
                                  : "N/A"
                              ),
                            ],
                          }),
                          new docx.TableCell({
                            children: [new docx.Paragraph(item.loai)],
                          }),
                          new docx.TableCell({
                            children: [new docx.Paragraph(item.groupName)],
                          }),
                        ],
                      })
                  ),
                ],
                width: { size: 100, type: docx.WidthType.PERCENTAGE }, // Đặt chiều rộng bảng
                borders: {
                  top: { style: docx.BorderStyle.SINGLE, size: 1, space: 0 },
                  left: { style: docx.BorderStyle.SINGLE, size: 1, space: 0 },
                  bottom: { style: docx.BorderStyle.SINGLE, size: 1, space: 0 },
                  right: { style: docx.BorderStyle.SINGLE, size: 1, space: 0 },
                },
              }),
            ],
          },
        ],
      });

      docx.Packer.toBlob(doc).then((blob) => {
        const fileName = "Thống kê_truy_vấn_cơ_sở_dữ_liệu_dân_cư.docx";
        saveAs(blob, fileName);
      });
    }
  };

  const onFinish = (values: ISearchLogCSDLDanCuDoanhNghiep) => {
    const { tuNgay, denNgay } = values;

    const formattedTuNgay = tuNgay
      ? dayjs(tuNgay).startOf("day").toISOString()
      : undefined;
    const formattedDenNgay = denNgay
      ? dayjs(denNgay).endOf("day").toISOString()
      : undefined;
    const formattedTuNgay_7 = formattedTuNgay
      ? dayjs(formattedTuNgay).add(7, "hour").toISOString()
      : undefined;
    const formattedDenNgay_7 = formattedDenNgay
      ? dayjs(formattedDenNgay).add(7, "hour").toISOString()
      : undefined;
    const isTuNgayBeforeDenNgay = dayjs(formattedTuNgay_7).isBefore(
      dayjs(formattedDenNgay_7)
    );
    if (formattedTuNgay == undefined || formattedDenNgay == undefined) {
      setSearchParams({
        ...values,
        tuNgay: formattedTuNgay_7,
        denNgay: formattedDenNgay_7,
        pageNumber: 1,
        pageSize: 10,
      });
    } else {
      if (isTuNgayBeforeDenNgay) {
        setSearchParams({
          ...values,
          tuNgay: formattedTuNgay_7,
          denNgay: formattedDenNgay_7,
          pageNumber: 1,
          pageSize: 10,
        });

        console.log("Search tuNgay:", formattedTuNgay_7);
        console.log("Search denNgay:", formattedDenNgay_7);
      } else {
        toast.error(
          "Từ ngày không được lớn hơn hoặc bằng đến ngày. Vui lòng kiểm tra lại."
        );
      }
    }
  };

  const resetSearchParams = useCallback(() => {
    form.resetFields();
    setSearchParams({ pageNumber: 1, pageSize: 10 });
  }, [form, setSearchParams]);
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

  return (
    <Form
      name="LogCSDLDanCuDoanhNghiepSearch"
      layout="vertical"
      onFinish={onFinish}
      form={form}
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Đơn vị"
            name="DonViId"
            style={{ marginBottom: "16px" }}
          >
            <AntdSelect
              placeholder="Chọn đơn vị"
              allowClear
              generateOptions={{
                model: donVis,
                label: "groupName",
                value: "groupCode",
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Tên tài khoản"
            name="TaiKhoan"
            style={{ marginBottom: "16px" }}
          >
            <Input placeholder="Nhập tên tài khoản" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Từ ngày"
            name="tuNgay"
            style={{ marginBottom: "16px" }}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Đến ngày"
            name="denNgay"
            style={{ marginBottom: "16px" }}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Row justify="center">
          <Space size="large">
            <AntdButton type="primary" htmlType="submit">
              Xác nhận
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
  );
};
