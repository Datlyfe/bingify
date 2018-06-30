import axios from 'axios';

export default ()=>{
    return axios.create({
        baseURL:'https://api.themoviedb.org/3/',
        params:{
            api_key: 'b600fefffa6a832f227803554ed023d7',
        }
        
    })
}