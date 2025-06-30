const express = require('express');
const { getAllProducts,createProduct,updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews ,deleteReview} = require('../controller/productController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');

const router = express.Router();


router.route('/products').get(getAllProducts);
router.route('/admin/product/new').post( isAuthenticatedUser ,authorizeRoles("admin"),createProduct); 
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails);

//router.route('/admin/:id').get(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct).get(getProductDetails); 
router.route('/product/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteReview);


module.exports = router;