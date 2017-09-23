(function ($) {
  "use strict"; // Start of use strict

  var config = {
    databaseURL: 'https://beer-online.firebaseio.com/'
  };
  firebase.initializeApp(config);

  // Smooth scrolling using jQuery easing
  $('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });
  // send message
  $('#sendMessageButton').click(function () {
    $('input#name+p').text('')
    $('input#email+p').text('')
    if ($('#name').val() && $('#email').val()) {
      // enviar dados para servidor
      var data = {
        nome: $('#name').val(),
        email: $('#email').val()
      }
      // Get a key for a new Post.
      var newDataKey = firebase.database().ref().child('usuarios').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/usuarios/' + newDataKey] = data;

      firebase.database().ref().update(updates);
      $('#name').val('')
      $('#email').val('')
      swal(
        'Parabéns!',
        'Em breve entraremos em contato para mais informações!',
        'success'
      )
    } else {
      if (!$('#name').val()) {
        $('input#name+p').text('Campo nome não pode estar em branco!!!')
      }
      if (!$('#email').val()) {
        $('input#email+p').text('Campo email não pode ser em branco!!!')
      }
      swal(
        'Erro!',
        'Você deve preencher todas as informações!',
        'error'
      )
    }
  })
})(jQuery); // End of use strict