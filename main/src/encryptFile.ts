// @ts-ignore
import {StaticPool} from 'node-worker-threads-pool';


export const encryptFile = (files: FileList): void => {
    try {
        console.log('encryptFile', files);
        // const pool = new StaticPool({
        //     size:4,
        //     task: () => {
        //         // @ts-ignore
        //         console.log('worker', JSON.stringify(this.workerData.files))
        //     },
        //     workerData: {
        //         files
        //     }
        // });
        // pool.exec();
    } catch (e) {
        console.log(e)
    }
};
