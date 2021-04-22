import {http} from'./http';
import './websocket/client'
http.listen(5000,()=>{
    console.log("Server running 🚀")
});