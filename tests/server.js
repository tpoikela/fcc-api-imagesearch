
process.env.NODE_ENV = 'test';

var chai = require("chai");
var expect = chai.expect;

//var validUrl = require("valid-url");

var chaiHTTP = require("chai-http");
chai.use(chaiHTTP);

var request = require("request");
var server = require("../index");

var img_api = "/api/imagesearch";

describe("/", () => {
    it("Should get index.html from server", (done) => {
        chai.request(server).get("/")
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.be.html;
            done();
        });
    });
});

describe(img_api + "/lolcats No offset given", () => {
    it("Should get image result in JSON format", (done) => {
        chai.request(server).get("/")
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.be.json;
            done();
        });
    });
});

describe(img_api + "/lolcats?offset=3", () => {
    it("Should get image result in JSON format", (done) => {
        chai.request(server).get("/")
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.be.json;
            done();
        });
    });
});