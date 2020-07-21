let cook_option = 'batch'; // Batch cook or amount cook
let selected_item_id = -1;

// App
let init = () => {
    // Welcome message
    setTimeout(function() {
        kitchen_notification('Welcome back, admin!', 'Please start cooking.', 'assets/img/media/user.png');
    }, 1000);
    // Timestamp
    setInterval(function(){
        $('.timestamp').text(moment().format('HH:mm:ss DD, MMM YYYY'));
    }, 1000);

    setInterval(function(){
        // Updates timestamps
        render_item_detail(selected_item_id);
        render_notification();
    }, 30 * 1000)

    setInterval(function(){
        let data = get_data();
        let cooked_items = [];
        data.map(item => {
            cooked_items = [...cooked_items, ...item.cooked_items]
        })
        cooked_items.map(item => {
            // Check safety level
            if(item.remaining_amount < item.maximum_amount * item.safety_level / 100){
                // Unsafe.
                if(!item.notified){
                    item.notified = true;
                    kitchen_notification(
                        `${ item.name } is below safety level`,
                        `You are running out of ${ item.name } and need to cook more.`,
                        'assets/img/media/danger.png',
                        false,
                        5000,
                        true
                    );
                }
            }
            // Check best serving hours over
            let time = get_elapsed_hr_min(moment(item.cooked_on, 'MM-DD HH:mm').subtract(item.cooking_time, 'hours').format('MM-DD HH:mm'));
            if((time.hr * 60 + time.min) > (item.best_serving_hours * 60)){
                if(!item.notified){
                    item.notified = true;
                    kitchen_notification(
                        `${ item.name } is almost out of best serving hours`,
                        `${ item.name } cooked long ago and quality went bad. Please cook this item again.`,
                        'assets/img/media/danger.png',
                        false,
                        5000,
                        true
                    );
                }
            }
        })
        set_data(data);
    }, 60 * 1000) // Check cook/dispose items
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
    selected_item_id = id;
    $('.item').removeClass('active');
    $('.raw-material').removeClass('active');
    $(`li[data-item-id=${ id }]`).addClass('active');
    $('.item-details').parent().find('.widget-header-title').text('Item details');
    render_item_detail(id);
}
let render_item_detail = (id) => {
    if(id == -1){
        // render raw materials
        return;
    }
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
                        <div class="m-t-10 f-s-14" contenteditable="true">${ item.recipe }</div>
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
                                                <div class="width-220">
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
                                                    <b>Time to dispose: ${ (() => {
                                                        let time_string = get_time_to_disposal(item.best_serving_hours, _item.cooked_on);
                                                        if(time_string.indexOf('-') != -1){
                                                            return `<span class="text-danger">${ time_string }</span>`;
                                                        }else{
                                                            return time_string;
                                                        }
                                                    })() } </b>
                                                </div>
                                                <div class="width-150">
                                                    <b>Remaining: ${ _item.remaining_amount } (g)</b>
                                                </div>
                                                <span class="pull-right text-${ (_item.remaining_amount < _item.maximum_amount * _item.safety_level / 100) ? 'danger' : 'dark' }">${ Math.floor(_item.remaining_amount / item.maximum_amount * 100) }%</span>
                                            </div>
                                            <div class="progress progress-sm m-b-15">
                                                <div class="progress-bar progress-bar-striped progress-bar-animated rounded-corner bg-${ (() => {
                                                    if(_item.remaining_amount < _item.maximum_amount * _item.safety_level / 100){
                                                        return 'danger';
                                                    }else if((2 * _item.remaining_amount) < (_item.maximum_amount * _item.safety_level / 100)){
                                                        return 'warning';
                                                    }else if(_item.remaining_amount != _item.cooked_amount){
                                                        return 'green';
                                                    }else{
                                                        return 'green-darker';
                                                    }
                                                })() }" style="width: ${ Math.floor(_item.remaining_amount / item.maximum_amount * 100) }%"></div>
                                            </div>
                                        </div>
                                        <button class="btn btn-sm btn-danger width-90" type="button" name="button"  onclick="dispose_item('${ item.id }', '${ _item.id }')"><i class="fa fa-times m-r-5"></i>Dispose</button>
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
    let data = get_data();
    let item = [...data.filter(item => item.id == id)][0];
    let amount = 0;
    let batch = $('input[name="batch_count"]:checked').val();
    let sm = false;
    if(cook_option == 'batch'){
        if(batch == 0){
            amount = item.maximum_amount / 2;
        }else{
            amount = item.maximum_amount;
        }
    }else{
        amount = $('.item_amount').val();
        if(amount == ''){
            amount = 0;
        }
        if(amount == 0){
            return;
        }
        item.cooking_items.push({
            id: generate_id(),
            cooking_amount: amount,
            started_cooking_time: moment().format('MM-DD HH:mm')
        })
    }
    if(batch == 0) {
        batch++;
        sm = true;
    }
    for(let i = 0; i < batch; i++){
        item.cooking_items.push({
            id: generate_id(),
            cooking_amount: amount,
            started_cooking_time: moment().format('MM-DD HH:mm')
        })
    }
    $('#cook-item-modal').modal('hide');
    kitchen_notification("Cooking started!", `You started cooking ${ item.name } ${ (() => {
        if(cook_option != 'batch'){
            return `${ amount } g`;
        }else{
            if(sm){
                return `small batch. (${ amount })`;
            }else{
                return `${ batch } batches. (${ batch * amount } g)`;
            }
        }
    })() }`, 'assets/img/media/info.png', false, 5000);

    set_data(data);
    render_item_detail(id);
}
let ready_item = (item_id, cooking_item_id) => {
    let data = get_data();
    let item = data.filter(item => item.id == item_id)[0];
	let cooking_item = item.cooking_items.filter(_item => _item.id == cooking_item_id)[0];

    let cooked_item = {
		id: cooking_item.id,
        name: item.name,
		cooked_amount: cooking_item.cooking_amount,
		remaining_amount: cooking_item.cooking_amount,
        cooking_started: cooking_item.started_cooking_time,
		cooked_on: moment().format('MM-DD HH:mm'),
        best_serving_hours: item.best_serving_hours,
        safety_level: item.safety_level,
        maximum_amount: item.maximum_amount,
        cooking_time: item.cooking_time
	}

    swal({
			title: 'Are you sure?',
			text: 'Please checkout the quality of the food. You can not revert this action. Do you guarantee the quality of food?',
			icon: 'info',
            closeOnClickOutside: false,
			buttons: {
				cancel: {
					text: 'No, I think this item needs re-cook',
					value: false,
					visible: true,
					className: 'btn btn-default',
					closeModal: true
				},
				confirm: {
					text: 'Yes, I guarantee!',
					value: true,
					visible: true,
					className: 'btn btn-primary',
					closeModal: true
				}
			}
		}).then(function(result){
            if(result){
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
                render_item_list();
                render_item_detail(item_id);
                kitchen_notification("Cooking finished!", `You finished cooking ${ item.name } ${ cooked_item.cooked_amount } g`, 'assets/img/media/info.png', false, 5000);
                print_cooked_item(cooked_item);
            }
        });

}

