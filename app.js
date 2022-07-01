const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
app.use(bodyParser.urlencoded({ extended: true }));
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "API_KEY",
  server: "usX",
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log(firstName);

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember("0bac86e118", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );

      res.sendFile(__dirname + "/success.html");
    } catch (e) {
      res.sendFile(__dirname + "/failure.html");
    }
  }

  run();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

// audience id 0bac86e118
// api key 90a13ba522fd0dbee7386832f6187399-us10

//  async function run() {
//       try {
//           const response = await mailchimp.lists.addListMember(listId, {
//             email_address: subscribingUser.email,
//             status: "subscribed",
//             merge_fields: {
//               FNAME: subscribingUser.firstName,
//               LNAME: subscribingUser.lastName
//             }
//           });

//           console.log(
//             `Successfully added contact as an audience member. The contact's id is ${response.id}.`
//           );

//           res.sendFile(__dirname + "/success.html");
//       } catch (e) {
//           res.sendFile(__dirname + "/failure.html");
//       }
//   }

//   run();
// })

// app.post("/failure", function(req, res) {
//   res.redirect("/");
// })

// app.listen(3000, function () {
//   console.log("Server is running on port 3000")
// });

//!

//  const run = async () => {
//    const response = await mailchimp.lists.addListMember("0bac86e118", {
//      email_address: subscribingUser.email,
//      status: "subscribed",
//      merge_fields: {
//        FNAME: subscribingUser.firstName,
//        LNAME: subscribingUser.lastName,
//      },
//    });
//    console.log(response); // (optional)
//  };
//  run();
