const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  const {
    OPENID
  } = cloud.getWXContext()
  var run = event.run
  if(run == "get"){
    return await db.collection('userlist').where({
      '_openid': OPENID
    })
    .get()
  }
  if(run == "follow"){
    return await db.collection('userlist').where({
      '_openid':OPENID
    })
    .update({
      data: {
        folist: _.push(event.foprofile)
      },
    })
  }
  if(run == "unfollow"){
    return await db.collection('userlist').where({
      '_openid':OPENID
    })
    .update({
      data: {
        folist: _.pull(event.foprofile)
      },
    })
  }
}