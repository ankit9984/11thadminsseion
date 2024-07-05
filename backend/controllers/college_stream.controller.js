import College from "../models/college.model.js";
import Stream from "../models/college_stream.js";
import { handleError } from "../utils/validation.utils.js";

const createStream = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const streamData = req.body;

        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({error: 'College not found'});
        }

        const newStream = new Stream({
            ...streamData,
            college: collegeId
        });

        await newStream.save();
        await College.findByIdAndUpdate(collegeId, {$push: {stream: newStream._id}});

        res.status(201).json({message: 'Stream created successfully', stream: newStream})
    } catch (error) {
        handleError(error, res)
    }
};

const getStream = async (req, res) => {
    try {
        const {streamId} = req.params;

        const stream = await Stream.findById(streamId);
        if(!stream){
            return res.status(404).json({error: 'Stream not found'});
        }

        res.status(200).json(stream)
    } catch (error) {
        handleError(error, res)
    }
}

const updateStream = async (req, res) => {
    try {
        const { streamId } = req.params;
        const updates = req.body;

        console.log(Object.keys(updates));

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'Not found for any updates' });
        }

        const stream = await Stream.findById(streamId);
        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
        };

        const keys = Object.keys(updates);
        let isChanges = false;
        console.log(keys);
        keys.forEach(key => {
            if (stream[key] !== updates[key]) {
                // stream[key] = updates[key];  // Apply the update
                isChanges = true;
            }
        });

        if (!isChanges) {
            return res.status(400).json({ error: 'No changes found' });
        }

        await stream.save();  // Save the updated stream object to the database

        res.status(200).json({ message: 'Stream updated successfully', stream });
    } catch (error) {
        handleError(error, res);
    }
}

const deleteStream = async (req, res) => {
    try {
        const {streamId} = req.params;

        const stream = await Stream.findById(streamId);
        if(!stream){
            return res.status(404).json({error: 'Stream not found'})
        };

        await College.findByIdAndUpdate(stream.college, {$pull: {stream: streamId}});
        await Stream.findByIdAndDelete(streamId);

        res.status(200).json({message: 'Stream delete successfully'});
    } catch (error) {
        handleError(error, res)
    }
}

const udpateFees = async (req, res) => {
    try {
        const {streamId} = req.params;
        const {fees} = req.body;

        const stream = await Stream.findById(streamId);
        if(!stream){
            return res.status(404).json({error: 'Stream not found'})
        };

        stream.fees = fees;
        console.log(stream.fees);
        await stream.save();

        res.status(200).json({message: 'Fees updated successfully', stream})
    } catch (error) {
        handleError(error, res)
    }
}

const addOptionalSubject = async (req, res) => {
    try {
        const {streamId} = req.params;
        const newSubject = req.body;
        console.log(newSubject);
        const stream = await Stream.findById(streamId);
        if(!stream){
            return res.status(404).json({error: 'Stream not found'})
        }

        stream.optionalSubjects.push(newSubject);
        await stream.save();

        res.status(200).json({message: 'Optional subject added successfully', stream})
    } catch (error) {
        handleError(error, res)
    }
}

const updateOptionalSubject = async (req, res) => {
    try {
        const { streamId, subjectId } = req.params;
        const updates = req.body;
        console.log(streamId);

        const stream = await Stream.findById(streamId);
        if (!stream) {
            return res.status(404).json({ error: 'Stream not found' });
        }

       const subjectIndex = stream.optionalSubjects.findIndex(subject => subject._id.toString() === subjectId);
       if(subjectIndex === -1){
            return res.status(404).json({error: 'Optional subject not found'})
       };
       
       Object.keys(updates).forEach(key => {
            console.log(key);
            console.log(stream.optionalSubjects[subjectIndex][key]);
            stream.optionalSubjects[subjectIndex][key] = updates[key]
       });

        await stream.save();

        res.status(200).json({ message: 'Optional subject updated successfully', stream });
    } catch (error) {
        handleError(error, res)
    }
}

const removeOptionalSubject = async (req, res) => {
    try {
        const {streamId, subjectId} = req.params;
        console.log(streamId);
        const stream = await Stream.findByIdAndUpdate(
            streamId,
            {$pull: {optionalSubjects: {_id: subjectId}}},
            {new: true}
        );

        if(!stream){
            return res.status(404).json({error: 'Stream not found'})
        };

        res.status(200).json({message: 'Optional subject removed successfully', stream})
    } catch (error) {
        handleError(error, res)
    }
};


const addBifocalSubject = async (req, res) => {
    try {
        const {streamId} = req.params;
        const bifocalSubject = req.body;

        const stream = await Stream.findById(streamId);
        if(!stream){
            return res.status(401).json({error: 'Stream not found'})
        };

        stream.bifocalSubjects.push(bifocalSubject);
        await stream.save();

        res.status(201).json({message: 'Bifocal subject added successfully', stream})
    } catch (error) {
        handleError(error, res)
    }
};

const removeBifocalSubject = async (req, res) => {
    try {
        const {streamId, subjectId} = req.params;

        const stream = await Stream.findByIdAndUpdate(
            streamId,
            {$pull: {bifocalSubjects: {_id: subjectId}}},
            {new:true}
        );

        if(!stream){
            return res.status(404).json({error: 'Stream not found'})
        }
       
        res.status(200).json({message: 'Bifocal subject removed successfully',stream})
    } catch (error) {
        handleError(error, res)
    }
}

export {
    createStream,
    getStream,
    updateStream,
    deleteStream,
    udpateFees,
    addOptionalSubject,
    updateOptionalSubject,
    removeOptionalSubject,
    addBifocalSubject,
    removeBifocalSubject
}