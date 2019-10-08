<template src="./template.html"></template>
<style src="./style.css" scoped></style>
<script>
import axios from 'axios';
import mockdata from '../../../mock';

export default {
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!value.trim()) {
                callback(new Error(this.$t('login.accountErr')));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 3) {
                callback(new Error(this.$t('login.passErr')));
            } else {
                callback();
            }
        };
        return {
            loginRules: {
                name: [{ required: true, trigger: 'blur', validator: validateUsername }],
                pass: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            capsTooltip: false,
            loading: false,
            userList: [],
            form: {
                name: '',
                pass:'',
                language:'en'
            },
            currentPage4: 4
        };
    },
    mounted(){
        this.form.language=this.$store.getters.language;;
        // this.form.language=navigator.language.slice(0,2);
        this.$store.dispatch('app/setLanguage', this.form.language);
    },
    methods: {
        checkCapslock ({ shiftKey, key } = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                    this.capsTooltip = true;
                } else {
                    this.capsTooltip = false;
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false;
            }
        },
        login () {
            const params = {
                accountid: this.form.name,
                password: this.form.pass
            };
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true;
                    // var captcha1 = new TencentCaptcha('2006697241', res => {
                    //     // console.log(res.randstr,res.ticket);
                    //     this.$request('loginVerify', {
                    //         'randStr': res.randstr,
                    //         'ticket': res.ticket
                    //     }).then(res => {
                    //         if (res.data.returnCode == 0) {
                                
                    //         } else {
                    //             this.$message({
                    //                 message: res.data.returnMsg,
                    //                 center: true,
                    //                 type: 'error'
                    //             });
                    //             this.loading = false;
                    //         }
                    //     });
                    // });
                    // captcha1.show();
                    this.$request('login', params).then(res => {
                        if (res.data.success == "1") {
                            localStorage.setItem('HTTP_ACCESS_TOKEN', res.data.HTTP_ACCESS_TOKEN);
                            localStorage.setItem('accountid', this.form.name);
                            // this.$message({
                            //     message: res.data.returnMsg,
                            //     center: true,
                            //     type: 'success'
                            // });
                            this.$router.push('/operationmanagement/filemanagement')
                        } else {
                            this.$message({
                                message: "Error in account or password",
                                center: true,
                                type: 'error'
                            });
                        }
                        this.loading = false;
                    });
                }
            });
        },
        handleSetLanguage (lang) {
            this.$i18n.locale = lang;
            this.$store.dispatch('app/setLanguage', lang);
            this.$message({
                message: 'Switch Language Success',
                type: 'success'
            });
        },
    }
};
</script>
