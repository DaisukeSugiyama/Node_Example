//leveldb
var levelup = require('level');
var opt = { valueEncoding: 'json' }


var db = levelup('./testdb2', opt);
db.batch();

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
    db.get('Dia', function(err, value) {
        console.log('Dia=' + value);
        testkeys();
    })
}

//キーの一覧を取得
function testkeys() {
    console.log("keys");
    db.createKeyStream()
        .on('data', function(key) {
            console.log(" - " + key);
        })
        .on('end', testKeyValues);
}

//キーと値の一覧を取得する
function testKeyValues() {
    console.log("\nkey-value-list:");
    /*
    db.createKeyStream()
        .on('data', function(data) {
            var key = data.key;
            var o = data.value;
            console.log("+ key = " + data.key);
            console.log("| color = " + o.color);
            console.log("|price = " + o.price);
        })
        .on('end')
        */
}