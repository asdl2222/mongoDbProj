// Task 2ii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    //{$unwind: "$tagline"},
    {$project: {_id:0, word: {$split: [{$toLower: {$trim: {input: "$tagline"}}}," "]}}},
    {$unwind: "$word"},
    {$project: {_id:0, word: {$trim: {input: "$word", chars: "!"}}}},
    {$project: {_id:0, word: {$trim: {input: "$word", chars: "."}}}},
    {$project: {_id:0, word: {$trim: {input: "$word", chars: "?"}}}},
    {$project: {_id:0, word: {$trim: {input: "$word", chars: ","}}}},
    {$project: {_id:0, words:{$trim: {input: "$word"}}, lenght: {$strLenCP: "$word"}}},
    {$match: {lenght: {$gt: 3}}},
    {$group: {_id: "$words", count: {$sum: 1}}},
    {$sort: {"count": -1}},
    {$limit: 20}

]);