var express=require('express');
var router=express.Router();
var ctrlVenues=require('../controller/VenueControllers');
var ctrlComments=require('../controller/CommentController');
var ctrlUsers=require('../controller/UserController');

router.route('/venues')
.get(ctrlVenues.listVenues)
.post(ctrlUsers.requireAuth,ctrlUsers.requireAdmin,ctrlVenues.addVenue);

router.route('/venues/:venueid')
.get(ctrlVenues.getVenue)
.put(ctrlUsers.requireAuth,ctrlUsers.requireAdmin,ctrlVenues.updateVenue)
.delete(ctrlUsers.requireAuth,ctrlUsers.requireAdmin,ctrlVenues.deleteVenue);

router.route('/venues/:venueid/comments')
.post(ctrlUsers.requireAuth,ctrlComments.addComment);

router.route('/venues/:venueid/comments/:commentid')
.get(ctrlComments.getComment)
.put(ctrlUsers.requireAuth,ctrlUsers.requireAdmin,ctrlComments.updateComment)
.delete(ctrlUsers.requireAuth,ctrlUsers.requireAdmin,ctrlComments.deleteComment);

router.route('/user')
.post(ctrlUsers.addUser)
router.route('/user/login')
.post(ctrlUsers.login);
router.route('/user/admin/venues')
.get(ctrlUsers.requireAuth,ctrlUsers.requireAdmin,ctrlVenues.listAllVenues);

module.exports=router;