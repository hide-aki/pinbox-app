import {IfsData} from './IfsData';

export interface RendererApi {
    loadIfs: (publicKey:string) => Promise<IfsData>
    // add more here
}
