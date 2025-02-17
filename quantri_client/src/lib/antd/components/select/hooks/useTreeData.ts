import { IBaseExt } from "@/models";
import { TreeProps,TreeNodeProps } from "antd";
import { DataNode } from "antd/es/tree";
import { TreeSelectProps } from "antd/lib";
import { AntdSelectProps } from "../Select";
import { useMemo } from "react";
import { AntdTreeSelectProps } from "../TreeSelect";

export const listToTree = <IModel extends IBaseExt>(data: IModel[],parentKey:keyof IModel, title: keyof IModel,value: keyof IModel,defaultValue:any ) 
 :TreeSelectProps["treeData"] => {
    if(!data) return [];
    let tmp: TreeSelectProps["treeData"] = data
    .filter(x=> x[parentKey] == defaultValue)
    .map(node=>{

        return {
            id: node['id'],
            value: node[value],
            title: node[title],
            children: listToTree(data,parentKey,title,value,node[value])
        }
    }) as TreeSelectProps["treeData"];
    // console.log(tmp);
  
  return tmp;
}
export const useTreeSelectData = <IModel extends IBaseExt>(generateTree: AntdTreeSelectProps<IModel>["generateOptions"] | undefined) => {
  const treeData = useMemo(() => {
    if(generateTree && generateTree.model){
        const {model,title,value,defaultValue,parentKey} = generateTree
        
     
        return listToTree(model, parentKey,title,value,defaultValue);
    }
    return undefined
}, [generateTree?.model])

  return treeData
}