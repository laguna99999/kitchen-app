// Configurations
const API_PATH = 'http://198.11.172.117/sbm-dashboard';
const CIPHERTEXT = 'davidlin';
let databaseList = [];
let shopList = [];

// API calls
let database_list = () => {
    if(databaseList.length == 0){
        $.ajax({
            url: API_PATH + '/auth/db',
            method: 'post',
            success: (res) => {
                let data;
                try{
                    data = JSON.parse(res);
                    if(data.status == 'success'){
                        databaseList = [...data.data];
                        render_database_list(databaseList);
                    }else{
                        $('.database-fetching-error').removeClass('hide');
                    }
                }catch(e){
                    $('.database-fetching-error').removeClass('hide');
                }
            }
        })
    }else{
        render_database_list(databaseList);
    }
}
let shop_list = (database) => {
    $.ajax({
        url: API_PATH + '/auth/shop',
        method: 'post',
        data: {
            db: database
        },
        success: (res) => {
            let data;
            try{
                data = JSON.parse(res);
                if(data.status == 'success'){
                    shopList = [...data.data];
                    render_shop_list(shopList);
                }else{
                    $('.shop-fetching-empty').removeClass('hide');
                }
            }catch(e){
                $('.shop-fetching-error').removeClass('hide');
            }
        }
    })
}

// Functions
let render_database_list = (data) => {
    $('.database-list').empty();
    data.forEach(item => {
        $('.database-list').append(`<option value="${ item.name }">${ item.name }</option>`);
    })
}
let render_shop_list = (data) => {
    $('.shop-list').empty();
    data.forEach(item => {
        $('.shop-list').append(`<option value="${ item.description }">${ item.description }</option>`);
    })
}

let generate_key = (name, code, db, shop) => {
    let key = name + code + db + shop;
    var ciphertext = CryptoJS.AES.encrypt(CIPHERTEXT, key);
    $('input[name="key"]').val(ciphertext);
    // // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
    // console.log(ciphertext.toString());
    // // Decrypt
    // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
    // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    //
    // console.log(plaintext);
}

// Setup app
$(document).ready(() => {
    $('#sidebar .menu li').eq(0).addClass('active');
    setInterval(() => {
        $('.timestamp').text(moment().format('hh:mm:ss DD MMM, YYYY'));
    }, 1000);

    $('.add-new-user').click(function(){
        $('#addUser').modal({
            backdrop: "static"
        });
        database_list();
    })

    $('#sidebar .menu li').click(function(){
        $('#sidebar .menu li').removeClass('active');
        $(this).addClass('active');
    })

    $('.database-list').change(function(){
        $('.shop-fetching-error').addClass('hide');
        $('.shop-fetching-empty').addClass('hide');
        shop_list($(this).val());
    })

    $('.database-reload').click(function(){
        $('.database-fetching-error').addClass('hide');
        database_list();
    })

    $('.key-generate').click(function(){
        $('.require-all-fields').addClass('hide');
        if(($('input[name="username"]').val() != '') && ($('input[name="usercode"]').val() != '') && ($('select[name="database"]').val() != '') && ($('select[name="shop"]').val() != '')){
            generate_key($('input[name="username"]').val(), $('input[name="usercode"]').val(), $('select[name="database"]').val(), $('select[name="shop"]').val());
        }else{
            $('.require-all-fields').removeClass('hide');
        }
    })
})
