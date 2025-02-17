import { DefaultOptionType } from "antd/es/select";

export const filterOptions = (input: string, option :  DefaultOptionType | undefined) => ((option?.label ?? '') as string).toLowerCase().includes(input.toLowerCase())