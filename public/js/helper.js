FormData.prototype.toJson = function() {
	var json = {};

    this.forEach(function(value, key){
        json[key] = value;
    });
    
	return (json);
}


function setHeader(user) {
    var html = `<div class="header">
        <div class="nav">
            <div class="nav-wrapper">
                <a href="#!">
                    <img src="/img/logo.png" alt="" class="logo">
                </a>

                <ul class="right hide-on-med-and-up">
                    <li><a href="#" data-target="slide-out" class="menu sidenav-trigger"><i class="material-icons">menu</i></a></li>
                    ${user ? `<li>
                        <a href="/post-ad" class="waves-effect waves-light"><i class="material-icons">add</i></a>
                    </li>` : ''}
                    <li><a href="#!" id="search-trigger"><i class="material-icons">search</i></a></li>
                </ul>
                
                <ul class="right show-on-medium-and-up hide-on-small-only">
                    ${user ? `<li>
                    <a href="/post-ad" class=""><i class="material-icons">add</i></a>
                    </li>
                    <li>
                    <a href="/message" class=""><i class="material-icons">inbox</i></a>
                    </li>
                    <li>
                    <a href="/profile" class=""><i class="material-icons left">face</i> Profile</a>
                    </li>
                        <li>
                        <a href="/signout" class="waves-effect waves-light"><i class="material-icons left">reply</i> Signout</a>
                    </li>` : ''}
                    ${!user ? `<li>
                        <a href="/signin" class=" "><i class="material-icons left">account_circle</i>Sign in</a>
                    </li>` : ''}
                    <li>
                        <a href="/" class=" "><i class="material-icons left">home</i> Home</a>
                    </li>
                </ul>
            </div>

            <div class="row hide-on-small-only">
                <div class="search-wrapper">
                        <form action="/" method="get">
                            <div class="input-field col l9 m9 s9 no-right-pad">
                                <i class="material-icons prefix">search</i>
                                <input id="search" name="search" onclick="this.value = getParam('keyword') ? getParam('keyword') : ''" class="search" type="text" required>
                                <label for="search">Search</label>
                            </div>

                            <div class="cat-selector input-field col s3 l3 m3 no-left-pad">
                                <select>
                                <option value="" selected>All</option>
                                <option value="mobile">Mobile</option>
                                <option value="property">Property</option>                               
                                <option value="cars">Cars</option>
                                <option value="bikes">Bikes</option>
                                <option value="electronics_appliances">Electronics & Appliances</option>
                                <option value="books_sports_hobbies">Books, Sports & Hobbies</option>
                                <option value="services">Services</option>
                                </select>
                                <label>Category Select</label>
                            </div>
                        </form>
                    </div>
            </div>

            <div class="search-wrapper hide mobile mt-1em">
                <form class="row">
                    <div class="input-field col l9 m9 s9 no-right-pad">
                        <i class="material-icons prefix">search</i>
                        <input id="isearch" onclick="this.value = getParam('keyword') ? getParam('keyword') : ''" autofocus class="search" type="search" required>
                        <label for="isearch">Search</label>
                        <i id="close-search" class="material-icons">close</i>
                    </div>

                    <div class="cat-selector input-field col s3 l3 m3 no-left-pad">
                        <select>
                        <option value="" selected>All</option>
                        <option value="mobile">Mobile</option>
                        <option value="property">Property</option>                               
                        <option value="cars">Cars</option>
                        <option value="bikes">Bikes</option>
                        <option value="electronics_appliances">Electronics & Appliances</option>
                        <option value="books_sports_hobbies">Books, Sports & Hobbies</option>
                        <option value="services">Services</option>
                        </select>
                        <label>Category Select</label>
                    </div>
                </form>
            </div>
        </div>

        <ul id="slide-out" class="sidenav">
        ${app.user ?`<li><div class="user-view">
        <div class="background">
        </div>
        <a href="/profile#name"><div class="img-avatar circle">${app.getUser("name")[0]}</div></a>
        <a href="/profile#name"><span class="white-text name">${app.getUser("name")}</span></a>
        <a href="/profile#email"><span class="white-text email">${app.getUser("email")}</span></a>
      </div></li>` : '' }
            <li><a href="/"><i class="material-icons left">home</i> Home</a></li>
            ${!user ? `<li><a href="/signin"><i class="material-icons left">account_circle</i> Sign in</a></li>
            <li><a href="/signup"><i class="material-icons left">insert_invitation</i> Register</a></li>` : ''}
            ${user ? `<li><a href="/post-ad"><i class="material-icons left">add</i> Post ad</a></li>
            <li><a href="/message"><i class="material-icons left">inbox</i>Message</a></li>
            <li><a href="/profile"><i class="material-icons left">face</i> Profile</a></li>
            <li><a href="/signout"><i class="material-icons left">reply</i> Signout</a></li>
            ` : ''}
            <!-- <li><a class="modal-trigger" href="#aboutusModal">About us</a></li> -->
        </ul>
    </div>
    `;

    if ($(".container").length) {
        $(".container").prepend(html);
    } else {
        $("body").prepend(html);
    }
}

function setScripts(urls) {
    console.log(urls)
    if (typeof urls == "object") {
        for (var i in urls) {
            var script = document.createElement("script"); // Make a script DOM node
            script.src = "/"+urls[i]; // Set it's src to the provided URL

            document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
        }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 600)
        });
    }
}

function setScript(url) {
    return new Promise((resolve) => {
        var script = document.createElement("script"); // Make a script DOM node
        script.src = "/"+url; // Set it's src to the provided URL

        document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
        
        setTimeout(() => {
            resolve(true);
        }, 600)
    });
}

function getParam(name) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
       sURLVariables = sPageURL.split('&'),
       sParameterName,
       i;

   for (i = 0; i < sURLVariables.length; i++) {
       sParameterName = sURLVariables[i].split('=');

       if (sParameterName[0] === name) {
           return sParameterName[1] === undefined ? true : sParameterName[1];
       }
   }
}

function setParams(params = {}) {
    var i = 1;
    var url ="";

	for (var prop in params) {
        if (i==1)
            url += "?"+prop+'='+params[prop];
        else
            url = url + '&'+prop+'='+params[prop];
        
        i++;
	}

	return url;
}

function getQuery(offest = 1) {
    url_pieces = location.href.split('/');
    value = url_pieces[url_pieces.length-offest];

    return value;
}