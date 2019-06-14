// Generated by CoffeeScript 2.4.1
(function() {
  $().ready(function() {
    var toggle_chunk;
    $('#request-error .close').click(function(e) {
      return $('#request-error .alert').hide();
    });
    $('#btn-backup').click(function(e) {
      var btn_text;
      btn_text = $('#btn-backup').text();
      $('#btn-backup').text("Preparing archive...");
      $('#btn-upload').prop('disabled', true);
      $('#btn-backup').prop('disabled', true);
      return $.ajax({
        method: "POST",
        url: "api/v1/backup",
        timeout: 1800 * 1000
      }).done(function(data, e) {
        if (data) {
          return window.location = "static_with_mime/" + data + "?mime=application/x-tgz";
        }
      }).fail(function(data, e) {
        var err, j;
        $('#request-error .alert').addClass('alert-danger');
        $('#request-error .alert').removeClass('alert-success');
        $('#request-error .alert').show();
        if ((data.responseText !== "") && (j = $.parseJSON(data.responseText)) && (err = j.error)) {
          return ($('#request-error .msg')).text('Server Error: ' + err);
        } else {
          return ($('#request-error .msg')).text('The operation failed. Please reload the page and try again.');
        }
      }).always(function(data, e) {
        $('#btn-backup').text(btn_text);
        $('#btn-upload').prop('disabled', false);
        return $('#btn-backup').prop('disabled', false);
      });
    });
    $('#btn-upload').click(function(e) {
      e.preventDefault();
      return $('[name="backup_upload"]').click();
    });
    $('[name="backup_upload"]').fileupload({
      url: "api/v1/recover",
      progressall: function(e, data) {
        var valuenow;
        if (data.loaded && data.total) {
          valuenow = data.loaded / data.total * 100;
          $('.progress .bar').css('width', valuenow + '%');
          return $('.progress .bar').text('Uploading: ' + Math.floor(valuenow) + '%');
        }
      },
      add: function(e, data) {
        $('#btn-upload').hide();
        $('#btn-backup').hide();
        $('.progress').show();
        return data.submit();
      },
      done: function(e, data) {
        var message;
        if ((data.jqXHR.responseText !== "") && (message = $.parseJSON(data.jqXHR.responseText))) {
          $('#request-error .alert').show();
          $('#request-error .alert').addClass('alert-success');
          $('#request-error .alert').removeClass('alert-danger');
          return ($('#request-error .msg')).text(message);
        }
      },
      fail: function(e, data) {
        var err, j;
        $('#request-error .alert').show();
        $('#request-error .alert').addClass('alert-danger');
        $('#request-error .alert').removeClass('alert-success');
        if ((data.jqXHR.responseText !== "") && (j = $.parseJSON(data.jqXHR.responseText)) && (err = j.error)) {
          return ($('#request-error .msg')).text('Server Error: ' + err);
        } else {
          return ($('#request-error .msg')).text('The operation failed. Please reload the page and try again.');
        }
      },
      always: function(e, data) {
        $('.progress').hide();
        $('#btn-upload').show();
        return $('#btn-backup').show();
      }
    });
    $('#btn-reset').click(function(e) {
      return $.get('/api/v1/reset_wifi').done(function(e) {
        $('#request-error .alert').show();
        $('#request-error .alert').addClass('alert-success');
        $('#request-error .alert').removeClass('alert-danger');
        return ($('#request-error .msg')).text('Reset was successful. Please reboot the device.');
      }).error(function(e) {
        return document.location.reload();
      });
    });
    toggle_chunk = function() {
      $("[id^=auth_chunk]").hide();
      return $.each($('#auth_backend option'), function(e, t) {
        console.log(t.value);
        return $('#auth_backend-' + t.value).toggle($('#auth_backend').val() === t.value);
      });
    };
    $('#auth_backend').change(function(e) {
      return toggle_chunk();
    });
    return toggle_chunk();
  });

}).call(this);

//# sourceMappingURL=settings.js.map
