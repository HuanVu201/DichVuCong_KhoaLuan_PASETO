import { IAction } from "@/features/action/models";
import { IBaseExt, IBasePagination, IPickSearch } from "../../../models";
import { ActionType } from "@/features/hoso/data";

export interface IScreenAction extends IBaseExt {
    screenId: string
    actionId: string,
    maAction: ActionType,
    maScreen: string,
    uuTien: string,
    ten: string,
    quyen: string,
    iconName : string;
    colorCode : string;
    showInModal : boolean;
    showInTable : boolean;
    showActionInModal : boolean;
    showActionInTable : boolean;
    
    // actions: Omit<IAction, "quyen" | "ma">[]
}   

export interface ISearchScreenAction extends IBasePagination, IPickSearch<IScreenAction, "screenId"> {
    maScreen?:string,
}