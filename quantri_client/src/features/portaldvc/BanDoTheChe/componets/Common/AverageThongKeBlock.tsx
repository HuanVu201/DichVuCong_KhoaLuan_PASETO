function AverageThongKeBlock({ titleText, contentText, colorTitle }: {
    titleText: string,
    contentText: string,
    colorTitle: string,

}) {
    return (<>
        <div className="averageThongKeBlock">
            <div className="titleBlock" style={{backgroundColor: colorTitle}}>
                <b>{titleText}</b>
            </div>
            <div className="contentBlock">
                <b>{contentText}</b>
            </div>
        </div>
    </>);
}

export default AverageThongKeBlock;