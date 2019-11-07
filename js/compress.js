var compress_images = require('compress-images');

const button = document.getElementById('compress');


button.addEventListener('click', clickHandler);

function clickHandler() {
	var checkedBoxes = getCheckedBoxes('checkbox');
	for(var i=0; i<checkedBoxes.length; i++) {
		compressImage(checkedBoxes[i].id);
		console.log(checkedBoxes[i].id);
	}
}

function getCheckedBoxes(chkboxName) {
  var checkboxes = document.getElementsByName(chkboxName);
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
     // And stick the checked ones onto an array...
     if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i]);
     }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function compressImage(path){
	var filename = path.search('\/[^\/]+$');
	console.log("path: " +path);
    var output = compress_images(path, __dirname + '/../compressed_images/', {compress_force: false, statistic: true, pathLog: __dirname+'/../log',autoupdate: true}, false,
                                                {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
                                                {png: {engine: 'pngquant', command: ['--quality=20-50']}},
                                                {svg: {engine: 'svgo', command: '--multipass'}},
                                                {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(err, completed){
            if(completed === true){
                console.log('completed compression');
            }                                    
    });
    console.log(output);
}