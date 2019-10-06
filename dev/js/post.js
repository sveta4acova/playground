$(function() {
  const removeErrors = () => {
    $('.post-form p.error').remove();
    $('.post-form input, #post-body').removeClass('error');
  };

  //clear
  $('.post-form input, #post-body').on('focus', () => {
    removeErrors();
  });

  //publish post
  $('.publish-button, .save-button').on('click', function(e) {
    e.preventDefault();
    removeErrors();

    let isDraft = $(this).attr('class').indexOf('save-button ') !== -1;

    const data = {
      title: $('#post-title').val(),
      body: $('#post-body').val(),
      isDraft,
      postId: $('#post-id').val(),
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
        // $(location).attr('href', '/');

        if (isDraft) {
          $(location).attr('href', `/post/edit/${data.post.id}`);
        } else {
          $(location).attr('href', `/posts/${data.post.url}`);
        }
      }
    });
  });

  //upload
  $('#file').on('change', function(e) {
    const formData = new FormData();
    formData.append('postId', $('#post-id').val());
    formData.append('file', $('#file')[0].files[0]);

    $.ajax({
      type: 'POST',
      url: '/upload/image',
      data: formData,
      processData: false,
      contentType: false,
      success: data => {
        console.log(data);

        $('#fileinfo').prepend(`<div class="img-container"><img src="/uploads${data.filePath}" alt="" /></div>`)
      },
      error: err => {
        console.log(err);
      }
    })
  });

  //inserting image
  $('.img-container').on('click', function() {
    let $txt = $('#post-body');
    let caretPos = $txt[0].selectionStart;
    let textAreaTxt = $txt.val();
    const imgSrc = $(this).find('img').attr('src');
    let txtToAdd = `![Post Image](${imgSrc})`;
    $txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos));
  });
});