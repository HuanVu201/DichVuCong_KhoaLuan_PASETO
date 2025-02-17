
export const allItemHasFile =  <IModel>(items : IModel[] | undefined, colFile: keyof IModel) => {
    if(!items || items?.length == 0){
        return false
    }
    if(items){
        return items.every(x => x[colFile])
    }
    return true
}