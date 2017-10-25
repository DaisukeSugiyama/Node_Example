//leveldb
var levelup = require('level');
var db = levelup('./testdb');

//値を設定
db.put('Mikan', 'Orange', function(err) {
    if (err) {
        console.log('Err', err);
        return;
    }
    testGet();
});

//値を取得
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

//値を取得2
function testGet2() {
    db.get('Dia', function(Err, value) {
        console.log('Dia=' + value);
        //testkeys();
    })

}