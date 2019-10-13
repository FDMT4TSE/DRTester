import axios from 'axios'
import router from 'vue-router'
import { Notification } from 'element-ui'

/*  使用说明：
    this.$fetch：直接使用fetch方法，所需参数全部可自定义，参数具体可查看axios文档
    this.$get：已封装好的get请求，在页面使用：this.$get({ url: '', params: {} })
    this.$post：已封装好的post请求，在页面使用：this.$post({ url: '', data: {} })
    this.$put：已封装好的put请求，在页面使用：this.$put({ url: '', data: {} })
    this.$delete：已封装好的delete请求，在页面使用：this.$delete({ url: '' })
    注：参数解释：url：接口地址
                params：get请求的参数，例如：params: { ID: 12345 }会被解析成?ID=12345
                data: 请求体内容，post和put需要该参数
    response内容：{
      data: xxx // 后端返回的内容
      status：200 // 状态码，例如200是成功，404是未找到该页面
      message: xxx // 信息，可在失败时直接显示什么原因，例如404时返回未找到该页面
    }
    示例：
    this.$get({
      url: '/api/getInterface',
      params: {
        id: '1',
        age: 10
      }
    }).then(res => {
      console.log(res) // res就是获取到的数据内容
    })
 */

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'

export function fetch(props) {
  return axios({
    ...props
  }).then(function(response) {
    if(response) {
      return response
    } else {
      Notification({
        title: '空内容提示',
        message: '当前获取到的内容为空'
      })
    }
  }).catch((error) => {
    Notification({
      title: '出错提示',
      message: error.status + ': ' + error.message
    })
    if(error.status === 401 || error.status === 403) {
      router.push('/login')
    }
    return false
  })
}

const httpGet = ({ url, params }) => {
  return fetch({
    method: 'get',
    url,
    params
  })
}

const httpPost = ({ url, data }) => {
  return fetch({
    method: 'post',
    url,
    data
  })
}

const httpPut = ({ url, data }) => {
  return fetch({
    method: 'put',
    url,
    data
  })
}

const httpDelete = ({ url }) => {
  return fetch({
    method: 'delete',
    url
  })
}

const api = {
  fetch,
  httpGet,
  httpPost,
  httpPut,
  httpDelete
}

export default api
