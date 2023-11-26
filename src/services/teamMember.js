import axios from "axios";
import { baseUrl } from "./apiConfig";

export const markTeamMember = async (credentials) => {
    return await axios.post(baseUrl+"/",credentials);
};

export const updateTeamMember = async (credentials) => {
    return await axios.put(baseUrl+"/" , credentials);
};

export const getTeamMember = async (TeamMemberID) => {
    return await axios.get(baseUrl+"/", {
        params :{
            TMID : TeamMemberID
        }
    });
};

export const getAllTeamMembers = async () => {
    return await axios.get(baseUrl+"/");
}

// delete teamMember attendance
