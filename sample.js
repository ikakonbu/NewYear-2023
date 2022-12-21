var db=firebase.database();

db.ref('data').once('value',function(obj){
    console.log(obj);
});