import { GamepediaSection } from './gamepedia.types'
import axios from 'axios'
import { baseUrl } from './gamepedia'
import parse from 'node-html-parser'
import { cleanImageUrl } from '../utils/utils'

const newlineRegExp = /[\r\n]/g

function getElementText(
  element,
  selector: string,
  replaceRegExp: RegExp = newlineRegExp,
  replaceWith: string = '',
) {
  return element
    .querySelector(element)
    .text.trim()
    .replace(replaceRegExp, replaceWith)
}

async function getRootElementFromURL(url: string) {
  return (await axios.get(url)).data.parse
}

export async function getSectionIndex(
  pageName: string,
  sectionName: string,
): Promise<number> {
  const url = `${baseUrl}/api.php?action=parse&format=json&prop=sections&page=${pageName}`
  const sections: GamepediaSection[] = (await axios.get(url)).data.parse
    .sections
  return +sections.find((e) => e.anchor === sectionName)?.index
}

export function parseLegendInfoBox(data) {
  const rootHtml = parse(data.parse.text['*'])
  const infoRootElement = rootHtml.querySelectorAll('.infobox.infobox tr')
  const mapped = infoRootElement
    .filter((element) => element.classNames.length)
    .reduce((memo, element) => {
      const key = getElementText(element, 'th')
      memo[key] = getElementText(element, 'td')
      return memo
    }, {})

  return {
    name: getElementText(infoRootElement[0], 'th'),
    desc: getElementText(infoRootElement[2], 'td > i'),
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

  return rootHtml.querySelectorAll('.ability-container').map((element) => {
    const name = element
      .querySelectorAll('.ability-image')[0]
      .parentNode.nextElementSibling.text.trim()
      .replace(newlineRegExp, '')

    const abilityType = element
      .querySelectorAll('.ability-image')[0]
      .nextElementSibling.text.trim()
      .replace(newlineRegExp, '')

    const imageUrl = element
      .querySelectorAll('.ability-image > a > img')[0]
      .getAttribute('data-src')

    const description = element.querySelectorAll('.ability-header').reduce(
      (memo, currentElement) => {
        const name = currentElement.text.trim().replace(newlineRegExp, '')
        const value = currentElement.nextElementSibling.text
          .trim()
          .replace(newlineRegExp, '')
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
}
