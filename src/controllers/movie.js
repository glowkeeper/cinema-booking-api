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

const getAllScreenings = async (req, res) => {

    const movies = await prisma.movie.findMany({
        include: {
            screenings: true
        },          
    });

    res.json({ data: movies });    
}

const getRuntimes = async (req, res) => {

    let movies = {}
    if (req.query.lessthan !== undefined) {
        console.log("less than")
        const LT = 
        movies = await prisma.movie.findMany({
            include: {
                screenings: true
            },
            where: {
                runtimeMins: {
                    lt: parseInt(req.query.lessthan)
                }
            },
        })
    } else if (req.query.greaterthan !== undefined) {
        console.log("greater than")
        movies = await prisma.movie.findMany({
            include: {
                screenings: true
            },
            where: {
                runtimeMins: {
                    gt: parseInt(req.query.greaterthan)
                }
            },
        })  
    } else {
        console.log("Getting All Movies")
        movies = await prisma.movie.findMany({
            include: {
                screenings: true
            }
        })

    }  

    res.json({ data: movies }); 
}

const getMovieScreenings = async (req, res) => {

    const { movieId } = req.params;

    const movies = await prisma.movie.findFirst({
        where: {
            id: parseInt(movieId),
        },
        include: {
            screenings: true
        }         
    });

    res.json({ data: movies });    
}

module.exports = {
    getMovies,
    getAllScreenings,
    getRuntimes,
    getMovieScreenings,
};
