var people=Vue.extend({
    template:'#people',
    
    data:function(){
        return{
            head:['序号','用户名','账号','密码','头像'],
            users:[],
            items:[{name:'userName',isA:true},{name:'id'},{name:'password'},{name:'userPhoto',isP:true},{name:'isFreez',isS:true}],
            freez:{false:'冻结',true:'解除'},
            isOption:false,
            url:'http://localhost:18080/manager/user/'
        }
    },
    created:function(){
        this.getAll();
    },
    methods:{
        conOp:function(){
            this.isOption=!this.isOption
        },
        toFreez:function(id,freez){
            var antiFreez=null;
            switch(freez){
                case 'false':
                    antiFreez=true;
                    break;
                case 'true':
                    antiFreez=false;
                    break;
            }
            axios({
                url:this.url+"toFreez",
                method:'get',
                params:{id,antiFreez}
            }).then(function(result){
                console.log(result.data);
                if(result.data=='1'){this.getAll()}
            }.bind(this)).catch(function(err){console.log(err)})
        },
        getAll:function(){
            axios({
                url:this.url+'getUsers',
                method:'get',
            }).then(function(result){
                this.users=result.data;
            }.bind(this)).catch(function(err){console.log(err)})
        }
    }
})