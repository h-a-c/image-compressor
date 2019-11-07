//find all images
const dirTree = require("directory-tree");
const button = document.getElementById('setPath');
const button2 = document.getElementById('selectAll');

button.addEventListener('click', setPath);
button2.addEventListener('click', selectAll);

var path = './';

function getImages() {
	var outputHTML = '<div class="card-header" >Found the following files';
	const tree = dirTree(path, {extensions:/\.(gif|jpg|jpeg|tiff|png)$/i}, (item, PATH, stats) => {
    	outputHTML = outputHTML + `
		    <div class="custom-control custom-switch">
		      <input type="checkbox" name="checkbox" class="custom-control-input" id="`+item.path+`" value=`+item.path+`>
		      <label class="custom-control-label" for="`+item.path+`">`+item.path+`</label>
		    </div>
    	`
	});
	outputHTML =  outputHTML + `<input type='submit' class='btn btn-primary' id='compress' value='Compress Image'/>
	`
	document.getElementById('files').innerHTML = outputHTML;
}

function setPath(){
	path = document.getElementById('inputPath').value;
	getImages();
	reloadJS();
}

function reloadJS(){
	delete require.cache[require.resolve('./compress.js')]
	require('./compress.js');
}

function selectAll(){
  var checkboxes = document.getElementsByName('checkbox');
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     checkboxes[i].checked = true;
  }
}
getImages();

