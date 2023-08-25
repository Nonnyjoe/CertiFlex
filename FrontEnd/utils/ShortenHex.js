export function shortenHex(hexString, maxLength) {
  if (hexString?.length <= maxLength) {
    return hexString;
  } else {
    return hexString?.slice(0, maxLength - 3) + '...';
  }
}