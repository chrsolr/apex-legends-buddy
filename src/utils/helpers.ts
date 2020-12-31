import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export function getUniqueKey() {
  return uuidv4()
}

export function cleanImageUrl(url: string): string {
  return url ? url.substring(0, url.indexOf('/revision/')) : url
}

export function getImageAtSize(url: string, size: number) {
  if (!url) {
    return url
  }
  const indexOfCallback = url.indexOf('?cb=')
  const baseUri = url
    .substring(0, indexOfCallback)
    .substring(0, url.lastIndexOf('/'))
  return `${baseUri}/${size.toFixed(0)}${url.substring(indexOfCallback)}`
}
