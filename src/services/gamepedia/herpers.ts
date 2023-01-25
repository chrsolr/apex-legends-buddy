import axios from 'axios'
import { HTMLElement, parse } from 'node-html-parser'
import {
  getElementText,
  getParsedHtmlFromGamepediaUrl,
} from '../../utils/html-parse-utils'
import { cleanImageUrl } from '../../utils/utils'
import {
  GamepediaSection,
  LegendInsight,
  LegendProfileAbility,
  LegendProfileInfo,
} from './types'

export const newlineRegExp = /[\r\n]/g
export const baseUrl = 'https://apexlegends.gamepedia.com'

export async function getSectionIndex(
  pageName: string,
  sectionName: string,
): Promise<number> {
  try {
    const url = `${baseUrl}/api.php?action=parse&format=json&prop=sections&page=${pageName}`
    const sections: GamepediaSection[] = (await axios.get(url)).data.parse
      .sections
    return +sections.find((e) => e.anchor === sectionName)?.index
  } catch (e) {
    throw Error(`getSectionIndex: ${e}`)
  }
}

export async function getUsageRates(): Promise<LegendInsight[]> {
  try {
    const URL = 'https://tracker.gg/apex/insights'
    const rootHtml = parse((await axios.get(URL)).data)

    const usage = rootHtml
      .querySelectorAll('.usage__content .insight-bar')
      .map((element) => {
        const name = getElementText(element, '.insight-bar__label')
        const usageRate = getElementText(
          element,
          '.insight-bar__value',
          '%',
          '',
        )
        return { name, usageRate: Number((+usageRate / 100).toFixed(3)) }
      })

    const kpm = rootHtml.querySelectorAll('table tbody tr').map((element) => {
      const name = getElementText(element, 'td:nth-child(1)')
      const kpm = getElementText(element, 'td:nth-child(2)')
        ? getElementText(element, 'td:nth-child(2)')
        : 'N/A'
      return { name, kpm }
    })

    return usage.map((element) => ({
      ...element,
      kpm: kpm.find((value) => value.name === element.name).kpm,
    }))
  } catch (e) {
    throw Error(`getUsageRates: ${e}`)
  }
}

export async function getLegendBio(legendName: string) {
  try {
    const sectionIndex = await getSectionIndex(legendName, 'Lore')
    const url = `${baseUrl}/api.php?action=parse&page=${legendName}&format=json&prop=text&section=${sectionIndex}`
    const rootHtml = await getParsedHtmlFromGamepediaUrl(url)
    const bio = rootHtml
      .querySelectorAll('table > tbody > tr > td')[1]
      .text.replace(/\[[0-9]]/g, '')
      .split('\n')
      .filter((value) => value)
    return bio || []
  } catch (e) {
    throw Error(`getLegendBio: ${e}`)
  }

  throw Error(`getParsedHtmlFromGamepediaUrl: ${e}`)
}

export async function getLegendSkins(legendName: string) {
  try {
    const sectionIndex = await getSectionIndex(legendName, 'Skins')
    const url = `${baseUrl}/api.php?action=parse&page=${legendName}&format=json&prop=text&section=${sectionIndex}`
    const rootHtml = await getParsedHtmlFromGamepediaUrl(url)

    const [result] = rootHtml.querySelectorAll('.tabber').map((tabElement) => {
      const rarities = tabElement
        .querySelectorAll('ul.wds-tabs li')
        .map((li) => li.text)

      return tabElement
        .querySelectorAll('.wds-tab__content')
        .map((element, index) => {
          const rarity = rarities[index]
          const skins = element.querySelectorAll('.gallerybox').map((e, id) => {
            const $skinName = e.querySelector('.gallerytext span[style]')
            const $skinImage = e.querySelector('.thumb img')

            const name = $skinName?.textContent.trim() || 'Not Found'
            const [color] =
              $skinName && $skinName.hasAttribute('style')
                ? $skinName
                    .getAttribute('style')
                    .split('; ')
                    .filter((v) => v.includes('color'))
                : ['color;#ff0000']
            const rarity = color?.substring(color.indexOf('#'))
            const imageUrl = cleanImageUrl(
              $skinImage.getAttribute(
                $skinImage.hasAttribute('data-src') ? 'data-src' : 'src',
              ),
            )

            return {
              id,
              name,
              rarity,
              imageUrl,
            }
          })
          return { rarity, skins }
        })
    })
    return result
  } catch (e) {
    throw Error(`getLegendSkins: ${e}`)
  }
}

