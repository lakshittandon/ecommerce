const express       = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser
} = require('../controller/userController');

const router = express.Router();

router.post('/register',     registerUser);
router.post('/login',        loginUser);
router.get( '/logout',       logout);
router.post('/password/forgot',  forgotPassword);
router.post('/password/reset/:token', resetPassword);
router.get( '/me',           isAuthenticatedUser, getUserDetails);
router.put("/password/update",isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser,updateProfile);
router.get('/admin/users',isAuthenticatedUser,authorizeRoles("admin"), getAllUsers);
router.get('/admin/users/:id',isAuthenticatedUser,authorizeRoles("admin"), getSingleUser);
router.put('/admin/users/:id',isAuthenticatedUser,authorizeRoles("admin"), updateUserRole);
router.delete('/admin/users/:id',isAuthenticatedUser,authorizeRoles("admin"), deleteUser);
module.exports = router;