function e(e){var t=$(e).serializeArray(),a={};return $.each(t,(function(){a[this.name]=this.value||""})),JSON.stringify(a)}function t(e){const t=Cookies.get("hid"),a=$("#cta_search").val();fetch("https://jwl9awuxl0.execute-api.us-east-1.amazonaws.com/default/GOF_KPI",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({t:e,hid:t,search:a})})}$(document).ready((function(){const e=new Proxy(new URLSearchParams(window.location.search),{get:(e,t)=>e.get(t)});let t=e.s;var a=e.n;if(t&&($("#title").html(`Let's find your dream home near ${t}`),$("#cta_search").val(t)),"N"===a)$("#noprop_title").html(`The area around ${t} appears to be in great demand!`),$("#no_properties").addClass("show");else if(a){var s=a.split(",");$("#filters_did").children().each((function(e){const t=s[e];if(!t)return!1;$(this).find("span").text(t),$(this).find('input[type="checkbox"]').trigger("click")})),$("#properties_list").addClass("show")}else $("#properties_list").addClass("show");const o=Cookies.get("hid"),n=Cookies.get("pe");if(o||n)o&&$(".h_hid").val(o),n&&$(".prov_email").val(n),fetch("https://9ng91ox19k.execute-api.us-east-1.amazonaws.com/default/GOF_Verify",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({hid:o,prov_email:n})}).then((e=>e.json())).then((e=>{const t=e;t[1]?t[2]?t[3]?t[4]?t[5]||($("#properties_text").removeClass("show"),$("#filter_survey").addClass("show"),$("#question5").addClass("show")):($("#properties_text").removeClass("show"),$("#filter_survey").addClass("show"),$("#question4").addClass("show")):($("#properties_text").removeClass("show"),$("#filter_survey").addClass("show"),$("#question3").addClass("show")):($("#properties_text").removeClass("show"),$("#filter_survey").addClass("show"),$("#question2").addClass("show")):($("#properties_text").removeClass("show"),$("#filter_survey").addClass("show"),$("#question1").addClass("show")),t[1]&&$("#"+t[1]).prop("checked",!0),t[2]&&t[2].forEach((e=>{$("#"+e).prop("checked",!0)})),t[3]&&t[3].forEach((e=>{$("#"+e).prop("checked",!0)})),t[4]&&$("#bed_"+t[4]).prop("checked",!0),t[5]&&$("#bath_"+t[5]).prop("checked",!0),t[6]&&($("#filter_first_name").val(t[6].n),$("#filter_last_name").val(t[6].ln),$("#filter_email").val(t[6].em),$("#filter_phone").val(t[6].ph),$("#cta_first_name").val(t[6].n),$("#cta_last_name").val(t[6].ln),$("#cta_email").val(t[6].em),$("#cta_phone").val(t[6].ph)),t.hid&&(Cookies.set("hid",t.hid,{expires:300}),$(".h_hid").val(t.hid))}));else{const e=Math.floor(9e5*Math.random())+1e5;$(".prov_email").val(`${e}@gmail.com`),$("#properties_text").removeClass("show"),$("#filter_survey").addClass("show"),$("#question1").addClass("show")}})),$("#question1").each((function(t,a){var s=$(a);s.submit((function(t){t.preventDefault(),$("#q1").val("1");var a=e(s=$(t.target));$("#question1").removeClass("show"),$("#question2").addClass("show"),fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a}).then((e=>e.json())).then((e=>{var t=e.hid;t&&(Cookies.set("hid",t,{expires:300}),$(".h_hid").val(t))}))}))})),$("#question2").each((function(t,a){var s=$(a);s.submit((function(t){t.preventDefault(),$("#q2").val("2");var a=e(s=$(t.target));$("#question2").removeClass("show"),$("#question3").addClass("show"),fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a}).then((e=>e.json())).then((e=>{var t=e.hid;t&&(Cookies.set("hid",t,{expires:300}),$(".h_hid").val(t))}))}))})),$("#question3").each((function(t,a){var s=$(a);s.submit((function(t){t.preventDefault(),$("#q3").val("3");var a=e(s=$(t.target));$("#question3").removeClass("show"),$("#question4").addClass("show"),fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a}).then((e=>e.json())).then((e=>{var t=e.hid;t&&(Cookies.set("hid",t,{expires:300}),$(".h_hid").val(t))}))}))})),$("#question4").each((function(t,a){var s=$(a);s.submit((function(t){t.preventDefault(),$("#q4").val("4");var a=e(s=$(t.target));$("#question4").removeClass("show"),$("#question5").addClass("show"),fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a}).then((e=>e.json())).then((e=>{var t=e.hid;t&&(Cookies.set("hid",t,{expires:300}),$(".h_hid").val(t))}))}))})),$("#question5").each((function(t,a){var s=$(a);s.submit((function(t){t.preventDefault(),$("#q5").val("5");var a=e(s=$(t.target));$("#question5").removeClass("show"),$("#question6").addClass("show"),fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a}).then((e=>e.json())).then((e=>{var t=e.hid;t&&(Cookies.set("hid",t,{expires:300}),$(".h_hid").val(t))}))}))})),$("#question6").each((function(t,a){var s=$(a);s.submit((function(t){t.preventDefault(),$("#q6").val("6");var a=e(s=$(t.target));$("#question6").removeClass("show"),$("#filter_survey").removeClass("show"),$("#properties_text").addClass("show"),$("#cta_first_name").val(a.first_name),$("#cta_last_name").val(a.last_name),$("#cta_email").val(a.r_email),$("#cta_phone").val(a.phone),fetch("https://yt9f9a3c19.execute-api.us-east-1.amazonaws.com/default/GOF_Filters",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:a}).then((e=>e.json())).then((e=>{var t=e.hid;t&&(Cookies.set("hid",t,{expires:300}),$(".h_hid").val(t))}))}))})),$("#contact_form").each((function(a,s){var o=$(s);o.submit((function(a){a.preventDefault();var s=e(o=$(a.target));t("Contact form submission"),$("#contact_title").html("When should we reach out back?"),$("#contact_form").removeClass("show"),$("#calendar_div").addClass("show"),fetch("https://spq03lik42.execute-api.us-east-1.amazonaws.com/default/GOF_Contact",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:s}).then((e=>e.json())).then((e=>{$("#contact_form").trigger("reset")}))}))})),$("#close_filters").click((function(){$("#filter_survey").removeClass("show"),$("#properties_text").addClass("show"),t("Hide filters")})),$("#show_filters").click((function(){$("#properties_text").removeClass("show"),$("#filter_survey").addClass("show"),$(".filter_question").hasClass("show")||$("#question1").addClass("show"),t("Opened filters")})),$("#noprop_cta").click((function(){const e=$("#cta_search").val();$("#contact_title").html("Hey, let’s connect!"),$("#contact_form").addClass("show"),$("#calendar_div").removeClass("show"),$("#cta_note").val(`Hello! I‘m looking for an owner-financed property near ${e} `),$("#cta_modal").attr("style","display:flex"),$("#cta_source").val("No properties"),t("CTA No Prop")})),$("#lets_talk_cta").click((function(){const e=$("#cta_search").val();$("#contact_title").html("Hey, let’s connect!"),$("#contact_form").addClass("show"),$("#calendar_div").removeClass("show"),$("#cta_note").val(`Hello! I‘m looking for an owner-financed property near ${e} `),$("#cta_modal").attr("style","display:flex"),$("#cta_source").val("Lets talk"),t("CTA Lets talk")})),$("#cta_properties_text").click((function(){const e=$("#cta_search").val();$("#contact_title").html("Hey, let’s connect!"),$("#contact_form").addClass("show"),$("#calendar_div").removeClass("show"),$("#cta_note").val(`Hello! I‘m looking for an owner-financed property near ${e} `),$("#cta_modal").attr("style","display:flex"),$("#cta_source").val("Cant find ideal home"),t("CTA Cant find ideal home")}));
