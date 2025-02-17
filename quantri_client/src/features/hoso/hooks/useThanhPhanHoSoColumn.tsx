import { useCallback, useMemo, useTransition } from "react";
import { ColumnsType } from "antd/es/table";
import { Checkbox, Input, InputNumber, Popconfirm, Space, Tag } from "antd";
import {
  ImportOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { AntdButton, UploadTable } from "@/lib/antd/components";
import { FormInstance } from "antd/lib";
import { IHoSo } from "@/features/hoso/models";
import { toast } from "react-toastify";
import {
  ITiepNhanHoSoContext,
  useTiepNhanHoSoContext,
} from "../../../pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from "../data/formData";
import { IThanhPhanHoSoWithSoHoa } from "../components/actions/suaHoSo/TepDinhKemHoSo";
import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models";
import { useUploadTable } from "@/lib/antd/components/upload/hooks/useUploadTable";
import { ITiepNhanHoSoTrucTuyenContext } from "@/pages/dvc/tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext";
import { validateDigitalSignatureFiles } from "../components/ultis/validate";
import { TrangThaiSoHoaTag } from "@/components/common";
import { useAppSelector } from "@/lib/redux/Hooks";
import { IBasePagination } from "@/models";

const FOLDER_NAME = "ThanhPhanHoSo";

export const useThanhPhanHoSoColumn = ({
  dataSource,
  setDataSource,
  form,
  pagination,
}: {
  pagination: IBasePagination;
  dataSource: IThanhPhanHoSoWithSoHoa[];
  setDataSource: React.Dispatch<
    React.SetStateAction<IThanhPhanHoSoWithSoHoa[]>
  >;
  form: FormInstance<IHoSo>;
}) => {
  const tiepNhanHoSoContext = useTiepNhanHoSoContext();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const [_, startTransition] = useTransition();
  const { onChangeDinhKemTable } = useUploadTable<IThanhPhanHoSoWithSoHoa>({
    folderName: hoSo?.maHoSo,
    setDataSource,
    colDinhKemName: "dinhKem",
    rowNumber: -1,
  });
  const onSoHoa = useCallback(async (record: IThanhPhanHoSo, index: number) => {
    if (!record.dinhKem) {
      toast.warn("Chưa có tệp đính kèm");
      return;
    }
    const isValid = await validateDigitalSignatureFiles(record.dinhKem);
    if (!isValid) {
      return;
    }

    const soHoaData: ITiepNhanHoSoTrucTuyenContext["soHoaData"] = {
      ten: record.ten,
      maDinhDanh: form.getFieldValue("soGiayToChuHoSo"),
      ma:
        form.getFieldValue("soGiayToChuHoSo") +
        "." +
        form.getFieldValue("maTTHC") +
        "." +
        record.maGiayTo,
      maGiayTo: record.maGiayTo,
      dinhKem: record.dinhKem,
      onOk: () =>
        onRowChange(TRANGTHAISOHOA["Được số hóa"], index, "trangThaiSoHoa"),
      thanhPhanHoSoId: record.id,
      loaiSoHoa: "0",
    };
    tiepNhanHoSoContext.setSoHoaData(soHoaData);
    tiepNhanHoSoContext.setGiayToSoHoaModalVisible(true);
  }, []);
  const onChonTuKhoSoHoa = useCallback((index: number) => {
    tiepNhanHoSoContext.setKhoSoHoaData({
      onOk: (dinhKem: string, maGiayToKhoQuocGia: string) => {
        onChangeDinhKemTable(dinhKem, dinhKem, "override", index);
        if(maGiayToKhoQuocGia){
          onRowChange(maGiayToKhoQuocGia, index, "maGiayToKhoQuocGia");
        }
        // onRowChange(dinhKem, index, "fileSoHoa")
        onRowChange(TRANGTHAISOHOA["Tái sử dụng"], index, "trangThaiSoHoa");
      },
    });
    tiepNhanHoSoContext.setDanhSachGiayToSoHoaModalVisible(true);
  }, []);

  const onRowChange = useCallback(
    (value: any, index: number, colName: keyof IThanhPhanHoSoWithSoHoa) => {
      startTransition(() => {
        setDataSource((curr) => {
          const newDataSource = [...curr];
          return newDataSource.map((item, idx) => {
            if (idx === index) {
              return { ...item, [colName]: value };
            }
            return item;
          });
        });
      });
    },
    []
  );

  const columns = useMemo((): ColumnsType<IThanhPhanHoSoWithSoHoa> => {
    const pageNumber = pagination.pageNumber ?? 1
    const pageSize = pagination.pageSize ?? 10
    return [
      {
        title: "Tên giấy tờ",
        key: "ten",
        dataIndex: "ten",
        width: "40%",
        render: (_, record, idx) => {
          const page = (pageNumber - 1) * pageSize + idx
          return (
            <Input.TextArea
              rows={2}
              defaultValue={record.ten}
              onChange={(e) => onRowChange(e.target.value, page, "ten")}
            />
          );
        },
      },
      {
        title: "Số bản chính",
        key: "soBanChinh",
        dataIndex: "soBanChinh",
        render: (_, record, idx) => {
          const page = (pageNumber - 1) * pageSize + idx
          return (
            <InputNumber
              min={0}
              defaultValue={record.soBanChinh ?? 0}
              onChange={(e) => onRowChange(e, page, "soBanChinh")}
            />
          );
        },
      },
      {
        title: "Số bản sao",
        key: "soBanSao",
        dataIndex: "soBanSao",
        render: (_, record, idx) => {
          const page = (pageNumber - 1) * pageSize + idx
          return (
            <InputNumber
              min={0}
              defaultValue={record.soBanSao ?? 0}
              onChange={(e) => onRowChange(e, page, "soBanSao")}
            />
          );
        },
      },
      {
        title: "Nhận bản giấy",
        key: "nhanBanGiay",
        dataIndex: "nhanBanGiay",
        render: (_, record, idx) => {
          const page = (pageNumber - 1) * pageSize + idx
          return (
            <Checkbox
              onChange={(e) =>
                onRowChange(e.target.checked, page, "nhanBanGiay")
              }
            />
          );
        },
      },
      {
        title: "Đính kèm",
        key: "dinhKem",
        render: (_, record, idx) => {
          // const isChuaSoHoa = record.trangThaiSoHoa !== TRANGTHAISOHOA["Chưa số hóa"]
          // const fileList =record.dinhKem ? record.dinhKem?.split(ID_SEPARATE).map((x) :UploadFile => {
          //     const fileSegments = x.split("/")
          //     const fileName = fileSegments[fileSegments.length - 1]
          //     return {uid: x, name: fileName, url: HOST_PATH + x}
          // }) : undefined
          const page = (pageNumber - 1) * pageSize + idx
          let hideKySoWith = undefined;
          if (
            record.trangThaiSoHoa ==
              TRANGTHAISOHOA["Tái sử dụng từ kết quả hồ sơ khác"] ||
            record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng"]
          ) {
            hideKySoWith = (
              <TrangThaiSoHoaTag trangThai={record.trangThaiSoHoa} />
            );
          }
          if (!record.dinhKem) {
            hideKySoWith = undefined;
          }
          return (
            <>
              {/* {isChuaSoHoa ? <Upload fileList={fileList}></Upload> : <AntdSpace direction="horizontal">
                            <AntdUpLoad maxCount={15} formInstance={form} fieldName="dinhKem" folderName="ThanhPhanHoSo" listType="text" showUploadList={true} 
                                onChange={(info) => {
                                    if(info.file.status === "done"){
                                        onChangeDinhKem(info.file.response.data, idx, "dinhKem")
                                    }
                                }}
                                onRemove={(file) => onRemoveFile(file, idx)}
                                fileSoHoa={record.fileSoHoa} kySoHandler={(newUrl, oldUrl) => kySoHandler(newUrl, oldUrl, idx, "dinhKem")}/>
                            
                        </AntdSpace>} */}
              {hoSo?.maHoSo ? (
                <UploadTable
                  dataSource={dataSource}
                  kySoToken
                  hideKySoWith={hideKySoWith}
                  onCleanSoHoa={() => {
                    if (
                      record.trangThaiSoHoa != TRANGTHAISOHOA["Chưa số hóa"]
                    ) {
                      onRowChange(
                        TRANGTHAISOHOA["Chưa số hóa"],
                        idx,
                        "trangThaiSoHoa"
                      );
                    }
                  }}
                  setDataSource={setDataSource}
                  folderName={hoSo.maHoSo}
                  colDinhKemName="dinhKem"
                  rowNumber={page}
                  dinhKem={record.dinhKem}
                  scanPC={true}
                  extraElement={(loading) => (<>
                    <AntdButton
                      loading={loading}
                      icon={<ImportOutlined />}
                      onClick={() => onChonTuKhoSoHoa(page)}
                    >
                      Chọn từ kho số hóa
                    </AntdButton>
                  </>)}
                />
              ) : null}
            </>
          );
        },
      },
      {
        title: "Thao tác",
        width: "10%",
        align: "center",
        key: "thaotac",
        render: (_, record, idx) => {
          const page = (pageNumber - 1) * pageSize + idx
          return (
            <Space direction="horizontal">
              {record.trangThaiSoHoa !== TRANGTHAISOHOA["Chưa số hóa"] ? (
                <Tag color="geekblue">
                  {(TRANGTHAISOHOA_VALUE as any)[record.trangThaiSoHoa]}
                </Tag>
              ) : (
                <AntdButton
                  icon={<UploadOutlined />}
                  title="Số hóa dữ liệu"
                  onClick={() => onSoHoa(record, page)}
                >
                  Số hóa
                </AntdButton>
              )}
              <Popconfirm
                title="Xoá?"
                onConfirm={() => {
                  setDataSource((curr) => curr.filter((x) => x.id !== record.id));
                  const currDeletedIds: string[] = form.getFieldValue(
                    "deletedThanhPhanIds"
                  );
                  form.setFieldValue("deletedThanhPhanIds", [
                    ...currDeletedIds,
                    record.id,
                  ]);
                }}
                okText="Xoá"
                cancelText="Huỷ"
              >
                <DeleteOutlined
                  style={{ color: "tomato" }}
                  title="Xóa dòng"
                  onClick={() => {}}
                />
              </Popconfirm>
            </Space>
          )
        }
      },
    ];
  }, [dataSource, form, hoSo, pagination]);
  return columns;
};
