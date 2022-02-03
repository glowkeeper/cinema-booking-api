const prisma = require('../utils/prisma');

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

const createMovie = async (req, res) => {
    const { title, runtime } = req.body;

    console.log("in create", title, runtime)

    const movie = await prisma.movie.create({
        data: {
            title: title,
            runtimeMins: runtime
        }
    });

    res.json({ data: movie });
}

const createMovieScreening = async (req, res) => {
    const {
        title,
        runtimeMins,
        startsAt,
        screenId
    } = req.body

    //console.log("in create screening", title, runtimeMins, startsAt, screenId)

    const createObject = {
        data: { 
            title,
            runtimeMins
        }
    }

    if ( startsAt && screenId ) {
        createObject = { 
            data: {
                ...createObject.data,
                screenings: {
                    create: {
                        startsAt,
                        screen: {
                            connect: {
                                id: screenId
                            }
                        }
                    }
                }
            },
            include: {
                screenings: true
            }
        }
    }

    const createdMovie = await prisma.movie.create(createObject)
    res.json({ data: createdMovie })
}

module.exports = {
    getMovies,
    getAllScreenings,
    getRuntimes,
    getMovieScreenings,
    createMovie,
    createMovieScreening
};
