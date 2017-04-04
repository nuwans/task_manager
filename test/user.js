var app=require('./app');
var should=require('should');
var request=require('supertest');
var should=require('should');

describe('Send post request to  sign up ', function() {
  it('should return Success at the first time', function(done) {
    this.timeout(3000);
    var newUser={
      Username:"test123", 
      Password:"123456"
    }
    request(app)
      .post('/signup')
      .send(newUser)
      .expect(302)
      .end(function(err,res){
          done();
      });
  });
  it('Should return Error  if Username is already there', function(done) {
    this.timeout(3000);
    var newUser={
      Username:"test", 
      Password:"123456"
    }
    request(app)
      .post('/signup')
      .send(newUser)
      .expect(200)
      .end(function(err,res){
          res.body.should.have.property('error');
          res.body.error.should.have.property('message').eql('That username already taken');
          done();
      });
  });
});

/**********************LOGIN************************************************************/
describe('Send post request to  login with invalid credentials', function() {
  it('should return validation error', function(done) {
    this.timeout(3000);
    var newUser={
      Username:"", 
      Password:"123456"
    }
    request(app)
      .post('/login')
      .send(newUser)
      .expect(200)
      .end(function(err,res){
         res.body.should.have.property('error');
         res.body.error.should.have.property('message').eql('Missing credentials');
         done();
      });
  });
});
describe('Send post request to  login with valid credentials', function() {
  it('should return User', function(done) {
    this.timeout(3000);
    var newUser={
      Username:"test", 
      Password:"123456"
    }
    request(app)
      .post('/login')
      .send(newUser)
      .expect(200)
      .end(function(err,res){
         res.body.should.have.property('_id');
         done();
      });
  });
});

