import { ZoomComponent } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
// import { SearchCoCauToChuc } from "../../redux/crud";
import { useEffect, useState } from "react";
// import { ISearchCoCauToChuc } from "../../models";
import { PlusCircleOutlined } from "@ant-design/icons";
import { AntdDivider, AntdSpace, AntdTree } from "@/lib/antd/components";
// import { useFolderContext } from "../../../../contexts/FolderContext";
// import { ThemCoCauToChuc } from "../modals";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import {
  ICoCauToChuc,
  ISearchCoCauToChuc,
} from "@/features/cocautochuc/models";
import { useFolderContext } from "@/contexts/FolderContext";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { CoCauToChucContextMenu } from "@/features/cocautochuc/components/CoCauToChucContextMenu";
import { coCauToChucService } from "@/features/cocautochuc/services";
// import { CoCauToChucContextMenu } from "../CoCauToChucContextMenu";
// import { SuaCoCauToChuc } from "../modals/SuaCoCauToChuc";

const { Search } = Input;
const { AntdDirectoryTree } = AntdTree;

export const NguoiTiepNhanLeftSide = () => {
  // const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);

  const [coCauToChucs, setCoCauToChus] = useState<ICoCauToChuc[]>([]);
  const [searchParams, setSearchParams] = useState<ISearchCoCauToChuc>({
    pageNumber: 1,
    pageSize: 10000,
    reFetch: true,
    orderBy: ["GroupOrder", "GroupCode"],
  });
  const folderContext = useFolderContext();
  const [folderSearchParams, setFolderSearchParams] = useState("");
  const [delayFolderSearch, setDelayFolderSearch] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const res = await coCauToChucService.Search(searchParams);
      if (res?.data && res?.data?.data) setCoCauToChus(res.data.data);
    })();
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
          folderContext.setFolderId((value as string[])[0]);
        }}
      />
      {/* modals */}

      {/* modals */}
    </ZoomComponent>
  );
};
