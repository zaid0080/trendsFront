export const fetchAndSetData = async (place: String) => {
    try{
      const res = await fetch(`https://trendsend.herokuapp.com/apis/trends/by-place?placeName=${place}`);
      if(res.ok){
        const jsonData = await res.json();
        window.sessionStorage.setItem('data',JSON.stringify(jsonData.data))
        return jsonData.data
        } else{
        throw res;
      }
    }catch(error){
      console.log(error);
      throw error
    }
  };