let cook_option = 'batch'; // Batch cook or amount cook

// App
let init = () => {
    // Welcome message
    setTimeout(function() {
    	$.gritter.add({
    		title: 'Welcome back, admin!',
    		text: 'Please start cooking.',
    		sticky: false,
    		time: '3000',
    		class_name: 'my-sticky-class'
    	});
    }, 1000);
    // Timestamp
    setInterval(function(){
        $('.timestamp').text(moment().format('HH:mm:ss DD, MMM YYYY'));
    }, 1000);
}

// Item list in the sidebar and page rendering
let render_item_list = () => {
    // Renders item on sidebar
    let data = get_data(); // Need to be changed

    $('.item-list').empty();
    data.map(item => {
        let div = `
            <li class="item" data-item-id="${ item.id }">
                <a href="javascript:;" class="d-flex align-items-center justify-content-start" onclick="select_item('${ item.id }')">
                    <img src="assets/img/items/${ item.picture }.jpg" class="widget-img widget-img-sm rounded"/>
                    <p class="w-50 m-0 m-l-10">${ item.name }</p>
                    <p class="label ${ item.cooked_items.length == 0 ? "bg-red" : "" }">${ item.cooked_items.length }</p>
                </a>
            </li>
        `;
        $('.item-list').append($(div));
    })
    select_item(data[0].id);
}
let select_item = (id) => {
    // Select an item from item list
    $('.item').removeClass('active');
    $(`li[data-item-id=${ id }]`).addClass('active');
    render_item_detail(id);
}
let render_item_detail = (id) => {
    // Renders item detail in the main content
    let data = get_data();
    let item = [...data.filter(item => item.id == id)][0];
    let template = `
        <div class="vertical-box-column p-t-15 p-b-15" style="height: 750px;">
            <div class="w-100 h-100 d-flex flex-row flex-row">
                <div class="d-flex justify-content-center align-items-center w-50 h-100 flex-wrap" style="border-right: 1px solid #d5dbe0; min-width: 300px;">
                    <img class="rounded item-image" src="assets/img/items/${ item.picture }.jpg" alt="">
                </div>
                <div class="w-50 widget-chart-info p-15" style="min-width: 300px;">
                    <div class="item-title height-100">
                        <h3 class="">${ item.name }</h3>
                        <hr>
                        <span class="f-s-15 f-w-700">Description </span>
                        <ul class="ingredients">
                            ${ (() => {
                                let ingredients = ``;
                                item.ingredients.map((_item) => {
                                    if(_item != item.ingredients[item.ingredients.length - 1]){
                                        ingredients += `<li><a href="javascript:;">${ _item }</a></li><li>/</li>`;
                                    }else{
                                        ingredients += `<li><a href="javascript:;">${ _item }</a></li>`;
                                    }
                                })
                                return ingredients;
                            })() }
                        </ul>
                    </div>
                    <hr>
                    <div class="item-description height-250">
                        <span class="f-s-15 f-w-700">Cooking procedure </span>
                        <div class="m-t-10 f-s-14">${ item.recipe }</div>
                    </div>
                    <hr>
                    <div class="item-attributes height-200">
                        <span class="f-s-15 f-w-700">Attributes </span>
                        <ul class="m-t-20">
                            <li>
                                <i class="fa fa-circle"></i>
                                <span class="f-s-14">Best serving hours: ${ item.best_serving_hours } hr</span>
                            </li>
                            <li>
                                <i class="fa fa-circle"></i>
                                <span class="f-s-14">Cooking time: ${ item.cooking_time } hr</span>
                            </li>
                            <li>
                                <i class="fa fa-circle"></i>
                                <span class="f-s-14">Safety level: ${ item.safety_level } %</span>
                            </li>
                            <li>
                                <i class="fa fa-circle"></i>
                                <span class="f-s-14">Maximum amount: ${ item.maximum_amount } (g)</span>
                            </li>
                        </ul>
                    </div>
                    <hr style="margin-top: 19px;">
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-lg width-150 btn-success" type="button" name="button" onclick="cook_item(${ item.id })">Cook</button>
                        <button class="btn btn-lg width-150 btn-danger" type="button" name="button" onclick="soldout_item(${ item.id })">Sold out</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="vertical-box-column p-15" style="width: 50%;">
            <div class="widget-chart-info" style="height: 200px; overflow: auto;">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        ${ (() => {
                            if(item.cooking_items.length != 0){
                                return `<h4 class="widget-chart-info-title">Current cooking (${ item.cooking_items.length })</h4>
                                <p class="widget-chart-info-desc">You are cooking ${ item.cooking_items.length } batch at the moment. Please check quality before the food is ready.</p>`;
                            }else{
                                return `<h4 class="widget-chart-info-title">There are no cooking items.</h4>`;
                            }
                        })() }
                    </div>
                </div>
                <div class="cooking-batches">
                    ${ (() => {
                        // Cooking items
                        if(item.cooking_items.length != 0){
                            let cooking_items = ``;
                            item.cooking_items.map(_item => {
                                cooking_items += `
                                    <div class="batch d-flex justify-content-between aligh-items-center m-b-10">
                                        <div class="batch-info" style="width: 85%;">
                                            <div class="widget-chart-info-progress d-flex justify-content-between">
                                                <div class="width-200">
                                                    <b>Started cooking: ${ moment(_item.started_cooking_time, 'MM-DD HH:mm').format('HH:mm') }</b>
                                                    <span>(${ get_elapsed_time_string(get_elapsed_hr_min(_item.started_cooking_time)) } ago)</span>
                                                </div>
                                                <div class="width-200">

                                                </div>
                                                <div class="width-100">
                                                    <b>Amount: ${ _item.cooking_amount } (g)</b>
                                                </div>
                                                <span class="pull-right">${ Math.floor(_item.cooking_amount / item.maximum_amount * 100) }%</span>
                                            </div>
                                            <div class="progress progress-sm">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated rounded-corner bg-teal-lighter" style="width: ${ Math.floor(_item.cooking_amount / item.maximum_amount * 100) }%;"></div>
                                            </div>
                                        </div>
                                        <button class="btn btn-sm btn-primary width-90" type="button" name="button" onclick="ready_item('${ item.id }', '${ _item.id }')"><i class="fa fa-check m-r-5"></i>Ready</button>
                                    </div>
                                `;
                            })
                            return cooking_items;
                        }else{
                            return `<button class="btn btn-sm btn-success m-t-20" onclick="cook_item(${ item.id })">Start cooking</button>`;
                        }
                    })() }
                </div>
            </div>
            <hr>
            <div class="widget-chart-info" style="height: 400px; overflow: auto;">
                <h4 class="widget-chart-info-title">Cooked batches (${ item.cooked_items.length })</h4>
                <p class="widget-chart-info-desc">You have ${ item.cooked_items.length } cooked batches at the moment.</p>
                <div class="cooked-batches">
                    ${ (() => {
                        if(item.cooked_items.length != 0){
                            let cooked_items = ``;
                            item.cooked_items.map(_item => {
                                cooked_items += `
                                    <div class="batch d-flex justify-content-between align-items-center">
                                        <div class="batch-info" style="width: 85%">
                                            <div class="widget-chart-info-progress d-flex justify-content-between">
                                                <div class="width-200">
                                                    <b>Cooked on: ${ moment(_item.cooked_on, 'MM-DD HH:mm').format('HH:mm') } </b> <span>(${ get_elapsed_time_string(get_elapsed_hr_min(_item.cooked_on)) } ago)</span>
                                                </div>
                                                <div class="width-200">
                                                    <b>Time to dispose: ${ get_elapsed_time_string(get_elapsed_hr_min(_item.cooked_on)) } </b>
                                                </div>
                                                <div class="width-150">
                                                    <b>Remaining: ${ _item.remaining_amount } (g)</b>
                                                </div>
                                                <span class="pull-right">${ Math.floor(_item.remaining_amount / item.maximum_amount * 100) }%</span>
                                            </div>
                                            <div class="progress progress-sm m-b-15">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated rounded-corner bg-green-darker" style="width: ${ Math.floor(_item.remaining_amount / item.maximum_amount * 100) }%"></div>
                                            </div>
                                        </div>
                                        <button class="btn btn-sm btn-danger width-90" type="button" name="button"  onclick="dispose_item(${ item.id })"><i class="fa fa-times m-r-5"></i>Dispose</button>
                                    </div>
                                `;
                            })
                            return cooked_items;
                        }else{
                            return '';
                        }
                    })() }
                </div>
            </div>
            <hr>
            <div class="widget-chart-info">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h4 class="widget-chart-info-title">Disposal info</h4>
                        <p class="widget-chart-info-desc">You disposed 3 times, total 2400 (g) of item today</p>
                    </div>
                    <button class="btn btn-md btn-indigo width-90" type="button" name="button" onclick="dispose_history(${ item.id })">
                        <i class="fa fa-history m-r-5"></i>
                        History
                    </button>
                </div>
            </div>
        </div>
    `;

    $('.item-details').empty();
    $('.item-details').append($(template));
}

