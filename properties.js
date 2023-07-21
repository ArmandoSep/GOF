$(document).ready(function() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
    });
    let search = params.s;
    var nearby = params.n;
  
    // Populate page
    if (search){
        $('#title').html(`Let's find your dream home near ${search}`);
        $('#cta_search').val(search);
    }
    
    if (nearby === 'N'){
        // Show no properties section
        $('#noprop_title').html(`The area around ${search} appears to be in great demand!`)
        $('#no_properties').addClass('show');
    }
    else if (nearby) {
        // Show only nearby cards
        var nearby_ids = nearby.split(",")
        const filterInputs = $('#filters_did');

        // Iterate over the existing children of "filters_did" and update the inputs
        filterInputs.children().each(function(index) {
            const inputValue = nearby_ids[index];
            
            // Break loop if finished input
            if (!inputValue){
                return false;
            };
            
            // Update the input value
            $(this).find('span').text(inputValue);
                
            // Simulate a click event on the checkbox
            $(this).find('input[type="checkbox"]').trigger('click');
        });
            
        // Show cards section
        $('#properties_list').addClass('show');
    } else {
        // Show cards section with all properties
        $('#properties_list').addClass('show');
    };
  
  
    // Show filter survey
    const hid = Cookies.get('hid');
    const prov_email = Cookies.get('pe');
    if (hid || prov_email){
        if (hid) {
            $('.h_hid').val(hid);
        }
        if (prov_email) {
            $('.prov_email').val(prov_email)
        } 
        // Get contact details
        fetch("https://9ng91ox19k.execute-api.us-east-1.amazonaws.com/default/GOF_Verify",{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({'hid':hid, 'prov_email':prov_email}),
        })
        .then(res => res.json())
        .then(json => {
            const details = json;
            if (!details['1']){
                // Hide text section
                $('#properties_text').removeClass('show');
                // show form
                $('#filter_survey').addClass('show');
                $('#question1').addClass('show');
            } else if (!details['2']) {
                // Hide text section
                $('#properties_text').removeClass('show');
                // show form
                $('#filter_survey').addClass('show');
                    $('#question2').addClass('show');
            } else if (!details['3']) {
                // Hide text section
                $('#properties_text').removeClass('show');
                // show form
                $('#filter_survey').addClass('show');
                $('#question3').addClass('show');
            } else if (!details['4']) {
            // Hide text section
                $('#properties_text').removeClass('show');
                // show form
                $('#filter_survey').addClass('show');
                    $('#question4').addClass('show');
            } else if (!details['5']) {
            // Hide text section
                $('#properties_text').removeClass('show');
                // show form
                $('#filter_survey').addClass('show');
                    $('#question5').addClass('show');
            }
        
            // Fill forms with existing data
            if (details['1']){
                $('#'+ details['1']).prop('checked', true);
            }
            if (details['2']) {
                details['2'].forEach(checkBox=>{
                    $('#' + checkBox).prop('checked', true);
                })
            }
            if (details['3']) {
                details['3'].forEach(checkBox=>{
                    $('#' + checkBox).prop('checked', true);
                })
            } 
            if (details['4']) {
                $('#bed_'+ details['4']).prop("checked", true);
            } 
            if (details['5']) {
                $('#bath_'+ details['5']).prop("checked", true);
            } 
            if (details['6']){
                // populate question 6
                $('#filter_first_name').val(details['6']['n']);
                $('#filter_last_name').val(details['6']['ln']);
                $('#filter_email').val(details['6']['em']);
                $('#filter_phone').val(details['6']['ph']);
                // Also prepopulate the contact form
                $('#cta_first_name').val(details['6']['n']);
                $('#cta_last_name').val(details['6']['ln']);
                $('#cta_email').val(details['6']['em']);
                $('#cta_phone').val(details['6']['ph']);
            }
            if (details['hid']){
                // populate hid
                Cookies.set('hid', details['hid'], { expires: 300 });
                $('.h_hid').val(details['hid']);
            }
        });
    } else {
        // Set placeholder email
        const randomSixDigitNumber = getRandomSixDigitNumber();
        $('.prov_email').val(`${randomSixDigitNumber}@gmail.com`)
        // show survey
        $('#properties_text').removeClass('show');
        $('#filter_survey').addClass('show');
        $('#question1').addClass('show');
    }
});



// Function to get a random number
function getRandomSixDigitNumber() {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    return randomNumber;
}

// Function to convet from to json
function convertFormToJSON(form) {
    var array = $(form).serializeArray();
    var json = {};
    $.each(array, function () {
    json[this.name] = this.value || "";
    });
    var form_input = JSON.stringify(json);
    return form_input;
};

