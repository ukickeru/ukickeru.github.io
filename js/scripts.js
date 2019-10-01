"use strict";

$(document).ready(function() {

  // Grid layout
  function updateGrid() {
    $('div.grid').masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      gutter: 0
    });
  };

  $('a#experience-tab').on('click', function() {
    setTimeout(function() {
      updateGrid();
    }, 200);
  });

  $(window).on('resize', function() {
    setTimeout(function() {
      updateGrid();
    }, 200);
  });

  var name = $('input#name');
  var email = $('input#email');
  var subject = $('input#subject');
  var message = $('textarea#message');

  function validateInput(obj, state) {
    obj.next('label').addClass('active');
    if ( state === 'invalid' ) {
      obj.removeClass('valid');
      obj.addClass('invalid');
    } else if ( state === 'valid' ) {
      obj.removeClass('invalid');
      obj.addClass('valid');
    }
  };

  function checkInput() {
    var serviceMessage = '';

    // Name
    if ( name.val().length > 0 ) {
      if ( name.val().length > 100 ) {
        serviceMessage += '► Длина имени не должна превышать 100 символов\r';
        validateInput(name, 'invalid');
      } else {
        validateInput(name, 'valid');
      }
    }

    // Email
    if ( email.val().length > 0 ) {
      email.trigger('change');
      if ( email.hasClass('invalid') ) {
        serviceMessage += '► Введите корректный email. Например: "email@domain.com"\r';
        validateInput(email, 'invalid');
      }
      if ( email.val().length > 100 ) {
        serviceMessage += '► Длина email не должна превышать 100 символов\r';
        validateInput(email, 'invalid');
      }
    }

    // Subject
    if ( subject.val().length > 0 ) {
      if ( subject.val().length > 100 ) {
        serviceMessage += '► Длина темы не должна превышать 100 символов\r';
        validateInput(subject, 'invalid');
      } else {
        validateInput(subject, 'valid');
      }
    }

    // Textarea
    if ( message.val().length > 0 ) {
      if ( message.val().length > 500 ) {
        serviceMessage += '► Длина сообщения не должна превышать 500 символов\r';
        validateInput(message, 'invalid');
      } else {
        validateInput(message, 'valid');
      }
    }

    if ( serviceMessage.length > 0 ) {
      // Form is invalid
      alert('Внимание!\r' + serviceMessage);
      return false;
    } else {
      // Form is valid
      return true;
    }
  };

  $('input, textarea').on('focusout', function() {
    checkInput();
  });

  $('button#submit').on('click', function() {
    if ( checkInput() ) {
      var querieStr = '';
      querieStr = encodeURI('name='+name.val()+'&email='+email.val()+'&subject='+subject.val()+'&message='+message.val());
      $.post( "mail.php", querieStr, function(data) {
    		if (data) {
    			alert(data);
    		}
    	});
    }
  });

  updateGrid();

});

$(window).on('load', function() {

  setTimeout(function() {
    $('div#mdb-preloader').fadeOut(500);
    setTimeout(function() {
      $('div#mdb-preloader').css('display','none');
    }, 500);
  }, 300);

});
