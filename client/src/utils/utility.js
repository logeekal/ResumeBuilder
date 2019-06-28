export const arrayBufferToBase64 = (buffer) =>{
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b)=>binary+=String.fromCharCode(b));
    return btoa(binary);
}

export const arrayBufferToBase64Wrapper = (buffer) =>{
    let fileStr = arrayBufferToBase64(buffer);
    let base64Flag = 'data:image/jpeg;base64,';
    let fileData = base64Flag + fileStr;
    console.log(fileData);
    return fileData;
}