import axios from 'axios'
import { parse } from 'node-html-parser'
import {
  cleanImageUrl,
  parseLegendAbilities,
  parseLegendInfoBox,
} from '../utils/utils'
import { GamepediaSection, LegendDetails } from './gamepedia.types'

const baseUrl = 'https://apexlegends.gamepedia.com'

async function getSectionIndex(
  pageName: string,
  sectionName: string,
): Promise<number> {
  const url = `${baseUrl}/api.php?action=parse&format=json&prop=sections&page=${pageName}`
  const sections: GamepediaSection[] = (await axios.get(url)).data.parse
    .sections
  return +sections.find((e) => e.anchor === sectionName)?.index
}

async function getUsageRates() {
  const URL = 'https://tracker.gg/apex/insights'
  const { data } = await axios.get(URL)
  const rootHtml = parse(data)

  const usage = rootHtml
    .querySelectorAll('.usage__content .insight-bar')
    .map((element) => {
      const name = element.querySelector('.insight-bar__label').text.trim()
      const usageRate = element
        .querySelector('.insight-bar__value')
        .text.trim()
        .replace('%', '')
      return { name, usageRate: Number((+usageRate / 100).toFixed(3)) }
    })

  const kpm = rootHtml.querySelectorAll('table tbody tr').map((element) => {
    const name = element.querySelector('td:nth-child(1)').text.trim()
    const kpm = element.querySelector('td:nth-child(2)').text.trim()
      ? element.querySelector('td:nth-child(2)').text.trim()
      : 'N/A'
    return { name, kpm }
  })

  return usage.map((element) => ({
    ...element,
    kpm: kpm.find((value) => value.name === element.name).kpm,
  }))
}

async function getLegendBio(legendName: string) {
  const sectionIndex = await getSectionIndex(legendName, 'Lore')
  const url = `${baseUrl}/api.php?action=parse&page=${legendName}&format=json&prop=text&section=${sectionIndex}`
  const { data } = await axios.get(url)

  const rootHtml = parse(data.parse.text['*'])
  const bio = rootHtml
    .querySelectorAll('table > tbody > tr > td')[1]
    .text.replace(/\[[0-9]]/g, '')
    .split('\n')
    .filter((value) => value)
  return bio || []
}

async function getLegendSkins(legendName: string) {
  const sectionIndex = await getSectionIndex(legendName, 'Skins')
  const url = `${baseUrl}/api.php?action=parse&page=${legendName}&format=json&prop=text&section=${sectionIndex}`
  const { data } = await axios.get(url)
  const rootHtml = parse(data.parse.text['*'])

  const [result] = rootHtml.querySelectorAll('.tabber').map((tabElement) => {
    const rarities = tabElement
      .querySelectorAll('ul.wds-tabs li')
      .map((li) => li.text)

    return tabElement
      .querySelectorAll('.wds-tab__content')
      .map((element, index) => {
        const rarity = rarities[index]
        const skins = element.querySelectorAll('.gallerybox').map((e, id) => {
          const $skinName = e.querySelector('.gallerytext span')
          const $skinImage = e.querySelector('.thumb img')

          const name = $skinName?.text.trim() || 'Not Found'
          const [color] = $skinName
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
}

async function getHeirloom(legendName: string) {
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
}

export async function getLegends(): Promise<LegendDetails[]> {
  const pageName = 'Legend'
  const sectionName = 'Available_Legends'
  const sectionIndex = await getSectionIndex(pageName, sectionName)

  const URL = `${baseUrl}/api.php?action=parse&page=${pageName}&format=json&prop=text&section=${sectionIndex}`
  const { data } = await axios.get(URL)

  const rootHtml = parse(data.parse.text['*'])

  const legends = rootHtml
    .querySelectorAll('ul.gallery.mw-gallery-nolines li.gallerybox')
    .map((element, index) => {
      const name = element
        .querySelector('.gallerytext > p > big > b > a')
        .text.trim()
      const desc = element
        .querySelector('.gallerytext > p')
        .text.trim()
        .replace(name, '')
      const imageUrl =
        cleanImageUrl(
          element
            .querySelector('.thumb > div > a > img')
            .getAttribute('data-src'),
        ) || 'https://via.placeholder.com/150'
      const profileUrl = element
        .querySelector('.thumb > div > a')
        .getAttribute('href')

      const classIconUrl =
        element.parentNode.previousElementSibling.previousElementSibling
          .querySelector('a > img')
          .getAttribute('data-src')
      return {
        id: index + 1,
        name: name,
        desc,
        imageUrl,
        profileUrl,
        classIconUrl,
      }
    })

  const insights = await getUsageRates()
  const mappedLegends = legends.map((value) => ({
    ...value,
    insight: insights.find((element) => element.name === value.name) || {
      kpm: 'N/A',
      name: value.name,
      usageRate: 0,
    },
  }))
  return mappedLegends as LegendDetails[]
}

export async function getLegendProfile(legendName: string) {
  const url = `${baseUrl}/api.php?action=parse&format=json&page=${legendName}`
  const { data } = await axios.get(url)

  const bio = await getLegendBio(legendName)
  const skins = await getLegendSkins(legendName)
  const heirloom = await getHeirloom(legendName)
  const info = parseLegendInfoBox(data)
  const abilities = parseLegendAbilities(data)

  return {
    info,
    bio,
    abilities,
    skins,
    heirloom,
  }
}
