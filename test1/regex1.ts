// https://learn.javascript.ru/regular-expressions

let str = "Любо, братцы, любо!";

console.log( str.match(/любо/gi) ); //

let result = str.match(/любо/i); // без флага g

console.log( result[0] );     // Любо (первое совпадение)
console.log( result.length ); // 1

// Дополнительная информация:
console.log( result.index );  // 0 (позиция совпадения)
console.log( result.input );  // Любо, братцы, любо! (исходная строка)

console.log('*******************************');

let regexp = /html|css|java(script)?/gi;

 str = "Сначала появился язык Java, затем HTML, потом JavaScript";

console.log( str.match(regexp) ); // Java,HTML,JavaScript

console.log(str.match(/затем (HTML|CSS)/gi));

regexp = /([01]\d|2[0-3]):[0-5]\d/g;

console.log("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59

// Возможны и более сложные проверки, например X(?=Y)(?=Z) означает:
console.log('*******************************');
 str = "1 индейка стоит 30€";

console.log( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
