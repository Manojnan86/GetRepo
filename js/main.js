$(document).ready(function(){

    $('#submit_button').click(function(e) {
        var username = $('#username').val();
        var password = $('#password').val();

        if(username == null || username.length == 0) {
            alert("Please input valid username");
            return;
        }

        if(password == null || password.length == 0) {
            alert("Please input valid password");
            return;
        }

        // basic auth
        var gh = new GitHub({
           username: username,
           password: password
           /* also acceptable:
              token: 'MY_OAUTH_TOKEN'
            */
        });

        var user = gh.getUser();
        user.listRepos({}, function(err, repos) {
            console.log("Repos: ", repos);
            console.log(err);

            $('#result_table1_body').empty();
            if(err != null) {
                alert("Authorized failed!");
                return;
            }
            else if(repos != null) {
                for(var i = 0; i < repos.length; i++) {
                    var item = repos[i];
                    var name = item["name"];
                    var full_name = item["full_name"];
                    var url = item["html_url"];

                    $('#result_table1_body').append("<tr><td>" + name + "</td><td>" + full_name + "</td><td><a href='" + url + "'>" + url + "</a></td></tr>");
                }    
            }
            
        });

                /*    
        var clayreimann = gh.getUser('clayreimann');
        clayreimann.listStarredRepos(function(err, repos) {
            // look at all the starred repos!
            console.log(repos);
        });
        */
    });

    $('#shared_submit_button').click(function(e) {
        var shared_username = $('#shared_username').val();

        if(shared_username == null || shared_username.length == 0) {
            alert("Please input valid username");
            return;
        }

        username = "kalyankrishna86";
        password = "123456a";

        // basic auth
        var gh = new GitHub({
           username: username,
           password: password
        });

        console.log(shared_username);
        //clayreimann
        var shared_user = gh.getUser(shared_username);
        shared_user.listStarredRepos(function(err, repos) {
            console.log(repos);
            $('#result_table2_body').empty();
            if(err != null) {
                alert("Authorized failed!");
                return;
            }
            else if(repos != null) {
                for(var i = 0; i < repos.length; i++) {
                    var item = repos[i];
                    var name = item["name"];
                    var full_name = item["full_name"];
                    var url = item["html_url"];

                    $('#result_table2_body').append("<tr><td>" + name + "</td><td>" + full_name + "</td><td><a href='" + url + "'>" + url + "</a></td></tr>");
                }    
            }
        });
    });
});

