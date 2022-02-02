const prisma = require('../utils/prisma');

const getScreenings = async (req, res) => {

    const getScreenings = await prisma.screening.findMany({})
    console.log('screening', getScreenings)
    
    res.json({ data: getScreenings });
    
}

module.exports = {
    getScreenings
};