// Function to process filter submission
$('#question1').each(function (i, el) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        $('#q1').val('1');
        form = $(e.target);
        var data = convertFormToJSON(form);
        
        // Display question 2
        $('#question1').removeClass('show');
        $('#question2').addClass('show');
        
        // Save to CRM
        fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: data,
        })
        .then(res => res.json())
        .then(json => {
            const response = json;
            var hid = response['hid']
            // Set hid
            if (hid){
                Cookies.set('hid', hid, { expires: 300 });
                $('.h_hid').val(hid);
            }
        });
    });
});
$('#question2').each(function (i, el) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        $('#q2').val('2');
        form = $(e.target);
        var data = convertFormToJSON(form);

        // Display question 3
        $('#question2').removeClass('show');
        $('#question3').addClass('show');
        
        // Save to CRM
        fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: data,
        })
        .then(res => res.json())
        .then(json => {
            const response = json;
            var hid = response['hid']
            // Set hid
            if (hid){
                Cookies.set('hid', hid, { expires: 300 });
                $('.h_hid').val(hid);
            }
                
        });
    });
});
$('#question3').each(function (i, el) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        $('#q3').val('3');
        form = $(e.target);
        var data = convertFormToJSON(form);

        // Display question 4
        $('#question3').removeClass('show');
        $('#question4').addClass('show');
        
        // Save to CRM
        fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: data,
        })
        .then(res => res.json())
        .then(json => {
            const response = json;
            var hid = response['hid']
            // Set hid
            if (hid){
                Cookies.set('hid', hid, { expires: 300 });
                $('.h_hid').val(hid);
            }
        });
    });
});
$('#question4').each(function (i, el) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        $('#q4').val('4');
        form = $(e.target);
        var data = convertFormToJSON(form);

        // Display question 5
        $('#question4').removeClass('show');
        $('#question5').addClass('show');
        
        // Save to CRM
        fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: data,
        })
        .then(res => res.json())
        .then(json => {
            const response = json;
            var hid = response['hid']
            // Set hid
            if (hid){
            Cookies.set('hid', hid, { expires: 300 });
            $('.h_hid').val(hid);
            } 
        });
    });
});
$('#question5').each(function (i, el) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        $('#q5').val('5');
        form = $(e.target);
        var data = convertFormToJSON(form);

        // Display question 6
        $('#question5').removeClass('show');
        $('#question6').addClass('show');
        
        // Save to CRM
        fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: data,
        })
        .then(res => res.json())
        .then(json => {
            const response = json;
            var hid = response['hid']
            // Set hid
            if (hid){
            Cookies.set('hid', hid, { expires: 300 });
            $('.h_hid').val(hid);
            }
        });
    });
});

$('#question6').each(function (i, el) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        $('#q6').val('6');
        form = $(e.target);
        var data = convertFormToJSON(form);
        
        // Display search text
        $('#question6').removeClass('show');
        $('#filter_survey').removeClass('show');
        $('#properties_text').addClass('show');
        // Also prepopulate the contact form
        $('#cta_first_name').val(data['first_name']);
        $('#cta_last_name').val(data['last_name']);
        $('#cta_email').val(data['r_email']);
        $('#cta_phone').val(data['phone']);
        
        // Save to CRM
        fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: data,
        })
        .then(res => res.json())
        .then(json => {
            const response = json;
            var hid = response['hid']
            // Set hid
            if (hid){
            Cookies.set('hid', hid, { expires: 300 });
            $('.h_hid').val(hid);
            }
        });
    });
});


// Function for KPI tracking
function logEvent(eventName) {
    // Get hid
    const hid = Cookies.get('hid');
    // Get search
    const search = $('#cta_search').val();

    fetch("https://jwl9awuxl0.execute-api.us-east-1.amazonaws.com/default/GOF_KPI",{
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({'t':eventName, 'hid':hid, 'search':search}),
    })
}

// Function to process the  contact form submission
$('#contact_form').each(function (i, el) {
    var form = $(el);
    form.submit(function (e) {
        e.preventDefault();
        form = $(e.target);
        var data = convertFormToJSON(form);
        
        // Run KPI
        logEvent('Contact form submission');
        
        // Display calendar scheduler
        $('#contact_title').html('When should we reach out back?');
        $('#contact_form').removeClass('show');
        $('#calendar_div').addClass('show');
        
        // Save to CRM
        fetch("https://spq03lik42.execute-api.us-east-1.amazonaws.com/default/GOF_Contact",{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: data,
        })
        .then(res => res.json())
        .then(json => {
            const response = json;
        });
    });
});

// Function to close filters
$('#close_filters').click(function(){
    //hide filters
    $('#filter_survey').removeClass('show');
    // show text
    $('#properties_text').addClass('show');
    // KPI
    logEvent('Hide filters');
});
// Function to show filters
$('#show_filters').click(function(){
    //hide text
    $('#properties_text').removeClass('show');
    // show filters
    $('#filter_survey').addClass('show');
    // if none of the children have the class show, display question 1
    if (!$('.filter_question').hasClass("show")){
        $('#question1').addClass('show');
    }
    // KPI
    logEvent('Opened filters');
});

// CTA functionality
$('#noprop_cta').click(function(){
    const search = $('#cta_search').val();
    // Show the form
    $('#contact_title').html("Hey, let’s connect!");
    $('#contact_form').addClass('show');
    $('#calendar_div').removeClass('show');
    // Prefill notes
    $('#cta_note').val(`Hello! I‘m looking for an owner-financed property near ${search} `)
    //show modal
    $('#cta_modal').attr('style', 'display:flex');
    // Hidden fields
    $('#cta_source').val('No properties');
    // KPI
    logEvent('CTA No Prop');
});
$('#lets_talk_cta').click(function(){
    const search = $('#cta_search').val();
    // Show the form
    $('#contact_title').html("Hey, let’s connect!");
    $('#contact_form').addClass('show');
    $('#calendar_div').removeClass('show');
    // Prefill notes
    $('#cta_note').val(`Hello! I‘m looking for an owner-financed property near ${search} `)
        //show modal
    $('#cta_modal').attr('style', 'display:flex');
    // Hidden fields
    $('#cta_source').val('Lets talk');
    // KPI
    logEvent('CTA Lets talk');
});
$('#cta_properties_text').click(function(){
    const search = $('#cta_search').val();
    // Show the form
    $('#contact_title').html("Hey, let’s connect!");
    $('#contact_form').addClass('show');
    $('#calendar_div').removeClass('show');
    // Prefill notes
    $('#cta_note').val(`Hello! I‘m looking for an owner-financed property near ${search} `)
    //show modal
    $('#cta_modal').attr('style', 'display:flex');
    // Hidden fields
    $('#cta_source').val('Cant find ideal home');
    // KPI
    logEvent('CTA Cant find ideal home');
});
