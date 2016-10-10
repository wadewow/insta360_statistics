import dict_json from './dictionary.json'
export default {
  share_list: data => {
    const page_total = data['page_total']
    const column = []
    // for (var item in data['data'][0]) {
    //   column.push(item)
    // }
    for (var i in data['data']) {
      data['data'][i]['share_location'] = data['data'][i]['share_location'].replace(/\,/g, ' ')
      if (data['data'][i]['share_location'] === '') {
        data['data'][i]['share_location'] = '其它'
      }
      if (data['data'][i]['title'] === '') {
        data['data'][i]['title'] = '来自Insta360 Nano用户分享的全景时刻'
      }
    }
    return {
      total: data['total'],
      current_page: data['current_page'],
      page_total: page_total,
      column: column,
      series: data['data']
    }
  },
  location_share: data => {
    const abroad_data = data['abroad']
    const locations = []
    for (var n in abroad_data) {
      locations.push(dict_json[n] !== undefined ? dict_json[n] : n)
    }
    return locations
  }

}
