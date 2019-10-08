var longestCommonPrefix = function(strs) {
    // if(strs.length === 0) return '';
    // if(strs.length === 1) return strs[0]
    // let str = '';
    // // strs = strs.map(item => {
    // //     return item.split('')
    // // })
    // var obj = [];
    // var first = strs[0].split('');
    // // console.log(first)
    // if(!first[0]) return ''
    // for(var i=0,len=first.length;i<len;i++){
    //     obj[i] = 1;
    //     for(var j=1,len2=strs.length;j<len2;j++){
    //         // console.log
    //         if(strs[j] && strs[j].substring(i,i + 1) === first[i]){
    //             obj[i] += 1;
    //         }
    //         // if(strs[j][i] === first[i]){
    //         //     obj[i] += 1;
    //         // }
    //     }
    //     if(obj[i] === strs.length){
    //         str += first[i]
    //     }else{
    //         return str
    //     }
    // }

    if(strs.length === 0) return '';
    if(strs.length === 1) return strs[0]
    let str = '';
    strs = strs.map(item => {
        return item.split('')
    })
    var obj = [];
    var first = strs[0];
    for(var i=0,len=first.length;i<len;i++){
        obj[i] = 1;
        for(var j=1,len2=strs.length;j<len2;j++){
            if(strs[j][i] === first[i]){
                obj[i] += 1;
            }
        }
        console.log(11)
        if(obj[i] === strs.length){
            str += first[i]
        }else{
            // break;
            return str
        }
    }
    // console.log(str)
};
console.log(longestCommonPrefix(["c","c"]))