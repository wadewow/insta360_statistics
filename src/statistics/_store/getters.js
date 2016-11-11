// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count
// export function getCount (state) {
//   return state.count
// }
import dict_name from './dict_name.json'
import dict_comment from './dict_comment.json'
export const getPostsPage = state => state.posts.page
export const getPostsList = state => state.posts.list
export const getPostsItem = state => state.posts.post
export const getChartList = state => state.chart.list
export const getChartName = state => dict_name[state.chart.name]
export const getChartComment = state => dict_comment[state.chart.name]
export const getChartData = state => state.chart.data
export const getTableName = state => state.table.name
export const getTableData = state => state.table.data
export const getTableName1 = state => state.table1.name
export const getTableData1 = state => state.table1.data
export const getTableName2 = state => state.table2.name
export const getTableData2 = state => state.table2.data
export const getTableName3 = state => state.table3.name
export const getTableData3 = state => state.table3.data
export const getTableName4 = state => state.table4.name
export const getTableData4 = state => state.table4.data
export const getTableName5 = state => state.table5.name
export const getTableData5 = state => state.table5.data
export const getButtonState = state => state.button
export const getPower = state => state.userInfo.power
export const getNav = state => state.userInfo.nav
export const getUsername = state => state.userInfo.username
export const getLocations = state => state.locations
export const getSerialNumbers = state => state.serial_numbers
