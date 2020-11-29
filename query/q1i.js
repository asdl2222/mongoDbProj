// Task 1i

db.keywords.aggregate([
    // TODO: Write your query here
    {
        $match: {keywords: {$elemMatch: {$or: [{name: "time travel"}, {name: "presidential election"}]}}}

    },
    {$sort: {"movieId": 1}},
    {$project: {movieId: 1, _id: 0}}
]);