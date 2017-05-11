(function() {
  $("#validate").click(function(e) {
    var originalPoem = $('#originalPoem').val(),
        encodedPoem = $('#encodedPoem').val();
    $.ajax({
      url: '/validate',
      type: "POST",
      data: {original: originalPoem, encoded: encodedPoem},
      success: function (data, textStatus, jqXHR) {
        $('#encodeMessage').text(data.message);
        $('#alertModal').modal('toggle');
        if(data.status === true) {
          $("#submitValidated").prop("disabled", false);
        }
        else {
          $("#submitValidated").prop("disabled", true);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $('#encodeMessage').text(errorThrown);
      }
    });
    e.preventDefault();
  });
  $('#encodedPoem').on('keyup', function(e) {
    $("#submitValidated").prop("disabled", true);
  });
})();
