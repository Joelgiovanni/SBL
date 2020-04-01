const secretTokenKey = process.env.SECRET || 'QuickBrownFoxAndQickDevCollab';
const URI =
  process.env.MONGODB_URI ||
  'mongodb://joelgiovanni4:sportsbet1219@ds263832.mlab.com:63832/sportsleader';

module.exports = {
  URI,
  secretTokenKey
};
