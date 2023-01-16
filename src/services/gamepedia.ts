import axios from 'axios'
import { parse } from 'node-html-parser'
import { cleanImageUrl } from '../utils/utils'

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
  const sections: GamepediaSection[] = (
    await axios.get(
      `${baseUrl}/api.php?action=parse&format=json&prop=sections&page=${pageName}`,
    )
  ).data.parse.sections
  return +sections.find((e) => e.anchor === sectionName)?.index
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
      const name = element.querySelector('.gallerytext > p > big > b > a').text
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

  // console.log(JSON.stringify(legends, null, 2))
  return legends as ApexLegends[]
}
