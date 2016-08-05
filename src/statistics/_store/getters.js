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
