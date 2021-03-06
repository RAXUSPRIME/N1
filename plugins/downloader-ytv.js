let limit = 50
import fs from 'fs'
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) throw `*[โ๐๐๐๐โ] ๐ธ๐ฝ๐๐ด๐๐๐ด ๐ด๐ป ๐ฒ๐พ๐ผ๐ฐ๐ฝ๐ณ๐พ ๐ผ๐ฐ๐ ๐ด๐ป ๐ด๐ฝ๐ป๐ฐ๐ฒ๐ด / ๐ป๐ธ๐ฝ๐บ ๐ณ๐ด ๐๐ฝ ๐๐ธ๐ณ๐ด๐พ ๐ณ๐ด ๐๐พ๐๐๐๐ฑ๐ด*`
conn.reply(m.chat, `*_โณSแด แดsแดแด แดสแดแดแดsแดษดแดแด Sแด แด ษชแดแดแด...โณ_*\n\n*โ Sษช Sแด แด ษชแดแดแด ษดแด แดs แดษดแด ษชแดแดแด, แดสแดแดสแด แดแดษด แดส แดแดแดแดษดแดแด #playdoc แด #play.2 แด #ytmp4doc โ*`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: '๐๐ด๐ฟ๐๐พ๐ณ๐๐ฒ๐๐พ๐ ๐ณ๐ด ๐๐ธ๐ณ๐ด๐พ',
body: 'สส ๐๐จ๐ญ๐๐ก๐ฎ๐ณแ  แทฆ',         
previewType: 0, thumbnail: fs.readFileSync("./Menu2.jpg"),
sourceUrl: `https://github.com/IdkJhus`}}})
let chat = global.db.data.chats[m.chat]
const isY = /y(es)/gi.test(args[1])
const { thumbnail, video: _video, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
const limitedSize = (isPrems || isOwner ? 350 : limit) * 3074
let video, source, res, link, lastError, isLimit
for (let i in _video) {
try {
video = _video[i]
isLimit = limitedSize < video.fileSizeH
if (isLimit) continue
link = await video.download()
if (link) res = await fetch(link)
isLimit = res?.headers.get('content-length') && parseInt(res.headers.get('content-length')) < limitedSize
if (isLimit) continue
if (res) source = await res.arrayBuffer()
if (source instanceof ArrayBuffer) break
} catch (e) {
video = source = link = null
lastError = e
}}
if ((!(source instanceof ArrayBuffer) || !link || !res.ok) && !isLimit) throw '*[โ] ๐ด๐๐๐พ๐: ' + (lastError || '๐ฝ๐พ ๐ต๐๐ด ๐ฟ๐พ๐๐ธ๐ฑ๐ป๐ด ๐ณ๐ด๐๐ฒ๐ฐ๐๐ถ๐ฐ๐ ๐ด๐ป ๐๐ธ๐ณ๐ด๐พ*')
let _thumb = {}
try { _thumb = { thumbnail: await (await fetch(thumbnail)).buffer() } }
catch (e) { }
conn.sendFile(m.chat, link, title + '.mp4', `
*๐ฅ ๐๐ธ๐๐๐ป๐พ:* ${title}
*๐ ๐ฟ๐ด๐๐พ ๐ณ๐ด๐ป ๐๐ธ๐ณ๐ด๐พ:* ${video.fileSizeH}
`.trim(), m, false, {
..._thumb,
asDocument: chat.useDocument
})}
handler.help = ['mp4', 'v'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(v|mp4)?$/i
export default handler
