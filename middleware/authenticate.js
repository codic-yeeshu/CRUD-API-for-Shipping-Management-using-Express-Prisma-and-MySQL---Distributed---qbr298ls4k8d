const AUTH_KEY = process.env.SHIPPING_SECRET_KEY;
const authenticate = (req, res, next) => {
  try {
    const authkey = req.headers["shipping_secret_key"];

    if (!authkey || authkey != AUTH_KEY)
      return res
        .status(403)
        .json({ error: "SHIPPING_SECRET_KEY is missing or invalid" });

    if (authkey == AUTH_KEY) next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = authenticate;
