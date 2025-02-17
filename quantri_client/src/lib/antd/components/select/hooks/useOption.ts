import { SelectProps } from 'antd'
import React, { useMemo } from 'react'
import { IBaseExt } from '@/models'
import { AntdSelectProps } from '../Select'
import { DefaultOptionType } from 'antd/es/select'

//1d options // dùng list_to_tree để tạo (n)d options
export const useOption = <IModel,>({generateOptions}: {generateOptions: AntdSelectProps<IModel>["generateOptions"]}) => {
    const options = useMemo((): SelectProps["options"] => {
        if(generateOptions){
            const {model, label, value} = generateOptions
            return model?.map(x => ({label: x[label], value: x[value]} as DefaultOptionType))
        }
        return undefined
    },[generateOptions?.model])
  return options
}
