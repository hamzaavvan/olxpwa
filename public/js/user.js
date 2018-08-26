
$("#register").on("click", () => {
    var name = app.nameField.val();
    var telephone = app.phoneField.val();
    var email = app.emailField.val();
    var password = app.passField.val();
    let error = false;

    if (name.length <= 0) {
        app.nameField.addClass("invalid");
        error = true;
    }

    if (telephone.length <= 0) {
        app.phoneField.addClass("invalid");
        error = true;
    }

    if (email.length < 6) {
        app.emailField.addClass("invalid");
        error = true;
    }

    if (password.length < 6) {
        app.passField.addClass("invalid");
        error = true;
    }
    
    // if (!error) {
        formData = new FormData();

        formData.append("name", app.nameField.val());
        formData.append("email", app.emailField.val());
        formData.append("password", app.passField.val());
        formData.append("phone_no", app.phoneField.val());

        var option = {
            method: "post", 
            body: JSON.stringify(formData.toJson()),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch("/api/user", option).then(res => res.json()).then(data => {
            if (data.error) {
                M.toast({html: data.error})
            } else {
                M.toast({html: data.message})

                window.location = '/home';
            }

        }).catch(err => {

        });
    // }
})