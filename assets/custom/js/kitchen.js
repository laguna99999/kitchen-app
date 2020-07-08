$(document).ready(function(){

    // Welcome message
    setTimeout(function() {
    	$.gritter.add({
    		title: 'Welcome back, laguna!',
    		text: 'Please start cooking.',
    		sticky: true,
    		time: '',
    		class_name: 'my-sticky-class'
    	});
    }, 1000);
    
})
