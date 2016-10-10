const baseUrl = 'http://statistics.internal.insta360.com/'

export default {
  content_filter: {
    url: baseUrl + 'api/share/search',
    serialize: 'share_list'
  },
  location_share: {
    url: baseUrl + 'api/share/getlocationShareData',
    serialize: 'location_share'
  }
}
