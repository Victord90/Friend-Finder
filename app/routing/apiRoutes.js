let friends = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    })

    app.post('/api/friends', function (req, res) {
        let bestMatch = {
            name: "",
            photo: "",
            friendDifference: 40
        };

        let userInfo = req.body;
        let userScore = userInfo.scores;
        let userName = userInfo.name;
        let userPhoto = userInfo.photo;

        let totalDifference = 0;

        for (let i = 0; i < friends.length; i++) {
            totalDifference = 0;

                for ( let j = 0; j < 10; j++) {
                    totalDifference += Math.abs(parseInt(userScore[j]) - parseInt(friends[i].scores[j]));
                    if (totalDifference <= bestMatch.friendDifference) {
                        bestMatch.name = friends[i].name;
                        bestMatch.photo = friends[i].photo;
                        bestMatch.friendDifference = totalDifference;
                    }
                }
        }

        friends.push(userInfo);

        res.json(bestMatch);
    });
};