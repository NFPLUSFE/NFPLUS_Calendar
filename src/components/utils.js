// 传入时间  得到年月日
const getYearMonthDay = (date) => {
        let year = date.getFullYear()
        let month = date.getMonth();
        let day = date.getDate();
        return { year, month, day }
    }
    // 传入年月日 得到时间
const getDate = (year, month, day) => {
    return new Date(year, month, day)
}
export { getYearMonthDay, getDate }