declare module 'msgreader' {
  class MsgReader {
    constructor(arrayBuffer: ArrayBuffer | Buffer);
    getFileData(): {
      body: string;
      [key: string]: any;
    };
  }

  export default MsgReader;
}
