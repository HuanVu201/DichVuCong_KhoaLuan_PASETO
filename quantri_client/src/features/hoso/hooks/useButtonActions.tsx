import { SearchScreenAction, SearchScreenActionCanBo } from "@/features/screenaction/redux/crud";
import { AntdButton, AntdDivider, AntdSpace } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useMemo } from "react";
import { buttonActions } from "../components/buttons";
import { ScreenType } from "../data";
import React from "react";
import { Affix } from "antd";
import { IScreenAction } from "@/features/screenaction/models";
import { setFilterActionByMaScreen } from "@/features/screenaction/redux/slice";
import { useWindowSizeChange } from "@/hooks/useWindowSizeChange";

export const useButtonActions = ({
  maScreen,
  filterActionBy,
}: {
  maScreen?: ScreenType;
  filterActionBy?: (action: IScreenAction) => boolean;
}) => {
  const { filteredActions: actions } = useAppSelector((state) => state.screenaction);
  const dispatch = useAppDispatch();
  const {isWindow} = useWindowSizeChange()

  useEffect(() => {
    if (maScreen && actions === undefined) {
      dispatch(SearchScreenActionCanBo({ maScreen }));
    } else if(maScreen && actions !== undefined){
       dispatch(setFilterActionByMaScreen(maScreen))
    }
  }, [maScreen]);
  const buttons = useMemo(() => {
    const filteredActions =
      filterActionBy !== undefined ? actions?.filter(filterActionBy) : actions;
    const elements = filteredActions?.map((action) => {
      const element = buttonActions[action.maAction];
      const props = {
        actionName: action.ten,
        iconName: action.iconName,
        colorCode: action.colorCode,
      };
      

      return { element, props };
    });
    return elements?.map((x, idx) => (
      <React.Fragment key={idx}>
        {x.element != undefined ? x.element(x.props) : null}
      </React.Fragment>
    ));
  }, [actions, filterActionBy]);
  const btnElememts = (
    <>
      <Affix offsetTop={75}>
        <AntdSpace
          direction="horizontal"
          style={isWindow ? {flexWrap : "wrap"} : { overflowX: "auto", maxWidth: "100%", overflow: "overlay"}}
        >
          {buttons ? buttons : null}
        </AntdSpace>
      </Affix>
    </>
  );

  return {
    buttons,
    btnElememts,
  };
};