// Disposal functions
let dispose_item = (item_id, cooked_item_id) => {
    let data = get_data();
    let item = data.filter(item => item.id == item_id)[0];
	let cooked_item = item.cooked_items.filter(_item => _item.id == cooked_item_id)[0];
    $('#dispose-item-modal').attr('item-id', item_id);
    $('#dispose-item-modal').attr('cooked-item-id', cooked_item_id);
    $('#dispose-item-modal .modal-header h4').text('You are going to dispose ' + item.name);
    $('#dispose-item-modal .dispose_option').empty();
    $('#dispose-item-modal .dispose_option').append($(`
        <div class="w-100 d-flex justify-content-between">
            <div class="w-50">
                <span class="f-s-15 f-w-700">Attributes </span>
                <ul class="m-t-10">
                    <li>
                        <i class="fa fa-circle"></i>
                        <span class="f-s-14">Cooked on: ${ cooked_item.cooked_on }(${ get_elapsed_time_string(get_elapsed_hr_min(cooked_item.cooked_on)) } ago)</span>
                    </li>
                    <li>
                        <i class="fa fa-circle"></i>
                        <span class="f-s-14">Time to dispose: ${ get_time_to_disposal(item.best_serving_hours, cooked_item.cooked_on) }</span>
                    </li>
                    <li>
                        <i class="fa fa-circle"></i>
                        <span class="f-s-14">Current amount: ${ cooked_item.remaining_amount } g</span>
                    </li>
                    <li>
                        <i class="fa fa-circle"></i>
                        <span class="f-s-14">Remaining percent: ${ Math.floor(cooked_item.remaining_amount / item.maximum_amount * 100) }%</span>
                    </li>
                </ul>
            </div>
            <div class="w-50">
                <div class="m-b-20"><span class="f-s-15 f-w-700">Input disposal amount </span></div>
                <div class="d-flex w-100">
                    <div class="w-50 d-flex flex-column justify-content-between align-items-end">
                        <div class="w-100">
                            <input type="text" class="form-control dispose_amount" maximum-amount="${ cooked_item.remaining_amount }" placeholder="Maximum: ${ cooked_item.remaining_amount }" />
                            <div class="m-t-5 dispose_remaining">Remaining after disposal: ${ cooked_item.remaining_amount } g</div>
                            <div class="w-100">
                                <span class="f-s-15 f-w-700">Disposal reason </span>
                                <div class="custom-control custom-radio m-t-5 m-b-5">
                                    <input class="custom-control-input" type="radio" name="disposal_reason" id="reason_0" value="Comsume for customers" checked>
                                    <label class="custom-control-label" for="reason_0">Comsume for customers</label>
                                </div>
                                <div class="custom-control custom-radio m-b-5">
                                    <input class="custom-control-input" type="radio" name="disposal_reason" id="reason_1" value="Best serving time out">
                                    <label class="custom-control-label" for="reason_1">Best serving time out</label>
                                </div>
                                <div class="custom-control custom-radio m-b-5">
                                    <input class="custom-control-input" type="radio" name="disposal_reason" id="reason_2" value="Not needed anymore">
                                    <label class="custom-control-label" for="reason_2">Not needed anymore</label>
                                </div>
                                <div class="custom-control custom-radio m-b-5">
                                    <input class="custom-control-input" type="radio" name="disposal_reason" id="reason_3" value="Something is in the food">
                                    <label class="custom-control-label" for="reason_3">Something is in the food</label>
                                </div>
                                <div class="custom-control custom-radio m-b-5">
                                    <input class="custom-control-input" type="radio" name="disposal_reason" id="reason_4" value="Other">
                                    <label class="custom-control-label" for="reason_4">Other</label>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-danger width-90 m-b-10" onclick="key_tap_dispose('-3')">Dispose all</button>
                    </div>
                    <div class="keyboard d-flex w-50 flex-row justify-content-between p-r-20 p-l-20 flex-wrap">
                        <div onclick="key_tap_dispose('1')">1</div>
                        <div onclick="key_tap_dispose('2')">2</div>
                        <div onclick="key_tap_dispose('3')">3</div>
                        <div onclick="key_tap_dispose('4')">4</div>
                        <div onclick="key_tap_dispose('5')">5</div>
                        <div onclick="key_tap_dispose('6')">6</div>
                        <div onclick="key_tap_dispose('7')">7</div>
                        <div onclick="key_tap_dispose('8')">8</div>
                        <div onclick="key_tap_dispose('9')">9</div>
                        <div onclick="key_tap_dispose('-2')"><i class="fa fa-times"></i></div>
                        <div onclick="key_tap_dispose('0')">0</div>
                        <div onclick="key_tap_dispose('-1')"><i class="fa fa-arrow-left"></i></div>
                    </div>
                </div>
            </div>
        </div>
    `));
    $('#dispose-item-modal').modal('show');
}
let confirm_dispose_item = (item_id, cooked_item_id) => {
    let disposal_amount = $('.dispose_amount').val();
    if((disposal_amount == '') || (disposal_amount == '0')){
        return false; // Invalid amount.
    }else{
        $('#dispose-item-modal').modal('hide');
        let data = get_data();
        let item = data.filter(item => item.id == item_id)[0];
    	let cooked_item = item.cooked_items.filter(_item => _item.id == cooked_item_id)[0];
        let disposal_reason = $('input[name="disposal_reason"]:checked').val();
        if(cooked_item.remaining_amount == disposal_amount){
    		// Remove item
    		let idx = -1;
    		for(let i = 0; i < item.cooked_items.length; i++){
    			if(item.cooked_items[i].id == cooked_item_id){
    				idx = i; break;
    			}
    		}
    		if(idx != -1){
    			item.cooked_items.splice(idx, 1);
    		}
    	}else{
    		cooked_item.remaining_amount = cooked_item.remaining_amount - disposal_amount;
    	}
        kitchen_notification("Item disposed!", `You disposed ${ item.name } ${ disposal_amount } g, Reason: ${ disposal_reason }`, 'assets/img/media/info.png', false, 5000);
        set_data(data);
        render_item_detail(item_id);
        render_item_list();
    }
}
let dispose_history = (id) => {

}
let soldout_item = (id) => {

}

