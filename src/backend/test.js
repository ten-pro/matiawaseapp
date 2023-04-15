const app = new Vue({
    el: '#app',
    component: {
    },
    data() {
        return {
            user_name: '',
            user_pass: '',
            user_mail: '',
            user_id: 0,

        }
    },
    //ページが読み込まれた時に動く処理
    created() {
    },
    updated() {
    },
    methods: {
        create_user() {
            axios
                .post('https://mp-class.chips.jp/matiawase/main.php', {
                    name: this.user_name,
                    pass: this.user_pass,
                    mail: this.user_mail,
                    create_user: ''
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(
                    (response) => (console.log(response.data)),

                )
        },
        loginchk() {
            axios
                .post('https://mp-class.chips.jp/matiawase/main.php', {
                    pass: this.user_pass,
                    name: this.user_name,
                    login_user: ''
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(
                    (response) => (console.log(response.data))
                )
        },
    },
    computed: {
    }
});