const generateCheckSum = (text: string | undefined) => {
  let crc = 0xffff;
  let polynomial = 0x1021;
  let bytes = new TextEncoder().encode(text);

  for (let b of bytes) {
    for (let i = 0; i < 8; i++) {
      let bit = ((b >> (7 - i)) & 1) === 1;
      let c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 !== bit) {
        crc ^= polynomial;
      }
    }
  }
  return (crc & 0xffff).toString(16);
};

// All params must be a string
export const generateQRCode = (
  bankId: string,
  amount: string,
  bankAccount: string,
  message: string,
) => {
  const part12Builder = ''
    .concat('00')
    .concat(bankId.length.toString().padStart(2, '0'))
    .concat(bankId)
    .concat('01')
    .concat(bankAccount.length.toString().padStart(2, '0'))
    .concat(bankAccount);
  const part11Builder = ''
    .concat('0010A000000727')
    .concat('01')
    .concat(part12Builder.length.toString().padStart(2, '0'))
    .concat(part12Builder)
    .concat('0208QRIBFTTA');
  const part1Builder = ''
    .concat('38')
    .concat(part11Builder.length.toString().padStart(2, '0'))
    .concat(part11Builder);
  const part21Builder = ''
    .concat('08')
    .concat(message.length.toString().padStart(2, '0'))
    .concat(message);
  const part2 = ''
    .concat('5303704')
    .concat('54')
    .concat(amount.length.toString().padStart(2, '0'))
    .concat(amount)
    .concat('5802VN')
    .concat('62')
    .concat(part21Builder.length.toString().padStart(2, '0'))
    .concat(part21Builder);
  const builder = ''
    .concat()
    .concat('000201')
    .concat('010212')
    .concat(part1Builder)
    .concat(part2)
    .concat('6304');
  const qrcodeContent = builder.concat(generateCheckSum(builder).toUpperCase());
  return qrcodeContent;
};
