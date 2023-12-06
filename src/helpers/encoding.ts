
const utils = {
    toBase64: (plainText: string) => Buffer.from(plainText, 'utf8').toString('base64'),
    fromBase64: (encodedText: string) => Buffer.from(encodedText.replaceAll('%3D', '='), 'base64').toString('utf8')
}

export default utils
