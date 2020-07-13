// const { expect } = require("chai");
// const sinon = require("sinon");
// const mongoose = require("mongoose");

// const User = require("../models/user");
// const AuthController = require("../controllers/auth");

// describe("Auth Controller - Login", () => {
//   before(function (done) {
//     mongoose
//       .connect(
//         "mongodb+srv://brian:jlz88KiWGAXRQ3lJ@cluster0-5nf18.mongodb.net/test-messages?retryWrites=true&w=majority",
//         {
//           useNewUrlParser: true,
//         }
//       )
//       .then((result) => {
//         const user = new User({
//           email: "test@test.com",
//           password: "123456",
//           name: "test",
//           posts: [],
//           _id: "5eb4991ac9ac890775dde911",
//         });
//         return user.save();
//       })
//       .then(() => {
//         done();
//       });
//   });

//   beforeEach(() => {});

//   afterEach(() => {});

//   it("should throw an error with code 500 if accessing the database fails", (done) => {
//     sinon.stub(User, "findOne");
//     User.findOne.throws();

//     const req = {
//       body: {
//         email: "test@test.com",
//         password: "123456",
//       },
//     };

//     AuthController.login(req, {}, () => {}).then((result) => {
//       //   console.log(result);
//       expect(result).to.be.an("error");
//       expect(result).to.have.property("statusCode", 500);
//       done();
//     });

//     User.findOne.restore();
//   });

//   it("should send a response with a valid user status for an existing user", (done) => {
//     //CONNECT TO FAKE DATABASE

//     const req = { userId: "5eb4991ac9ac890775dde911" };
//     const res = {
//       statusCode: 500,
//       userStatus: null,
//       status: function (code) {
//         this.statusCode = code;
//         return this;
//       },
//       json: function (data) {
//         this.userStatus = data.status;
//       },
//     };
//     AuthController.getUserStatus(req, res, () => {}).then(() => {
//       expect(res.statusCode).to.be.equal(200);
//       expect(res.userStatus).to.be.equal("I am new");
//       done();
//     });
//   });

//   after((done) => {
//     User.deleteMany({})
//       .then(() => {
//         return mongoose.disconnect();
//       })
//       .then(() => {
//         done();
//       });
//   });
// });
