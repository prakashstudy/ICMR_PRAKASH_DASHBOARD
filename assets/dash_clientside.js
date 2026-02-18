window.dash_clientside = Object.assign({}, window.dash_clientside, {
    clientside: {
        toggle_theme: function (n1, n2, current_theme) {
            if (!n1 && !n2) return window.dash_clientside.no_update;

            const new_theme = current_theme === 'dark' ? 'light' : 'dark';
            const body = document.body;
            const icon = document.querySelector('#theme-toggle i');
            const iconMobile = document.querySelector('#theme-toggle-mobile i');

            if (new_theme === 'light') {
                body.classList.add('light-theme');
                if (icon) icon.className = 'fas fa-moon';
                if (iconMobile) iconMobile.className = 'fas fa-moon';
            } else {
                body.classList.remove('light-theme');
                if (icon) icon.className = 'fas fa-sun';
                if (iconMobile) iconMobile.className = 'fas fa-sun';
            }
            return new_theme;
        },

        init_theme: function (theme) {
            if (!theme) return window.dash_clientside.no_update;
            const icon = document.querySelector('#theme-toggle i');
            const iconMobile = document.querySelector('#theme-toggle-mobile i');

            if (theme === 'light') {
                document.body.classList.add('light-theme');
                if (icon) icon.className = 'fas fa-moon';
                if (iconMobile) iconMobile.className = 'fas fa-moon';
            } else {
                document.body.classList.remove('light-theme');
                if (icon) icon.className = 'fas fa-sun';
                if (iconMobile) iconMobile.className = 'fas fa-sun';
            }
            return window.dash_clientside.no_update;
        },

        toggle_mobile_menu: function (n_clicks) {
            console.log("Toggle mobile menu clicked, n_clicks:", n_clicks);
            if (!n_clicks || n_clicks === 0) return window.dash_clientside.no_update;

            const sidebar = document.querySelector('.sidebar');
            console.log("Sidebar element found:", sidebar);
            if (sidebar) {
                sidebar.classList.toggle('show');
                console.log("Sidebar classes after toggle:", sidebar.className);
            }
            return window.dash_clientside.no_update;
        },

        null_handler: function (url_list) {
            return null;
        }
    }
});
