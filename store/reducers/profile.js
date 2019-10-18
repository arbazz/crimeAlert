const Profile = (state = {data: []}, action) => {
    switch(action.type) {
        case "GET_PROFILE": {
            return {...state, data: action.payload}
        }
        default: {
            return state;
        }
    }
}

export default Profile; 