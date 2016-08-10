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
  nano_active_area: {
    url: baseUrl + 'api/active/active_area_trends',
    serialize: 'nano_active_area'
  },
  location_active_detail: {
    url: baseUrl + 'location/active/detail',
    serialize: 'location_active_detail'
  },
  share_list: {
    url: baseUrl + 'share_list',
    serialize: 'share_list'
  },
  month_share_trends: {
    url: baseUrl + 'api/share/month_share_trends',
    serialize: 'month_share_trends'
  },
  nano_store: {
    url: baseUrl + 'nano_store',
    serialize: 'nano_store'
  },
  click_buylink: {
    url: baseUrl + 'click_buylink',
    serialize: 'click_buylink'
  },
  location_share: {
    url: baseUrl + 'api/share/getlocationShareData',
    serialize: 'location_share'
  },
  share_area: {
    url: baseUrl + 'api/share/share_nums_area_trends',
    serialize: 'share_area'
  },
  share_visitor: {
    url: baseUrl + 'share_vistor',
    serialize: 'share_visitor'
  },
  share_visitor_trend: {
    url: baseUrl + 'api/share/share_vistor_trends',
    serialize: 'share_visitor_trend'
  },
  visit_area: {
    url: baseUrl + 'api/share/share_vistor_area_trends',
    serialize: 'visit_area'
  },
  rest_statistics: {
    url: baseUrl + 'api/active/queryNanoStatistics',
    serialize: 'rest_statistics'
  },
  buylink_store_trends: {
    url: baseUrl + 'api/buylink/buylink_detail_trends',
    serialize: 'buylink_store_trends'
  },
  knowmore: {
    url: baseUrl + 'api/knowmore/click_know_more_statistics',
    serialize: 'knowmore'
  }
}