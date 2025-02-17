import { ICON_HOLDER_KEYS } from "@/data";

export interface BaseActionProps {
    iconName?: keyof typeof ICON_HOLDER_KEYS;
    colorCode?: string;
}