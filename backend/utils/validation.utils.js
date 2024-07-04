export const validateEmail = (email) => {
    console.log(email);
    const res = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return res.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
    const res = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return res.test(password);
}

export const handleError = (error, res) => {
    console.log(error);
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ error: 'Validation Error', details: errors });
    } else if (error.code === 11000) {
        return res.status(400).json({ error: 'Duplicate Error', message: 'A college with this information already exists.' });
    } else {
        return res.status(500).json({ error: 'Server Error', message: 'An unexpected error occurred.', error });
    }
};