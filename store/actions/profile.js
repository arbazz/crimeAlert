const ProfileAction = (picture) => {
    return (dispatch) => {
        dispatch({
            type: 'GET_PROFILE',
            payload: picture,
        })
    }
}

export {
    ProfileAction
}