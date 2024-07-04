import express from 'express';
import { createCollege, deleteCollege, getAllColleges, getCollege, updateCollege } from '../controllers/college_details.controller.js';
import { createCollegeAddress, deleteCollegeAddress, getCollegeAddress, updatedAddress } from '../controllers/college_address.controller.js';

const router = express.Router();

router.post('/newcollege', createCollege);
router.get('/:collegeId/getcollege', getCollege);
router.put('/:collegeId/updatecollege', updateCollege);
router.delete('/:collegeId/deletecollege', deleteCollege);
router.get('/getallcolleges', getAllColleges);

//Address routes
router.post('/:collegeId/collegeaddress', createCollegeAddress);
router.get('/:addressId/getcollegeaddress', getCollegeAddress);
router.post('/:addressId/updateaddress', updatedAddress);
router.delete('/:addressId/deletecollegeaddress', deleteCollegeAddress);

export default router;