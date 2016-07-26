const baseUrl = 'http://statistics.internal.insta360.com/'

export default {
  nano_active: {
    url: baseUrl + 'nano_active',
    serialize: 'nano_active'
  },
  nano_active_map: {
    url: baseUrl + 'location_active',
    serialize: 'nano_active_map'
  },
  share_list: {
    url: baseUrl + 'share_list',
    serialize: 'share_list'
  }
}
