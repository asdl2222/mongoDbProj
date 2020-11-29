// Task 3ii

db.credits.aggregate([
    // TODO: Write your query here

    {$match: {crew: {$elemMatch: {$and: [{id: 5655}, {job: "Director"}]}}}},
//    {$match: {crew: {$elemMatch: {id: 5655}}}},
//    {$match: {crew: {$elemMatch: {job: "Director"}}}},
    //{$unwind: "$crew"},
    {$unwind: "$cast"},
    {$project: {_id:0, id:"$crew.id", cast_id: "$cast.id", cast_name: "$cast.name"}},
    //{$match: {id: 5655}},
    {$group: {_id: {id: "$cast_id", name: "$cast_name"},count: {$sum: 1}}},
    //{$match: {crew: {$elemMatch: {id: 5655}}}}
    {$project: {_id:0,count: "$count", id: "$_id.id", name: "$_id.name"}},
    {$sort: {count: -1, id: 1}},
    {$limit: 5}
]);