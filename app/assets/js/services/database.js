'use strict';

app.factory('Database', function(){

  
  function Db(){
    this.database = localStorage;
  };


  Db.prototype.set = function(key, value){
    this.database.setItem(key, JSON.stringify(value));
  };

  Db.prototype.get = function(key){
    return this.database.getItem(key);
  };

  return new Db;

});