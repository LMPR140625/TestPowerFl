import sql from 'mssql'

export const validateUser = async(usr,pass) =>{

    try {
        const user = await sql.query`SELECT * FROM USERS WHERE IDUSER = ${usr}`
        
        return user.recordset;
    } catch (error) {
        console.error('Error consulting data:', error);
        return 0;
    }    
}

