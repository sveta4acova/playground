$(function() {
  //toggle
  let flag = true;
  $('.switch-button').on('click', function(e) {
    e.preventDefault();
    $('input').val('').removeClass('error');
    $('p.error').remove();

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

  //register
  $('.register-button').on('click', function(e) {
    e.preventDefault();
    $('input').removeClass('error');
    $('p.error').remove();

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
        // $('.register h2').after('<p class="success">Отлично!</p>');
        $(location).attr('href', '/');
      }
    });
  });

  //login
  $('.login-button').on('click', function(e) {
    e.preventDefault();
    $('input').removeClass('error');
    $('p.error').remove();

    const data = {
      login: $('#login').val(),
      password: $('#password').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/login'
    }).done(function(data) {
      if (!data.ok) {
        $('.login h2').after('<p class="error">' + data.error + '</p>');

        if (data.fields) {
          data.fields.forEach(item => {
            $(`input[name=${item}]`).addClass('error');
          });
        }
      } else {
        // $('.login h2').after('<p class="success">Отлично!</p>');
        $(location).attr('href', '/');
      }
    });
  });
});