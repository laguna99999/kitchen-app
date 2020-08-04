// Configurations
const API_PATH = 'http://198.11.172.117/sbm-dashboard';
const SECRETKEY = 'davidlin';
let databaseList = [];
let shopList = [];
let userList = [];
// API calls
let database_list = (database = '') => {
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
                        render_database_list(databaseList, database);
                    }else{
                        $('.database-fetching-error').removeClass('hide');
                    }
                }catch(e){
                    $('.database-fetching-error').removeClass('hide');
                }
            }
        })
    }else{
        render_database_list(databaseList, database);
    }
}
let shop_list = (database, shop = '') => {
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
                    render_shop_list(shopList, shop);
                }else{
                    $('.shop-fetching-empty').removeClass('hide');
                }
            }catch(e){
                $('.shop-fetching-error').removeClass('hide');
            }
        }
    })
}
let add_new_user = (data) => {
    $.ajax({
        url: API_PATH + '/auth/kt_register',
        method: 'post',
        data: data,
        success: (res) => {
            try{
                $('#addUser').modal('hide');
                data = JSON.parse(res);
                if(data.status == 'success'){
                    $.gritter.add({
                		title: 'Success',
                		text: data.msg,
                        image: 'assets/img/media/success.png',
                		class_name: 'my-sticky-class'
                	});
                    get_uses();
                }else{
                    $.gritter.add({
                		title: 'Failed',
                		text: data.msg,
                        image: 'assets/img/media/danger.png',
                		class_name: 'my-sticky-class'
                	});
                }
            }catch(e){
                $.gritter.add({
                    title: 'Failed',
                    text: data.msg,
                    image: 'assets/img/media/danger.png',
                    class_name: 'my-sticky-class'
                });
            }
        }
    })
}
let edit_user = (data) => {
    $.ajax({
        url: API_PATH + '/auth/kt_update',
        method: 'post',
        data: data,
        success: (res) => {
            $('#addUser').modal('hide');
            let data;
            try{
                data = JSON.parse(res);
                if(data.status == 'success'){
                    $.gritter.add({
                		title: 'Success',
                		text: data.msg,
                        image: 'assets/img/media/success.png',
                		class_name: 'my-sticky-class'
                	});
                    get_uses();
                }else{
                    $.gritter.add({
                        title: 'Failed',
                        text: data.msg,
                        image: 'assets/img/media/danger.png',
                        class_name: 'my-sticky-class'
                    });
                }
            }catch(e){
                $.gritter.add({
                    title: 'Failed',
                    text: data.msg,
                    image: 'assets/img/media/danger.png',
                    class_name: 'my-sticky-class'
                });
            }
        }
    })
}
let delete_user = (id) => {
    $.ajax({
        url: API_PATH + '/auth/kt_delete',
        method: 'post',
        data: {
            id: id
        },
        success: (res) => {
            if(res == 1){
                $.gritter.add({
                    title: 'Success',
                    text: "User deleted successfully.",
                    image: 'assets/img/media/success.png',
                    class_name: 'my-sticky-class'
                });
                get_uses();
            }else{
                $.gritter.add({
                    title: 'Failed',
                    text: "Database error. Please try again",
                    image: 'assets/img/media/danger.png',
                    class_name: 'my-sticky-class'
                });
            }
        }
    })
}
let get_uses = () => {
    $.ajax({
        url: API_PATH + '/auth/kt_users',
        method: 'post',
        success: (res) => {
            let data;
            try{
                data = JSON.parse(res);
                if(data.status == 'success'){
                    userList = [...data.data];
                    if(userList.length == 0){
                        $('.user-fetching-empty').removeClass('hide');
                    }else{
                        render_user_list(userList);
                    }
                }else{
                    $('.user-fetching-error').removeClass('hide');
                }
            }catch(e){
                $('.user-fetching-error').removeClass('hide');
            }
        }
    })
}

