
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
          postResponses(userInfo);
        }).then(function(){
          //this is where we do a get call to process information
          findMatch();
        });
      }

    });

    function logResponses(){
      return new Promise(function(){
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
        return userInfo;
      });
    };

    function postResponses(userInfo){
      return $.ajax({
          	url: "/api/friends",
          	method: 'POST',
          	data: userInfo,
          }).then(function(err,res){
            if (err) throw err;
            console.log('Responses successfully posted to server.');
          });
    };

    function findMatch(){
      return $.ajax({
        url: "/api/friends",
        method:'GET',
      }).then(function(err,res){
        console.log(res);
      })
    };

    // function showMatch(){
    //
    // }

});
