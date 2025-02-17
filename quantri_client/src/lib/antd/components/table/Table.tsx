import { Table } from "antd";
import { ComponentProps, useEffect } from "react";
import { ColumnsType, TableProps } from "antd/es/table";
import { IBaseExt, IBasePagination } from "../../../../models";

export interface IAntdTableProps<IModel, ISearch>
  extends Omit<TableProps<IModel>, "columns"> {
  columns: ColumnsType<IModel>;
  onSearch: (params: ISearch) => void;
  searchParams: ISearch;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearch>>;
  position?: string[]
}

export const AntdTable = <
  IModel extends IBaseExt,
  ISearch extends IBasePagination
>(
  props: IAntdTableProps<IModel, ISearch>
) => {
  const {
    columns,
    dataSource,
    pagination,
    loading,
    onSearch,
    searchParams,
    setSearchParams,
    rowKey,
    position,
    ...rest
  } = props;

  useEffect(() => {
    onSearch(searchParams);
  }, [searchParams]);

  return (
    <Table
      rowKey={rowKey || "id"}
      loading={loading}
      columns={columns as any}
      dataSource={dataSource}
      bordered={true}
      rootClassName="table-responsive"
      pagination={
        pagination
          ? {
            current:
              searchParams.pageNumber === 0 ? 1 : searchParams.pageNumber,
            pageSize: searchParams.pageSize,
            onChange(page, pageSize) {
              setSearchParams({
                ...searchParams,
                pageNumber: page,
                pageSize: pageSize,
              });
            },
            position: position || ["topLeft", "bottomRight"] as any,
            ...pagination,

            pageSizeOptions: ["10", "20", "50", "100", "1000", "5000", "10000"],
            showSizeChanger: true,
          }
          : {
            pageSizeOptions: ["10", "20", "50", "100", "1000", "5000", "10000"],
            current:
              searchParams.pageNumber === 0 ? 1 : searchParams.pageNumber,
            pageSize: searchParams.pageSize,
            onChange(page, pageSize) {
              setSearchParams({
                ...searchParams,
                pageNumber: page,
                pageSize: pageSize,
              });

            },
            position: position || ["topLeft", "bottomRight"],
            showSizeChanger: true,

          }
      }
      {...rest}
    />
  );
};
