/**
 * Created by Administrator on 2016/6/7.
 */
function getSecretKey(seed){
    //将种子进行hash
    var hexString = hex_sha1(seed);
    //截取种子的16位
    var secretKey = hexString.substring(5, 21);
    //base64加密
    return base64encode(utf16to8(secretKey))
}
function getAesString(data,key){//加密
    var key  = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.AES.encrypt(data,key,
        {
            mode:CryptoJS.mode.ECB,
            padding:CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}
function getDAesString(encrypted,key){//解密
    var key  = CryptoJS.enc.Utf8.parse(key);
    var decrypted = CryptoJS.AES.decrypt(encrypted,key,
        {
            mode:CryptoJS.mode.ECB,
            padding:CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
function encrypt(data,seed){ //加密
    var data = data;//明文
    var key  = getSecretKey(seed);  //密钥
    var encrypted = getAesString(data,base64decode(key)); //密文
    return encrypted
}
function decrypt(encrypted,seed){//解密
    var encrypted = encrypted; //密文
    var key  = getSecretKey(seed);  //密钥
    var decryptedStr = getDAesString(encrypted,utf8to16(base64decode(key)));
    return decryptedStr
}