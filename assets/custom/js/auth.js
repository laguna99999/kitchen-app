$('#loginForm').submit(function(e){
    e.preventDefault();
    let id = $('#loginForm input[name="shop_id"]').val();
    let key = $('#loginForm input[name="key"]').val();

    // Do API call to auth user

    if((id == 1) && (key == 12345)){
        $('.auth-failed').addClass('hide');
        // cookie control add
        window.location.href = 'index.html';
    }else{
        $('.auth-failed').removeClass('hide');
    }
})
