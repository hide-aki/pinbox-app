export interface IfsChangedType {
    ifsFilepath: string
}

export const handleIfsChanged = async (payload:IfsChangedType) => {
    console.log('handleIfsChanged', window.rendererApi.loadIfs())
};
