import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied"); //403-(Forbidden) response.
    } 
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    //if the token string starts with the string "Bearer ". If it does, then it removes the "Bearer " string
    // from the token string and trims any whitespace from the left of the resulting string.
    //The reason for doing this is that in some cases, an authentication token may be provided to the server with a
    //"Bearer " prefix, as per the JWT (JSON Web Token) specification. By removing this prefix and any whitespace,
    //the token string can be properly decoded and verified.

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
