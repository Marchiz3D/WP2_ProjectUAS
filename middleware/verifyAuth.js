export const verifyAuth = (req, res, next) => {
  if (!req.session.customersId) {
    return res.status(401).json({ message: 'Anda belum login' });
  }
  next();
}