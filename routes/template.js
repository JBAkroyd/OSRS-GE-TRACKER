const template = require('express').Router();

	template.get("/hello", async (req, res) => {
    console.log("hello");
    res.send({ express: 'Hello From Express' });
	});

  template.post('/world', (req, res) => {
    console.log(req.body);
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
  });

  module.exports = template;