// Cooking functions
let cook_item = (id) => {
    let data = get_data();
    let item = [...data.filter(item => item.id == id)][0];
    $('#cook-item-modal .modal-header h4').text('You are going to cook ' + item.name);
    $('#cook-item-modal input').attr('item-id', id);
    cook_option = 'batch';
    if(cook_option == 'batch'){
        $('#cook-item-modal input[value="batch"]').prop('checked', true);
    }else{
        $('#cook-item-modal input[value="amount"]').prop('checked', true);
    }
    $('#cook-item-modal').attr('item-id', id);
    cook_option_render(id);
    $('#cook-item-modal').modal('show');
}
let cook_option_render = (id) => {
    let data = get_data();
    let item = [...data.filter(item => item.id == id)][0];
    let template = `
        <div class="w-100 d-flex justify-content-between">
            <div class="item-attributes height-200 w-50">
                <span class="f-s-15 f-w-700">Attributes </span>
                <ul class="m-t-20">
                    <li>
                        <i class="fa fa-circle"></i>
                        <span class="f-s-14">Best serving hours: ${ item.best_serving_hours } hr</span>
                    </li>
                    <li>
                        <i class="fa fa-circle"></i>
                        <span class="f-s-14">Cooking time: ${ item.cooking_time } hr</span>
                    </li>
                    <li>
                        <i class="fa fa-circle"></i>
                        <span class="f-s-14">Safety level: ${ item.safety_level } %</span>
                    </li>
                    <li>
                        <i class="fa fa-circle"></i>
                        <span class="f-s-14">Maximum amount: ${ item.maximum_amount } (g)</span>
                    </li>
                </ul>
            </div>
            <div class="w-50">
                ${ (() => {
                    if(cook_option == 'batch'){
                        return `
                            <div class="m-b-20"><span class="f-s-15 f-w-700">Batches </span></div>
                            <div class="custom-control custom-radio m-b-10">
                                <input class="custom-control-input" type="radio" name="batch_count" id="batch_0" value="0">
                                <label class="custom-control-label" for="batch_0">Small batch (${ item.maximum_amount / 2 } g)</label>
                            </div>
                            <div class="custom-control custom-radio m-b-10">
                                <input class="custom-control-input" type="radio" name="batch_count" id="batch_1" value="1" checked>
                                <label class="custom-control-label" for="batch_1">1 batch (${ item.maximum_amount } g)</label>
                            </div>
                            <div class="custom-control custom-radio m-b-10">
                                <input class="custom-control-input" type="radio" name="batch_count" id="batch_2" value="2">
                                <label class="custom-control-label" for="batch_2">2 batches (${ item.maximum_amount * 2 } g)</label>
                            </div>
                            <div class="custom-control custom-radio m-b-10">
                                <input class="custom-control-input" type="radio" name="batch_count" id="batch_3" value="3">
                                <label class="custom-control-label" for="batch_3">3 batches (${ item.maximum_amount * 3 } g)</label>
                            </div>
                        `;
                    }else{
                        return `
                            <div class="m-b-20"><span class="f-s-15 f-w-700">Input custom amount </span></div>
                            <div class="d-flex w-100">
                                <div class="w-50">
                                    <input type="text" class="form-control item_amount" maximum-amount="${ item.maximum_amount }" placeholder="Maximum: ${ item.maximum_amount }" />
                                    <div class="m-t-5 item_percent"></div>
                                </div>
                                <div class="keyboard d-flex w-50 flex-row justify-content-between p-r-20 p-l-20 flex-wrap">
                                    <div onclick="key_tap('1')">1</div>
                                    <div onclick="key_tap('2')">2</div>
                                    <div onclick="key_tap('3')">3</div>
                                    <div onclick="key_tap('4')">4</div>
                                    <div onclick="key_tap('5')">5</div>
                                    <div onclick="key_tap('6')">6</div>
                                    <div onclick="key_tap('7')">7</div>
                                    <div onclick="key_tap('8')">8</div>
                                    <div onclick="key_tap('9')">9</div>
                                    <div onclick="key_tap('-2')"><i class="fa fa-times"></i></div>
                                    <div onclick="key_tap('0')">0</div>
                                    <div onclick="key_tap('-1')"><i class="fa fa-arrow-left"></i></div>
                                </div>
                            </div>
                        `;
                    }
                })() }
            </div>
        </div>
    `;
    $('.cook_option').empty();
    $('.cook_option').append($(template));
}
let confirm_cook_item = (id) => {
    $('#cook-item-modal').modal('hide');
    let data = get_data();
    let item = [...data.filter(item => item.id == id)][0];
    let amount = 0;
    let batch = $('input[name="batch_count"]:checked').val();
    if(cook_option == 'batch'){
        if(batch == 0){
            amount = item.maximum_amount / 2;
        }else{
            amount = item.maximum_amount;
        }
    }else{
        amount = $('.item_amount').val();
        item.cooking_items.push({
            id: generate_id(),
            cooking_amount: amount,
            started_cooking_time: moment().format('MM-DD HH:mm')
        })
    }
    if(batch == 0) batch++;
    for(let i = 0; i < batch; i++){
        item.cooking_items.push({
            id: generate_id(),
            cooking_amount: amount,
            started_cooking_time: moment().format('MM-DD HH:mm')
        })
    }
    set_data(data);
    render_item_detail(id);
}
let ready_item = (item_id, cooking_item_id) => {
    let data = get_data();
    let item = data.filter(item => item.id == item_id)[0];
	let cooking_item = item.cooking_items.filter(_item => _item.id == cooking_item_id)[0];
    let cooked_item = {
		id: cooking_item.id,
		cooked_amount: cooking_item.cooking_amount,
		remaining_amount: cooking_item.cooking_amount,
		cooked_on: moment().format('MM-DD HH:mm')
	}
    item.cooked_items.push(cooked_item);
    let idx = -1;
	for(let i = 0; i < item.cooking_items.length; i++){
		if(item.cooking_items[i].id == cooking_item_id){
			idx = i;
		}
	}
	if(idx != -1){
		item.cooking_items.splice(idx, 1);
	}
    set_data(data);
    render_item_detail(item_id);
}

// Disposal functions
let dispose_item = (id) => {

}
let confirm_dispose_item = (id) => {

}
let dispose_history = (id) => {

}
let soldout_item = (id) => {

}


$(document).ready(function(){
    init();
    // Render item list
    render_item_list()
})
let key_tap = (key) => {
    let val = $('.item_amount').val();
    let max = $('.item_amount').attr('maximum-amount');
    if(key == '-1'){
        val = val.slice(0, -1);
    }else if(key == '-2'){
        val = '';
    }else{
        val += key;
    }
    $('.item_amount').val(val);
    if(parseInt(val) < parseInt(max)){
        $('.item_amount').removeClass('text-red');
        $('.item_percent').text(`${ Math.floor(parseInt(val) / parseInt(max) * 100) } %`);
    }else{
        $('.item_amount').addClass('text-red');
        $('.item_percent').text(`Invalid amount. You need to input smaller than maximum amount.(${ max }g)`);
    }
}
$('input[name="cook_option"]').change(function(){
    cook_option = $(this).val();
    cook_option_render($(this).attr('item-id'));
})
$('.confirm_start_cooking').click(function(){
    confirm_cook_item($('#cook-item-modal').attr('item-id'));
})
