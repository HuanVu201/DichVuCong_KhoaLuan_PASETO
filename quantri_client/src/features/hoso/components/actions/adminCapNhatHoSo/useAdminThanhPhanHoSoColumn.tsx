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

import { IThanhPhanHoSo } from "@/features/thanhphanhoso/models";
import { useUploadTable } from "@/lib/antd/components/upload/hooks/useUploadTable";
import { ITiepNhanHoSoTrucTuyenContext } from "@/pages/dvc/tiepnhanhoso/tructuyen/contexts/TiepNhanHoSoContext";
import { TrangThaiSoHoaTag } from "@/components/common";
import { useAppSelector } from "@/lib/redux/Hooks";
import { validateDigitalSignatureFiles } from "../../ultis/validate";
import { IThanhPhanHoSoWithSoHoa } from "./AdminTepDinhKemSuaHoSo";
import { TRANGTHAISOHOA } from "@/features/hoso/data/formData";

const FOLDER_NAME = "ThanhPhanHoSo";

export const useAdminThanhPhanHoSoColumn = ({
  dataSource,
  setDataSource,
  form,
}: {
  dataSource: IThanhPhanHoSoWithSoHoa[];
  setDataSource: React.Dispatch<
    React.SetStateAction<IThanhPhanHoSoWithSoHoa[]>
  >;
  form: FormInstance<IHoSo>;
}) => {
  const { data: hoSo } = useAppSelector((state) => state.adminHoSo);
  const [_, startTransition] = useTransition();


  

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
    return [
      {
        title: "Tên giấy tờ",
        key: "ten",
        dataIndex: "ten",
        width: "40%",
        render: (_, record, idx) => {
          return (
            <Input.TextArea
              rows={2}
              defaultValue={record.ten}
              onChange={(e) => onRowChange(e.target.value, idx, "ten")}
            />
          );
        },
      },
      {
        title: "Số bản chính",
        key: "soBanChinh",
        dataIndex: "soBanChinh",
        render: (_, record, idx) => {
          return (
            <InputNumber
              min={0}
              defaultValue={record.soBanChinh ?? 0}
              onChange={(e) => onRowChange(e, idx, "soBanChinh")}
            />
          );
        },
      },
      {
        title: "Số bản sao",
        key: "soBanSao",
        dataIndex: "soBanSao",
        render: (_, record, idx) => {
          return (
            <InputNumber
              min={0}
              defaultValue={record.soBanSao ?? 0}
              onChange={(e) => onRowChange(e, idx, "soBanSao")}
            />
          );
        },
      },
      {
        title: "Nhận bản giấy",
        key: "nhanBanGiay",
        dataIndex: "nhanBanGiay",
        render: (_, record, idx) => {
          return (
            <Checkbox
              onChange={(e) =>
                onRowChange(e.target.checked, idx, "nhanBanGiay")
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
                  rowNumber={idx}
                  dinhKem={record.dinhKem}
                  scanPC={true}
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
        render: (_, record, idx) => (
          
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
        ),
      },
    ];
  }, [dataSource, form, hoSo]);
  return columns;
};
