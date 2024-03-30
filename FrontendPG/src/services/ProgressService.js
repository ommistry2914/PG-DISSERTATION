import axios from "axios";

const PROGRESS_API_URL="http://localhost:8080/progress/userId/A45";

class ProgressService{
    getProgress(){
        return axios.get(PROGRESS_API_URL);
    }
}
export default new ProgressService();