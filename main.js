let DivCounter=1;
var jobUrl = "https://office.ikegps.com/v1/job.json?departmentId=Nxgfww72Ct";
var xhr = new XMLHttpRequest();
xhr.open("GET", jobUrl);
xhr.setRequestHeader("Authorization", "Token: r:mVS5j2VXF6Lab1RUgxsKxImWXFkq9aVV");
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
      //console.log(xhr.status);
      
	  let jobListing = JSON.parse(xhr.responseText);
		//console.log("jobListing", jobListing);
	
	document.getElementById('p-list').innerHTML=`
	  <select onchange="jobSelect(this.value)">
        <option>Select a project</option>
        ${jobListing.map(function (job) {
			//console.log("job",job);
          return `<option value= ${job.id}>${job.name}</option>`
        }).join('')}
      </select>
	`
  }
}

function jobSelect(x){
	output = document.getElementById('sortedlist').innerHTML='';
var url = `https://office.ikegps.com/v1/collection.json?departmentId=Nxgfww72Ct&jobId=${x}`;

//console.log(url);
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.setRequestHeader("Authorization", "Token: r:mVS5j2VXF6Lab1RUgxsKxImWXFkq9aVV");
xhr.send();
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      //console.log(xhr.status);
      
	  let data = JSON.parse(xhr.responseText);
	  //console.log('data');
      //console.log(data);
   
      //var output = '';
      let polenum ='';
      let meaStrint ='';
	  let picsCollection =''; //picsCollection = JSON.stringify(data[i].fields[15].value[0]);
	  let poleMea = '';
	  let objVal=[];	 
	  let objKey=[];
	 
	  let mtxt='';
	  let pv='';
	  let pvTest='';
	  let mTest='';
	  let baseOffset='Base offset';
	  let id1='';
	  let id2='';
	  let id3='';


				for(var j=0; j < data.length;j++){ //looping through each pole
					objVal=Object.values(data[j].measurements); //get number of pics in a pole and that contain measuremtn data
					objKey=Object.keys(data[j].measurements);
					
					//id1=data[j].id;
					//id2=data[j].revision.id;
					//id3=objKey[j];
					//let piclink=`https://office.ikegps.com/v1/collection/${id1}/${id2}/${id3}_composite_meters.jpeg/`
					
					//Display Pole size; Pole Class; Hydro Ground; Stgreet Light Bond
					let pString = '<h2>'+data[j].fields[0].value+'</h2>'; //Display Pole Number
						pString += '<p> Pole Size ='+data[j].fields[10].value.title+'<br>'; //Pole size
						pString += 'Pole Class ='+data[j].fields[11].value.title+'<br>'; //Pole class
						pString += 'Hydro Ground ='+data[j].fields[5].value.title+'<br>'; //Hydro ground
						pString += 'Street Light Bond ='+data[j].fields[6].value.title+'</p>'; //SL bond

					//for each pic in a pic collection get the measurement
					for(var k=0; k < objVal.length; k++){  //looping through each pic
						//pString += ': Pcture:' +k+' <a href="'+piclink+'" target="_blank">Link</a> </p>';
						//console.log(pString);
						let poleMarray=[];

						let meaValarr = objVal[k]; //pic with pole measurements. Could have more than one pics per pole
						//console.log("Raw Data :", meaValarr);

						if(meaValarr.length>1){				
							for(let l=0;l<meaValarr.length;l++){
								let poleMdata={};
								
								//looping through each measurement object to get the label and value												
								//console.log( `# of measurements:  ${meaValarr.length}`);
								mtxt=meaValarr[l].label.text;
								if( mtxt.length >= 1){	
								
									if(mtxt=="Base") pv=0;
									else if (mtxt=="Base offset") pv=(meaValarr[l].offset).toFixed(1)
									else pv=(meaValarr[l].value).toFixed(1);
								}
								else {
									mtxt='No Label';
									pv=(meaValarr[l].value).toFixed(1);
								}

								poleMdata[mtxt]=Number(pv);
								poleMarray.push(poleMdata);
								//poleMdata={};
							}

							//Sorting the measurement order	
							//console.log("Before Sorting: ",poleMarray);
							poleMarray.sort(function(a,b){
										let j =Object.values(a);
											j =j[0];
	
										let k =Object.values(b);
											k = k[0];

										if (j> k) return -1;										
										else if (j< k) return 1;
										else return 0;
										}
									);

							//display array in html with id sortedlist
							//if(meaValarr.length>1){
								//console.log("After Sorting: ",poleMarray);
								displaySortedList(poleMarray,pString);
							//}

						} /*End more then just base*/	
					} 
					
					//document.getElementById('measurement').innerHTML = pString;
				}	
				//document.getElementById('sortedList').innerHTML = '';

			}
   }


			//console.log(" Exiting displaySortedList");
}

function displaySortedList(x, poleheader){
	let output = document.getElementById('sortedlist'); 

	let htmlString =poleheader;

	//console.log("Inside displaySortedList");
	htmlString += '<p><ul>'
	
		for(i=0; i<x.length;i++){	

			let key=Object.keys(x[i]);

			//console.log("Key",key);
			for (j=0;j<key.length;j++){
				z=key[j];
				//console.log("key[j]: ",z, "value: ",x[i][z]);
				htmlString += '<li>' +z+ ' = ' +x[i][z]+ '</li>';
			}
		}
	htmlString += '</ul></p><hr>';
	

		/*let h = document.createElement('div');
			h.id=`pole${DivCounter}`;
			h.className="detail";
		let txt = document.createTextNode(htmlString);
		h.appendChild(txt);
		document.body.appendChild(h);
		output = document.getElementById(`pole${DivCounter}`);
		`pole${DivCounter}`
		*/

		output.insertAdjacentHTML('beforeend', htmlString)

		//console.log('Exiting DisplaySortedlist');

}

