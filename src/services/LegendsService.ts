import axios from 'axios'
import cheerio from 'cheerio'

export default class LegendsService {
  constructor() {}

  async getLegends(): Promise<any> {
    try {
      const URL =
        'https://apexlegends.gamepedia.com/api.php?action=parse&format=json&page=Legends&redirects=1'
      const { data } = await axios.get(URL)
      const body = data.parse.text['*']
      const $ = cheerio.load(body)
      const legends = $('ul.gallery.mw-gallery-nolines li.gallerybox')
        .map((index, element) => ({
          legendName: $(element).find('.gallerytext > p > a').text().trim(),
        }))
        .get()

      console.log(legends)
      return legends
    } catch (error) {
      console.error(error)
    }
  }
}
