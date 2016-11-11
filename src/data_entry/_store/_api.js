const baseUrl = 'http://crawler.internal.insta360.com/crawler/'

export default {
  native_sales: {
    url: baseUrl + 'sales_status/'
  },
  abroad_sales: {
    url: baseUrl + 'sales_status/'
  },
  electronic_sales: {
    url: baseUrl + 'electronic_sales/'
  },
  login: {
    url: baseUrl + 'login/',
    serialize: 'login'
  }
}
