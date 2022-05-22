const dbQuery=require('./../dbQueries.js');
const util=require('./../util/util.js')
const utilInstance= new util();
const pgp = require('pg-promise')({ capSQL: true });


module.exports=class userHelper{
    async findUserByEmail(email){
        const user= await dbQuery("SELECT * FROM users WHERE email=$1", [email])
        if(user.rows?.length){
            return user.rows[0];
        }
        return null;
    };
    async findUserById(id){
        const user=await dbQuery("SELECT * FROM users WHERE id=$1", [id])
        if(user.rows?.length){
            return user.rows[0];
        }
        return null;
    };
    async createUser(data){
        try{
        const newUserId=await utilInstance.createNewId('users');
        const stringNewId=newUserId.toString();
        data={...data, 'id': stringNewId};
        const query=pgp.helpers.insert(data, null, 'users');
        console.log(query);
        const newUser= await dbQuery(query);
        return newUser;

        }catch(err){
            return err;
        }
    };
    async getAllUsers(){
        const users=await dbQuery("SELECT * FROM users");
        return users.rows;
    };

    async updateUser(id, data){
        try{
            console.log(data);
            if(data.password){
                data.password=await utilInstance.passwordHash(data.password);
            }
            const condition= pgp.as.format("WHERE id = ${id};", {id});
            const query= pgp.helpers.update(data,null,'users')+ " " +condition;
    
            const updatedUser=await dbQuery(query);
            return updatedUser;
    
            }catch(err){
                console.log(err);
                return err;
            }
    }
}