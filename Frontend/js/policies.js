usertype="admin";
/*
function setprivilege(){
	if (usertype== "admin" ){
	document.getElementById("addpolicybutton").style.display="block";
	document.getElementById("updatepolicybutton").style.display="block";
	document.getElementById("deletepolicybutton").style.display="block";
		}
	else if(usertype=="user"){
	document.getElementById("addpolicybutton").style.display="none";
	document.getElementById("updatepolicybutton").style.display="none";
	document.getElementById("deletepolicybutton").style.display="none";
	}
}

/*function showadminbuttons(){
	document.getElementById("user").style.display="block";
	document.getElementById("skill").style.display="block";
	document.getElementById("project").style.display="block";
}*/	


var CurrentId ;
var CurrentName;
var CurrentDescription;
var CurrentLink;

function setvariables(id ,name, desc, link){
	
	CurrentId=id;
	CurrentName=name;
	CurrentDescription=desc;
	CurrentLink=link;
	console.log(CurrentId);
	console.log(CurrentName);
	console.log(CurrentDescription);
	console.log(CurrentLink);
	//alert(CurrentId);
    console.log("in func",CurrentId);
	//console.log(typeof(CurrentId));	
     document.getElementById("policyname").innerHTML = 	CurrentName;
     document.getElementById("policydescription").innerHTML=CurrentDescription;
    document.getElementById("policylink").innerHTML=CurrentLink;
}

//Load all the Policies at Loading time
function loadpolicies(){							
		$.ajax	({
		url: "http://localhost:53541/api/policies/",
		type: 'GET',
		dataType: 'json', 
		success: function (policydata){
						console.log(policydata);
						for (var i=0; i<policydata.length; i++){
						$('<tr><td Id="'+policydata[i]+'" onclick=\"setvariables(\''+policydata[i].Id+'\',\''+policydata[i].Name+'\',\''+policydata[i].Description+'\',\''+policydata[i].Link+'\' )">' + policydata[i].Name + '</th></tr>').appendTo('#policylist');	
						}	
            var d= policydata[0].Name;
            console.log(d);
            document.getElementById("policyname").innerHTML = policydata[0].Name;
                            
		}
	});
}

//Create a new Policy using add policy button
function addpolicy(){
		
		var PolicyName = document.getElementById("PolicyName").value;
		var PolicyDescription = document.getElementById("PolicyDescription").value;
		var PolicyLink = document.getElementById("PolicyLink").value;
	     var datafornewpolicy={
		"Name": PolicyName,
		"Description": PolicyDescription,
		"Link": PolicyLink,
	};
	$.ajax({
		url: 'http://localhost:53541/api/policies',
        type: 'POST',
        datatype: 'json',
		data : datafornewpolicy,
        success: function(res)
						{
					alert("Policy Has been added successfully");
					window.location="Policies.html";
				}				
        });
}

function setpolicyvalues(){
		document.getElementById("updatePolicyName").value= CurrentName;
		document.getElementById("updatePolicyDescription").value= CurrentDescription;
		document.getElementById("updatePolicyLink").value= CurrentLink;
}

//update an existing policy
function updatepolicy(){		
		var PolicyId = document.getElementById("updatePolicyId").value;
		var PolicyName = document.getElementById("updatePolicyName").value;
		var PolicyDescription = document.getElementById("updatePolicyDescription").value;
		var PolicyLink = document.getElementById("updatePolicyLink").value;
		var dataforupdatepolicy={
						"Id" : PolicyId,
						"Name": PolicyName,
						"Description": PolicyDescription,
						"Link": PolicyLink,
					};
	$.ajax({
		url: 'http://localhost:53541/api/policies/'+PolicyId,
        type: 'PUT',
        datatype: 'json',
		data : dataforupdatepolicy,
        success: function(res)
						{
					alert("Policy Has been Updated successfully");
					window.location="policies.html";

				}				
        });
}

//delete an existing policy
function deletepolicy(){
		var Id = CurrentId;
		console.log(Id);
	$.ajax({
		url: 'http://localhost:53541/api/policies'+Id,
        type: 'DELETE',
        dataType: 'json',
        success: function(res)
						{
					alert("Policy has been deleted successfully");
					window.location="policies.html";
				}				
        });
}

function searchbox() {
    var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("policylist");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
