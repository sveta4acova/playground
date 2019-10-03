$(function() {
  let commentForm;
  let parentId;

  const form = (isNew, comment) => {
    $('.reply').show();
    if (commentForm) commentForm.remove();
    parentId = null;

    commentForm = $('.comment').clone(true, true);

    if (isNew) {
      commentForm.find('.cancel').hide();
      commentForm.appendTo('.comment-list');
    } else {
      let parrentComment = $(comment).parent();
      parentId = parrentComment.attr('id');
      $(comment).after(commentForm);
    }

    commentForm.css({
      display: 'flex',
    })
  };

  //load
  form(true);

  //add form
  $('.reply').on('click', function(e) {
    form(false, this);
    $(this).hide();
  });

  //remove form
  $('.comment .cancel').on('click', function(e) {
    commentForm.remove();
  });

  //publish
  $('.comment .send').on('click', function(e) {
    e.preventDefault();
    // removeErrors();

    const data = {
      post: $('.comments').attr('id'),
      body: commentForm.find('textarea').val(),
      parent: parentId,
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/comment/add'
    }).done(function(data) {
      if (!data.ok) {
        if (!data.error) {
          data.error = 'Неизвестная ошибка';
        }

        commentForm.prepend('<p class="error">' + data.error + '</p>')
      } else {
        let newComment = `<ul>
          <li style="background-color: #ffffe0;">
            <div class="head"></div>
            <a href=\`/user/${data.login}\`>${data.login}</a>
            <span class="date">Только что</span>
            ${data.body}
          </li>
        </ul>`;

        commentForm.after(newComment);
        form(true);
      }
    });
  });
});