let print_cooked_item = (item) => {
    var print_window = window.open('', 'PRINT Cooked item', 'height=800,width=1200');
    print_window.document.write(`
        <!DOCTYPE html>
        <html lang="en" dir="ltr">
            <head>
                <meta charset="utf-8">
                <title>Print Cooked item</title>
            </head>
            <style>
                body{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .content{
                    width: 400px;
                    height: 600px;
                    border: 1px solid #e0e0e0;
                }
                h1{
                    text-align: center;
                }
                .item-content{
                    margin: 40px;
                    height: 500px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
            </style>
            <body>
                <div class="content">
                    <h1>You cooked ${ item.name }</h1>
                    <div class="item-content">
                        <div>
                            <h3>Name: ${ item.name }</h3>
                            <h3>Amount: ${ item.cooked_amount } g</h3>
                            <h3>Cooking started on: ${ moment(item.cooking_started, 'MM-DD HH:mm').format('DD MMM, YYYY HH:mm') }</h3>
                            <h3>Cooking finished on: ${ moment(item.cooked_on, 'MM-DD HH:mm').format('DD MMM, YYYY HH:mm') }</h3>
                        </div>
                        <div style="margin-bottom: 40px; text-align: center;">
                            <p>Thank you for your business.</p>
                            <p>@2020 WUSHILAND BOBA</p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `);

    print_window.print();
    print_window.close();

    return true;
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
    if((val.length != 1) && (val[0] == '0')){
        val = val.slice(1);
    }
    if(val == ''){
        val = 0;
    }
    $('.item_amount').val(val);
    if(parseInt(val) <= parseInt(max)){
        $('.item_amount').removeClass('text-red');
        $('.item_percent').text(`${ Math.floor(parseInt(val) / parseInt(max) * 100) } %`);
    }else{
        $('.item_amount').addClass('text-red');
        $('.item_percent').text(`Invalid amount. You need to input smaller than maximum amount.(${ max }g)`);
    }
}
let key_tap_dispose = (key) => {
    let val = $('.dispose_amount').val();
    let max = $('.dispose_amount').attr('maximum-amount');
    if(key == '-1'){
        val = val.slice(0, -1);
    }else if(key == '-2'){
        val = '';
    }else if(key == '-3'){
        val = max;
    }else{
        val += key;
    }
    if((val.length != 1) && (val[0] == '0')){
        val = val.slice(1);
    }
    if(val == ''){
        val = 0;
    }
    $('.dispose_amount').val(val);
    if(parseInt(val) <= parseInt(max)){
        $('.dispose_amount').removeClass('text-red');
        $('.dispose_remaining').text(`Remaining after disposal: ${ max - val } g`);
    }else{
        $('.dispose_amount').addClass('text-red');
        $('.dispose_remaining').text(`Invalid amount. You need to input smaller than maximum amount.(${ max }g)`);
    }
}
$('input[name="cook_option"]').change(function(){
    cook_option = $(this).val();
    cook_option_render($(this).attr('item-id'));
})
$('.confirm_start_cooking').click(function(){
    confirm_cook_item($('#cook-item-modal').attr('item-id'));
})
$('.confirm_dispose_item').click(function(){
    confirm_dispose_item($('#dispose-item-modal').attr('item-id'), $('#dispose-item-modal').attr('cooked-item-id'));
})
