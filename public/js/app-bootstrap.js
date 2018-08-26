var db;
var app = {};


$.get("/api/user", {}, (d) => {
    if (d.active) {
        localStorage.setItem("uid", d.uid);
        app.user = d.user;
        app.user.uid = d.user._id;

    } else {
        localStorage.removeItem("uid");
    }
})

window.onload = () => {
    setScripts(["js/localforage.min.js",]).then((res) => {
        app = Object.assign(app, {
            passField: $("#password"),
            emailField: $("#email"),
            nameField: $("#name"),
            phoneField: $("#telephone"),
            searchField: $("#isearch") || $("#search"),
            addHelperText: (error, msg = '', text = '') => {
                return `<span class="helper-text" data-error="${error}" data-success="${msg}">${text}</span>`;
            },
            renderProduct: (ads) => {
                var html = "";

                ads.forEach(ad => {
                    html += `<div class="col s12 m6 l4">
                        <div class="card">
                        <div class="card-image">
                            <div class='ad-img' style="background-image: url(${ad.imgs.length>0 ? ad.imgs[0] : 'img/no-product-img.png'})" />
                            <!-- <img src="img/no-product-img.png"> -->
                            <span class="card-title"><a href="ad/${ad._id}">${ad.title}</a></span>
                            <a class="btn-floating halfway-fab waves-effect waves-light "><i class="material-icons">message</i></a>
                        </div>
                        <div class="card-content">
                            <p>${ad.description}.</p>
                        </div>
                        </div>
                    </div>`;
                });

                return html;
            },
            setPagination: (total, cur_page, cur_cat = '') => {
                var limit = 10;
                var html = "";
                var set = false;
                var page = getParam("page"), cat = getParam("cat");

                html = `<li class="${page==1?'disabled':'waves-effect'}"><a href="${page>1?'?page='+(page-1):''}${cat?'&cat='+cat:''}"><i class="material-icons">chevron_left</i></a></li>`;
                console.log(total);
                for(var i = 1; i <= total; i++) {
                    html += `<li page="${i}" class="${ cur_page==i||(!cur_page&&!set) ? 'active': 'waves-effect'}"><a href="?page=${i}${cur_cat?'&cat='+cur_cat:''}">${i}</a></li>`;
                    set = true;
                }
                html += `<li class="${page==total?'disabled':'waves-effect'}"><a href="${page<total?'?page='+(parseInt(page)+1):''}${cat?'&cat='+cat:''}"><i class="material-icons">chevron_right</i></a></li>`;

                $(".pagination").html(html);
            }
        });



        console.log(app)
        setHeader(app.user);

        $(".container").on("keyup", '.search', function(e) {
            if(e.keyCode == 13) {
                var params = {
                    keyword: $(this).val(),
                };

                if ($(".cat-selector :selected").val()!="")
                    params.cat = $(".cat-selector :selected").val();

                params = setParams(params);

                window.location = "/"+params;
            }
        });

        $(".container").prepend(`
            <div class="loader">
            <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
            </div>
        `);


        setScript("js/materialize.min.js").then(() => {
            setScript("js/app.js").then(() => {
                $(".loader").remove();
 
                $('select').formSelect();
                $('.tabs').tabs();
            })
        })
        
        // var config = {
        //     apiKey: "AIzaSyCCGf5qhYR_E7G-2dT5Z0wL5-cqFRvOiCE",
        //     authDomain: "olxpwa-hamzaavvan.firebaseapp.com",
        //     databaseURL: "https://olxpwa-hamzaavvan.firebaseio.com",
        //     projectId: "olxpwa-hamzaavvan",
        //     storageBucket: "",
        //     messagingSenderId: "1007008541847"
        // };
    
        // firebase.initializeApp(config);
        // db = firebase.firestore();
        // const settings = {timestampsInSnapshots: true};
        // db.settings(settings);


        setScript(
            "js/user.js"
        );

        $("head").append(`
        <!-- Add to home screen for Safari on iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="Olx App">
        <link rel="apple-touch-icon" href="img/icons/icon-152x152.png">
        <link rel="shortcut icon" href="/img/logo.png" type="image/x-icon">
        
        <meta name="msapplication-TileImage" content="img/icons/icon-144x144.png">
        <meta name="msapplication-TileColor" content="#2F3BA2">`);
    });
}