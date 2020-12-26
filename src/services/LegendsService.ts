import axios from 'axios'
import cheerio from 'cheerio'

export interface Legends {
  id: number
  name: string
  desc: string
  imageUrl: string
  profileUrl: string
  classIconUrl: string
  classDesc: string
  className: string
  insight: LegendsInsight
}

export interface LegendsInsight {
  name: string
  usageRate: number
  kpm: string | number
}

export interface LegendProfile {
  bio: string[]
  info: LegendProfileInfo
}

interface LegendProfileInfo {
  name: string
  imageUrl: string | null
  desc: string
  realName: string
  gender: string
  age: string
  weight: string
  height: string
  homeWorld: string
  voiceActor: string
}

export default class LegendsService {
  private baseUrl = 'https://apexlegends.gamepedia.com'

  async getLegends(): Promise<Legends[]> {
    const URL = `${this.baseUrl}/api.php?action=parse&format=json&page=Legends&redirects=1}`
    const { data } = await axios.get(URL)
    const body = data.parse.text['*']
    const $ = cheerio.load(body)
    const legends = $('ul.gallery.mw-gallery-nolines li.gallerybox')
      .map((index, element) => ({
        id: index,
        name: $(element).find('.gallerytext > p > a').text().trim(),
        desc: $(element).find('.gallerytext > p > small').text().trim(),
        imageUrl: this.cleanImageUrl(
          $(element).find('.thumb > div > a > img').attr('src'),
        ),
        profileUrl: `${this.baseUrl}${$(element)
          .find('.thumb > div > a')
          .attr('href')}`,
        classIconUrl: this.cleanImageUrl(
          $(element).parent().prev().prev().find('a > img').attr('src'),
        ),
        classDesc: $(element)
          .parent()
          .prev()
          .text()
          .replace(/[\r\n]/g, '')
          .trim(),
        className: $(element)
          .parent()
          .prev()
          .prev()
          .prev()
          .find('span.mw-headline')
          .text(),
      }))
      .get()

    const insights = await this.getUsageRates()

    return legends.map((value) => ({
      ...value,
      insight: insights.find((element) => element.name === value.name),
    }))
  }

  async getUsageRates(): Promise<LegendsInsight[]> {
    const URL = 'https://tracker.gg/apex/insights'
    const { data } = await axios.get(URL)
    const $ = cheerio.load(data)

    const usage = $('.legends__content .insight-bar')
      .map((index, element) => ({
        name: $(element).find('.insight-bar__label').text().trim(),
        usageRate: Number(
          (
            +$(element)
              .find('.insight-bar__value')
              .text()
              .trim()
              .replace('%', '') / 100
          ).toFixed(3),
        ),
      }))
      .get()

    const kpm = $('table tbody tr')
      .map((index, element) => ({
        name: $(element).find('td:nth-child(1)').html(),
        kpm: $(element).find('td:nth-child(2)').html(),
      }))
      .get()

    return usage.map((element) => ({
      ...element,
      kpm: kpm.find((value) => value.name === element.name).kpm,
    }))
  }

  async getLegendProfile(legendName: string): Promise<LegendProfile> {
    const $ = cheerio.load(
      (
        await axios.get(
          `${this.baseUrl}/api.php?action=parse&format=json&page=${legendName}&redirects=1`,
        )
      ).data.parse.text['*'],
    )
    const $infobox = $('.infobox.infobox tr')

    const profile = {
      bio: cheerio
        .load(
          (
            await axios.get(
              `${this.baseUrl}/api.php?action=parse&page=${legendName}&format=json&prop=text&section=1`,
            )
          ).data.parse.text['*'],
        )('p')
        .text()
        .trim()
        .replace(/\[[0-9]\]/g, '')
        .split('\n')
        .filter((value) => value),
      info: {
        name: $($infobox)
          .eq(0)
          .find('th')
          .text()
          .trim()
          .replace(/[\r\n]/g, ''),
        imageUrl: this.cleanImageUrl(
          $($infobox).eq(1).find('td > a > img').attr('src'),
        ),
        desc: $($infobox)
          .eq(2)
          .find('td > i')
          .text()
          .trim()
          .replace(/[\r\n]/g, ''),
        realName: $($infobox).eq(4).find('td').text().trim(),
        gender: $($infobox).eq(5).find('td').text().trim(),
        age: $($infobox).eq(6).find('td').text().trim(),
        weight: $($infobox).eq(7).find('td').text().trim(),
        height: $($infobox).eq(8).find('td').text().trim(),
        homeWorld: $($infobox).eq(9).find('td').text().trim(),
        voiceActor: $($infobox).eq(16).find('td').text().trim(),
      },
    }

    return profile
  }

  private cleanImageUrl(url: string | undefined): string | null {
    return url ? url.substring(0, url.indexOf('/revision/')) : null
  }
}

export const legendsService = new LegendsService()
