function average(tabka){
    var suma=0;
//     for (var x of tabka){
//         suma+=x;
//     }
//     console.log(Math.round(suma/tabka.length));

    tabka.forEach(function(score){
        suma+=score;
    })
    
   return (Math.round(suma/tabka.length));
}

var scores=[90,98,89,100,100,86,94];
console.average(scores);

var scores2=[40,65,77,82,80,54,73,63,95,49];
average(scores2);