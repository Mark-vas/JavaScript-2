'use strict'
// задание 1
const str1 = "'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores alias in ipsa ex autem modi atque nostrum nulla, eaque reprehenderit cumque excepturi nemo, officiis expedita ipsum. Perferendis incidunt mollitia amet!'";
const regexp1 = new RegExp('\'', 'g')
console.log(str1.replace(regexp1, '"'))
// 2 задание
const str2 = "'Lorem ipsum dolor, sit amet consect'etur adipisicing elit. Maiores alias in 'ipsa ex autem modi' atque nost'rum nulla, eaque reprehenderit cumque except'uri nemo, off'iciis expedita ipsum. Perferendis incidunt mollitia amet'";
const regexp2 = new RegExp('^\'', 'g')
const regexp2_1 = new RegExp('\'$', 'g')
const regexp2_2 = new RegExp('/s\'', 'g')
const regexp2_3 = new RegExp('\'/s', 'g')
console.log(str2.replace(regexp2, '"').replace(regexp2_1, '"').replace(regexp2_2, ' "').replace(regexp2_3, '" '))