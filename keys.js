console.log('RUNNING KEYS JS')

module.exports = {
    bandsInTown: process.env.BANDS_IN_TOWN,
    spotify: {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET,
    }
}

