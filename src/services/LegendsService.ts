import axios from 'axios'
import cheerio from 'cheerio'

export interface Legends {
  id: number
  name: string
  desc: string
  imageUrl: string
  profileUrl: string
}

export default class LegendsService {
  private baseUrl = 'https://apexlegends.gamepedia.com'

  async getLegends(): Promise<Legends[]> {
    const URL = `${this.baseUrl}/api.php?action=parse&format=json&page=Legends&redirects=1}`
    const { data } = await axios.get(URL)
    const body = data.parse.text['*']
    const $ = cheerio.load(body)
    return $('ul.gallery.mw-gallery-nolines li.gallerybox')
      .map((index, element) => ({
        id: index,
        name: $(element).find('.gallerytext > p > a').text().trim(),
        desc: $(element).find('.gallerytext > p > small').text().trim(),
        imageUrl: $(element).find('.thumb > div > a > img').attr('src'),
        profileUrl: `${this.baseUrl}${$(element)
          .find('.thumb > div > a')
          .attr('href')}`,
      }))
      .get()
  }
}

export const legendsService = new LegendsService()
