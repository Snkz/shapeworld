/* Wrapper on XMLHttpRequest */
var Request = function() {
    var req = null;

    function _create_request(type, url, isAjax) {
        req = new XMLHttpRequest();
        req.open(type, url, isAjax);
        return this;
    };

    function _set_response_handler(cb) {
        req.onreadystatechange = function() {
            if(req.readyState == 4) {
                cb(req.responseText);
            }
        };

        return this;
    };

    function _send(data) {
        req.send(data);
        return this;
    };

    function _response_text() {
        return req.responseText;
    }

    return {
        create_request: _create_request,
        set_response_handler: _set_response_handler,
        send: _send,
        response_text: _response_text,
        toObject: function() {
            return req;
        }
    };
};

$(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, ''),
        files = input.get(0).files;
    //input.trigger('fileselect', [numFiles, files]);
});


//$(document).ready( function() {
//    $('.btn-file :file').on('filelock', function(event, files) {
$('#upload').on('filelock', function(event, files) {
    console.log(files);

    var fd = new FormData();
    var shx = null;
    var shp = null;
    var dbf = null;
    var prj = null;

    for(i = 0; i < files.length; i++) {
        var suffix_arr = files[i].name.split(".");
        var suffix = suffix_arr[suffix_arr.length - 1];
        switch(suffix) {
            case "shp":
                  shp = files[i];
                  fd.append("shp", shp);
                  break;
            case "shx":
                  shx = files[i];
                  fd.append("shx", shx);
                  break;
            case "dbf":
                  dbf = files[i];
                  fd.append("dbf", dbf);
                  break;

            case "prj":
                  prj = files[i];
                  fd.append("prj", prj);
                  break;
            default:
                  break;
        }
    }
    
    if (!shp || !dbf) {
        bootstrap_alert.ohno("Require atleast a shp and a dbf file to be submitted");
        return;
    }


    // ajax req to update layer
    var req = new Request();
    req
        .create_request("POST", "/shptogeo.json", true)
        .set_response_handler(function(response) {
            $("#geojson").text(response);
            $(".zero-clipboard").css("display", "block");
        })
        .send(fd);
});


