
var jobUrl = "https://office.ikegps.com/v1/job.json?departmentId=Nxgfww72Ct";
var xhr = new XMLHttpRequest();
xhr.open("GET", jobUrl);
xhr.setRequestHeader("Authorization", "Token: r:CrRo3PhoWYuWBd0ey9r6RUpHAUrHgFZG");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
      console.log(xhr.status);
      
	  let jobListing = JSON.parse(xhr.responseText);

	
	document.getElementById('p-list').innerHTML=`
	  <select onchange="jobSelect(this.value)">
        <option>Select a project</option>
        ${jobListing.map(function (job) {
          return `<option value= ${job.id}>${job.name}</option>`
        }).join('')}
      </select>
	`
  }
}

function jobSelect(x){
	
var url = `https://office.ikegps.com/v1/collection.json?departmentId=Nxgfww72Ct&jobId=${x}`;

console.log(url);
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.setRequestHeader("Authorization", "Token: r:CrRo3PhoWYuWBd0ey9r6RUpHAUrHgFZG");
xhr.send();
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      
	  let data = JSON.parse(xhr.responseText);
	  console.log('data');
      console.log(data);
   
      var output = '';
      let polenum ='';
      let meaStrint ='';
	  let picsCollection =''; //picsCollection = JSON.stringify(data[i].fields[15].value[0]);
	  let poleMea = '';
	  let objVal=[];	 
	  let objKey=[];
	  let pString='';
	  let mtxt='';
	  let pv='';
	  let pvTest='';
	  let mTest='';
	  let baseOffset='Base offset';
	  let id1='';
	  let id2='';
	  let id3='';

				for(var j=0; j < data.length;j++){ //looping through each pole
					objVal=Object.values(data[j].measurements); //get number of pics in a pole and the data
					objKey=Object.keys(data[j].measurements);
					
					id1=data[j].id;
					id2=data[j].revision.id;
					id3=objKey[j];
					let piclink=`https://office.ikegps.com/v1/collection/${id1}/${id2}/${id3}_composite_meters.jpeg/`
					
					pString += '<div><p>'+data[j].fields[0].value+':'; //Display Pole Number

					//for each pic in a pole get the measurement
					for(var k=0; k < objVal.length; k++){  //looping through each pic
						pString += ': Pcture:' +k+' <a href="'+piclink+'" target="_blank">Link</a> </p>';
						console.log(pString);

						//Display Pole size; Pole Class; Hydro Ground; Stgreet Light Bond
						pString += '<p> Pole Size ='+data[k].fields[10].value.title+'<br>';
						pString += 'Pole Class ='+data[k].fields[11].value.title+'<br>';
						pString += 'Hydro Ground ='+data[k].fields[5].value.title+'<br>';
						pString += 'Street Light Bond ='+data[k].fields[6].value.title+'</p>';

						let meaValarr = objVal[k]; //pics with pole measurements. Could have more than one pics per pole

								pString +='<ul>';					
							for(var l=0;l<meaValarr.length;l++){ //looping through each measurement object to get the label and value											
								mTest=mtxt=meaValarr[l].label.text;
								if( mTest.length >= 1){
									mtxt=meaValarr[l].label.text;
								}
								else {
									mtxt='No Label';
								}
								
								pvTest=meaValarr[l].value;
								
								if( pvTest ){
									pv=(meaValarr[l].value).toFixed(1);
								}
								
								else if (mtxt == baseOffset){
								
									pv=(meaValarr[l].offset).toFixed(1);
								}
								else {
								pv=0;
								}

								pString += '<li>'+ mtxt + ' = '+ pv+ '</li>';
								//pString +='<p>'+pv+'</p><br>';
								
								
								
									//output += '<h1>' +polenum+ '</h1>';
				  
									//output += '<p>'+meaString+'</p><br>';
							}
							pString +='</ul>';	
					} 
					pString +='<hr>';
					document.getElementById('measurement').innerHTML = pString;
				}	

			}
   };
}
