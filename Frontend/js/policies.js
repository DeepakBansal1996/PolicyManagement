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

function setvariables(id,name, desc, link){
	
	CurrentId=id;
	CurrentName=name;
	CurrentDescription=desc;
	CurrentLink=link;
	console.log(CurrentId);
	console.log(CurrentName);
	console.log(CurrentDescription);
	console.log(CurrentLink);
	alert(CurrentId);
	//console.log(typeof(CurrentId));	
}

//Load all the Policies at Loading time
function loadpolicies(){							
		$.ajax	({
		url: "http://localhost:51682/api/Policies/",
		type: 'GET',
		dataType: 'json', 
		success: function (policydata){
						console.log(policydata);
						for (var i=0; i<policydata.length; i++){
						$('<tr><th Id="'+policydata[i]+'" onclick="setvariables('+policydata[i].Id+','+policydata[i].Name+','+policydata[i].Description+','+policydata[i].Link+' )">' + policydata[i].Name + '</th></tr>').appendTo('#policylist');	
						console.log(policydata[i].Name);
						}			
		}
	});
}

//Create a new Policy using add policy button
function addpolicy(){
		var PolicyId = document.getElementById("PolicyId").value;
		var PolicyName = document.getElementById("PolicyName").value;
		var PolicyDescription = document.getElementById("PolicyDescription").value;
		var PolicyLink = document.getElementById("PolicyLink").value;
	var datafornewpolicy={
		"Id" : PolicyId,
		"Name": PolicyName,
		"Description": PolicyDescription,
		"Link": PolicyLink,
	};
	$.ajax({
		url: 'http://localhost:51682/api/policies',
        type: 'POST',
        datatype: 'json',
		data : datafornewpolicy,
        success: function(res)
						{
					alert("Policy Has been added successfully");
					window.location="policies.html";
				}				
        });
}

function setpolicyvalues(){
		document.getElementById("updatePolicyId").value= CurrentId;
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
		url: 'http://localhost:51682/api/policies/'+PolicyId,
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
		url: 'http://localhost:51682/api/policies/'+Id,
        type: 'DELETE',
        dataType: 'json',
        success: function(res)
						{
					alert("Policy has been deleted successfully");
					window.location="policies.html";
				}				
        });
}


/*
{
						var table=document.getElementById("policylist");
						var row=table.insertRow(table.length);
						row.insertCell(0).innerHTML=policydata[i].Name;
						row.insertCell(1).innerHTML=data[i].ProjectName;
						row.insertCell(2).innerHTML="<input type='button' value='Click To View' class='editbutton' onclick=\'ThrowId(\""+data[i].Id+"\")'>"
						row.insertCell(3).innerHTML="<input type='button' value='Click To View' class='deletebutton' onclick=\'ThrowId(\""+data[i].Id+"\")'>"

						console.log(policydata);
						var obj = JSON.parse(this.policydata);
						console.log(obj);
						for (var j=0; j<policydata.length; j++){
						console.log(obj[j]);
							
						}
						
						var table =document.getElementById("policylist");
						for (var i=0; i<policydata.lenght;i++){
							var row = table.insertRow(table.length);
							row.insertCell(0).innerHTML = policydata.Name;
							
						}
}
*/