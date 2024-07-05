import express from 'express';
import { createCollege, deleteCollege, getAllColleges, getCollege, updateCollege } from '../controllers/college_details.controller.js';
import { createCollegeAddress, deleteCollegeAddress, getCollegeAddress, updatedAddress } from '../controllers/college_address.controller.js';
import { addBifocalSubject, addOptionalSubject, createStream, deleteStream, getStream, removeBifocalSubject, removeOptionalSubject, udpateFees, updateOptionalSubject, updateStream } from '../controllers/college_stream.controller.js';
// import { createStream, deleteStream, getStream, updateStream } from '../controllers/college_stream.controller.js';

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

//Stream routes
router.post('/addstream/:collegeId', createStream);
router.get('/getstream/:streamId', getStream);
router.put('/updatestream/:streamId', updateStream);
router.delete('/deletestream/:streamId', deleteStream )
router.put('/updatefees/:streamId', udpateFees);
router.post('/addoptionalsubject/:streamId', addOptionalSubject);
router.put('/updateoptionsubject/:streamId/:subjectId', updateOptionalSubject);
router.delete('/removeoptionsubject/:streamId/:subjectId', removeOptionalSubject);
router.post('/addbifocal/:streamId', addBifocalSubject);
router.delete('/removebifocal/:streamId/:subjectId', removeBifocalSubject);

export default router;