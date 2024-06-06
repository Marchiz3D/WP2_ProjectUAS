import jwt from 'jsonwebtoken';

export const verifyAuth = (req, res, next) => {
  try {
    const headers = req.headers['authorization'];
    const token = headers && headers.split(' ')[1];
    if (token == null) return res.sendStatus(401).json({ message: "Invalid token" });


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log(`Error : ${err}`)
      if (err) return res.status(403).json({ message: "Token tidak sama" });
      decoded.id_customers = decoded.id_customers;
      next();
    })
  } catch (error) {
    res.status(505).json({ message: error });
    console.log({ messageError: error });
  }
}