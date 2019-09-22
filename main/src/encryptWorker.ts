import { parentPort, workerData } from "worker_threads";

interface EncryptWorkerOptions {
    compressionLevel?: number,
}

function encryptFile(inputFile: string, outputFile: string, options: EncryptWorkerOptions){
    console.log('encryptFile', inputFile)

}

export const encryptWorker = (): void => {

    console.log('encryptWorker started');

    /*
    1. Read original file as stream
    2. pipe to compression (maybe optional)
    3. encrypt
    4. write to new file as stream
     */
    if(!parentPort){
        throw new Error('No worker supported!?!')
    }

    parentPort.on("message", (param) => {
        // const result = fib(param);
        console.log("param", param);
        console.log("workerData is", workerData);
    });
};
