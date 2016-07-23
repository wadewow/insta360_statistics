const baseUrl = 'http://statistics.internal.insta360.com/'

export default {
  nano_active: {
    url: baseUrl + 'nano_active',
    serialize: 'nano_active'
  },
  location_active: {
    url: baseUrl + 'location_active',
    serialize: 'location_active'
  },
  location_active_detail: {
    url: baseUrl + 'location/active/detail',
    serialize: 'location_active_detail'
  }
}
