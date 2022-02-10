import NodeRSA from 'node-rsa'

// rsa加密
export function rsa(data,
  publicKey = `-----BEGIN RSA PUBLIC KEY-----
  MIGJAoGBALFq6CsvJT0J+Un527Q9HewNd+A/uusQgFD4cij41cuoiufqqegi/z6f
  jGmcwWh5RPs1BIsyfy0jnLA9eq6oaSHIh86n8VoX9ZgUb/9u5ntBV7yO6Db/BSJ4
  cOMEQJ4SyA3qzKFG4BO9A3hh7A0MI6DNfSMpnxg9lsUiVgRsCTkXAgMBAAE=
  -----END RSA PUBLIC KEY-----`
) {
  const nodersa = new NodeRSA(publicKey)
  nodersa.setOptions({ encryptionScheme: 'pkcs1' })
  return nodersa.encrypt(data, 'base64')
}

// sha256加密
export function sha256(data) {
  const nodersa = new NodeRSA()
  nodersa.setOptions({ encryptionScheme: 'sha256' })
  return nodersa.encrypt(data, 'base64')
}

// 解密
export function decryption(data,
  privateKey = ''
) {
  const nodersa = new NodeRSA(privateKey)
  return nodersa.decrypt(data, 'utf8')
}
