// Functions

let get_data = () => {
    // Get item data from local storage. If there is no data in localstorage, it will look up server data.
    if(!localStorage.getItem('itemListData')){
		localStorage.setItem('itemListData', JSON.stringify(all_items)); // all_times should be replaced with server data. Located in data.js file.
		return all_items;
	}else{
		return JSON.parse(localStorage.getItem('itemListData'));
	}
}

let set_data = (data) => {
    // Set item data to local storage
    localStorage.setItem('itemListData', JSON.stringify(data));
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

}

let generate_id = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};
