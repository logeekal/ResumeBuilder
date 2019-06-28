export const saveState = (state) =>{
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState);
    }catch(err){
        console.error(err)
    }
}


export const loadState = () =>{
    try{
        return undefined
        const serializedState = localStorage.getItem('state');
        if(serializedState === null)
            return undefined;
        console.log('loadState called');
        console.log(serializedState);
        return JSON.parse(serializedState);
    }catch(err){
        console.error(err);
    }
}