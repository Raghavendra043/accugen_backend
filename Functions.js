const { StylesFilter } = require("./Data")


const getStyleDetails = (order)=>{

    var StylesDets = {}
    // console.log("coming here in Styles des funct")
    if(order && order.style){
            
        Object.keys(order["style"]).forEach((t)=>{
            StylesDets[t] = []
            Object.keys(order["style"][t]).forEach((side)=>{
                
                var value = null;
                order["style"][t][side].forEach((val, k)=>{
                    if((t!=="Shirt") || (t === "Shirt" && val!= "BASE" && val!="SLEVE")){
                    
                    var r = null
                    
                    if(t === "Coat" && side === "F" && val[0] === "J"){
                        r = StylesFilter.find((filter) => filter.type === "Jodhpuri");
                        console.log("r:", r)
                    } else{
                        r = StylesFilter.find((filter) => filter.name === t && filter.pos === side && filter.n === k);
                    }
                    
                    
                    // console.log(r, side, t)
                        
                    // console.log("from inside", r["attr"])
                    for(let i = 0;i<r["attr"].length;i++){
                        if(value){break}
                        if( Array.isArray(r["attr"][i])){
                            for(let j = 0;j<r["attr"][i].length;j++){
                                // console.log("of a type:", r["attr"][i][j])
                                if(r["attr"][i][j]["value"] === val){
                                    value = r["attr"][i][j]["name"]
                                    
                                    break    
                                }
                            }
                        }else{
                            if(r["attr"][i]["value"] === val){
                                value = r["attr"][i]["name"]
                                
                                break
                            }
                        }
                    }
                    
                    if(value){
                        StylesDets[t].push( {"type":r["type"], "name":value})
                    }
                     
                    //  `${r["type"]} : ${value}`
                    value = null
                    }
                })
            })
        })

        
        // console.log("From styles Description :", StylesDets)
            
        // StylesFilter
    }   

    return StylesDets
}


function number_to_word(n) {
    if (n < 0)
        return false;
    
    // Arrays to hold words for single-digit, double-digit, and below-hundred numbers
    single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
    double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
    below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
    
    if (n === 0) return 'Zero';
    
    // Recursive function to translate the number into words
    function translate(n) {
        let word = "";
        if (n < 10) {
            word = single_digit[n] + ' ';
        } else if (n < 20) {
            word = double_digit[n - 10] + ' ';
        } else if (n < 100) {
            let rem = translate(n % 10);
            word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem;
        } else if (n < 1000) {
            word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100);
        } else if (n < 1000000) {
            word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000);
        } else if (n < 1000000000) {
            word = translate(parseInt(n / 1000000)).trim() + ' Million ' + translate(n % 1000000);
        } else {
            word = translate(parseInt(n / 1000000000)).trim() + ' Billion ' + translate(n % 1000000000);
        }
        return word;
    }
    
    // Get the result by translating the given number
    let result = translate(n);
    return result.trim() + '.';
}
module.exports = {getStyleDetails, number_to_word}