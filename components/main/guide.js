var guide=Vue.extend({
    template:`#guide`,
    data:function(){
        return{
            items:[{name:'首页',file:'index.html'},{name:'新闻资讯',file:'news.html'},{name:'在线影院',file:'movie.html'},{name:'影评',file:'film-review.html'},{name:'资料库',file:'data.html'}],
            input:{title:''},
            index:1,
            curIndex:1,
            search_content:'',
            isLogin:true,
            nav_class:'',
            loginActive:'',
            isLogin:false,
            isReg:false,
            goReg:'',
            whatNow:'登陆',
            noLogin:true,
            userPhoto:'',
            user:{id:'',password:''},
            newUser:{id:'',name:'',password:'',againPassword:'',isFreez:false,userPhoto:'default-photo.gif',isManager:'user'},
            userName:'',
            tips:'12432',
            showTips:false,
            isLogined:true,
            idTipsContent:'',
            nameTipsContent:'',
            passwordTipsContent:'',
            againPasswordContent:'',
            idTips:false,
            nameTips:false,
            passwordTips:false,
            againPasswordTips:false,
            url:'http://localhost:18080/user/',
            reged:false,
            managerCome:'user',
            isOption:false
        }
    },
    created:function(){
        // if(window.location.search!==''){
        //     this.noLogin=false;
        //     var mana=window.location.search.match(/([\s\S]*)&userPhoto=([\s\S]*)&isManager=([manager]*)/);
        //     if(mana==null){
        //         var normal=window.location.search.match(/([\s\S]*)&userPhoto=([\s\S]*)/)
        //         this.userPhoto=decodeURI(normal[2]);
        //         var showName=decodeURI(normal[1]);
        //         this.userName=showName.match(/userName=([\s\S]*)/)[1];
        //     }else{
        //         this.userPhoto=mana[2];
        //         var showName=decodeURI(mana[1]);
        //         this.userName=showName.match(/userName=([\s\S]*)/)[1];
        //         if(mana[3]=='manager')this.managerCome='manager';
        //     }
        // }
        var localStorage=window.localStorage;
        if(localStorage.length!==0){
            this.noLogin=false;
            if(localStorage.isManager=='false'){
                this.userPhoto=localStorage.userPhoto;
                this.userName=localStorage.userName;
                this.managerCome='user'
            }else{
                this.userPhoto=localStorage.userPhoto;
                this.userName=localStorage.userName;
                this.managerCome='manager'
            }
        }
    },
    methods:{
        change1:function(){
            return this.index=1
        },
        change2:function(){
            return this.index=2
        },
        change_one:function(){
            return this.curIndex=1
        },
        change_two:function(){
            return this.curIndex=2
        },
        find:function(){},
        nav:function(i){
            return this.nav_class=i
        },
        clear_nav:function(){
            return this.nav_class=''
        },
        login_active(){
            return this.loginActive='toLogin_active'
        },
        goReg_active:function(){
            return this.goReg='goReg_active'
        },
        clearActive:function(){
            return this.loginActive='',this.goReg='';
        },
        showLogin:function(){
            return this.isLogin=!this.isLogin,this.isReg=false,this.whatNow='登陆';
        },
        login:function(){
            axios({
                method:'get',
                url:this.url+'login',
                params:this.user
            }).then(function(result){
                console.log(result.data);
                if(typeof(result.data)=='string'){
                    this.tips=result.data;
                    this.showTips=true;
                }else if(result.data.length==3){
                    this.tips=result.data[1];
                    // this.$store.state.userName=result.data[0];
                    // this.$store.state.userPhoto=result.data[2];
                    this.showTips=true;
                    this.isLogined=false;
                    window.location.reload();
                    // +'?userName='+result.data[0]+'&userPhoto='+result.data[2];
                    window.localStorage.setItem('userName',result.data[0]);
                    window.localStorage.setItem('userPhoto',result.data[2]);
                    window.localStorage.setItem('isManager',false)
                    this.clearLogin();
                }else{
                    this.tips=result.data[1];
                    // this.$store.state.userName=result.data[0];
                    // this.$store.state.userPhoto=result.data[2];
                    this.showTips=true;
                    this.isLogined=false;
                    this.clearLogin();
                    window.localStorage.setItem('userName',result.data[0]);
                    window.localStorage.setItem('userPhoto',result.data[2]);
                    window.localStorage.setItem('isManager',true);
                    window.location.reload();
                    //+'?userName='+result.data[0]+'&userPhoto='+result.data[2]+'&isManager=manager';
                }
            }.bind(this)).catch(function(err){
                console.log(err)
            });
        },
        clearLogin:function(){
            return this.user.id='',this.user.password=''
        },
        loginOut:function(){
            window.localStorage.clear();
            location.reload()
        },
        toReg:function(){
            this.clearLogin();
            return this.isReg=true,this.isLogin=false,this.whatNow='注册';
        },
        toLogin:function(){
            return this.isLogin=true,this.whatNow='登录',this.isReg='false'
        },
        checkId:function(){
            if(this.newUser.id.length<7||this.newUser.id.length>12||/[^0-9a-zA-Z]/.test(this.newUser.id)){
                this.idTipsContent='账号只能是7-12个字母和数字组成';
                this.idTips=true
            }else{
                this.idTipsContent='';
                this.idTips=false
            }
        },
        checkName:function(){
            this.checkId();
            if(this.newUser.name.length>8||this.newUser.name.length<2){
                this.nameTipsContent='用户名只能是2-8个字符组成';
                this.nameTips=true
            }else{
                this.nameTipsContent='';
                this.nameTips=false
            }
        },
        checkPassword:function(){
            this.checkName();
            if(this.newUser.password==''||this.newUser.password.match(/[0-9]*/)[0].length==this.newUser.password.length||this.newUser.password.match(/[a-zA-Z]*/)[0].length==this.newUser.password.length||this.newUser.password.length>15||this.newUser.password.length<8){
                this.passwordTipsContent='密码需要8-15数字、字母组合';
                this.passwordTips=true
            }else if(this.newUser.id==this.newUser.password){
                this.passwordTipsContent='密码和账号不能为一样';
                this.passwordTips=true
            }else{
                this.passwordTipsContent='';
                this.passwordTips=false
            }
        },
        checkAgainPassword:function(){
            this.checkPassword();
            if(this.newUser.password!==this.newUser.againPassword){
                this.againPasswordContent='两次密码输入不一致'
                this.againPasswordTips=true
            }else{
                this.againPasswordContent=''
                this.againPasswordTips=false
            }
        },
        closeReg:function(){
            // this.againPasswordContent='';
            // this.againPasswordTips=false;
            // this.reged=false;
            // this.isReg=false;
            location.href=location.href+'?userName='+this.newUser.name+'&userPhoto=default-photo.gif';
            // this.newUser={id:'',name:'',password:'',againPassword:'',isFreez:false,userPhoto:'default-photo.gif'}
        },
        reg:function(){
            this.checkAgainPassword();
            if(this.againPasswordTips==false&&this.passwordTips==false&&this.nameTips==false&&this.idTips==false&&this.newUser.againPassword!==''&&this.newUser.password!==''&&this.newUser.name!==''&&this.newUser.id!==''){
                axios({
                    url:this.url+'reg',
                    methods:'get',
                    params:{id:this.newUser.id,password:this.newUser.password,userName:this.newUser.name,isFreez:false,userPhoto:'default-photo.gif',isManager:'user'}
                }).then(function(result){
                    if(result.data=='1'){
                        this.reged=true;
                        this.againPasswordContent='注册成功';
                        this.againPasswordTips=true;
                        this.idTipsContent='';
                        this.idTips=false;
                        this.nameTipsContent='';
                        this.nameTips=false;
                        
                        // window.location.href=window.location.href+'?userName='+this.newUser.name+'&userPhoto=default-photo.gif';
                        window.localStorage.setItem('userName',this.newUser.name);
                        window.localStorage.setItem('userPhoto','default-photo.gif');
                        window.localStorage.setItem('isManager',false)
                        this.newUser={id:'',name:'',password:'',againPassword:'',isFreez:false,userPhoto:'default-photo.gif'};
                        location.reload()
                    }else if(result.data=='该账号已被注册'){
                        this.idTipsContent=result.data;
                        this.idTips=true
                    }else{
                        this.nameTipsContent=result.data;
                        this.nameTips=true
                    }
                }.bind(this)).catch(function(err){
                    console.log(err)
                })
            }
        },
        toOption:function(){
            return this.isOption=true
        },
        leaveOption:function(){
            return this.isOption=false
        }
    }
})
Vue.component('guide',guide)