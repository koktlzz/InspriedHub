// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var pagenum = event.pagenum
  var skipnum = event.skipnum
  var database = event.database
  var profilename = event.name
  var run = event.run
  if (run) {
    return await db.collection(database).where({
      name: profilename
    }).skip(skipnum).limit(pagenum).get()
  } else {
    return await db.collection(database).skip(skipnum).limit(pagenum).get()
  }
}