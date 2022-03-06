const notFound = async (req, res) => {
  res.status(404).send("no routes found");
};

module.exports = notFound;