export async function getLegendHeirloom(legendName: string) {
  try {
    const sectionIndex = await getSectionIndex(legendName, 'Heirloom_Set')
    if (!sectionIndex) {
      return undefined
    }

    const url = `${baseUrl}/api.php?action=parse&page=${legendName}&format=json&prop=text&section=${sectionIndex}`
    const { data } = await axios.get(url)
    const rootHtml = parse(data.parse.text['*'])
    const rootImageElement = rootHtml.querySelector('img')
    const imageUrl = rootImageElement
      ? cleanImageUrl(
          rootImageElement.getAttribute(
            rootImageElement.hasAttribute('data-src') ? 'data-src' : 'src',
          ),
        )
      : undefined
    const desc = rootHtml
      .querySelectorAll('ul li')
      .map((element) => {
        const [key, value] = element.text.trim().split(':')
        return value.trim()
      })
      .reduce(
        (memo, current, index) => {
          if (index === 1) {
            memo.name = current
          }
          if (index === 0) {
            memo.banner = current
          }

          if (index === 2) {
            memo.quip = current
              .split('')
              .reverse()
              .join('')
              .replace('.', '')
              .split('')
              .reverse()
              .join('')
          }
          return memo
        },
        {
          name: null,
          banner: null,
          quip: null,
        },
      )
    return { imageUrl, desc }
  } catch (e) {
    throw Error(`getLegendHeirloom: ${e}`)
  }
}

export async function getLegendGallery(legendName: string): Promise<string[]> {
  try {
    const sectionIndex = await getSectionIndex(legendName, 'Gallery')
    const url = `${baseUrl}/api.php?action=parse&page=${legendName}&format=json&prop=text&section=${sectionIndex}`
    const rootHtml = await getParsedHtmlFromGamepediaUrl(url)
    return rootHtml.querySelectorAll('iframe').map((element) => {
      let url = element.getAttribute('src')
      if (url.includes('youtube') && url.includes('embed')) {
        url = url.substring(url.lastIndexOf('/') + 1, url.length - 1)
      }
      return url
    })
  } catch (e) {
    throw Error(`getLegendGallery: ${e}`)
  }
}

export function parseAllLegends(rootElement: HTMLElement) {
  try {
    return rootElement
      .querySelectorAll('ul.gallery.mw-gallery-nolines li.gallerybox')
      .map((element, index) => {
        const name = getElementText(element, '.gallerytext > p > big > b > a')
        const desc = getElementText(element, '.gallerytext > p', name, '')
        const $image = element.querySelector('.thumb > div > a > img')
        const imageUrl = !$image
          ? 'https://via.placeholder.com/150'
          : $image.getAttribute(
              $image.hasAttribute('data-src') ? 'data-src' : 'src',
            )

        const profileUrl = element
          .querySelector('.thumb > div > a')
          .getAttribute('href')

        const $classIcon =
          element.parentNode.previousElementSibling.previousElementSibling.querySelector(
            'a > img',
          )

        const classIconUrl = $classIcon.getAttribute(
          $classIcon.hasAttribute('data-src') ? 'data-src' : 'src',
        )
        return {
          id: index + 1,
          name,
          desc,
          imageUrl: cleanImageUrl(imageUrl),
          profileUrl,
          classIconUrl,
        }
      })
  } catch (e) {
    throw Error(`parseAllLegends: ${e}`)
  }
}

export function parseLegendInfoBox(
  rootElement: HTMLElement,
): LegendProfileInfo {
  try {
    const infoRootElement = rootElement.querySelectorAll('.infobox.infobox tr')
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
  } catch (e) {
    throw Error(`parseLegendInfoBox: ${e}`)
  }
}

export function parseLegendAbilities(
  rootElement: HTMLElement,
): LegendProfileAbility[] {
  try {
    return rootElement.querySelectorAll('.ability-container').map((element) => {
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
  } catch (e) {
    throw Error(`parseLegendAbilities: ${e}`)
  }
}
