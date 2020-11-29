// Task 3i

db.credits.aggregate([
    // TODO: Write your query here
    {$unwind: "$cast"},
    {$project: {_id:0, id:"$cast.id", characters: "$cast.character", movieId: 1}},
    {$match: {id: 7624}},
    //{$match: {cast: {$elemMatch: {id: 7624}}}},
    //{$project: {$_id:0, character: 1}}

    {$lookup: {
        from: "movies_metadata",
        localField: "movieId",
        foreignField: "movieId",
        as: "movies"
    }},
    {$project: {_id:0, title: {$first: "$movies.title"}, release_date: {$first: "$movies.release_date"}, character: "$characters"}},
    {$sort: {release_date: -1}}
]);