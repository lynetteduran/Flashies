$(document).ready(function() {
  console.log('app.js loaded!');

  $('.user').on('click', '.get-user', handleGetUserClick);

});

function handleGetUserClick(e) {
  e.preventDefault();
  var userId = $(this).parents('.user').data('user-id');
  $.get('/users/' + userId).success(function(res){
    $(content).replaceWith(res);
  };
};
