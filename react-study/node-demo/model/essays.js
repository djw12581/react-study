const mongoose = require('mongoose');
const db = require('./connect.js');
const userSchema = new mongoose.Schema({
    href: { type: String },
    title: { type: String },
    description: { type: String },
    content: { type: String },
    imgSrcRight: { type: String },
    iconSave: { type: String },
    iconClick: { type: String },
    iconCommit: { type: String },
    iconSaveLock: { type: Boolean },
    iconClickLock: { type: Boolean }
});
let userModel = db.model('essays', userSchema);
module.exports = userModel;
// Schema原意为架构
// 在mongodb中，每一个数据字段都要有固定的数据类型，所以Schema在mongoose中的意思为，每一张数据表对应的字段的数据类型

// icons: [
//     {
//         type: "star-o",
//         text: "10"
//     },
//     {
//         type: "like-o",
//         text: "20"
//     },
//     {
//         type: "message",
//         text: "30"
//     }
// ]