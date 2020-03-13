const dateFormators = {
    __proto__: null,
    y: (date, format) => {
        const year = date.getFullYear();
        return format.length < 3 ? year % 100 : year;
    },
    M: (date) => date.getMonth() + 1,
    d: (date) => date.getDate(),
    H: (date) => date.getHours(),
    m: (date) => date.getMinutes(),
    s: (date) => date.getSeconds(),
    e: (date) => "日一二三四五六".charAt(date.getDay())
};
/**
 * 格式化日期对象。
 * @param date 日期对象。
 * @param format 格式字符串，其中以下字符（区分大小写）会被替换：
 *
 * 字符| 意义          | 示例
 * ----|--------------|--------------------
 * y   | 年           | yyyy: 1999, yy: 99
 * M   | 月           | MM: 09, M: 9
 * d   | 日           | dd: 09, d: 9
 * H   | 时（24小时制）| HH: 13, H: 13
 * m   | 分           | mm: 06, m: 6
 * s   | 秒           | ss: 06, s: 6
 * e   | 周（中文）    | 周e: 周一
 *
 * @return 返回格式化后的字符串。
 * @example format(new Date("2016/01/01 00:00:00")) // "2016/01/01 00:00:00"
 * @example format(new Date("2016/01/01 00:00:00"), "yyyyMMdd") // "20160101"
 * @see https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
 */
export function format(date, format) {
    if (date && !(date instanceof Date)) {
        date = new Date(date);
    }
    if (!+date) {
        return "";
    }
    return format.replace(/([yMdHms])\1*/g, (all, key) => {
        key = (dateFormators)[key](date, all) + "";
        while (key.length < all.length) {
            key = "0" + key;
        }
        return key;
    });
}

/**
 * 解析字符串为日期对象。
 * @param value 要解析的字符串。默认格式可以是标准日期格式或 “yyyy-MM-dd” 或 “yyyyMMdd”。
 * @param format 如果指定了格式字符串，将按其格式解析日期，格式字符串中以下字符（区分大小写）会被填充为原数据：
 *
 * 字符| 意义         | 示例
 * ----|--------------|------
 * y   | 年           | 2014
 * M   | 月           | 9
 * d   | 日           | 9
 * H   | 时（24小时制）| 9
 * y   | 分           | 6
 * y   | 秒           | 6
 * @return 返回新日期对象。
 * @example parse("2014-1-1") // new Date("2014/1/1")
 * @example parse("20140101") // new Date("2014/1/1")
 * @example parse("2014年1月1日", "yyyy年MM月dd日") // new Date("2014/1/1")
 */
export function parse(value, format) {
    if (format) {
        const groups = [0];
        const obj = {};
        const match = new RegExp(format.replace(/([-.*+?^${}()|[\]\/\\])/g, "\$1")
            .replace(/([yMdHms])\1*/g, (all, w) => {
                groups.push(w);
                return "\\s*(\\d+)?\\s*";
            })).exec(value);
        if (match) {
            for (let i = 1; i < match.length; i++) {
                obj[groups[i]] = +match[i];
            }
        }
        return new Date(obj.y || new Date().getFullYear(), obj.M ? obj.M - 1 : new Date().getMonth(), obj.d || 1, obj.H || 0, obj.m || 0, obj.s || 0);
    }
    const obj = new Date(value);
    return +obj ? obj : new Date(String(value).replace(/(\d{4})\D*(\d\d?)\D*(\d\d?).*(\d\d?)\D*(\d\d?)\D*(\d\d?)/, "$1/$2/$3 $4:$5:$6").replace(/(\d{4})\D*(\d\d?)\D*(\d\d?)/, "$1/$2/$3"));
}

