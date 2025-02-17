import { IBaseExt } from '@/models'
import { Select, SelectProps } from 'antd'
import { useMemo } from 'react'
import { useOption } from './hooks/useOption'
import { DefaultOptionType } from 'antd/es/select'

export interface AntdSelectProps<IModel> extends SelectProps {
  generateOptions?:
    | {
        model: IModel[] | undefined
        label: keyof IModel
        value: keyof IModel
      }
    | undefined
}

export const AntdSelect = <IModel,>(props: AntdSelectProps<IModel>) => {
  const { generateOptions, ...rest } = props
  // console.log(props.options);
  const options = useOption({ generateOptions })
  const filterOption: SelectProps['filterOption'] = (input: string, option) => {
    if (!option?.label) return true
    let label = option?.label as string
    return label.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
  return (
    <>
      <Select
        {...rest}
        showSearch
        options={options || rest.options}
        filterOption={rest.filterOption || filterOption}
      ></Select>
    </>
  )
}

AntdSelect.Option = Select.Option
AntdSelect.OptGroup = Select.OptGroup
