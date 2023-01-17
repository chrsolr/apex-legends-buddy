import axios from 'axios'
import { parse } from 'node-html-parser'
import {
  cleanImageUrl,
  parseLegendAbilities,
  parseLegendInfoBox,
} from '../utils/utils'

type has_id = {
  id: number | string
}

type LegendsInsight = {
  name: string
  usageRate: number
  kpm: string | number | undefined
}

export type ApexLegends = {
  name: string
  desc: string
  imageUrl: string
  profileUrl: string
  classIconUrl: string
  classDesc: string
  className: string
  insight: LegendsInsight
} & has_id

type GamepediaSection = {
  toclevel: number
  level: string
  line: string
  number: string
  index: string
  fromtitle: string
  byteoffset: number
  anchor: string
}

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
  const { data } = await axios.get(
    `${baseUrl}/api.php?action=parse&page=${legendName}&format=json&prop=text&section=${sectionIndex}`,
  )

  const rootHtml = parse(data.parse.text['*'])
  const bio = rootHtml
    .querySelectorAll('table > tbody > tr > td')[1]
    .text.replace(/\[[0-9]]/g, '')
    .split('\n')
    .filter((value) => value)
  return bio || []
}

export async function getLegends(): Promise<ApexLegends[]> {
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
  return mappedLegends as ApexLegends[]
}

export async function getLegendProfile(legendName: string) {
  const { data } = await axios.get(
    `${baseUrl}/api.php?action=parse&format=json&page=${legendName}`,
  )
  const bio = await getLegendBio(legendName)
  const info = parseLegendInfoBox(data)
  const abilities = parseLegendAbilities(data)

  // console.log(JSON.stringify(info, null, 2))

  return {
    info,
    bio,
    abilities,
  }
}
