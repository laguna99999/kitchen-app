// Functions not related with server data

let get_data = () => {
    // Get item data from local storage. If there is no data in localstorage, it will look up server data.
    if(!localStorage.getItem('itemListData')){
		localStorage.setItem('itemListData', JSON.stringify(all_items)); // all_times should be replaced with server data. Located in data.js file.
		return all_items;
	}else{
		return JSON.parse(localStorage.getItem('itemListData'));
	}
}
let get_raw_data = () => {
    // Get item data from local storage. If there is no data in localstorage, it will look up server data.
    if(!localStorage.getItem('rawMaterialData')){
		localStorage.setItem('rawMaterialData', JSON.stringify(raw_materials)); // all_times should be replaced with server data. Located in data.js file.
		return raw_materials;
	}else{
		return JSON.parse(localStorage.getItem('rawMaterialData'));
	}
}
let set_data = (data) => {
    // Set item data to local storage
    localStorage.setItem('itemListData', JSON.stringify(data));
}
let set_raw_data = (data) => {
    // Set item data to local storage
    localStorage.setItem('rawMaterialData', JSON.stringify(data));
}
let get_elapsed_hr_min = (time) => {
    let hr = Math.trunc(moment().diff(moment(time, 'MM-DD HH:mm'), 'minutes') / 60);
    let min = moment().diff(moment(time, 'MM-DD HH:mm'), 'minutes') % 60;
    if(hr < 0) hr += 24;
    if(min < 0){
        if(hr == 0){
            hr = 23;
        }
        min += 60;
    }
    return {
        hr: Math.abs(hr),
        min: Math.abs(min)
    };
}
let get_elapsed_time_string = (hr_min) => {
    if(hr_min.hr == 0){
        if((hr_min.min == 1) || (hr_min.min == 0)){
            return hr_min.min + ' min';
        }else{
            return hr_min.min + ' mins';
        }
    }else{
        if((hr_min.min == 1) && (hr_min.min == 0)){
            return hr_min.hr + ' hr ' + hr_min.min + ' min';
        }else{
            return hr_min.hr + ' hr ' + hr_min.min + ' mins';
        }
    }
}
let get_time_to_disposal = (bs_hr, cooked_time) => {
    let diff = moment(cooked_time, 'MM-DD HH:mm').add(bs_hr, 'hours').diff(moment(), 'minutes');
    let hr = Math.trunc(diff / 60);
    let min = diff % 60;
    return get_elapsed_time_string({
        hr: hr,
        min: min
    })
}

let generate_id = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

let set_history = (type, item, qty = 0, reason = '') => {
    let history = [];
    if(localStorage.getItem('kitchenHistory')){
        history = JSON.parse(localStorage.getItem('kitchenHistory'));
    }else{
        localStorage.setItem('kitchenHistory', JSON.stringify(history));
    }
    history.push({
        item_id: item.item_id ? item.item_id : item.id,
        name: item.name,
        type: type,
        qty: qty,
        reason: reason
    })
    upload_history({
        item_id: item.item_id ? item.item_id : item.id,
        name: item.name,
        type: type,
        qty: qty,
        reason: reason
    });
    localStorage.setItem('kitchenHistory', JSON.stringify(history));
}

let get_history = () => {
    return JSON.parse(localStorage.getItem('kitchenHistory'));
}

let reset_history = () => {
    localStorage.setItem('kitchenHistory', JSON.stringify([]))
}

let kitchen_notification = (title, text, image = '', sticky = false, time = 3000, play_sound = false) => {
    if(play_sound){
        let audio = new Audio('assets/notify.mp3');
        audio.play();
    }
    // Add notifications to local storage
    let notifications = [];
    if(localStorage.getItem('kitchenNotifications')){
        notifications = JSON.parse(localStorage.getItem('kitchenNotifications'));
    }else{
        localStorage.setItem('kitchenNotifications', JSON.stringify(notifications));
    }
    notifications.unshift({
        id: generate_id(),
        title: title,
		text: text,
		image: image,
        timestamp: moment().format('MM-DD HH:mm')
    });
    $.gritter.add({
		title: title,
		text: text,
		image: image,
		sticky: sticky,
		time: time,
		class_name: 'my-sticky-class'
	});
    localStorage.setItem('kitchenNotifications', JSON.stringify(notifications));
    render_notification();
}

let render_notification = () => {
    let notifications = JSON.parse(localStorage.getItem('kitchenNotifications'));
    $('.kitchen-notifications .notifications').empty();
    if(notifications.length == 0){
        $('.kitchen-notifications .notification-count').empty();
        $('.kitchen-notifications .notification-count').append($('<i class="fa fa-bell"></i>'));
    }else{
        $('.kitchen-notifications .notification-count').empty();
        $('.kitchen-notifications .notification-count').append($(`
            <i class="fa fa-bell"></i>
            <span class="label">${ notifications.length }</span>
        `));
        $('.kitchen-notifications .notifications').append(`<div class="dropdown-header">NOTIFICATIONS (${ notifications.length })</div>`);
        notifications.map((item, idx) => {
            if(idx > 10){
                return;
            }
            $('.kitchen-notifications .notifications').append(`
                <a href="javascript:;" class="dropdown-item media">
                    <div class="media-left">
                        <img src="${ item.image }" width="36">
                    </div>
                    <div class="media-body" style="min-width: 300px">
                        <h6 class="media-heading"> ${ item.title } </h6>
                        <span style="white-space: break-spaces;">${ item.text }</span>
                        <div class="text-muted f-s-10">${ get_elapsed_time_string(get_elapsed_hr_min(item.timestamp)) } ago</div>
                    </div>
                </a>
            `);
        })
        $('.kitchen-notifications .notifications').append(`
            <div class="dropdown-footer text-center">
                <a href="javascript:;" onclick="clear_notifications()">Clear all</a>
            </div>
        `);
    }
}
let clear_notifications = () => {
    localStorage.setItem('kitchenNotifications', JSON.stringify([]));
    render_notification();
}
// API endpoints
let upload_history = (history) => {
    let shop_id = 1; // Should be set while authentication
    
}
