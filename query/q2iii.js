// Task 2iii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {$project: {_id:0, budget: 1, temp: {$and: ["$budget", 1]}, result: {$isNumber: "$budget"}}},
    {$project: {_id:0, budget: {$cond: {
                                        if: "$result",
                                        then: "$budget",
                                        else: {$cond: {
                                            if: {$and: ["$budget", 1]},
                                            //then: {$trim: {input: "$budget", chars: "USD$"}},
                                            then: {$trim: {input: {$trim: {input: "$budget", chars: "USD$"}}}},
                                            else:
                                            "$null"
                                        }}
    }}}},
    {$project: {_id:0, budget: 1, temp: {$ne: ["$budget", ""]}}},
    {$project: {_id:0, budget: {$cond: {
                                        if: "$temp",
                                        then: "$budget",
                                        else:
                                        "$null"
    }}}},

    {$project: {_id:0, budget: {$cond: {
                                        if: {$and: ["$budget", 1]},
                                        then: {$toInt: "$budget"},
                                        else:
                                        "unknown"
    }}}},

    {$project: {_id:0, budget: {$cond: {
                                        if: {$isNumber: "$budget"},
                                        then: {$round: ["$budget", -7]},
                                        else:
                                        "unknown"
    }}}},
    {$group: {
    _id: "$budget",
    count: {$sum: 1}}},
    {$project: {_id:0, budget: "$_id", count:"$count"}},
    {$sort: {"budget" : 1}}

]);