import { ZoomComponent } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchCoCauToChuc } from "../../redux/crud";
import { useEffect, useState } from "react";
import { ISearchCoCauToChuc } from "../../models";
import { PlusCircleOutlined } from "@ant-design/icons";
import { AntdDivider, AntdSpace, AntdTree } from "@/lib/antd/components";
import { useFolderContext } from "../../../../contexts/FolderContext";
import { ThemCoCauToChuc } from "../modals";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { CoCauToChucContextMenu } from "../CoCauToChucContextMenu";
import { SuaCoCauToChuc } from "../modals/SuaCoCauToChuc";

const { Search } = Input;
const { AntdDirectoryTree } = AntdTree;

export const CoCauToChuc = () => {
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { data: user } = useAppSelector(state => state.user)
  

  const [searchParams, setSearchParams] = useState<ISearchCoCauToChuc>({
    pageNumber: 1,
    pageSize: 10000,
    reFetch: true,
    orderBy: ["GroupOrder", "GroupCode"],
    groupCode: user?.officeCode,
    getAllChildren: true,
  });
  const folderContext = useFolderContext();
  const [folderSearchParams, setFolderSearchParams] = useState("");
  const [delayFolderSearch, setDelayFolderSearch] = useState("");

  const [themCoCauToChucModalVisible, setThemCoCauToChucModalVisible] =
    useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SearchCoCauToChuc(searchParams));
  }, [searchParams]);

  useEffect(() => {
    const timeOutId = setTimeout(
      () => setFolderSearchParams(delayFolderSearch),
      1500
    );
    return () => {
      clearTimeout(timeOutId);
    };
  }, [delayFolderSearch]);
  const onChangeFolder: SearchProps["onChange"] = (e) => {
    setDelayFolderSearch(e.target.value);
  };
  const onSearchFolder: SearchProps["onSearch"] = (value) => {
    setFolderSearchParams(value);
  };
  return (
    <ZoomComponent
      title={"Danh sách cơ cấu tổ chức"}
      onRefresh={() => setSearchParams((curr) => ({ ...curr, reFetch: true }))}
    >
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Tìm kiếm thư mục"
        onChange={onChangeFolder}
        onSearch={onSearchFolder}
      />
      <AntdDivider />
      <AntdSpace
        onClick={() => setThemCoCauToChucModalVisible(true)}
        style={{ cursor: "pointer" }}
      >
        <PlusCircleOutlined style={{ fontSize: "18px" }} />
        Thêm thư mục gốc
      </AntdSpace>
      <AntdDivider />
      <AntdDirectoryTree
        treeName="CoCauToChuc"
        multiple={false}
        generateTree={{
          data: coCauToChucs,
          title: "groupName",
          parentId: "ofGroupCode",
          id: "groupCode",
        }}
        searchParams={folderSearchParams}
        onSelect={(value) => {
          let tmpNode = coCauToChucs?.find((x) => x.groupCode == value[0]);
          folderContext.setSelectedGroup(tmpNode);
          folderContext.setFolderId((value as string[])[0]);
        }}
        contextMenu={(setVisible, id, top, left, node) => {
          return (
            <CoCauToChucContextMenu
              id={id}
              top={top}
              left={left}
              setVisible={setVisible}
              folder={node?.dataNode}
            />
          );
        }}
      />
      {/* modals */}
      <ThemCoCauToChuc
        visible={themCoCauToChucModalVisible}
        handlerClose={() => setThemCoCauToChucModalVisible(false)}
      />

      {/* modals */}
    </ZoomComponent>
  );
};
