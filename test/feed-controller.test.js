// const { expect } = require("chai");
// const mongoose = require("mongoose");
// const Post = require("../models/post");
// const User = require("../models/user");
// const FeedController = require("../controllers/feed");

// describe("Feed COntroller Test", () => {
//   before((done) => {
//     mongoose
//       .connect(
//         "mongodb+srv://brian:jlz88KiWGAXRQ3lJ@cluster0-5nf18.mongodb.net/test-messages?retryWrites=true&w=majority",
//         {
//           useNewUrlParser: true,
//         }
//       )
//       .then(() => {
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
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });

//   it("Should add a created post to the posts of the creator", (done) => {
//     const req = {
//       body: {
//         title: "Testing123",
//         content: "Testing123",
//       },
//       file: {
//         path: "/some-url",
//       },
//       userId: "5eb4991ac9ac890775dde911",
//     };

//     const res = {
//       status: function () {
//         return this;
//       },
//       json: function () {},
//     };
//     FeedController.postPost(req, res, () => {}).then((savedUser) => {
//       expect(savedUser).to.have.property("posts");
//       expect(savedUser.posts).to.have.length(1);
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