// Functions
let render_database_list = (data, database = '') => {
    $('.database-list').empty();
    data.forEach(item => {
        if(item.name == database){
            $('.database-list').append(`<option value="${ item.name }" selected>${ item.name }</option>`);
        }else{
            $('.database-list').append(`<option value="${ item.name }">${ item.name }</option>`);
        }
    })
}
let render_shop_list = (data, shop = '') => {
    $('.shop-list').empty();
    data.forEach(item => {
        if(item.description == shop){
            $('.shop-list').append(`<option value="${ item.description }" selected>${ item.description }</option>`);
        }else{
            $('.shop-list').append(`<option value="${ item.description }">${ item.description }</option>`);
        }
    })
}
let render_user_list = (data) => {
    $('.user-fetching-empty').addClass('hide');
    $('.user-fetching-error').addClass('hide');
    $('.user-list-table').removeClass('hide');
    $('.user-list-table tbody').empty();
    data.map((item, idx) => {
        $('.user-list-table tbody').append(`
            <tr>
                <td>${ idx + 1 }</td>
                <td>${ item.username }</td>
                <td>${ item.usercode }</td>
                <td>${ item.db }</td>
                <td>${ item.shop }</td>
                <td>${ item.ktkey }</td>
                <td>
                    <div class="form-check">
                        <input style="margin-top: 0.1rem;" id="activasion_check_${ item.id }" class="form-check-input is-valid" type="radio" name="default_radio_${ item.id }" ${ item.activated == 1 ? 'checked' : '' }>
                        <label class="form-check-label" for="activasion_check_${ item.id }">Activated</label>
                    </div>
                    <div class="form-check">
                        <input style="margin-top: 0.1rem;" id="deactivasion_check_${ item.id }" class="form-check-input is-invalid" type="radio" name="default_radio_${ item.id }" ${ item.activated == 0 ? 'checked' : '' }>
                        <label class="form-check-label" for="deactivasion_check_${ item.id }">Deactivated</label>
                    </div>
                </td>
                <td>${ item.created_at }</td>
                <td>${ item.updated_at }</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="edit_user_modal('${ item.id }')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="delete_user_modal('${ item.id }')">Delete</button>
                </td>
            </tr>
        `)
    })
}
let generate_key = (name, code, db, shop) => {
    let plaintext = name  + '*' + code + '*' + db + '*' + shop;
    var ciphertext = CryptoJS.AES.encrypt(plaintext, SECRETKEY);
    $('input[name="key"]').val(ciphertext);
    // // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
    // console.log(ciphertext.toString());
    // // Decrypt
    // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), SECRETKEY);
    // var _plaintext = bytes.toString(CryptoJS.enc.Utf8);
    //
    // console.log(_plaintext);
}
let edit_user_modal = (id) => {
    let user = userList.filter(item => item.id == id)[0];
    $('#addUser').modal({
        backdrop: 'static'
    });
    $('#addUser').attr('user_id', user.id);
    $('#addUser .modal-title').text('Edit user');
    $('input[name="username"]').val(user.username);
    $('input[name="usercode"]').val(user.usercode);
    // render_database_list(databaseList);
    // render_shop_list(shopList);
    database_list(user.db);
    shop_list(user.db, user.shop);
    $('input[name="key"]').val('');
}
let delete_user_modal = (id) => {
    let user = userList.filter(item => item.id == id)[0];
    swal({
			title: 'Are you sure?',
			text: `Do you want to delete ${ user.username }?`,
			icon: 'warning',
            closeOnClickOutside: false,
			buttons: {
				cancel: {
					text: 'No',
					value: false,
					visible: true,
					className: 'btn btn-default',
					closeModal: true
				},
				confirm: {
					text: 'Delete',
					value: true,
					visible: true,
					className: 'btn btn-danger',
					closeModal: true
				}
			}
		}).then(function(result){
            delete_user(id)
        });
}
// Setup app
$(document).ready(() => {

    get_uses();

    $('#sidebar .menu li').eq(0).addClass('active');
    setInterval(() => {
        $('.timestamp').text(moment().format('hh:mm:ss DD MMM, YYYY'));
    }, 1000);

    $('.add-new-user').click(function(){
        $('#addUser').modal({
            backdrop: "static"
        });
        $('#addUser .modal-title').text('Add a new user')
        $('input[name="username"]').val('');
        $('input[name="usercode"]').val('');
        $('select[name="database"]').empty();
        $('select[name="shop"]').empty();
        $('input[name="key"]').val('');
        $('#addUser').attr('user_id', -1);
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

    $('.shop-reload').click(function(){
        $('.shop-fetching-error').addClass('hide');
        shop_list($('.database-list').val());
    })

    $('.user-reload').click(function(){
        $('.user-fetching-empty').addClass('hide');
        $('.user-fetching-error').addClass('hide');
        get_uses();
    })

    $('.key-generate').click(function(){
        $('.require-all-fields').addClass('hide');
        if(($('input[name="username"]').val() != '') && ($('input[name="usercode"]').val() != '') && ($('select[name="database"]').val() != '') && ($('select[name="shop"]').val() != '')){
            generate_key($('input[name="username"]').val(), $('input[name="usercode"]').val(), $('select[name="database"]').val(), $('select[name="shop"]').val());
        }else{
            $('.require-key-fields').removeClass('hide');
        }
    })

    $('.add-user-confirm').click(function(){
        let data = {
            username: $('input[name="username"]').val(),
            usercode: $('input[name="usercode"]').val(),
            db: $('select[name="database"]').val(),
            shop: $('select[name="shop"]').val(),
            ktkey: $('input[name="key"]').val()
        }

        if(data.ktkey){
            if($('#addUser').attr('user_id') == -1){
                add_new_user(data);
            }else{
                data.id = $('#addUser').attr('user_id');
                edit_user(data);
            }
        }else{
            $('.require-all-fields').removeClass('hide');
        }

    })
})
