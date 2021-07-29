const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});

var data = JSON.stringify({
  "obj_id": "tw_32775_newnews_32153",
  "root_id": 0,
  "size": 1,
  "replies": 10,
  "order": 2,
  "replies_order": 2,
  "session_key": "cda0c8df05ba75fa8edd72b49eac81ee5263f83c4c8214efdeca7a42800c15fa",
  "web_app_id": 10047
});

var config = {
  method: 'post',
  url: 'https://commenttw.garenanow.com/api/comments/get/',
  headers: { 
    'User-Agent': 'Garenagxx/2.0.1909.2618 (Intel x86_64; zh-Hant; TW)', 
    'Content-Type': 'application/json'
  },
  httpsAgent: agent,
  data : data
};

axios(config)
.then(function (response) {
  const { data } = response
  const comment = data.comment_list[0].extra_data.content
  const code = comment.match(/LOL.{10}/)
  console.log(code[0]);
})
.catch(function (error) {
  console.log(error);
});

