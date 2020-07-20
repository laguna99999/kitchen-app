
let selected_raw_id = -1;

let render_raw_material = () => {
    let data = get_raw_data();
    let template = `
    <div class="vertical-box-column p-t-15 p-b-15" style="height: 750px; width: 20%;">
        <div class="d-flex flex-column">
            <h5 class="text-center">Total raw materials count: ${ data.length }</h5>
            <div class="raw-material-list" style="height: 680px;">
                <ul>
                    <hr>
                    ${ (() => {
                        let tag = ``;
                        data.map(item => {
                            tag += `
                            <li data-raw-id="${ item.id }">
                                <a href="javascript:;" onclick="select_raw_material('${ item.id }')">
                                    <div class="widget-list widget-list-rounded">
                                        <div class="widget-list-item">
                                            <div class="widget-list-media">
                                                <div class="widget-icon rounded bg-danger pull-left m-r-5 m-b-5 text-white">
                                                    ${ item.name.charAt(0) }
                                                </div>
                                            </div>
                                            <div class="widget-list-content">
                                                <h4 class="widget-list-title">${ item.name }</h4>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <hr>
                            `;
                        })
                        return tag;
                    })() }
                </ul>
            </div>
        </div>
    </div>
    <div class="vertical-box-column p-t-15 p-b-15 raw-material-detail" style="height: 750px; width: 60%;">

    </div>
    <div class="vertical-box-column p-t-15 p-b-15" style="height: 750px; width: 20%;">
        <div class="d-flex flex-column">
            <h5 class="text-center">Disposal history</h5>
            <div class="raw-material-disposal-history" style="height: 640px;">

            </div>
            <div class="text-center m-t-15">
                <button type="button" name="button" class="btn btn-md btn-primary" onclick="upload_disposal_history()">Upload to server</button>
            </div>
        </div>
    </div>
    `;
    $('.item-details').parent().find('.widget-header-title').text('Raw materials');
    $('.item-details').empty();
    $('.item-details').append($(template))
}
let select_raw_material = (raw_id) => {
    selected_raw_id = raw_id;
    let data = get_raw_data();
    let item = [...data.filter(item => item.id == raw_id)][0];
    let template = `
        <div class="d-flex flex-row justify-content-between align-items-center p-r-20 p-l-20">
            <h3 class="text-center m-0 text-blue-darker">${ item.name }</h3>
        </div>
        <hr>
        <div class="d-flex flex-row p-20" style="height: 650px;">
            <div class="p-r-20 p-l-20">
                <div class="">
                    <h4>Description</h4>
                    <div class="description f-s-14 m-b-20" contenteditable="true">
                        ${ item.description }
                    </div>
                </div>
                <div class="d-flex justify-content-end m-t-15">
                    <button type="button" name="button" class="btn btn-lg btn-danger" onclick="dispose_raw('${ raw_id }')">Dispose</button>
                </div>
            </div>
        </div>
    `;
    $('.raw-material-list li').removeClass('active');
    $(`.raw-material-list li[data-raw-id="${ raw_id }"]`).addClass('active');
    $('.raw-material-detail').empty();
    $('.raw-material-detail').append($(template));
    render_history_data(raw_id);
}

let render_history_data = (raw_id) => {
    let data = get_raw_data();
    let item = [...data.filter(item => item.id == raw_id)][0];
    let template = `
        <ul>
            <hr>
            ${ (() => {
                let tag = ``;
                item.history.map(history => {
                    tag +=
                        `<li>
                            <div class="widget-list widget-list-rounded">
                                <div class="widget-list-item">
                                    <div class="widget-list-media">
                                        <img src="${ history.image ? history.image : (history.signature ? history.signature : 'assets/img/items/alt.png') }" class="rounded" />
                                    </div>
                                    <div class="widget-list-content">
                                        <h4 class="widget-list-title">
                                            <div class="m-t-3">${ history.reason ? "Reason: " + history.reason : '' }</div>
                                        </h4>
                                        <div class="d-flex d-row justify-content-between m-t-5">
                                            <p class="widget-list-desc">${ moment(history.timestamp, 'MM-DD HH:mm').format('DD MMM, HH:mm') } ( ${ get_elapsed_time_string(get_elapsed_hr_min(history.timestamp)) } ago )</p>
                                            <p class="widget-list-desc">Qty: ${ history.qty } g </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <hr>`;
                })
                return tag;
            })() }
        </ul>
    `;
    $('.raw-material-disposal-history').empty();
    $('.raw-material-disposal-history').append($(template));
}

let dispose_raw = (raw_id) => {
    $('#dispose-raw-modal').modal('show');
    let data = get_raw_data();
    let item = [...data.filter(item => item.id == raw_id)][0];
    $('#dispose-raw-modal .modal-title').text(`You are going to dispose ${ item.name }`);
    start_draw(1); // Signature drawing
}
let dispose_raw_confirm = (raw_id) => {
    let data = get_raw_data();
    let item = [...data.filter(item => item.id == raw_id)][0];
    let qty = parseInt($('#dispose-raw-modal .item_amount').val());
    let img = $('#dispose-raw-modal .camera-image').attr('src');
    let sign = $('#dispose-raw-modal .signature-image').attr('src');
    if((sign == '') || (qty == 0) || (qty == null)){
        $.gritter.add({
    		title: 'Disposal error!',
    		text: 'You need to set valid amount and signature.',
    		image: 'assets/img/media/danger.png',
    		sticky: false,
    		time: 5000,
    		class_name: 'my-sticky-class'
    	});
        return false;
    }else{
        $('#dispose-raw-modal').modal('hide');
        item.history.push({
            id: generate_id(),
            type: 'dispose',
            qty: qty,
            signature: sign,
            image: img,
            timestamp: moment().format('MM-DD HH:mm'),
            reason: $('#dispose-raw-modal input[name="disposal_reason"]:checked').val()
        })
        $('#dispose-raw-modal .item_amount').val('');
        set_raw_data(data);
        render_raw_material();
        select_raw_material(raw_id);
        kitchen_notification("Raw material disposed!", `You disposed ${ item.name } ${ qty } g, Reason: ${ $('#dispose-raw-modal input[name="disposal_reason"]:checked').val() }`, 'assets/img/media/info.png', false, 5000);
    }
}

let key_tap_dispose_raw = (key) => {
    let val = $('#dispose-raw-modal .item_amount').val();
    if(key == '-1'){
        val = val.slice(0, -1);
    }else if(key == '-2'){
        val = '';
    }else{
        val += key;
    }
    if((val.length != 1) && (val[0] == '0')){
        val = val.slice(1);
    }
    if(val == ''){
        val = 0;
    }
    $('#dispose-raw-modal .item_amount').val(val);
    $('#dispose-raw-modal .item_amount').removeClass('text-red');
}

let upload_disposal_history = () => {
    let data = get_raw_data();
    let item = [...data.filter(item => item.id == selected_raw_id)][0];
    // Upload data to server here
    item.history = [];
    set_raw_data(data);
    render_raw_material();
    select_raw_material(selected_raw_id);
    kitchen_notification("Uploaded to server!", `You uploaded raw materials history data to the server.`, 'assets/img/media/info.png', false, 5000);
}
$('.raw-material').click(function(){
    selected_item_id = -1;
    $('.item').removeClass('active');
    $(this).addClass('active');

    render_raw_material();
})

$('.confirm_dispose_raw').click(function(){
    dispose_raw_confirm(selected_raw_id);
})
$(document).ready(function(){
    //https://www.imdb.com/title/tt2177819/
})
