import React from 'react'
import uuid from 'react-native-uuid'
import { Image } from 'react-native'
import { Asset } from 'expo-asset';

export function getUniqueKey() {
  return uuid.v4().toString()
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

export function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}
