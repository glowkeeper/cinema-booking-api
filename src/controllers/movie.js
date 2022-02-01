const prisma = require('../utils/prisma');

/*
const createMovie = async (req, res) => {
    const {
        name,
        phone,
        email
    } = req.body;

    const createdMovie = await prisma.movie.create({
        data: {
            name,
            contact: {
                create: {
                    phone,
                    email
                }
            }
        },
        // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
        // This is like doing RETURNING in SQL
        include: { 
            contact: true
        }
    })

    res.json({ data: createdMovie });
}
*/

const getMovies = async (req, res) => {

    const getMovies = await prisma.movie.findMany({})
    console.log('movie', getMovies)
    res.json({ data: getMovies });
}

module.exports = {
    getMovies
};
