$(function() {
  const removeErrors = () => {
    $('.post-form p.error').remove();
    $('.post-form input, #post-body').removeClass('error');
  };

  let editor = new MediumEditor('#post-body', {
    placeholder: {
      text: '',
      hideOnClick: true,
    }
  });

  //clear
  $('.post-form input, #post-body').on('focus', () => {
    removeErrors();
  });

  //publish post
  $('.publish-button').on('click', function(e) {
    e.preventDefault();
    removeErrors();

    const data = {
      title: $('#post-title').val(),
      body: $('#post-body').html()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/post/add'
    }).done(function(data) {
      if (!data.ok) {
        $('.post-form h2').after('<p class="error">' + data.error + '</p>');

        if (data.fields) {
          data.fields.forEach(item => {
            $(`#post-${item}`).addClass('error');
          });
        }
      } else {
        // $('.post-form h2').after('<p class="success">Отлично!</p>');
        $(location).attr('href', '/');
      }
    });
  });
});