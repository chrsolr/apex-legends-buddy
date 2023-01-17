import uuid from 'react-native-uuid'
import parse, { HTMLElement } from 'node-html-parser'

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

export function parseLegendInfoBox(data) {
  const rootHtml = parse(data.parse.text['*'])
  const infoRootElement = rootHtml.querySelectorAll('.infobox.infobox tr')
  const mapped = infoRootElement
    .filter((element) => element.classNames.length)
    .reduce((memo, element) => {
      const key = element
        .querySelector('th')
        .text.trim()
        .replace(/[\r\n]/g, '')
      const value = element
        .querySelector('td')
        .text.trim()
        .replace(/[\r\n]/g, '')

      memo[key] = value
      return memo
    }, {})

  return {
    name: infoRootElement[0]
      .querySelector('th')
      .text.trim()
      .replace(/[\r\n]/g, ''),
    desc: infoRootElement[2].querySelector('td > i').text.trim(),
    imageUrl: cleanImageUrl(
      infoRootElement[1]
        .querySelector('td > a > img')
        .getAttribute('data-src') || 'https://via.placeholder.com/150',
    ),
    realName: mapped['Real Name'],
    gender: mapped['Gender'],
    age: mapped['Age'],
    homeWorld: mapped['Homeworld'],
    legendType: mapped['Legend Type'],
  }
}

export function parseLegendAbilities(data) {
  const rootHtml = parse(data.parse.text['*'])
  const abilities = rootHtml
    .querySelectorAll('.ability-container')
    .map((element) => {
      const name = element
        .querySelectorAll('.ability-image')[0]
        .parentNode.nextElementSibling.text.trim()
        .replace(/[\r\n]/g, '')

      const abilityType = element
        .querySelectorAll('.ability-image')[0]
        .nextElementSibling.text.trim()
        .replace(/[\r\n]/g, '')

      const imageUrl = element
        .querySelectorAll('.ability-image > a > img')[0]
        .getAttribute('data-src')

      const description = element.querySelectorAll('.ability-header').reduce(
        (memo, currentElement) => {
          const name = currentElement.text.trim().replace(/[\r\n]/g, '')
          const value = currentElement.nextElementSibling.text
            .trim()
            .replace(/[\r\n]/g, '')
          memo[name.toLowerCase()] = {
            name,
            value,
          }

          return memo
        },
        { abilityType: { name: 'Type', value: abilityType } },
      )
      return {
        name,
        imageUrl,
        description: [
          description['abilityType'],
          description['charge time'] || description['cooldown'],
          description['description'],
        ],
      }
    })
  return abilities
}
