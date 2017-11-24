var photo=Vue.extend({
    template:'#photo',
    data:function(){
        return {
            userName:'',
            userPhoto:''
            // http://localhost:8080/images/user-photo/default-photo.gif
        }
    },
    created:function(){
        //var msg=window.location.href.match(/([\s\S]*)\?userName=([\s\S]*)&userPhoto=([\s\S]*)/);
        var photo=window.localStorage.getItem('userPhoto');
        var name=window.localStorage.getItem('userName');
        this.userName=name;
        //decodeURI(msg[2]);
        this.userPhoto='http://localhost:18080/images/user-photo/'+photo;
        //'http://localhost:8080/images/user-photo/'+decodeURI(msg[3]);
    }
})
Vue.component('photo',photo)