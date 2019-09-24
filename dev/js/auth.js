$(function() {
  //toggle
  let flag = true;
  $('.switch-button').on('click', function(e) {
    e.preventDefault();
    $('input').val('');

    if (flag) {
      flag = false;
      $('.register').show('slow');
      $('.login').hide();
    } else {
      flag = true;
      $('.login').show('slow');
      $('.register').hide();
    }
  });

  $('input').on('focus', () => {
    $('p.error').remove();
    $('input').removeClass('error');
  });

  $('.register-button').on('click', function(e) {
    e.preventDefault();

    const data = {
      login: $('#regLogin').val(),
      password: $('#regPassword').val(),
      passwordConfirm: $('#confirmPassword').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/register'
    }).done(function(data) {
      if (!data.ok) {
        $('.register h2').after('<p class="error">' + data.error + '</p>');

        if (data.fields) {
          data.fields.forEach(item => {
            $(`input[name=${item}]`).addClass('error');
          });
        }
      } else {
        $('.register h2').after('<p class="success">Отлично!</p>');
      }
    });

  });
});