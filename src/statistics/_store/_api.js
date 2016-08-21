const baseUrl = 'http://statistics.internal.insta360.com/'
const baseUrl1 = 'http://localhost:8000/crawler/'

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
  },
  use_condition: {
    url: baseUrl1 + 'use_condition/',
    serialize: 'use_condition'
  },
  user_distribution: {
    url: baseUrl1 + 'user_distribution/',
    serialize: 'user_distribution'
  },
  market_environment: {
    url: baseUrl1 + 'market_environment/',
    serialize: 'market_environment'
  },
  user_area: {
    url: baseUrl1 + 'user_area/',
    serialize: 'user_area'
  },
  error_condition: {
    url: baseUrl1 + 'error_condition/',
    serialize: 'error_condition'
  },
  competitor_data: {
    url: baseUrl1 + 'competitor_data/',
    serialize: 'competitor_data'
  },
  sales_status: {
    url: baseUrl1 + 'get_sales_status/',
    serialize: 'sales_status'
  },
  electronic_sales: {
    url: baseUrl1 + 'get_electronic_sales/',
    serialize: 'electronic_sales'
  },
  login: {
    url: baseUrl1 + 'login/',
    serialize: 'login'
  }
}
