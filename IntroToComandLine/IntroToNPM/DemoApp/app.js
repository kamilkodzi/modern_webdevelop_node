var faker = require('faker');
console.log("-------------------------------------------")
console.log("-------P-R-O- -K-A-M-I-L- -S-T-O-R-E-------")
console.log("-------------------------------------------")
for(var i=0;i<10;i++){
    
    console.log(faker.fake("{{commerce.productName}} from {{address.country}} - ${{commerce.price}}"));
}
