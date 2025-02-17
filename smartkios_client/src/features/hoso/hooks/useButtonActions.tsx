import { SearchScreenAction } from "@/features/screenaction/redux/crud";
import { AntdButton, AntdDivider, AntdSpace } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useMemo } from "react";
import { buttonActions } from "../components/buttons";
import { ScreenType } from "../data";
import React from "react";
import { Affix } from "antd";
import { IScreenAction } from "@/features/screenaction/models";

export const useButtonActions = ({
  maScreen,
  filterActionBy,
}: {
  maScreen?: ScreenType;
  filterActionBy?: (action: IScreenAction) => boolean;
}) => {
  const { datas: actions } = useAppSelector((state) => state.screenaction);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (maScreen) {
      dispatch(SearchScreenAction({ maScreen }));
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
  }, [actions]);

  const btnElememts = (
    <>
      <Affix offsetTop={75}>
        <AntdSpace
          direction="horizontal"
          style={{ flexWrap: "wrap", backgroundColor: "#fff" }}
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
