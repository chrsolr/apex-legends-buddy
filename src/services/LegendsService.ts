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

    return $('.legends__content .insight-bar')
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
  }

  private cleanImageUrl(url: string | undefined): string | null {
    return url ? url.substring(0, url.indexOf('/revision/')) : null
  }
}

export const legendsService = new LegendsService()
