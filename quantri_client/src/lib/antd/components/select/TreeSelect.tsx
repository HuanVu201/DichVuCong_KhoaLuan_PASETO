import { IBaseExt } from "@/models";
import { Select, SelectProps, TreeSelect, TreeSelectProps } from "antd";
import { useMemo } from "react";
import { useOption } from "./hooks/useOption";
import { DefaultOptionType } from "antd/es/select";
import { TreeNodeProps } from "antd/lib";
import { useTreeData } from "../tree/hooks/useTreeData";
import { listToTree, useTreeSelectData } from "./hooks/useTreeData";

export interface AntdTreeSelectProps<IModel> extends TreeSelectProps {
  generateOptions?: {
    model?: IModel[];
    title: keyof IModel;
    value: keyof IModel;
    parentKey: keyof IModel;
    defaultValue?: any;
  };
}

export const AntdTreeSelect = <IModel extends IBaseExt>(
  props: AntdTreeSelectProps<IModel>
) => {
  const { generateOptions, ...rest } = props;

  var treeData = useTreeSelectData(generateOptions);
  // console.log(props.options);

  //   const filterOption: TreeSelectProps["filterTreeNode"] = (
  //     input: string,
  //     option: TreeNodeProps
  //   ) => {
  //     return true;
  //     // if (!option?.label) return true;
  //     // let label = option?.label as string;
  //     // return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  //   };
  return (
    <TreeSelect
      treeData={treeData || rest.treeData}
      dropdownStyle={{
        maxHeight: 400,
        overflow: "auto",
      }}
      {...rest}
    />
  );
};
