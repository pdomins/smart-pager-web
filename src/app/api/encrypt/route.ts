
import { NextResponse } from 'next/server'
import { decryptData, encryptData, hashWithSalt, validateSaltedHash } from '@/helpers/crypto.helpter'
 
export async function POST(request: Request) {
  const body = await request.json();
  console.log('context:', body);
  console.log('cosa:', body.cosa);

  return NextResponse.json(
    `
    this is the data:
    ${JSON.stringify(body.cosa)}
    This is the hashed data:
    ${hashWithSalt(body.cosa)}
    this is the validation data:
    ${JSON.stringify(validateSaltedHash(body.cosa, hashWithSalt(body.cosa)))}

    encrypted data:
    ${encryptData(body.cosa)}

    decrypted data:
    ${JSON.stringify(decryptData(encryptData(body.cosa)))}
    `
    )
}