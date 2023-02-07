/**产生随机数 */
export const randomNum=()=>Math.floor(Math.random()*100)

/**产生随机ID，由年月日时分秒+3位随机数构成 */
export const autoId=()=>{
    let now =new Date()
    let year=now.getFullYear()+''
    let month=(now.getMonth()+1)<10?`0${now.getMonth()+1}`:(now.getMonth()+1)+''
    let date=(now.getDate())<10?`0${now.getDate()}`:(now.getDate())+''
    let hour=(now.getHours())<10?`0${now.getHours()}`:(now.getHours())+''
    let min=(now.getMinutes())<10?`0${now.getMinutes()}`:(now.getMinutes())+''
    let sec=(now.getSeconds())<10?`0${now.getSeconds()}`:(now.getSeconds())+''
    let ms=now.getMilliseconds()+''

    return `${year}${month}${date}${hour}${min}${sec}${ms}${randomNum(100,999)}`
}