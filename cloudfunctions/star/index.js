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
  if(run == "star"){
    return await db.collection('userlist').where({
      '_openid':OPENID
    })
    .update({
      data: {
        starlist: _.push(event.starimg)
      },
    })
  }
  if(run == "unstar"){
    return await db.collection('userlist').where({
      '_openid':OPENID
    })
    .update({
      data: {
        starlist: _.pull(event.starimg)
      },
    })
  }
}