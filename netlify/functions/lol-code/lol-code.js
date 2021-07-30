const axios = require('axios')
const https = require('https')

const agent = new https.Agent({
  rejectUnauthorized: false
})

const data = JSON.stringify({
  obj_id: 'tw_32775_newnews_32159',
  root_id: 0,
  size: 3,
  order: 2,
})

const config = {
  method: 'post',
  url: 'https://commenttw.garenanow.com/api/comments/get/',
  headers: {
    'User-Agent': 'Garenagxx/2.0.1909.2618 (Intel x86_64; zh-Hant; TW)',
    'Content-Type': 'application/json'
  },
  httpsAgent: agent,
  data: data
}

const handler = async event => {
  // const { url } = event.requestMeta
  if (event.headers.host !== 'lol-anniversary.netlify.app') {
    return { statusCode: 403, body: 'Forbidden' }
  }
  try {
    const { data } = await axios(config)
    const comment = data.comment_list
      .map(comment => comment.extra_data.content)
      .join(' ')
    const code = comment.match(/LOL.{10}/)
    console.log(code[0])

    return {
      statusCode: 200,
      body: JSON.stringify({ code: code[0] })
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
