var app=require('./app');
var should=require('should');
var request=require('supertest');
var should=require('should');

describe('Send post request to  /tasks ', function() {
  it('should return Task ', function(done) {
    this.timeout(3000);
    var Task={
      "Name":"Example task",
      "Discription":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "EndDate":"2010-04-29T00:00:00.000Z"
    }
    request(app)
      .post('/tasks')
      .send(Task)
      .expect(302)
      .end(function(err,res){
          done();
      });
  });
});
describe('Send get request to  /tasks ', function() {
  it('should return all Tasks ', function(done) {
    this.timeout(3000);
    request(app)
      .get('/tasks')
      .expect(200)
      .end(function(err,res){
          done();
      });
  });
});


