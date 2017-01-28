
$(document).ready(function(){
    // $.get("/questions", function(res){
    //   var q = JSON.parse(res);
    //   console.log(q);
    // })

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.btn').on('click', function(){
      // user input validation
      // if the user hasn't answered all the questions, alert them
      var name = $('#name').val().trim();
      var image = $('#profile-photo').val().trim();

      if($(':radio:checked').length < 10 || name === null || image === null){
        alert("Please answer all questions");

      // if they answered everything, proceed
      } else {
        $('#submit-modal').modal();

        logResponses().then(function(userInfo){
          findMatch(userInfo).then(postResponses(userInfo)).catch(console.log('Find Match failed'));
        }).catch(console.log('Log Responses failed'));

      }

    });

    function logResponses(){
      return new Promise(function(success, failure){

        var userRes = []
        for (var i = 1; i < 11; i++){
          userRes.push($('input[name="question'+i+'"]:checked').val());
        }
        console.log('This is user scores: ' + userRes);

        // merge this variable with userDemo
        var userRes1 = []
        for (var i = 0; i < userRes.length; i++){
          userRes1.push(
            userRes[i]
          )
        }
        console.log(userRes1)

        // merge this variable with userRes1
        // this variable stores everything that the user has put in our form
        var userInfo = {
          'name': $('#name').val().trim(),
          'image': $('#profile-photo').val().trim(),
          'score': userRes1,
        };
        console.log(userInfo);

        // return this variable so we can keep using it
        // save userInfo to the success component of the Promise
        // if success, do this. if fail, catch.
        success(userInfo);
      })
    };

    // grab information from our friends database and begin finding a match
    // we find matches first before posting userInfo to the database because we don't want the user to be matched with himself
    function findMatch(candidate){
      return new Promise (function(success, failure){
        $.ajax({
          url: "/api/friends",
          method:'GET',
        }).then(function(err,res){
          console.log(res);
          var potList = res; //list of friends

          var differences = [];

          var evalFriends = function(){
            for (var i = 0; i < potList.length; i++){ // evaluate each friend in the list of friends
              var potScores = potList[i].score;

              var totalDifference = []; // the totalDifference for that friend

              var evalScores = function(){
                for (var x = 0, m = 0; x < potScores.length, m < candidate.score.length; x++, m++){
                  if (potScores[x] !== candidate.score[m]){
                    // if the answer to the question isn't the same
                    totalDifference += Math.abs(potScores[x] - candidate.score[m])
                    // push the absolutel value of the difference to the totalDifference variable
                  } // if statement
                } // for look score.length
              }; // var evalScores

              evalScores(); //call the function
              $.when(evalScores).done(function(){ // when evalScores is done, do this
                differences.push(totalDifference); // push the totalDifference to an array that stores all friends' differences
              })
            } //for loop potentials.length
          } // evalFriends function

          evalFriends();
          $.when(evalFriends).done(function(){
            var index = index(Math.min.apply(Math, differences)); // find the index of the minimum value in var differences
            // the index of the minimum value should correspond to the index of the closest matched friend in the friendlist
            var match = potList.eq(index);
            console.log(match);
          }); // when done of evalFriends function

        }); //ajax then function
      })
    }; // findMatch function

    //after we finish finding a match and editing the modal, we finally push userInfo to our friends database
    function postResponses(a){
      return
        $.ajax({
            	url: "/api/friends",
            	method: 'POST',
            	data: a,
            }).done(success).fail(failure);
    };


});
