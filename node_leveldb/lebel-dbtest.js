 // leveldb
 var levelup = require('level');
 var opt = { valueEncoding: 'json' };
 var db = levelup('./testdb2', opt);


 var ops = [
     { type: 'del', key: 'father' },
     { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' },
     { type: 'put', key: 'dob', value: '16 February 1941' },
     { type: 'put', key: 'spouse', value: 'Kim Young-sook' },
     { type: 'put', key: 'occupation', value: 'Clown' }
 ]

 db.batch(ops, function(err) {
         if (err) return console.log('Ooops!', err)
         console.log('Great success dear leader!')
         testkeys();
     })
     /*
      db.batch()
          .put('fruits!apple', {
              name: 'Apple',
              price: 300,
              color: 'red'
          })
          .put('fruits!orange', {
              name: 'Orange',
              price: 180,
              color: 'orange'
          })
          .put('fruits!banana', {
              name: 'Banana',
              price: 200,
              color: 'yellow'
          })
          .put('fruits!kiwi', {
              name: 'Kiwi',
              price: 220,
              color: 'green'
          })
          .put('snack!poteto', {
              name: 'Poteto-Snack',
              price: 340,
              color: 'brown'
          })
          .put('snack!choco', {
              name: 'Choco-Snack',
              price: 220,
              color: 'black'
          })
          .write(testkeys);
     */

 /*値を設定
 db.put('Mikan', 'Orange', function(err) {
     if (err) {
         console.log('Err', err);
         return;
     }
     testGet();
 });
 */

 /*値を取得

 function testGet() {
     db.get('Mikan', function(err, value) {
         if (err) {
             console.log('Error', err);
             return;
         }
         console.log('Mikan=' + value);
         testBatch();
     });
 }

 //一括設定

 function testBatch() {
     db.batch()
         .put('Ruby', 'pink')
         .put('Dia', 'Red')
         .put('pearl', 'white')
         .write(function() {
             testGet2();
         });
 }
*/

 /*値を取得2
 function testGet2() {
     db.get('Dia', function(err, value) {
         console.log('Dia=' + value);
         testkeys();
     })
 }
 */

 //キーの一覧を取得

 function testkeys() {
     console.log("keys");
     /* db.get('fruits!banana', function(value) {
          console.log(value)
      });
      */

     db.createKeyStream()
         .on('data', function(data) {
             console.log(" - " + data);
         })
         .on('end', function() {
             //console.log("end");
         });

 }

 //キーと値の一覧を取得する

 function testKeyValues() {
     console.log("\nkey-value-list:");

     db.createKeyStream()
         .on('data', function(data) {
             var key = data.key;
             var o = data.value;
             console.log("+ key = " + data.key);
             console.log("| color = " + o.color);
             console.log("|price = " + o.price);
         })
         .on('end', testSearch)
 }

 function testSearch() {
     console.log('\nrange-search:');
     var opt = {
         start: "fruits!",
         end: "fruits!\xFF"
     };
     db.createReadStream(opt)
         .on('data', function(data) {
             console.log("+ key=" + data.key);
         })
         .on('end', function() {
             console.log('ok')
         });
 }