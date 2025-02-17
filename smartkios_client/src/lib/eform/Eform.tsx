import { FormProps } from "@formio/react/lib/components/Form"
import {ElementRef, RefObject} from 'react'
import { Form } from "@formio/react"

export type EformProps = FormProps & {
    ref?: ElementRef<any>
}
export const Eform = (props: EformProps) => {
    return <Form {...props}></Form>
}