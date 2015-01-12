bootstrap_alert = function() {};
bootstrap_alert.warning = function(message) {
    $('#alert').html('<div class="fade-in flash alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>')

    window.setTimeout(function() {
      $(".flash").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove();
      });
    
    }, 5000);
}
    
bootstrap_alert.cool = function(message) {
    $('#alert').html('<div class="fade-in flash alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>');

    window.setTimeout(function() {
      $(".flash").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove();
      });
    
    }, 2000);
}

bootstrap_alert.ohno = function(message) {
    $('#alert').html('<div class="fade-in flash alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>')

    window.setTimeout(function() {
      $(".flash").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove();
      });
    
    }, 5000);
}


// copy button
$(".zero-clipboard").css("display", "none");
ZeroClipboard.config( { swfPath: "/lib/zeroclipboard/ZeroClipboard.swf" } );
var client = new ZeroClipboard($("#copy-btn")[0]);
client.on( "ready", function( readyEvent ) {
    client.on( "copy", function (event) {
        var clipboard = event.clipboardData;
        clipboard.setData( "text/plain", $("#geojson").text());
    });

    client.on( "aftercopy", function( event ) {
        // `event.target` === the element that was clicked
            bootstrap_alert.cool('Geojson has been copied!');
    });
});

// Init tootltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// with plugin options

prevSettings = {
    image: {width: "110px", height: "80px"},
    text: {width: "110px", height: "80px"},
    object: {width: "110px", height: "80px"},
    other: {width: "110px", height: "80px"}
}

$("#upload").fileinput({
    'showUpload':true, 
    'previewFileType':'any', 
    'allowedFileExtensions': ['dbf', 'prj', 'shx', 'shp'],
    'maxFileCount': 4,
    'showPreview': true,
    'previewSettings': prevSettings,
});


