let pushJSON = (address, longurl, shorturl) => {
    let request = new XMLHttpRequest();
    request.open('POST', address);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    let data = {
        "l": longurl,
        "s": shorturl
    };
    request.send(JSON.stringify(data));
};

let cinp = () => {
    document.getElementById("outputMessage").innerHTML = "";
    let cival = document.getElementById("custominput").value;

    let res = JSON.parse(fetchJSON(endpoint + '/?q=s:' + cival))[0]["l"];
    let data = res;


    if (data != null) {
        return false;

    } else if (data == null) {
        return true;

    }


};

let geturl = () => {
    let url = document.getElementById("longURLInput").value;
    return url;

};

let getrandom = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

let genhash = () => {
    if (document.getElementById("custominput").value == "") {
        window.location.hash = getrandom();
        check_is_unique();
    } else {
        window.location.hash = document.getElementById("custominput").value;

    }
};

let check_is_unique = () => {
    let url = window.location.hash.substr(1);
    let res = JSON.parse(fetchJSON(endpoint + '/?q=s:' + url))[0];
    let data = res;

    if (data != null) {
        genhash();
    }


};

let copyer = (containerid) => {
    let elt = document.getElementById(containerid);
    if (document.selection) { // IE
        if (elt.nodeName.toLowerCase() === "input") {
            document.getElementById(containerid).select();
            document.execCommand("copy");
        } else {
            let range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
            document.execCommand("copy");
        }

    } else if (window.getSelection) {
        if (elt.nodeName.toLowerCase() === "input") {
            document.getElementById(containerid).select();
            document.execCommand("copy");
        } else {
            let range_ = document.createRange();
            range_.selectNode(document.getElementById(containerid));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range_);
            document.execCommand("copy");
        }
    }
};

let send_request = (url) => {
    let longurl = url;
    let shorturl = window.location.hash.substr(1)
    let address = endpoint + "/";
    // console.log(address)
    pushJSON(address, longurl, shorturl);

    document.getElementById('shortenedURL').value = window.location.href;
    document.getElementById('completeOutput').innerHTML = "Link Copied To Clipboard.";
    document.getElementById('completeOutputDonate').innerHTML = "Consider Donating!";
    document.getElementById('completeOutputDonate').style.opacity = '1';
    document.getElementById('completeOutputDonate').style.transform = 'translateY(0px)';
    document.getElementById('completeOutputDonate').style.marginTop = '15px';
    document.getElementById('shortenedURL').style.display = 'block';
    document.getElementById('shortenedURL').style.marginTop = '25px';
    copyer("shortenedURL");
};

let shorturl = () => {
    let longurl = geturl();
    let re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    let cre = /^([a-zA-Z0-9 _-]+)$/;
    let protocol_ok = re.test(longurl);
    if (!protocol_ok) {
        document.getElementById("outputMessage").style.color = "#eb4034";
        document.getElementById("outputMessage").innerHTML = "Invalid Link";
        document.getElementById("outputMessage").style.marginTop = "45px";
    } else {
        document.getElementById("outputMessage").innerHTML = "";
        if (document.getElementById("custominput").value == "") {
            genhash();
            send_request(longurl);

        } else {
            if (cre.test(document.getElementById("custominput").value)) {
                if (cinp()) {
                    document.getElementById("outputMessage").style.color = "#fcba03";
                    document.getElementById("outputMessage").innerHTML = " Custom Address Available.";
                    genhash();
                    send_request(longurl);
                } else {
                    document.getElementById("outputMessage").style.color = "#eb4034";
                    document.getElementById("outputMessage").innerHTML = "Custom Address Already Active, Choose Another.";
                    document.getElementById("custominput").placeholder = document.getElementById("custominput").value;
                    document.getElementById("custominput").value = "";
                }
            } else {
                document.getElementById("outputMessage").style.color = "#eb4034";
                document.getElementById("outputMessage").innerHTML = "Use only Alphanumerics and Underscores.";
                document.getElementById("custominput").placeholder = document.getElementById("custominput").value;
                document.getElementById("custominput").value = "";

            }
        }


    }
};

document.getElementById("startEngineButton").addEventListener("click", shorturl);

console.log(`


  ███████╗██╗██████╗ ███████╗    ██╗     ██╗███╗   ██╗██╗  ██╗
  ██╔════╝██║██╔══██╗██╔════╝    ██║     ██║████╗  ██║██║ ██╔╝
  █████╗  ██║██████╔╝█████╗      ██║     ██║██╔██╗ ██║█████╔╝ 
  ██╔══╝  ██║██╔══██╗██╔══╝      ██║     ██║██║╚██╗██║██╔═██╗ 
  ██║     ██║██║  ██║███████╗    ███████╗██║██║ ╚████║██║  ██╗
  ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝                                                              
                                                                                                                                                                                                     
  Made With Hope, By Anthony Arutyunov, In California.
`)
